import { blogPosts } from '@/content/blog/posts'
import { siteConfig } from '@/config/siteConfig'

export async function GET() {
  const blogLine = `- Blog: ${siteConfig.url}/blog\n`
  const base = siteConfig.llmsTxt.replace(blogLine, '')

  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const blogSection = posts.length
    ? `## Blog posts\n\n${posts
        .map(
          (post) =>
            `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.description}`
        )
        .join('\n')}\n\n- Markdown mirrors: ${siteConfig.url}/blog/<slug>/blog.md\n- OKF mirrors: ${siteConfig.url}/okf/blog/<slug>/blog.md\n`
    : ''

  return new Response(base + blogSection, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
