import { blogPosts, getBlogPost } from '@/content/blog/posts'
import { okfFrontmatter } from '@/lib/ai-md'
import { siteConfig } from '@/config/siteConfig'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function GET(_req: Request, { params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return new Response('Not found', { status: 404 })

  const keywords =
    post.keywords.length > 0
      ? `keywords:\n${post.keywords.map((k) => `  - ${k}`).join('\n')}`
      : ''

  const extra = [`date: ${post.date}`, `category: ${post.category}`, keywords]
    .filter(Boolean)
    .join('\n')

  const frontmatter = okfFrontmatter({
    title: post.title,
    description: post.description,
    url: `${siteConfig.url}/blog/${post.slug}`,
    updated: post.date,
  }).replace('---', `---\n${extra}`)

  const body = [`# ${post.title}`, '', post.description, '', post.markdown, ''].join('\n')

  return new Response(frontmatter + body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
