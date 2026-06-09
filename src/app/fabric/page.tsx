'use client'

import { useState } from 'react'

export default function FabricPage() {
  const [fabrics, setFabrics] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (material: string) => {
    if (!material.trim()) return

    setLoading(true)
    try {
      const response = await fetch(
        `/api/fabric/search?material=${encodeURIComponent(material)}&searchSources=1688`
      )
      const result = await response.json()
      if (result.success) {
        setFabrics(result.data)
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
        🔬 面料情报
      </h1>

      <div className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="搜索面料..."
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
          {fabrics.map((fabric) => (
            <div key={fabric.id} className="shadow-card p-4">
              <h3 className="font-medium mb-2">{fabric.material}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">价格</span>
                  <span>¥{fabric.avgPrice}/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">变动</span>
                  <span>{fabric.priceChange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">趋势</span>
                  <span>{fabric.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && fabrics.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          输入面料关键词搜索
        </div>
      )}
    </div>
  )
}