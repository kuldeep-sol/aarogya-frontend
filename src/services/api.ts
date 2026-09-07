/** Central place for future API base URLs. Do not hard-code URLs in components. */
export const api = {
  // Production examples (not called in this prototype):
  // clinicalSummary: 'POST /api/clinical-summary',
  // documentOcr: 'POST /api/documents/ocr',
  // conversation: 'POST /api/conversation',
  // patients: 'GET /api/patients',
  baseUrl: '',
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}
