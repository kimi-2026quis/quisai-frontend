import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get('keyword')
  const category = searchParams.get('category')

  if (!keyword) {
    return NextResponse.json({ error: 'Missing keyword' }, { status: 400 })
  }

  try {
    // 调用爬虫服务
    const { scraperService } = await import('@/lib/scraper-service')
    const newsItems = await scraperService.searchNews(keyword, category || undefined)

    return NextResponse.json({
      success: true,
      data: newsItems,
    })
  } catch (error) {
    console.error('Search news error:', error)
    return NextResponse.json(
      { error: 'Failed to search news', details: error },
      { status: 500 }
    )
  }
}