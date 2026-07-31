import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/content/blog/posts'
import Breadcrumbs from '@/components/site/Breadcrumbs'
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
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: siteConfig.seo.blogPost.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.seo.blogPost.publisherName,
    },
  }

  return (
    <article className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd).replace(/</g, '\\u003c'),
        }}
      />
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
        <div className="mt-10 text-jsc-ink text-[0.95rem] leading-relaxed space-y-5 [&_h2]:font-serif [&_h2]:text-[clamp(1.2rem,3vw,1.6rem)] [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-jsc-ink [&_h3]:font-sans [&_h3]:text-[1rem] [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-semibold [&_p]:text-jsc-muted [&_ul]:text-jsc-muted [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5">
          {post.content}
        </div>
      </div>
    </article>
  )
}
