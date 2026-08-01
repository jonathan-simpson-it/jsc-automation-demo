import { mdResponse, buildBlogMd } from '@/lib/ai-md'

export async function GET() {
  return mdResponse(buildBlogMd())
}
