import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export type BlogCategory = 'compliance' | 'operations' | 'economics'

export interface BlogFaq {
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  keywords: string[]
  category: BlogCategory
  image?: { src: string; alt: string }
  faq?: BlogFaq[]
  readingMinutes: number
  content: string
  markdown: string
}

marked.setOptions({ gfm: true })

const postsDir = path.join(process.cwd(), 'content', 'blog', 'posts')

function normalizeKeywords(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map((k) => String(k).trim())
  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean)
  }
  return []
}

function parseFaq(raw: unknown): BlogFaq[] | undefined {
  if (!Array.isArray(raw)) return undefined
  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const q = (item as Record<string, unknown>).question
      const a = (item as Record<string, unknown>).answer
      if (typeof q !== 'string' || typeof a !== 'string') return null
      return { question: q, answer: a }
    })
    .filter((item): item is BlogFaq => item !== null)
}

function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function normalizeDate(raw: unknown): string {
  if (raw instanceof Date) return raw.toISOString()
  if (typeof raw === 'string') return raw
  return ''
}

function loadPost(file: string): BlogPost | undefined {
  const raw = fs.readFileSync(file, 'utf-8')
  let data: Record<string, unknown>
  let content: string
  try {
    const parsed = matter(raw)
    data = parsed.data
    content = parsed.content
  } catch (e) {
    console.error(`Failed to parse frontmatter in ${file}:`, (e as Error).message)
    throw e
  }

  const slug = path.basename(file, path.extname(file))
  const title = typeof data.title === 'string' ? data.title : slug
  const date = normalizeDate(data.date)
  const description = typeof data.description === 'string' ? data.description : ''
  const category = (typeof data.category === 'string' ? data.category : 'compliance') as BlogCategory
  const draft = data.draft === true

  const today = new Date()
  const isScheduled = date !== '' && new Date(date).getTime() > today.getTime()

  if (draft || isScheduled) return undefined

  const imageRaw = typeof data.image === 'string' ? data.image : ''
  const imageSrc = imageRaw.startsWith('pexels:') || imageRaw === '' ? undefined : imageRaw
  const imageAlt =
    typeof data.imageAlt === 'string'
      ? data.imageAlt
      : `${title}: ${siteFallbackAlt(category)}`

  return {
    slug,
    title,
    date,
    description,
    keywords: normalizeKeywords(data.keywords),
    category,
    image: imageSrc ? { src: imageSrc, alt: imageAlt } : undefined,
    faq: parseFaq(data.faq),
    readingMinutes: estimateReadingMinutes(content),
    content: marked.parse(content, { async: false }) as string,
    markdown: content.trim(),
  }
}

function siteFallbackAlt(category: BlogCategory): string {
  switch (category) {
    case 'compliance':
      return 'AI compliance for Hong Kong financial firms'
    case 'operations':
      return 'Financial operations automation'
    case 'economics':
      return 'Cost analysis for finance automation'
  }
}

function loadAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .sort()
  return files
    .map((file) => loadPost(path.join(postsDir, file)))
    .filter((post): post is BlogPost => post !== undefined)
}

const posts: BlogPost[] = loadAllPosts()

export const blogPosts: BlogPost[] = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPosts() {
  return [...blogPosts]
}
