# QuickHire Frontend

Next.js frontend for the QuickHire job board. Built with Tailwind CSS and React Query.

## Features
- Landing page with hero search
- Job listings with search and filters
- Job details page
- Application form
- Admin dashboard for managing jobs
- Responsive UI based on the Figma design

## Tech Stack
- Next.js (App Router)
- Tailwind CSS
- React Query
- Axios

## Getting Started
1. Go to frontend folder
   ```bash
   cd frontend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create `.env.local` in `frontend/`
4. Run dev server
   ```bash
   npm run dev
   ```

The app will run on `http://localhost:3000`.

## Environment Variables
Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```
## Live url  
 https://quick-hire-job-web.vercel.app/

## Admin Credential 

id: 0001
password: admin1234


## Notes
- Auth token is stored in `localStorage` as `qh_access_token`.
- Some remote images require domain allowlist in `next.config.ts`.
