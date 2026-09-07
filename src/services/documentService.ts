import { DEMO_PATIENTS, PRIMARY_PATIENT_ID } from '../data/demoData'
import type { DocumentKind, DocumentRecord, TimelineEvent } from '../types'
import { wait } from './api'

const templates: Record<DocumentKind, DocumentRecord> = {
  prescription: DEMO_PATIENTS[0].documents[0],
  lab: DEMO_PATIENTS[0].documents[1],
  discharge: DEMO_PATIENTS[0].documents[2],
  upload: {
    id: 'doc-up-1',
    kind: 'upload',
    title: 'Uploaded document',
    date: '06 Sep 2026',
    preview: 'Scanned page — demo extraction',
    extracted: {
      Type: 'Clinical note',
      Note: 'Previous OPD visit recorded',
    },
  },
}

// Replace with POST /api/documents
export async function uploadDocument(kind: DocumentKind): Promise<DocumentRecord> {
  await wait(400)
  return { ...templates[kind], id: `${kind}-${Date.now()}` }
}

// Replace with POST /api/documents/ocr  (mockExtractDocument)
export async function extractDocumentData(kind: DocumentKind): Promise<DocumentRecord> {
  await wait(900)
  return uploadDocument(kind)
}

export function timelineFrom(docs: DocumentRecord[], complaint: string): TimelineEvent[] {
  const fromDocs = docs.map((d, i) => ({
    id: `tl-${d.id}-${i}`,
    date: d.date,
    title: d.title,
    subtitle: Object.values(d.extracted)[0] ?? d.preview,
    kind: d.kind,
  }))
  return [
    ...fromDocs,
    {
      id: 'tl-now',
      date: '06 Sep 2026',
      title: 'Current complaint',
      subtitle: complaint || DEMO_PATIENTS.find((p) => p.id === PRIMARY_PATIENT_ID)?.chiefComplaint || '',
      kind: 'complaint',
    },
  ]
}
