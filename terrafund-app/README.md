# 🌳 TerraFund Eco App

**Plant Real Trees Through Community-Powered Ad Revenue**

TerraFund (PlantWithAds.com) is a revolutionary web application where users watch ads to generate real revenue that goes directly into a shared community fund. When the fund reaches its goal, we plant a real tree through verified organizations. It's transparent, sustainable, and makes environmental impact accessible to everyone.

Now available as a **Progressive Web App (PWA)** - install it on your phone just like a native app!

---

## 🌍 The Concept

### How It Works
1. **Watch Ads** → Users watch advertisements
2. **Generate Revenue** → Each ad creates real ad revenue  
3. **Community Fund** → All revenue goes to a shared global tree fund
4. **Plant Trees** → When fund reaches $0.50-$1.00, we purchase a real tree
5. **Repeat** → New tree fund starts immediately

### Why It's Different
- ✅ **100% Transparent** - See exact costs and sources
- ✅ **Real Money** - Actual ad revenue, not virtual points
- ✅ **Community Powered** - Everyone contributes together
- ✅ **Verified Partners** - One Tree Planted, Team Trees, Eden Reforestation
- ✅ **Instant Impact** - Every ad matters immediately

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/terrafund-app.git
cd terrafund-app

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Tech Stack

- **Framework**: Next.js 16.0.5 (with Turbopack)
- **Language**: TypeScript 5
- **UI**: React 19.2.0
- **Styling**: Vanilla CSS + CSS Modules
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Storage**: localStorage (MVP) → Firebase (production)

---

## 🏗️ Project Structure

```
terrafund-app/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Landing page
│   │   ├── dashboard/         # Dashboard page
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── features/          # Feature components
│   │   │   ├── GlobalTreeFund.tsx
│   │   │   └── UserStats.tsx
│   │   ├── layout/            # Layout components
│   │   └── ui/                # Reusable UI components
│   ├── context/
│   │   └── GameContext.tsx    # Global state management
│   ├── features/
│   │   ├── ads/              # Ad simulation & integration
│   │   └── impact/           # Impact tracking
│   ├── lib/                   # Utility functions
│   └── styles/                # Global styles
├── public/                    # Static assets
└── package.json
```

---

## 🎯 Features

### MVP (Current)
- ✅ Community tree fund with real-time progress
- ✅ Ad simulation (3-second timer)
- ✅ User contribution tracking
- ✅ Tree planting celebrations
- ✅ Dynamic pricing from 4+ sources
- ✅ Price transparency modal
- ✅ Particle effects & animations
- ✅ Achievement badges
- ✅ State persistence (localStorage)

### Coming Soon
- 🔄 Real ad integration (Google AdSense)
- 🔄 Firebase database & authentication
- 🔄 Real tree purchasing automation
- 🔄 Planting certificates & receipts
- 🔄 Multi-user real-time sync
- 🔄 Social sharing
- 🔄 Leaderboards

---

## 📊 Current Stats

### Tree Pricing
- **Average Cost**: $0.50 - $1.00 per tree
- **Sources**: 
  - One Tree Planted: $1.00/tree
  - Team Trees: $1.00/tree  
  - Eden Reforestation: $0.10/tree
  - Trees for the Future: $0.10/tree

### Revenue Model (Projected)
- **Ad CPM**: ~$2 (industry average)
- **Per Ad Revenue**: ~$0.002
- **Ads per Tree**: ~250-500 ads
- **With 100 Users** (10 ads/day each): ~2-4 trees per day!

---

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

### Environment Variables

Create `.env.local` for development:
```env
NEXT_PUBLIC_APP_ENV=development
```

For production, see `.env.production` file.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Deploy!

**Full deployment guide**: See `deployment_guide.md`

### Deploy to Netlify

1. Create `netlify.toml`
2. Connect to GitHub
3. Deploy

---

## 🌱 Tree Planting Partners

We work with verified organizations:

- **[One Tree Planted](https://onetreeplanted.org)** - Global reforestation  
- **[Team Trees](https://teamtrees.org)** - Arbor Day Foundation partnership
- **[Eden Reforestation](https://edenprojects.org)** - Mangrove & forest restoration
- **[Trees for the Future](https://trees.org)** - Agroforestry projects

---

## 📈 Roadmap

### Phase 1: POC ✅ (Complete)
- Core UI/UX
- Landing page
- Dashboard layout
- Basic functionality

### Phase 2: Enhancements ✅ (Complete)  
- Framer Motion animations
- Real-time pricing API
- Price transparency
- Achievement system

### Phase 3: MVP ✅ (Complete)
- Community pooling model
- Global tree fund
- User stats tracking
- Updated landing page

### Phase 4: Production (In Progress)
- [ ] Real ad integration
- [ ] Firebase database
- [ ] User authentication
- [ ] Automated tree purchasing

### Phase 5: Scale
- [ ] Mobile app
- [ ] Social features
- [ ] Impact visualization
- [ ] Carbon offset tracking

---

## 🤝 Contributing

Contributions are welcome! This is an open project aimed at making real environmental impact.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🌟 Support

Love the idea? Here's how you can help:

- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest features
- 🌳 Spread the word!

---

## 📧 Contact

For questions or partnerships: [your-email@example.com]

---

**Together, we're making the world greener, one ad at a time.** 🌍💚

---

## 📸 Screenshots

### Landing Page
![Homepage](docs/screenshots/homepage.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Global Tree Fund
![Tree Fund](docs/screenshots/tree-fund.png)

---

Made with 💚 for the Planet
