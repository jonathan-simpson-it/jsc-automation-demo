import { mdResponse, buildOkfPricingMd } from '@/lib/ai-md'

export async function GET() {
  return mdResponse(buildOkfPricingMd())
}
