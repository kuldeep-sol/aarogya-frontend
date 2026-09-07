# AAROGYA

**Technology for Better Health**

AAROGYA is a Smart India Hackathon frontend prototype. It listens to the patient, verifies the story, structures the history, and gives the doctor a clear clinical picture.

This repository is a **frontend-only demo**. AI, OCR, ABHA, hospitals, and databases are mocked so a jury can walk the full product story without a backend.

## Problem

OPD history-taking is slow, incomplete, and uneven — especially when patients are distressed, low-literacy, or more comfortable in Hindi. Doctors need a structured picture, not a raw chat.

## Solution

Patients speak, listen, or tap. AAROGYA asks focused follow-up questions, lets the patient verify, extracts demo information from documents, and builds a clinical summary for **doctor review**. The AI never diagnoses and never makes the final decision.

## Core workflow

Patient  
→ Voice / Touch  
→ AI questions (prototype)  
→ Verification  
→ Document OCR (mocked)  
→ Clinical summary  
→ Doctor dashboard  
→ Doctor review  
→ Confirmation

## Frontend architecture

- **React + TypeScript** — UI and types
- **Vite** — dev server and production build
- **Tailwind CSS** — layout and design tokens
- **React Router** — patient and doctor routes
- **Framer Motion** — subtle motion (respects Reduced Motion)
- **Lucide React** — icons

Patient UI is large, simple, and voice-first. Doctor UI is denser and summary-first.

## Folder structure

```
aarogya-frontend/
├── public/assets/          Brand mark
├── src/
│   ├── components/         Reusable UI
│   ├── pages/              One screen per route
│   ├── layouts/            Patient header and doctor shell
│   ├── services/           Mock APIs (swap for real HTTP later)
│   ├── data/               Demo patients and translations
│   ├── hooks/              App context and step guard
│   ├── types/              Shared TypeScript types
│   ├── utils/              localStorage helpers
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Running the project

```bash
cd aarogya-frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Prototype vs production

| Capability | In this prototype |
| --- | --- |
| Conversational AI | Scripted questions + mock delay |
| OCR | Simulated extraction from demo templates |
| Voice | Browser Web Speech API, with demo fallback text |
| ABHA | Scan fills a sample ID; not a real ABDM connection |
| Database | `localStorage` for preferences and session |
| Hospital / HIS | Not connected |
| Authentication | None (demo only) |
| FHIR / ABDM | Not implemented |

Do **not** treat extracted values or summaries as real clinical output.

## Future integration

Keep HTTP in `src/services/`. Components should not hard-code API URLs.

| Function | Intended production call |
| --- | --- |
| `generateClinicalSummary` | `POST /api/clinical-summary` |
| `extractDocumentData` | `POST /api/documents/ocr` |
| `submitConversation` | `POST /api/conversation` |
| `getPatients` / `getPatient` | `GET /api/patients` |
| `confirmClinicalHistory` | `POST /api/clinical-history/confirm` |

See comments in `src/services/api.ts`.

## Demo workflow (SIH jury, ~3–5 minutes)

1. Open `/` — Start Health History.
2. Switch **EN | हिंदी**. Open Accessibility (font size, contrast, reduced motion).
3. Consent — I Understand & Agree.
4. Enter patient details (or Scan ABHA for the mock ID). Continue.
5. Answer questions with **Tap**, **Speak**, or type. Choose chest pain and breathing difficulty to see an attention flag.
6. Verify — Yes, Correct (or Edit / Tell Again).
7. Scan a prescription or lab report. Watch mock OCR and the timeline.
8. Read the clinical summary disclaimer. Submit to Doctor.
9. Doctor queue — open Rahul Sharma.
10. Review details, documents, timeline.
11. Review Clinical History — edit if needed, Confirm & Save.
12. Success screen — Back to Dashboard.

Direct URL `/conversation` without details redirects to the correct earlier step.

## Accessibility

- Hindi and English UI copy for the patient journey
- Font size A- / A / A+
- High contrast
- Reduced motion
- Read aloud (conversation prompts when enabled; speaker buttons elsewhere)
- Voice input (real recognition or demo phrase)
- Keyboard focus styles and large tap targets
- Preferences stored in `localStorage`

## Medical safety

AAROGYA generates **structured information for doctor review**. It is not a doctor, not a diagnosis engine, and not an autonomous clinical decision maker. Attention flags are prompts for the clinician. Final decisions belong to the doctor.
