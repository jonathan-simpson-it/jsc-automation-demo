import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/content/blog/posts'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import PostCta from '@/components/site/PostCta'
import RelatedPosts from '@/components/site/RelatedPosts'
import { siteConfig } from '@/config/siteConfig'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: `${post.title} ${siteConfig.seo.blogPost.ogTitleSuffix}`,
      description: post.description,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      images: post.image ? [{ url: post.image.src, alt: post.image.alt }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image ? `${siteConfig.url}${post.image.src}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    keywords: post.keywords.join(', '),
    author: {
      '@type': 'Organization',
      name: siteConfig.seo.blogPost.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.seo.blogPost.publisherName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/JSC-logo.png`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  }

  const faqJsonLd = post.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null

  return (
    <article className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
          }}
        />
      ) : null}
      <div className="container-site max-w-[42rem]">
        <Breadcrumbs
          items={[
            { label: siteConfig.blog.breadcrumbLabels.home, href: '/' },
            { label: siteConfig.blog.breadcrumbLabels.blog, href: '/blog' },
            { label: post.title },
          ]}
        />
        <p className="section-eyebrow">
          {new Date(post.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <h1 className="font-serif text-[clamp(1.6rem,4.5vw,3rem)] text-jsc-ink mt-2 leading-tight">
          {post.title}
        </h1>
        <p className="text-jsc-muted text-[0.9rem] mt-4 leading-relaxed">
          {post.description}
        </p>

        {post.image ? (
          <div className="mt-8 relative aspect-[16/9] overflow-hidden rounded-[var(--radius-jsc-lg)] border border-jsc-line">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              priority
              loading="eager"
              sizes="(max-width: 42rem) 100vw, 42rem"
              className="object-cover"
            />
          </div>
        ) : null}

        <div
          className="mt-10 text-jsc-ink text-[0.95rem] leading-relaxed space-y-5 [&_h2]:font-serif [&_h2]:text-[clamp(1.2rem,3vw,1.6rem)] [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-jsc-ink [&_h3]:font-sans [&_h3]:text-[1rem] [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-semibold [&_p]:text-jsc-muted [&_ul]:text-jsc-muted [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 [&_table]:w-full [&_table]:text-[0.85rem] [&_th]:text-left [&_th]:uppercase [&_th]:text-[0.68rem] [&_th]:tracking-[0.06em] [&_th]:text-jsc-muted [&_th]:pb-2 [&_td]:border-t [&_td]:border-jsc-line [&_td]:py-2.5 [&_td]:pr-4 [&_td]:text-jsc-muted"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <PostCta />
        <RelatedPosts post={post} />
      </div>
    </article>
  )
}
