import { motion } from 'framer-motion'
import { Hand, Mic, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AccessibilityPanel } from '../components/AccessibilityPanel'
import { AudioButton } from '../components/AudioButton'
import { Button } from '../components/Button'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { useApp } from '../hooks/AppContext'

export function WelcomePage() {
  const navigate = useNavigate()
  const { tr, setSession } = useApp()

  function go(path: string) {
    setSession({ step: 'consent' })
    navigate(path)
  }

  return (
    <div className="relative min-h-svh overflow-hidden bg-page">
      <FloatingShapes />
      <header className="relative z-10 flex items-center justify-end gap-2 px-4 py-4">
        <LanguageSwitcher />
        <AudioButton text={`${tr('brand')}. ${tr('tagline')}. ${tr('statement')}`} />
        <AccessibilityPanel />
      </header>
      <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <motion.img
          src="/assets/logo.svg"
          alt=""
          className="mb-4 h-16 w-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.h1
          className="text-4xl font-bold tracking-tight text-primary sm:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {tr('brand')}
        </motion.h1>
        <p className="mt-2 text-lg text-primary-dark">{tr('tagline')}</p>
        <p className="mt-4 max-w-xl text-muted">{tr('statement')}</p>
        <p className="mt-2 max-w-xl text-sm text-muted">{tr('core')}</p>
        <motion.div className="mt-8 flex w-full max-w-md flex-col gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Button className="w-full py-4 text-lg" onClick={() => go('/consent')}>
            <Sparkles size={18} /> {tr('start')}
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => go('/consent')}>
              <Mic size={18} /> {tr('speak')}
            </Button>
            <Button variant="outline" onClick={() => go('/consent')}>
              <Hand size={18} /> {tr('tapAnswer')}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function FloatingShapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-16 left-8 h-24 w-24 rounded-full bg-teal-200/40 blur-2xl" />
      <div className="absolute right-10 bottom-24 h-32 w-32 rounded-full bg-sky-200/50 blur-2xl" />
      <div className="absolute top-1/3 right-1/4 h-16 w-16 rotate-12 rounded-2xl border-4 border-teal-300/40" />
    </div>
  )
}
