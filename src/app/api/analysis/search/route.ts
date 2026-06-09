import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get('keyword')
  const categoryLevel1 = searchParams.get('categoryLevel1')
  const categoryLevel2 = searchParams.get('categoryLevel2')
  const platforms = searchParams.get('platforms')?.split(',')
  const timeRange = searchParams.get('timeRange') || '30'

  if (!keyword) {
    return NextResponse.json({ error: 'Missing keyword' }, { status: 400 })
  }

  try {
    const { scraperService } = await import('@/lib/scraper-service')
    const analysis = await scraperService.analyzeProduct(
      keyword,
      categoryLevel1 || '服装',
      categoryLevel2 || '',
      platforms || ['taobao', 'jd', 'pdd'],
      timeRange
    )

    return NextResponse.json({
      success: true,
      data: analysis,
    })
  } catch (error) {
    console.error('Analyze product error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze product', details: error },
      { status: 500 }
    )
  }
}
