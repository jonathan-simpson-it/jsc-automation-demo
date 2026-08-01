import { mdResponse, buildOkfEngagementMd } from '@/lib/ai-md'

export async function GET() {
  return mdResponse(buildOkfEngagementMd())
}
