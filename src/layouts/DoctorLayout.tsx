import { Link, Outlet, useSearchParams } from 'react-router-dom'
import { ClipboardList, LayoutDashboard, Settings, Users } from 'lucide-react'
import { AccessibilityPanel } from '../components/AccessibilityPanel'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { useApp } from '../hooks/AppContext'
import { cx } from '../utils/cx'

const items = [
  { to: '/doctor', view: 'dashboard', icon: LayoutDashboard, key: 'dashboard' as const },
  { to: '/doctor?view=patients', view: 'patients', icon: Users, key: 'patients' as const },
  { to: '/doctor?view=history', view: 'history', icon: ClipboardList, key: 'history' as const },
  { to: '/doctor?view=settings', view: 'settings', icon: Settings, key: 'settings' as const },
]

export function DoctorSidebar() {
  const { tr } = useApp()
  const [params] = useSearchParams()
  const view = params.get('view') ?? 'dashboard'
  return (
    <aside className="flex w-full flex-col border-b border-line bg-white md:min-h-svh md:w-64 md:border-r md:border-b-0">
      <div className="flex items-center gap-2 px-5 py-4 font-bold text-primary">
        <img src="/assets/logo.svg" alt="" className="h-8 w-8" />
        AAROGYA
      </div>
      <nav className="flex gap-1 overflow-x-auto px-2 pb-2 md:flex-col md:overflow-visible md:px-3">
        {items.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            className={cx(
              'flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium',
              view === item.view ? 'bg-primary-light text-primary-dark' : 'text-navy hover:bg-slate-50',
            )}
          >
            <item.icon size={18} />
            {tr(item.key)}
          </Link>
        ))}
      </nav>
      <div className="mt-auto hidden border-t border-line p-4 md:block">
        <p className="font-semibold">{tr('doctorProfile')}</p>
        <p className="text-sm text-muted">{tr('doctorRole')}</p>
      </div>
    </aside>
  )
}

export function DoctorLayout() {
  const { tr } = useApp()
  return (
    <div className="flex min-h-svh flex-col bg-slate-100 md:flex-row">
      <DoctorSidebar />
      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-4 py-3">
          <div>
            <p className="text-sm text-muted">{tr('doctor')}</p>
            <h1 className="text-lg font-semibold text-navy">Doctor Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <AccessibilityPanel />
            <div className="hidden rounded-full border border-line px-3 py-1 text-sm sm:block">
              <p className="font-semibold">{tr('doctorProfile')}</p>
              <p className="text-muted">{tr('doctorRole')}</p>
            </div>
          </div>
        </header>
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
