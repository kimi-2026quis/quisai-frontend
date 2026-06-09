import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/layout/sidebar'
import Header from '@/components/layout/header'

export const metadata: Metadata = {
  title: 'QuisAI - 服装电商数据分析平台',
  description: '专业的服装电商数据分析平台，提供市场分析、趋势预测、款式推荐等服务',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Sidebar />
        <Header />
        <main className="ml-64 pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}