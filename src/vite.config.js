import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
```

---

## Step 4 — Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Sign Up"** → choose **"Continue with GitHub"** → authorize it
3. Click **"Add New Project"**
4. Find your **`spaceo`** repository → click **"Import"**
5. Vercel auto-detects Vite — settings will be:
   - Framework: **Vite**
   - Build Command: `vite build`
   - Output Directory: `dist`
6. Click **"Deploy"**
7. Wait ~1 minute ✅

---

## Result

Your site goes live at:
```
https://spaceo.vercel.app
```
or
```
https://spaceo-yourusername.vercel.app
