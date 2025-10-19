import { NextResponse } from 'next/server'
import { parse } from 'node-html-parser'

/**
 * Server-side scraper for https://sedimark.eu/news/
 * Returns JSON array: [{ title, text, url }, ...]
 */
export async function GET () {
  try {
    const res = await fetch('https://sedimark.eu/news/')
    if (!res.ok) {
      throw new Error(`Upstream returned ${res.status}`)
    }
    const html = await res.text()
    const root = parse(html)

    const items = []
    const maxItems = 6

    // Helper to resolve hrefs
    const resolveUrl = (href) => {
      try {
        return new URL(href, 'https://sedimark.eu').toString()
      } catch (e) {
        return href || 'https://sedimark.eu/news/'
      }
    }

    // Get news items by scraping oxy-post divs
    const postEls = root.querySelectorAll('div.oxy-post')
    console.dir(postEls.length)
    if (postEls && postEls.length > 0) {
      for (const post of postEls.slice(0, maxItems)) {
        const titleEl = post.querySelector('.oxy-post-title')
        const title = titleEl ? (titleEl.text || '').trim() : ''
        console.dir(title)

        const contentEl = post.querySelector('.oxy-post-content')
        const text = contentEl ? (contentEl.text || '').trim().replace(/\s+/g, ' ') : ''

        const linkEl = post.querySelector('.oxy-read-more')
        const href = linkEl ? (linkEl.getAttribute('href') || '') : ''
        const url = resolveUrl(href)

        if (title) {
          items.push({ title, text, url })
        }
      }
    }

    // Ensures at least 1 item 
    if (items.length === 0) {
      items.push({
        title: 'Visit Sedimark News',
        text: 'See the latest updates at sedimark.eu/news/',
        url: 'https://sedimark.eu/news/'
      })
    }

    return NextResponse.json(items, { status: 200 })
  } catch (err) {
    console.error('Error in /api/news:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
