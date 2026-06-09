import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const season = searchParams.get('season')

  try {
    const { scraperService } = await import('@/lib/scraper-service')
    const recommendations = await scraperService.getStyleRecommendations(
      category || '连衣裙',
      {
        min: minPrice ? parseFloat(minPrice) : 0,
        max: maxPrice ? parseFloat(maxPrice) : 1000,
      },
      season || '夏季'
    )

    return NextResponse.json({
      success: true,
      data: recommendations,
    })
  } catch (error) {
    console.error('Get recommendations error:', error)
    return NextResponse.json(
      { error: 'Failed to get recommendations', details: error },
      { status: 500 }
    )
  }
}
