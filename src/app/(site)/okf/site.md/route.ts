import { mdResponse, buildOkfSiteMd } from '@/lib/ai-md'

export async function GET() {
  return mdResponse(buildOkfSiteMd())
}
