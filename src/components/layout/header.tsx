'use client'

import { useState } from 'react'
import { Search, Star, User } from 'lucide-react'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        {/* 搜索框 */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索款式、品牌、面料、新闻..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 pl-10 pr-4 bg-secondary-light rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* 右侧操作区 */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors">
            <Star className="w-4 h-4" />
            <span>收藏</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors">
            <User className="w-4 h-4" />
            <span>用户</span>
          </button>
        </div>
      </div>
    </header>
  )
}