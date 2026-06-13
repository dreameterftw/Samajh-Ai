# Samajh AI

**Understand government documents in simple language.**

Samajh AI is a privacy-first, offline web app that helps Indian citizens understand complex government documents — bills, notices, legal letters, court summons, land records, and more — in plain language, with clear action steps and deadlines.

> _"Upload. Understand. Act. Stress less."_

---

## Features

- **AI-Powered Explanation** — Upload any government document and get a plain-language summary, key dates, amounts due, and what action to take next
- **On-Device Processing** — All OCR and AI inference runs entirely in your browser using [Tesseract.js](https://github.com/naptha/tesseract.js) and [WebLLM](https://github.com/mlc-ai/web-llm). Nothing leaves your device.
- **Works Offline** — After a one-time model download (~900MB), the app works completely without internet
- **Fraud Detection** — Automatically flags suspicious patterns like fake payment requests, unofficial contact methods, and vague threats
- **4+ Indian Languages** — Explanations in Hindi, Tamil, Telugu, and English with text-to-speech readout
- **Document History** — All analyzed documents stored locally in IndexedDB with search and risk filtering
- **Camera Scan** — Scan documents directly with your phone camera

---

## Supported Documents

| Document | Description |
|---|---|
| Electricity Bill | BESCOM, MSEB, and other state electricity boards |
| Water Bill | Municipal water supply and jal board notices |
| Legal Notice | Advocate letters and legal communications |
| Court Summons | Court appearance and case documents |
| Land Records | Khasra, khatauni, patta, and mutation records |
| Property Tax | Municipal and nagar palika tax notices |
| Bank Letters | Account notices, loan, and EMI documents |
| Govt Schemes | Yojana, subsidy, and beneficiary notices |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 + inline styles |
| Routing | React Router v7 |
| OCR | Tesseract.js v5 (CDN) |
| AI/LLM | WebLLM — Gemma 2 2B (on-device) |
| PDF Rendering | PDF.js (CDN) |
| Storage | IndexedDB via `idb` |
| Animations | Framer Motion |
| PWA | vite-plugin-pwa |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/dreameterftw/Samajh-Ai.git
cd Samajh-Ai

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Note:** Always test in **Chrome** — it has the best WebAssembly and WebLLM support. On first use, click "Download AI Model" to download the Gemma 2B model (~900MB). This is a one-time download and enables fully offline AI inference.

---

## Testing Checklist

After starting the dev server, go through this top to bottom:

- [ ] Landing page loads
- [ ] "Download AI model" prompt appears
- [ ] Click download — progress bar moves *(takes 5–10 min first time on WiFi)*
- [ ] Upload a photo of any document (even a printed bill works)
- [ ] OCR progress bar fills
- [ ] Result screen shows: what it is, amount, deadline, actions
- [ ] Switch language to English — re-scan same doc
- [ ] Audio button reads the result aloud
- [ ] History shows the saved scan
- [ ] Close browser → reopen → History still shows *(IndexedDB persisted)*
- [ ] Turn off WiFi → scan another doc → still works *(model cached)*

**Best documents to test with:**
- Print and photograph an electricity bill
- A bank statement PDF
- Any letter with a date and amount in it

---

## Build for Production

```bash
npm run build
```

This creates a `dist/` folder — your entire app as static files, deployable anywhere.

---

## Deploy Free on Cloudflare Pages

1. Push your code to a public GitHub repo
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect your GitHub repo
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Click **Deploy**

Every `git push` auto-deploys after this.

---

## How It Works

1. **Upload or Scan** — Drop a PDF/image or use your camera
2. **OCR** — Tesseract.js extracts text, with contrast enhancement for better accuracy
3. **Classify** — Regex-based classifier identifies the document type
4. **Analyze** — On-device Gemma 2B generates a structured JSON explanation
5. **Results** — Summary, key dates, action checklist, and risk alerts displayed instantly

---

## Privacy & Architecture

The core AI features — OCR via Tesseract.js and document explanation via Gemma 2 2B through WebLLM — run entirely inside the user's browser using WebAssembly. Cloudflare Pages is used only to serve static HTML/JS/CSS files, identical to any web host. No document data, no AI inference, and no user information ever reaches any server. The app works fully offline after the first model download.

- No server, no backend, no analytics
- Documents never leave your device
- OCR and LLM inference run locally via WebAssembly
- History stored only in your browser's IndexedDB
- Delete all data anytime from Settings

---

## Project Structure

```
src/
├── pages/
│   ├── Landing.jsx       # Landing page
│   └── AppPage.jsx       # Main app (upload → processing → results)
├── components/
│   ├── upload/           # FileUploader, CameraScanner, DocumentPreview
│   ├── results/          # SummaryCard, ActionChecklist, RiskAlerts, etc.
│   └── processing/       # Processing animation and step tracker
├── context/
│   └── DocumentContext.jsx  # Global state + processing pipeline
├── hooks/
│   ├── useLLM.js         # WebLLM integration
│   ├── useOCR.js         # Tesseract.js integration
│   ├── useSpeech.js      # Web Speech API
│   └── useHistory.js     # IndexedDB history
├── utils/
│   ├── docClassifier.js  # Document type detection
│   ├── redflags.js       # Fraud/scam pattern detection
│   ├── prompts.js        # LLM prompt builder
│   └── imagePreprocess.js # Contrast boost before OCR
└── data/
    ├── supportedDocs.js  # Document type metadata
    └── glossary.js       # Legal term definitions
```

---

## License

MIT — Built for India · OSDHack 2026
