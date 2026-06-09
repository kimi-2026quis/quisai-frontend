import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const material = searchParams.get('material')
  const searchSources = searchParams.get('searchSources')?.split(',')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')

  if (!material) {
    return NextResponse.json({ error: 'Missing material' }, { status: 400 })
  }

  try {
    const { scraperService } = await import('@/lib/scraper-service')
    const fabrics = await scraperService.searchFabric(
      material,
      searchSources || ['1688'],
      minPrice ? parseFloat(minPrice) : undefined,
      maxPrice ? parseFloat(maxPrice) : undefined
    )

    return NextResponse.json({
      success: true,
      data: fabrics,
    })
  } catch (error) {
    console.error('Search fabric error:', error)
    return NextResponse.json(
      { error: 'Failed to search fabric', details: error },
      { status: 500 }
    )
  }
}
