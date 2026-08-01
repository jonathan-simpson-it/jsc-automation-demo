import { blogPosts, getBlogPost } from '@/content/blog/posts'
import { mdResponse } from '@/lib/ai-md'
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

  const body = [
    `# ${post.title}`,
    '',
    `- Published: ${post.date}`,
    `- URL: ${siteConfig.url}/blog/${post.slug}`,
    '',
    post.description,
    '',
    post.markdown,
    '',
  ].join('\n')

  return mdResponse(body)
}
