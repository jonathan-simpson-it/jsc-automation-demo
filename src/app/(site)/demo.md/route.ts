import { mdResponse, buildDemoMd } from '@/lib/ai-md'

export async function GET() {
  return mdResponse(buildDemoMd())
}
