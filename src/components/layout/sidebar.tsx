import { ReactNode } from 'react'

interface SidebarProps {
  children?: ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
  const menuItems = [
    { icon: '🏠', label: '首页', href: '/' },
    { icon: '📰', label: '时尚新闻', href: '/news' },
    { icon: '📊', label: '数据分析', href: '/analysis' },
    { icon: '🔬', label: '面料情报', href: '/fabric' },
    { icon: '🛍️', label: '款式推荐', href: '/recommend' },
    { icon: '📊', label: '竞品监控', href: '/competitor' },
  ]

  const personalItems = [
    { icon: '📜', label: '我的收藏', href: '/favorites' },
    { icon: '🔥', label: '我的追踪', href: '/tracking' },
    { icon: '📊', label: '使用统计', href: '/account?tab=stats' },
    { icon: '⚙️', label: '账号设置', href: '/account?tab=settings' },
    { icon: '👑', label: '套餐管理', href: '/account?tab=plan' },
  ]

  const adminItems = [
    { icon: '📊', label: '数据看板', href: '/admin/dashboard' },
    { icon: '👥', label: '用户管理', href: '/admin/users' },
    { icon: '💰', label: '订单管理', href: '/admin/orders' },
    { icon: '⚙️', label: '系统设置', href: '/admin/settings' },
  ]

  return (
    <aside className="w-64 bg-primary-light border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            Q
          </div>
          <div>
            <div className="font-bold text-lg text-primary">QuisAI</div>
            <div className="text-xs text-gray-500">服装电商数据分析平台</div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <div className="text-xs text-gray-500 mb-2 font-medium">📚 核心模块</div>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span>{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <div className="text-xs text-gray-500 mb-2 font-medium">⭐ 个人中心</div>
          <ul className="space-y-1">
            {personalItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span>{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-2 font-medium">🔧 管理后台（仅管理员）</div>
          <ul className="space-y-1">
            {adminItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span>{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}