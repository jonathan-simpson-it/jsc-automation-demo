import { mdResponse, buildOkfIndexMd } from '@/lib/ai-md'

export async function GET() {
  return mdResponse(buildOkfIndexMd())
}
