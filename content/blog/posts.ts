import type { ReactNode } from 'react'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  keywords: string[]
  content: ReactNode
}

export const blogPosts: BlogPost[] = []

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPosts() {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
