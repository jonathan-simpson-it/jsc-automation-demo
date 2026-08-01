import fs from 'fs'
import path from 'path'

const postsDir = path.join(process.cwd(), 'content', 'blog', 'posts')

const template = (slug, title) => `---
title: ${title}
date: ${new Date().toISOString().slice(0, 10)}
description: One to two sentences summarising the post and the problem it solves.
keywords: [keyword one, keyword two, keyword three]
category: operations
image: pexels:auto
draft: true
faq:
  - question: Example question?
    answer: Example answer.
---

**Lead paragraph: a direct 40-60 word answer to the question the reader came with.**

Body sections with query-phrased H2 headings, lists, and tables.

## Frequently asked questions

**Question from the FAQ above?**
Answer from the FAQ above.
`

if (process.argv.length < 4) {
  console.error('Usage: node scripts/new-post.mjs <slug> "<Title>"')
  process.exit(1)
}

const slug = process.argv[2]
const title = process.argv[3]
const file = path.join(postsDir, `${slug}.md`)

if (fs.existsSync(file)) {
  console.error(`A post already exists at ${file}`)
  process.exit(1)
}

fs.mkdirSync(postsDir, { recursive: true })
fs.writeFileSync(file, template(slug, title))
console.log(`Created draft: ${file}`)
console.log('Publish when ready: set draft: false (and date in the past), then push.')
