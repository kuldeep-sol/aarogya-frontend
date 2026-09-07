import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { useApp } from '../hooks/AppContext'

export function SuccessPage() {
  const { tr, session } = useApp()
  const name = session.draft.name || 'Rahul Sharma'
  return (
    <div className="flex min-h-svh items-center justify-center bg-page px-4">
      <Card className="w-full max-w-lg text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 className="mx-auto text-emerald-600" size={64} />
        </motion.div>
        <h1 className="mt-4 text-2xl font-bold text-navy">✓ {tr('saved')}</h1>
        <p className="mt-2 text-muted">{tr('savedSub')}</p>
        <dl className="mt-6 space-y-2 text-left">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{tr('patient')}</dt>
            <dd className="font-semibold">{name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{tr('status')}</dt>
            <dd className="font-semibold">{tr('verified')}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{tr('date')}</dt>
            <dd className="font-semibold">06 Sep 2026</dd>
          </div>
        </dl>
        <Link to="/doctor" className="mt-6 block">
          <Button className="w-full">{tr('backDash')}</Button>
        </Link>
      </Card>
    </div>
  )
}
