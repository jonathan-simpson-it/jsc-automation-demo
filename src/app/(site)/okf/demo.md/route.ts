import { mdResponse, buildOkfDemoMd } from '@/lib/ai-md'

export async function GET() {
  return mdResponse(buildOkfDemoMd())
}
