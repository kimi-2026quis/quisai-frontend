'use client'

import { useEffect, useState } from 'react'

interface TrendCard {
  id: string
  title: string
  growth: number
  confidence: number
}

interface NewsCard {
  id: string
  title: string
  summary: string
  heat: number
  time: string
  source: string
  image: string
}

interface StyleCard {
  id: string
  title: string
  image: string
  sales: number
  growth: number
  price: number
  hotScore: number
  competitivenessScore: number
}

export default function Home() {
  const [trends, setTrends] = useState<TrendCard[]>([])
  const [news, setNews] = useState<NewsCard[]>([])
  const [styles, setStyles] = useState<StyleCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 这里调用真实的 API 获取数据
    fetchTrends()
    fetchNews()
    fetchStyles()
  }, [])

  const fetchTrends = async () => {
    try {
      // 调用 API 获取趋势数据
      // const response = await fetch('/api/trends/hot')
      // const data = await response.json()
      // setTrends(data)

      // 临时数据
      setTrends([
        { id: '1', title: '泡泡袖元素', growth: 120, confidence: 85 },
        { id: '2', title: '法式风', growth: 80, confidence: 82 },
        { id: '3', title: '米白色系', growth: 45, confidence: 88 },
        { id: '4', title: '新中式', growth: 28, confidence: 75 },
      ])
    } catch (error) {
      console.error('Failed to fetch trends:', error)
    }
  }

  const fetchNews = async () => {
    try {
      // 调用 API 获取新闻数据
      // const response = await fetch('/api/news/latest?limit=2')
      // const data = await response.json()
      // setNews(data)

      // 临时数据
      setNews([
        {
          id: '1',
          title: 'ZARA 发布 2025 春夏新品系列',
          summary: '主打"可持续循环"，使用再生面料，环保时尚。核心元素：泡泡袖、收腰、法式风',
          heat: 90,
          time: '2小时前',
          source: 'VOGUE',
          image: '',
        },
        {
          id: '2',
          title: 'UNIQLO 与王逢春推出联名款',
          summary: '新中式元素受捧，结合传统与现代。设计亮点：新中式剪裁 + 现代简约配色',
          heat: 75,
          time: '5小时前',
          source: 'GQ',
          image: '',
        },
      ])
    } catch (error) {
      console.error('Failed to fetch news:', error)
    }
  }

  const fetchStyles = async () => {
    try {
      // 调用 API 获取推荐款式
      // const response = await fetch('/api/recommend/top?limit=3')
      // const data = await response.json()
      // setStyles(data)

      // 临时数据
      setStyles([
        {
          id: '1',
          title: '法式浪漫碎花连衣裙',
          image: '',
          sales: 28000,
          growth: 32,
          price: 168,
          hotScore: 98,
          competitivenessScore: 8.5,
        },
        {
          id: '2',
          title: '法式衬衫',
          image: '',
          sales: 23500,
          growth: 28,
          price: 128,
          hotScore: 85,
          competitivenessScore: 7.8,
        },
        {
          id: '3',
          title: '泡泡袖T恤',
          image: '',
          sales: 19200,
          growth: 35,
          price: 89,
          hotScore: 82,
          competitivenessScore: 7.5,
        },
      ])
    } catch (error) {
      console.error('Failed to fetch styles:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* 今日热点 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          🔥 今日热点实时刷新
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trends.map((trend) => (
            <div key={trend.id} className="shadow-card shadow-card-hover p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{trend.title}</span>
                <span className={`text-sm ${trend.growth > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                  {trend.growth > 0 ? '↗' : '↘'} {Math.abs(trend.growth)}%
                </span>
              </div>
              <div className="text-sm text-gray-500">
                置信度：{trend.confidence}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 时尚新闻 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          📰 时尚新闻
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.map((item) => (
            <div key={item.id} className="shadow-card shadow-card-hover p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{item.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>⭐ {item.heat}</span>
                  <span>🕐 {item.time}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{item.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">📂 {item.source}</span>
                <button className="text-sm text-primary hover:underline">
                  查看详情
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 趋势推荐 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          📊 趋势推荐
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {trends.map((trend) => (
            <div key={trend.id} className="shadow-card shadow-card-hover p-4">
              <div className="text-center mb-3">
                <div className="text-2xl font-bold">{trend.title}</div>
              </div>
              <div className="bg-gray-100 rounded-lg h-24 flex items-center justify-center mb-3">
                <div className="text-center">
                  <div className="text-sm font-medium">趋势图</div>
                  <div className={`text-lg font-bold ${trend.growth > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    {trend.growth > 0 ? '↗' : '↘'} {Math.abs(trend.growth)}%
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-2">
                置信度：{trend.confidence}%
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary-light transition-colors">
                  查看详情
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 款式推荐 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          🛍️ 款式推荐
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {styles.map((style) => (
            <div key={style.id} className="shadow-card shadow-card-hover p-4">
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-3">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🖼️</div>
                  <div className="text-sm">商品图片</div>
                </div>
              </div>
              <h3 className="font-medium mb-2">{style.title}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">📦 月销</span>
                  <span>{style.sales.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">💰 均价</span>
                  <span>¥{style.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">🔥 热度</span>
                  <span>{style.hotScore}/100</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 设计灵感与建议 */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center">
          💡 设计灵感与建议
        </h2>
        <div className="shadow-card p-4">
          <div className="mb-4">
            <h3 className="font-medium mb-2">🎨 本周设计思路预测</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 法式元素：泡泡袖继续热门，预计持续到 7 月</li>
              <li>• 色彩搭配：预计主推"米白 + 浅蓝"清新组合</li>
              <li>• 定价策略：建议 ¥168 左右价格带最为畅销</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">🎨 搭配建议</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 法式茶歇裙：配银色项链 + 草编包 + 米白凉鞋</li>
              <li>• 色彩搭配：主色米白（65%）+ 辅色浅蓝（25%）+ 点缀薄荷绿（10%）</li>
              <li>• 场景建议：约会/度假/日常休闲</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}