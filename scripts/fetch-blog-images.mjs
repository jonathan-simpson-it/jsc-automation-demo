import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

if (!process.env.PEXELS_API_KEY && !process.env.PEXELS_KEY) {
  const envFile = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, 'utf-8').split('\n')) {
      const m = line.match(/^(PEXELS_API_KEY|PEXELS_KEY)=(.*)$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
    }
  }
}

const postsDir = path.join(process.cwd(), 'content', 'blog', 'posts')
const outDir = path.join(process.cwd(), 'public', 'images', 'blog')

const stopwords = new Set([
  'the', 'a', 'an', 'and', 'or', 'for', 'with', 'your', 'you', 'from', 'that', 'this',
  'how', 'what', 'why', 'when', 'who', 'which', 'can', 'do', 'does', 'are', 'is', 'in',
  'on', 'to', 'of', 'at', 'by', 'be', 'it', 'vs', 'not', 'before', 'after', 'then',
  'would', 'could', 'should', 'actually', 'make', 'makes', 'making', 'get', 'gets',
  'have', 'has', 'had', 'their', 'its', 'them', 'they', 'we', 'our', 'into', 'about',
  'out', 'up', 'down', 'over', 'under', 'again', 'more', 'most', 'other', 'some', 'such',
  'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'really', 'much', 'many',
  'every', 'all', 'both', 'each', 'few', 'first', 'last', 'one', 'two', 'three', 'four',
  'five', 'new', 'old', 'while', 'without', 'through', 'during', 'among', 'between',
  'against', 'because', 'until', 'as', 'but', 'if', 'else', 'or', 'nor', 'yet', 'ago',
  'ever', 'never', 'off', 'once', 'still', 'then', 'there', 'where', 'here', 'here',
  'question', 'questions', 'pilot', 'run', 'running', 'day', 'days', 'guide', 'guides',
  'seven', 'practical', 'cost', 'costs', 'firm', 'firms', 'question', 'answer',
  'without', 'automation', 'automated', 'automating', 'hiring', 'hire', 'buy', 'buying',
  'build', 'building', 'really', 'actually', 'know', 'knows', 'use', 'used', 'using',
])

const CATEGORY_TERMS = {
  compliance: 'compliance documents',
  operations: 'office workflow',
  economics: 'finance analysis',
}

function buildQuery(data) {
  const explicit = typeof data.imageQuery === 'string' ? data.imageQuery.trim() : ''
  if (explicit) return explicit

  const title = typeof data.title === 'string' ? data.title : ''
  const rawKeywords = Array.isArray(data.keywords)
    ? data.keywords.map((k) => String(k))
    : typeof data.keywords === 'string'
      ? data.keywords.split(',').map((k) => k.trim())
      : []

  const terms = [title, ...rawKeywords]
    .join(' ')
    .toLowerCase()
    .split(/[^\w]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 2)
    .filter((t) => !/^\d+$/.test(t))
    .filter((t) => !stopwords.has(t))
    .filter((t, i, arr) => arr.indexOf(t) === i)

  const fallback = CATEGORY_TERMS[String(data.category || '')] || 'business technology'
  const query = terms.slice(0, 4).join(' ') || fallback
  return query
}

const PEXELS_API_KEY = process.env.PEXELS_API_KEY || process.env.PEXELS_KEY || ''

function extractPhotoUrls(html) {
  const seen = new Set()
  const urls = []
  const re = /https:\/\/images\.pexels\.com\/photos\/\d+\/[^"'\\\s)]+/g
  let match
  while ((match = re.exec(html)) !== null) {
    const raw = match[0]
    const clean = raw.replace(/[?&](auto|cs|h|w|dpr|fit)=[^&]*/g, '')
    if (!seen.has(clean)) {
      seen.add(clean)
      urls.push(clean)
    }
  }
  return urls
}

async function searchPexelsApi(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`
  const headers = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' }
  if (PEXELS_API_KEY) headers.Authorization = PEXELS_API_KEY
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`api failed ${res.status}`)
  const data = await res.json()
  if (!Array.isArray(data.photos) || data.photos.length === 0) throw new Error('no results')
  return data.photos.map((p) => p.src.original)
}

async function searchPexelsScrape(query) {
  const url = `https://www.pexels.com/search/${encodeURIComponent(query)}/`
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  })
  if (!res.ok) throw new Error(`search failed ${res.status}`)
  return extractPhotoUrls(await res.text())
}

function downloadUrl(photoUrl) {
  const separator = photoUrl.includes('?') ? '&' : '?'
  return `${photoUrl}${separator}auto=compress&cs=tinysrgb&w=1600&dpr=1`
}

async function downloadPhoto(photoUrl, dest) {
  const res = await fetch(downloadUrl(photoUrl), {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
  })
  if (!res.ok) throw new Error(`download failed ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 5000) throw new Error('file suspiciously small')
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, buf)
}

function altFor(data) {
  const title = typeof data.title === 'string' ? data.title : 'blog post'
  return `${title}: ${String(data.category || 'finance')} automation for Hong Kong firms`
}

async function main() {
  const forceSlugs = new Set()
  let forceMode = false
  for (const arg of process.argv.slice(2)) {
    if (arg === '--force') forceMode = true
    else if (arg.startsWith('--')) forceMode = false
    else {
      if (forceMode) forceSlugs.add(arg)
    }
  }

  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .sort()

  let downloaded = 0
  let skipped = 0
  const failures = []

  for (const file of files) {
    const fullPath = path.join(postsDir, file)
    const raw = fs.readFileSync(fullPath, 'utf-8')
    const { data, content } = matter(raw)

    const slug = path.basename(file, '.md')
    const image = typeof data.image === 'string' ? data.image : ''
    if (image && !image.startsWith('pexels:') && !forceSlugs.has(slug)) {
      skipped++
      continue
    }

    const dest = path.join(outDir, `${slug}.jpg`)
    const query = buildQuery(data)

    try {
      let candidates
      try {
        candidates = await searchPexelsApi(query)
      } catch (apiErr) {
        try {
          candidates = await searchPexelsScrape(query)
        } catch {
          throw apiErr
        }
      }
      if (candidates.length === 0) throw new Error('no candidates found')

      let photoUrl
      let attempt = 0
      while (attempt < candidates.length) {
        try {
          await downloadPhoto(candidates[attempt], dest)
          photoUrl = candidates[attempt]
          break
        } catch {
          attempt++
        }
      }
      if (!photoUrl) throw new Error('all candidates failed')

      data.image = `/images/blog/${slug}.jpg`
      data.imageAlt = altFor(data)
      const output = matter.stringify(content, data)
      try {
        matter(output)
      } catch {
        console.warn(`⚠ ${slug}: stringify produced invalid YAML, skipping rewrite`)
        failures.push({ slug, query, error: 'stringify round-trip failed' })
        continue
      }
      fs.writeFileSync(fullPath, output)
      console.log(`✓ ${slug} <- "${query}" (${photoUrl.split('/').slice(0, 5).join('/')}/...)`)
      downloaded++
    } catch (err) {
      failures.push({ slug, query, error: err.message })
      console.warn(`✗ ${slug} ("${query}"): ${err.message}`)
    }
  }

  console.log(`\nDone: ${downloaded} downloaded, ${skipped} skipped, ${failures.length} failed`)
  if (failures.length) {
    console.log('Retry these with: node scripts/fetch-blog-images.mjs')
  }
}

main()
