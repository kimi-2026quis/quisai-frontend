'use client'

import { useState } from 'react'

export default function CompetitorPage() {
  const [competitors, setCompetitors] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleMonitor = async (brand: string) => {
    if (!brand.trim()) return

    setLoading(true)
    try {
      const response = await fetch(
        `/api/competitor/monitor?brand=${encodeURIComponent(brand)}`
      )
      const result = await response.json()
      if (result.success) {
        setCompetitors([result.data])
      }
    } catch (error) {
      console.error('Monitor failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        📊 竞品监控
      </h1>

      <div className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="输入品牌名..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleMonitor((e.target as HTMLInputElement).value)
            }
          }}
        />
        <button
          onClick={() => {
            const input = document.querySelector('input') as HTMLInputElement
            handleMonitor(input.value)
          }}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light"
        >
          开始监控
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="shadow-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">品牌</th>
                <th className="px-4 py-3 text-left text-sm font-medium">价格</th>
                <th className="px-4 py-3 text-left text-sm font-medium">销量</th>
                <th className="px-4 py-3 text-left text-sm font-medium">上新</th>
                <th className="px-4 py-3 text-left text-sm font-medium">营销活动</th>
                <th className="px-4 py-3 text-left text-sm font-medium">价格趋势</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {competitors.map((comp) => (
                <tr key={comp.brand}>
                  <td className="px-4 py-3">{comp.brand}</td>
                  <td className="px-4 py-3">¥{comp.currentPrice}</td>
                  <td className="px-4 py-3">{comp.salesVolume?.toLocaleString()}</td>
                  <td className="px-4 py-3">{comp.recentNewArrivals}款</td>
                  <td className="px-4 py-3">{comp.marketingActivity}</td>
                  <td className="px-4 py-3">{comp.priceTrend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && competitors.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          输入品牌名开始监控
        </div>
      )}
    </div>
  )
}