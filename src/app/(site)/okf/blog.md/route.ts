import { mdResponse, buildOkfBlogMd } from '@/lib/ai-md'

export async function GET() {
  return mdResponse(buildOkfBlogMd())
}
