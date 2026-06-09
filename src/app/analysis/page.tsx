'use client'

import { useState } from 'react'

export default function AnalysisPage() {
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleAnalyze = async (keyword: string) => {
    if (!keyword.trim()) return

    setLoading(true)
    try {
      const response = await fetch(
        `/api/analysis/search?keyword=${encodeURIComponent(keyword)}&categoryLevel1=服装&categoryLevel2=连衣裙&platforms=taobao,jd,pdd&timeRange=30`
      )
      const result = await response.json()
      if (result.success) {
        setAnalysis(result.data)
      }
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        📊 单品数据分析
      </h1>

      <div className="mb-6 p-4 shadow-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="px-3 py-2 rounded-lg border border-gray-200">
            <option>服装</option>
            <option>鞋靴</option>
            <option>配饰</option>
          </select>
          <select className="px-3 py-2 rounded-lg border border-gray-200">
            <option>连衣裙</option>
            <option>T恤</option>
            <option>外套</option>
          </select>
          <input
            type="text"
            placeholder="输入关键词..."
            className="px-3 py-2 rounded-lg border border-gray-200"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAnalyze((e.target as HTMLInputElement).value)
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector('input') as HTMLInputElement
              handleAnalyze(input.value)
            }}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
          >
            开始分析
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : analysis ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="shadow-card p-4 text-center">
              <div className="text-2xl font-bold">{analysis.marketOverview?.salesVolume || 0}</div>
              <div className="text-sm text-gray-500">近30天销量</div>
            </div>
            <div className="shadow-card p-4 text-center">
              <div className="text-2xl font-bold">¥{analysis.marketOverview?.salesAmount || 0}</div>
              <div className="text-sm text-gray-500">销售额</div>
            </div>
            <div className="shadow-card p-4 text-center">
              <div className="text-2xl font-bold">¥{analysis.marketOverview?.avgPrice || 0}</div>
              <div className="text-sm text-gray-500">均价</div>
            </div>
            <div className="shadow-card p-4 text-center">
              <div className="text-2xl font-bold text-accent-green">+{analysis.marketOverview?.growthRate || 0}%</div>
              <div className="text-sm text-gray-500">环比</div>
            </div>
          </div>

          <div className="shadow-card p-4">
            <h3 className="font-bold mb-4">元素词云</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.elementTags?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="shadow-card p-4">
            <h3 className="font-bold mb-4">趋势预测</h3>
            <div className="space-y-2 text-sm">
              <p>• 流行元素：{analysis.trendForecast?.trendElements?.join('、')}</p>
              <p>• 色彩趋势：{analysis.trendForecast?.colorTrend}</p>
              <p>• 定价策略：{analysis.trendForecast?.pricingStrategy}</p>
              <p>• 置信度：{analysis.trendForecast?.confidence}%</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          输入关键词开始分析
        </div>
      )}
    </div>
  )
}