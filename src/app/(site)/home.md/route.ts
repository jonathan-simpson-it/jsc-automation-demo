import { mdResponse, buildHomeMd } from '@/lib/ai-md'

export async function GET() {
  return mdResponse(buildHomeMd())
}
