import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { PatientQueue } from '../components/PatientQueue'
import { DEMO_PATIENTS, PRIMARY_PATIENT_ID } from '../data/demoData'
import { useApp } from '../hooks/AppContext'
import { getPatients } from '../services/patientService'
import type { Patient } from '../types'

export function DoctorDashboardPage() {
  const { tr, session } = useApp()
  const [params] = useSearchParams()
  const view = params.get('view') ?? 'dashboard'
  const [query, setQuery] = useState('')
  const [patients, setPatients] = useState<Patient[]>(DEMO_PATIENTS)

  useEffect(() => {
    void getPatients().then(setPatients)
  }, [])

  const merged = useMemo(() => {
    return patients.map((p) => {
      if (p.id !== PRIMARY_PATIENT_ID || !session.history) return p
      return {
        ...p,
        name: session.draft.name || p.name,
        age: Number(session.draft.age) || p.age,
        gender: session.draft.gender || p.gender,
        phone: session.draft.phone || p.phone,
        abhaId: session.draft.abhaId || p.abhaId,
        chiefComplaint: session.history.chiefComplaint,
        duration: session.history.duration,
        attention: session.history.attention.level,
        attentionNote: session.history.attention.message,
        history: session.history,
        documents: session.documents.length ? session.documents : p.documents,
        timeline: session.timeline.length ? session.timeline : p.timeline,
      }
    })
  }, [patients, session])

  if (view === 'settings') {
    return <Card>{tr('settingsBody')}</Card>
  }
  if (view === 'history') {
    return <Card>{tr('historyBody')}</Card>
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-navy">{tr('queue')}</h2>
      <PatientQueue patients={merged} query={query} onQuery={setQuery} />
    </div>
  )
}
