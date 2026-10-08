import { posts } from '../../lib/posts'

const escapeXML = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export const dynamic = 'force-static'

export function GET() {
  const origin = 'https://o1x3.com'
  const items = posts.map(post => `<item><title>${escapeXML(post.title)}</title><link>${origin}/writing/${post.slug}</link><guid isPermaLink="true">${origin}/writing/${post.slug}</guid><description>${escapeXML(post.description)}</description><category>${escapeXML(post.category)}</category><pubDate>${new Date(`${post.date}-01T00:00:00Z`).toUTCString()}</pubDate></item>`).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Karthik Vinayan · writing</title><link>${origin}/writing</link><description>Notes on agents, infrastructure, and developer tools. Current entries are design review samples.</description><language>en</language><atom:link href="${origin}/writing/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
