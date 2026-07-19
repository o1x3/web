import { PERSONAL_INFO } from '../../data'
import { fetchMergedContributions } from '../../lib/contributions'

export const dynamic = 'force-dynamic'

export async function GET() {
  const calendar = await fetchMergedContributions(PERSONAL_INFO.githubAccounts)
  if (!calendar) return new Response(null, { status: 503 })

  return Response.json(calendar, {
    headers: { 'cache-control': 'no-store' },
  })
}
