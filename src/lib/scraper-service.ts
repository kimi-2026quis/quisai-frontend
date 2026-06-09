// 爬虫服务抽象层 - 可替换架构
export interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  url: string
  publishTime: Date
  heat: number
  tags: string[]
  category: string
}

export interface ProductAnalysis {
  id: string
  keyword: string
  marketOverview: {
    salesVolume: number
    salesAmount: number
    avgPrice: number
    growthRate: number
    forecastGrowth: number
  }
  priceDistribution: Array<{
    range: string
    count: number
  }>
  elementTags: string[]
  skuAnalysis: {
    sizeDistribution: Record<string, string>
    colorDistribution: Record<string, string>
  }
  reviewInsight: {
    sentimentTrend: Record<string, number>
    topKeywordsPositive: string[]
    topKeywordsNegative: string[]
    complaintBreakdown: Record<string, number>
  }
  competitorComparison: Array<{
    brand: string
    priceRange: string
    salesRank: number
    priceStability: string
    innovationScore: number
  }>
  recommendations: Array<{
    title: string
    reason: string
  }>
  trendForecast: {
    trendElements: string[]
    colorTrend: string
    pricingStrategy: string
    forecastPeriod: string
    confidence: number
  }
}

export interface FabricItem {
  id: string
  material: string
  avgPrice: number
  priceChange: string
  trend: string
  suppliers: Array<{
    name: string
    location: string
    minOrder: string
  }>
  features: string[]
  suitable: string[]
}

export interface StyleRecommendation {
  id: string
  title: string
  image: string
  price: number
  salesVolume: number
  growthRate: number
  trend: string
  competitivenessScore: number
  hotScore: number
  popularElements: string[]
  stockStatus: string
  matchReason: string
  stylingAdvice: {
    colorMatches: string[]
    scenes: string[]
    accessories: string[]
  }
}

export interface CompetitorData {
  brand: string
  currentPrice: number
  salesVolume: number
  recentNewArrivals: number
  marketingActivity: string
  priceTrend: string
}

// 爬虫服务接口
export interface ScraperService {
  searchNews(keyword: string, category?: string): Promise<NewsItem[]>
  analyzeProduct(
    keyword: string,
    categoryLevel1: string,
    categoryLevel2: string,
    platforms: string[],
    timeRange: string
  ): Promise<ProductAnalysis>
  searchFabric(
    material: string,
    searchSources: string[],
    minPrice?: number,
    maxPrice?: number
  ): Promise<FabricItem[]>
  getStyleRecommendations(
    category: string,
    priceRange: { min: number; max: number },
    season: string
  ): Promise<StyleRecommendation[]>
  monitorCompetitor(
    brand: string,
    monitoredAspects: string[]
  ): Promise<CompetitorData>
}

// 默认爬虫实现（可替换）
export class DefaultScraperService implements ScraperService {
  private apiUrl: string

  constructor(apiUrl: string = 'https://api.coze.cn/v1/workflow/run') {
    this.apiUrl = apiUrl
  }

  async searchNews(keyword: string, category?: string): Promise<NewsItem[]> {
    // 调用 Coze 工作流获取新闻数据
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COZE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: process.env.COZE_APP_ID,
        user_id: 'default',
        query: `搜索新闻：${keyword} ${category ? `分类：${category}` : ''}`,
      }),
    })

    const data = await response.json()
    // 这里需要解析 Coze 返回的数据结构
    // 暂时返回空数组，后续根据实际 API 结构解析
    return []
  }

  async analyzeProduct(
    keyword: string,
    categoryLevel1: string,
    categoryLevel2: string,
    platforms: string[],
    timeRange: string
  ): Promise<ProductAnalysis> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COZE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: process.env.COZE_APP_ID,
        user_id: 'default',
        query: `分析产品：${keyword} ${categoryLevel1} ${categoryLevel2} 平台：${platforms.join(',')} 时间范围：${timeRange}`,
      }),
    })

    const data = await response.json()
    // 解析数据结构
    return this.parseProductAnalysis(data)
  }

  async searchFabric(
    material: string,
    searchSources: string[],
    minPrice?: number,
    maxPrice?: number
  ): Promise<FabricItem[]> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COZE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: process.env.COZE_APP_ID,
        user_id: 'default',
        query: `搜索面料：${material} 来源：${searchSources.join(',')} 价格范围：${minPrice || 0}-${maxPrice || '不限'}`,
      }),
    })

    const data = await response.json()
    return []
  }

  async getStyleRecommendations(
    category: string,
    priceRange: { min: number; max: number },
    season: string
  ): Promise<StyleRecommendation[]> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COZE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: process.env.COZE_APP_ID,
        user_id: 'default',
        query: `推荐款式：${category} 价格范围：${priceRange.min}-${priceRange.max} 季节：${season}`,
      }),
    })

    const data = await response.json()
    return []
  }

  async monitorCompetitor(
    brand: string,
    monitoredAspects: string[]
  ): Promise<CompetitorData> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COZE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: process.env.COZE_APP_ID,
        user_id: 'default',
        query: `监控竞品：${brand} 监控维度：${monitoredAspects.join(',')}`,
      }),
    })

    const data = await response.json()
    return {
      brand,
      currentPrice: 0,
      salesVolume: 0,
      recentNewArrivals: 0,
      marketingActivity: '',
      priceTrend: 'stable',
    }
  }

  private parseProductAnalysis(data: any): ProductAnalysis {
    // 根据 Coze 返回的实际数据结构解析
    // 这里需要后续根据实际 API 调整
    return {
      id: Date.now().toString(),
      keyword: '',
      marketOverview: {
        salesVolume: 0,
        salesAmount: 0,
        avgPrice: 0,
        growthRate: 0,
        forecastGrowth: 0,
      },
      priceDistribution: [],
      elementTags: [],
      skuAnalysis: {
        sizeDistribution: {},
        colorDistribution: {},
      },
      reviewInsight: {
        sentimentTrend: {},
        topKeywordsPositive: [],
        topKeywordsNegative: [],
        complaintBreakdown: {},
      },
      competitorComparison: [],
      recommendations: [],
      trendForecast: {
        trendElements: [],
        colorTrend: '',
        pricingStrategy: '',
        forecastPeriod: '',
        confidence: 0,
      },
    }
  }
}

// 导出单例
export const scraperService = new DefaultScraperService()

// 允许后续替换爬虫服务
export function setScraperService(service: ScraperService) {
  // 可以通过全局变量或依赖注入方式替换服务
  // 这里暂时不实现，保持简单
}