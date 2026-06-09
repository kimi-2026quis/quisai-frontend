'use client'

import { useState } from 'react'

export default function RecommendPage() {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (category: string) => {
    if (!category.trim()) return

    setLoading(true)
    try {
      const response = await fetch(
        `/api/recommend/search?category=${encodeURIComponent(category)}&minPrice=100&maxPrice=200&season=夏季`
      )
      const result = await response.json()
      if (result.success) {
        setRecommendations(result.data)
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        🛍️ 款式推荐
      </h1>

      <div className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="输入品类..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch((e.target as HTMLInputElement).value)
            }
          }}
        />
        <button
          onClick={() => {
            const input = document.querySelector('input') as HTMLInputElement
            handleSearch(input.value)
          }}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light"
        >
          搜索
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((item) => (
            <div key={item.id} className="shadow-card p-4">
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-3">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🖼️</div>
                  <div className="text-sm">商品图片</div>
                </div>
              </div>
              <h3 className="font-medium mb-2">{item.title}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">📦 销量</span>
                  <span>{item.salesVolume?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">💰 价格</span>
                  <span>¥{item.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">🔥 热度</span>
                  <span>{item.hotScore}/100</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && recommendations.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          输入品类获取推荐
        </div>
      )}
    </div>
  )
}