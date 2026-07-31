import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/content/blog/posts'
import { siteConfig } from '@/config/siteConfig'

export const metadata: Metadata = {
  title: siteConfig.seo.blog.title,
  description: siteConfig.seo.blog.description,
  keywords: siteConfig.seo.blog.keywords,
}

const blogListingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: siteConfig.blog.collectionPageName,
  description: siteConfig.seo.blog.description,
}

export default function BlogPage() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <section className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogListingJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="container-site">
        <div className="max-w-xl">
          <p className="section-eyebrow">{siteConfig.seo.blog.title}</p>
          <h1 className="font-serif text-[clamp(1.6rem,4.5vw,3rem)] text-jsc-ink mt-2 leading-tight">
            {siteConfig.blog.listingHeading}
          </h1>
          <p className="text-jsc-muted text-[0.9rem] mt-3 leading-relaxed">
            {siteConfig.blog.listingSubtext}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-jsc-muted text-[0.9rem]">
              {siteConfig.blog.emptyState}
            </p>
            <Link
              href="/"
              className="btn-primary inline-flex items-center justify-center min-h-[2.75rem] px-6 mt-6 text-[0.78rem]"
            >
              {siteConfig.blog.emptyStateButton}
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="panel-card p-5 block no-underline group"
              >
                <p className="text-[0.72rem] uppercase tracking-[0.06em] text-jsc-muted">
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <h2 className="font-serif text-[1.15rem] text-jsc-ink mt-2 leading-snug group-hover:text-jsc-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-jsc-muted text-[0.85rem] mt-2 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <span className="inline-block mt-4 text-[0.72rem] uppercase tracking-[0.06em] text-jsc-accent font-medium">
                  {siteConfig.blog.readMore}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
