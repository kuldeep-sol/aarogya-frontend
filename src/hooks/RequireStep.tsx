import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useApp } from '../hooks/AppContext'
import type { WorkflowStep } from '../types'

const order: WorkflowStep[] = [
  'welcome',
  'consent',
  'details',
  'conversation',
  'verification',
  'documents',
  'summary',
  'doctor',
]

export function RequireStep({ step, children }: { step: WorkflowStep; children: ReactNode }) {
  const { session } = useApp()
  const need = order.indexOf(step)
  const have = order.indexOf(session.step)

  if (need >= order.indexOf('details') && !session.consent && session.step === 'welcome') {
    return <Navigate to="/consent" replace />
  }
  if (need >= order.indexOf('conversation') && !session.draft.name && have < order.indexOf('conversation')) {
    return <Navigate to="/patient-details" replace />
  }
  if (have < need - 1) {
    const target = session.step === 'welcome' ? '/' : `/${session.step === 'details' ? 'patient-details' : session.step}`
    if (session.step === 'welcome') return <Navigate to="/" replace />
    if (session.step === 'details') return <Navigate to="/patient-details" replace />
    return <Navigate to={target} replace />
  }
  return children
}
