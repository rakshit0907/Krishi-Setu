npm # 🚀 Quick Start Guide — Virasat se Vikas tak

Get up and running in 10 minutes!

## ⚡ Fast Setup (For Experienced Developers)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000
```

## 📋 Step-by-Step Setup (For Beginners)

### Prerequisites Check
- [ ] Node.js 18+ installed? Run: `node --version`
- [ ] Git installed? Run: `git --version`
- [ ] VS Code installed? (Recommended)

### Step 1: Get the Code (1 minute)

Navigate to the project folder in your terminal.

### Step 2: Install Packages (2 minutes)

```bash
npm install
```

Wait for all packages to download. This might take a few minutes.

### Step 3: Create Supabase Account (3 minutes)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (easiest)
4. Create new project:
   - Name: virasat-se-vikas
   - Password: (create strong password)
   - Region: Singapore (or closest to you)
5. Wait 2 minutes for project to initialize

### Step 4: Set Up Database (2 minutes)

1. In Supabase dashboard, click "SQL Editor"
2. Click "+ New query"
3. Open `supabase-schema.sql` from this project
4. Copy ALL the SQL code
5. Paste into Supabase SQL editor
6. Click "Run" (bottom right)
7. You should see "Success. No rows returned"

Verify: Go to "Table Editor" and you should see 3 tables:
- traditional_knowledge (7 rows)
- soil_samples (1 row)
- feedback (0 rows)

### Step 5: Get API Keys (1 minute)

1. In Supabase, go to Settings → API
2. Copy these 3 values:
   - **URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGci...` (long token)
   - **service_role**: `eyJhbGci...` (another long token)

### Step 6: Configure Environment (1 minute)

1. Copy the example file:
```bash
cp .env.example .env.local
```

2. Open `.env.local` in VS Code

3. Replace the placeholder values with your Supabase values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR-KEY...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR-KEY...
```

4. Save the file

### Step 7: Start the App! (30 seconds)

```bash
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000
- Local: http://localhost:3000
```

### Step 8: Test It Out

1. Open http://localhost:3000
2. Click "Get Advisory"
3. Select:
   - District: Lucknow
   - Crop: Wheat
4. Click "Get Advisory"
5. You should see traditional practices, scientific recommendations, and a blended plan!

## 🎉 You're Ready!

Explore the features:
- **Home**: Landing page with overview
- **Advisory**: Get farming recommendations
- **About**: Learn about the project
- **Dashboard**: See platform metrics
- **Admin**: Submit traditional knowledge

## 🔧 Troubleshooting

### "Module not found" error
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Supabase connection failed"
- Double-check your `.env.local` file
- Make sure there are no spaces around the `=` sign
- Verify keys are correct in Supabase dashboard

### "No data found" in Advisory
- Go to Supabase → Table Editor
- Check if `traditional_knowledge` has 7 rows
- If not, re-run the SQL schema

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
# Or use a different port
npm run dev -- -p 3001
```

## 📚 Next Steps

1. Read the full [README.md](README.md) for detailed documentation
2. Try submitting a traditional practice on the Admin page
3. Explore the codebase:
   - Pages: `app/` folder
   - API routes: `app/api/` folder
   - Components: `components/` folder
   - Logic: `lib/ruleEngine.ts`

## 🚀 Deploy to Vercel (Optional - 5 minutes)

1. Push code to GitHub
2. Go to https://vercel.com
3. Sign up with GitHub
4. Click "New Project"
5. Import your repository
6. Add environment variables (same as .env.local)
7. Click "Deploy"
8. Share your live URL!

## 🤔 Need Help?

- Check the full README.md
- Review the code comments
- Create an issue on GitHub
- Email: info@virasatsevikas.in

Happy farming! 🌾
