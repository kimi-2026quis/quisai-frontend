'use client'

import { useEffect, useState } from 'react'
import { Search, Star, TrendingUp } from 'lucide-react'

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/news/search?keyword=${encodeURIComponent(keyword)}`)
      const result = await response.json()
      if (result.success) {
        setNews(result.data)
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
        📰 时尚新闻
      </h1>

      <div className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="搜索新闻关键词..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
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
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>搜索</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.map((item) => (
            <div key={item.id} className="shadow-card shadow-card-hover p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{item.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Star className="w-4 h-4" />
                  <span>{item.heat}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{item.summary}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>📂 {item.source}</span>
                <span>🕐 {item.publishTime}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && news.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          输入关键词搜索新闻
        </div>
      )}
    </div>
  )
}