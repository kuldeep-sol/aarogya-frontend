import { DEMO_PATIENTS } from '../data/demoData'
import type { Patient } from '../types'
import { wait } from './api'

// Replace with GET /api/patients
export async function getPatients(): Promise<Patient[]> {
  await wait(220)
  return DEMO_PATIENTS
}

// Replace with GET /api/patients/:id
export async function getPatient(id: string): Promise<Patient | undefined> {
  await wait(180)
  return DEMO_PATIENTS.find((p) => p.id === id)
}
