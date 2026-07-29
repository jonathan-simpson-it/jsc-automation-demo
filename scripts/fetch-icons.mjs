#!/usr/bin/env node
/**
 * Fetches SaaS brand icons as SVGs from simple-icons and its CDN fallback.
 * Saves to public/icons/ for static hosting.
 * Run: node scripts/fetch-icons.mjs
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIR = join(ROOT, 'public', 'icons')

if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true })

function save(slug, svg) {
  const path = join(DIR, `${slug}.svg`)
  writeFileSync(path, svg, 'utf-8')
  console.log(`  ✓ ${slug}.svg`)
}

async function main() {
  console.log('\n📦 Stage 1: Extracting from simple-icons package...')

  const icons = []

  // These are confirmed to exist in the current simple-icons npm export
  const siNames = [
    'Whatsapp', 'Xero', 'Notion', 'Hsbc', 'Google', 'Gmail', 'Googledrive',
  ]

  for (const name of siNames) {
    try {
      const mod = await import(`simple-icons/icons/${name.toLowerCase()}`)
      const icon = mod.default || mod
      if (icon && icon.svg) {
        const slug = icon.slug || name.toLowerCase()
        save(slug, icon.svg)
        icons.push(slug)
      }
    } catch {
      // try named export from main entry
      try {
        const si = await import('simple-icons')
        const key = `si${name}`
        const icon = si[key]
        if (icon && icon.svg) {
          const slug = icon.slug || name.toLowerCase()
          save(slug, icon.svg)
          icons.push(slug)
        }
      } catch (e2) {
        console.log(`  ✗ ${name} not found in simple-icons package`)
      }
    }
  }

  console.log(`\n📡 Stage 2: Fetching from simple-icons CDN (trademark-restricted icons)...`)
  const cdnSlugs = ['slack', 'microsoftteams', 'microsoftoutlook', 'microsoft']

  for (const slug of cdnSlugs) {
    const url = `https://cdn.simpleicons.org/${slug}`
    try {
      const res = await fetch(url)
      if (res.ok) {
        const svg = await res.text()
        save(slug, svg)
        icons.push(slug)
      } else {
        console.log(`  ✗ ${slug} returned ${res.status}`)
      }
    } catch (err) {
      console.log(`  ✗ ${slug} fetch failed: ${err.message}`)
    }
  }

  console.log(`\n✅ Downloaded ${icons.length} icons to public/icons/`)
  console.log(`Missing (use hand-drawn inline SVGs): UBS, BlackRock, Julius Baer, LGT, Granola\n`)
}

main().catch(console.error)
