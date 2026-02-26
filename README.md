# 🌾 Virasat se Vikas tak — Smart Farming with Traditional Wisdom

**विरासत से विकास तक — पारंपरिक ज्ञान के साथ स्मार्ट खेती**

A Next.js web application that digitizes traditional farming knowledge and fuses it with soil health data to provide low-chemical, climate-resilient farming guidance.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Supabase Setup](#supabase-setup)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Expanding to Production](#expanding-to-production)
- [Contributing](#contributing)

---

## ✨ Features

### Core Features
- **Bilingual Support** — English and Hindi throughout the platform
- **Traditional Knowledge Repository** — Digitized ancestral farming practices
- **Scientific Soil Analysis** — Data-driven nutrient recommendations
- **Blended Advisory System** — Combines traditional and scientific approaches
- **Sustainability Scoring** — Measures environmental impact
- **Cost Efficiency Scoring** — Calculates economic viability
- **Hindi Audio Playback** — Text-to-speech for accessibility
- **User Feedback System** — Collects farmer responses

### Unique Features
- **Community Crowdsourcing** — Farmers and experts can submit traditional practices
- **Auto-Updating Knowledge Base** — Verified submissions automatically appear in advisories
- **Admin Verification Portal** — Review and approve community contributions
- **Dashboard Analytics** — Track platform metrics and sustainability insights

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS |
| **Backend** | Next.js API Routes |
| **Database** | Supabase (PostgreSQL) |
| **Charts** | Recharts |
| **Audio** | Web Speech API |
| **Deployment** | Vercel (recommended) |

---

## 📁 Project Structure

```
virasat-se-vikas/
├── app/
│   ├── api/
│   │   ├── advisory/
│   │   │   └── route.ts          # Advisory generation endpoint
│   │   ├── feedback/
│   │   │   └── route.ts          # User feedback endpoint
│   │   └── traditional/
│   │       └── route.ts          # Crowdsourcing endpoints (GET, POST, PUT)
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── advisory/
│   │   └── page.tsx              # Advisory page (main feature)
│   ├── admin/
│   │   └── page.tsx              # Admin & crowdsourcing page
│   ├── dashboard/
│   │   └── page.tsx              # Metrics dashboard
│   ├── layout.tsx                # Root layout with navigation
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/
│   ├── Navigation.tsx            # Header navigation
│   └── Footer.tsx                # Footer component
├── lib/
│   ├── db.ts                     # Supabase client
│   ├── ruleEngine.ts             # Advisory rule engine
│   └── translations.ts           # Bilingual dictionary
├── types/
│   └── advisory.ts               # TypeScript type definitions
├── public/                       # Static assets
├── supabase-schema.sql           # Database schema with seed data
├── .env.example                  # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** ([Download](https://git-scm.com/))
- **Supabase Account** (free tier available at [supabase.com](https://supabase.com))
- **VS Code** (recommended) with TypeScript extension

---

## 🚀 Local Development Setup

### Step 1: Clone or Create the Project

If you have the files, navigate to the project directory:

```bash
cd virasat-se-vikas
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

This will install all required packages including Next.js, React, Supabase client, Recharts, and Tailwind CSS.

### Step 3: Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Open `.env.local` and add your Supabase credentials (see [Supabase Setup](#supabase-setup) below)

---

## 🗄 Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **"New Project"**
3. Fill in:
   - **Project Name**: virasat-se-vikas
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to India (e.g., Singapore)
4. Click **"Create new project"** and wait for initialization

### Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (long JWT token starting with `eyJhbGciOi...`)
   - **service_role key** (another JWT token - keep this secret!)

3. Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste into the SQL editor
5. Click **"Run"**

This will create:
- `traditional_knowledge` table with 7 sample practices
- `soil_samples` table with Lucknow wheat data
- `feedback` table for user responses
- All necessary indexes

### Step 4: Verify Tables

Go to **Table Editor** in Supabase and confirm you see:
- `traditional_knowledge` (7 rows)
- `soil_samples` (1 row)
- `feedback` (0 rows - will populate as users give feedback)

---

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the landing page with navigation to all features.

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Option 1: Deploy from GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click **"New Project"**
4. Import your `virasat-se-vikas` repository
5. Configure environment variables:
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Add `SUPABASE_SERVICE_ROLE_KEY`
6. Click **"Deploy"**

#### Option 2: Deploy with Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts and add environment variables when asked.

### Deploy to Other Platforms

- **Netlify**: Similar to Vercel, supports Next.js
- **Railway**: Good for full-stack apps
- **DigitalOcean App Platform**: For more control

---

## 🎯 Testing the MVP

### Test Flow

1. **Home Page** → Click "Get Advisory"
2. **Advisory Page**:
   - Select: District = Lucknow, Crop = Wheat
   - Click "Get Advisory"
   - Review Traditional Wisdom, Scientific Recommendations, Blended Plan
   - Check Sustainability and Cost scores
   - Click 🔊 to hear Hindi audio
   - Provide feedback (👍 or 👎)
3. **Admin Page**:
   - Submit a new traditional practice
   - See it appear in "Pending Verifications"
   - Click "Verify" to approve it
   - Return to Advisory page and regenerate advisory to see it included
4. **Dashboard**: View metrics and charts

---

## 📈 Expanding to Production

### Priority Enhancements

#### 1. **Geographic Expansion**
- Add all districts of Uttar Pradesh
- Expand to other states (Punjab, Haryana, Maharashtra, etc.)
- Support for multiple crops per region (Rice, Sugarcane, Cotton, etc.)

#### 2. **Advanced Soil Analysis**
- Integrate with Soil Health Card API (if available)
- Add micronutrient analysis (Zinc, Iron, Sulfur)
- Support for soil texture and water retention data

#### 3. **Mobile App**
- React Native or Flutter mobile application
- Offline support for remote areas
- Camera integration for crop disease detection
- GPS-based location auto-detection

#### 4. **Authentication & User Profiles**
- Supabase Auth for farmer login
- Personal farm profiles (land size, crops, history)
- Saved advisories and notes
- Personalized recommendations based on history

#### 5. **Enhanced Rule Engine**
- Machine learning integration for better predictions
- Weather data integration (rainfall, temperature)
- Crop yield prediction models
- Pest and disease forecasting

#### 6. **Multilingual Expansion**
- Add support for regional languages:
  - Marathi, Tamil, Telugu, Kannada, Bengali
  - Punjabi, Gujarati, Malayalam, Odia
- Use i18next for comprehensive translation management

#### 7. **Real-Time Features**
- WebSocket for live updates
- Chat support with agricultural experts
- Community forum for farmers
- Live market price integration

#### 8. **E-Commerce Integration**
- Marketplace for organic inputs (compost, neem cake, etc.)
- Traditional seed varieties
- Farm equipment rental
- Direct farmer-to-consumer produce sales

#### 9. **Government Integration**
- PM-KISAN integration
- Kisan Credit Card linkage
- Subsidy scheme information
- Agricultural insurance recommendations

#### 10. **Advanced Analytics**
- Farmer behavior analytics
- Regional practice trends
- Success rate tracking
- Carbon footprint calculator

### Technical Improvements

#### Database
- Implement Row Level Security (RLS) in Supabase
- Add database migrations using Supabase CLI
- Create database backups and recovery plans
- Add full-text search for traditional practices

#### Performance
- Implement Redis caching for frequent queries
- Add CDN for static assets
- Optimize images with Next.js Image component
- Implement lazy loading for charts

#### Security
- Add rate limiting to API routes
- Implement CAPTCHA for form submissions
- Sanitize user inputs to prevent SQL injection
- Add Content Security Policy (CSP) headers

#### Testing
- Unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Playwright
- API tests with Postman/Insomnia

#### DevOps
- Set up CI/CD pipeline (GitHub Actions)
- Automated testing before deployment
- Staging environment for testing
- Monitoring with Sentry or LogRocket

---

## 📝 API Documentation

### POST /api/advisory

Get farming advisory for a district and crop.

**Request:**
```json
{
  "district": "Lucknow",
  "crop": "Wheat"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "traditional": [...],
    "scientific": [...],
    "blended_plan": [...],
    "sustainability_score": 78,
    "cost_score": 82,
    "explanation": "...",
    "soil_data": {...}
  }
}
```

### POST /api/feedback

Submit user feedback on advisory.

**Request:**
```json
{
  "advisory_id": "Lucknow-Wheat-1234567890",
  "helpful": true,
  "notes": "Very useful information"
}
```

### POST /api/traditional

Submit new traditional knowledge.

**Request:**
```json
{
  "district": "Lucknow",
  "crop": "Wheat",
  "practice": "Use of vermicompost",
  "benefit": "Improves soil structure",
  "season": "Rabi",
  "source": "Local farmers",
  "submitted_by": "John Doe"
}
```

### GET /api/traditional?verified=false

Get pending verifications (admin).

### PUT /api/traditional

Verify or reject a submission (admin).

**Request:**
```json
{
  "id": "uuid-here",
  "verified": true
}
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Traditional farming knowledge from agricultural communities across India
- Soil health data methodology from Indian Council of Agricultural Research (ICAR)
- UI/UX inspiration from government digital initiatives

---

## 📞 Support

For questions or support:
- Email: info@virasatsevikas.in
- GitHub Issues: [Create an issue](https://github.com/yourusername/virasat-se-vikas/issues)

---

## 🌟 Vision

Our vision is to create a nationwide platform that:
- Preserves India's rich agricultural heritage
- Reduces chemical dependency in farming
- Improves farmer incomes through cost savings
- Builds climate-resilient farming communities
- Bridges the gap between generations of farmers

**विरासत को संरक्षित करना, किसानों को सशक्त बनाना** 🌾
