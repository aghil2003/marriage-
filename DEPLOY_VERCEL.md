# Deploy to Vercel

## Option 1: Vercel Dashboard (easy)
1. Push this project to GitHub.
2. Go to https://vercel.com/new
3. Import your repository.
4. Vercel auto-detects Next.js.
5. Click **Deploy**.

## Option 2: Vercel CLI
1. Install CLI:
   - `npm i -g vercel`
2. From project folder run:
   - `vercel`
3. For production deployment:
   - `vercel --prod`

## Notes
- Build command: `next build`
- Output is handled automatically by Vercel for Next.js apps.
