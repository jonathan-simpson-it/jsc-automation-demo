import { siteConfig } from '@/config/siteConfig'

export async function GET() {
  return new Response(siteConfig.pricingMd, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
