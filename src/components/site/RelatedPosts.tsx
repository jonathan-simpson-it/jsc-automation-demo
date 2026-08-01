import Link from 'next/link'
import type { BlogPost } from '@/content/blog/posts'
import { getBlogPosts } from '@/content/blog/posts'
import { siteConfig } from '@/config/siteConfig'

export default function RelatedPosts({ post }: { post: BlogPost }) {
  const posts = getBlogPosts()
  const sameCategory = posts.filter((p) => p.slug !== post.slug && p.category === post.category)
  const related = (sameCategory.length >= 2 ? sameCategory : posts.filter((p) => p.slug !== post.slug))
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <div className="mt-14">
      <h2 className="font-serif text-[clamp(1.1rem,2.5vw,1.4rem)] text-jsc-ink">
        Related reading
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="panel-card p-5 block no-underline group"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.06em] text-jsc-muted">
              {new Date(p.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
            <h3 className="font-serif text-[1.05rem] text-jsc-ink mt-2 leading-snug group-hover:text-jsc-accent transition-colors">
              {p.title}
            </h3>
            <p className="text-jsc-muted text-[0.85rem] mt-2 leading-relaxed line-clamp-3">
              {p.description}
            </p>
            <span className="inline-block mt-4 text-[0.72rem] uppercase tracking-[0.06em] text-jsc-accent font-medium">
              {siteConfig.blog.readMore}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
