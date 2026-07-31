import { siteConfig } from '@/config/siteConfig'

export async function GET() {
  return new Response(siteConfig.llmsTxt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
