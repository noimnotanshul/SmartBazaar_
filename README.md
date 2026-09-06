# SmartBazaar 🛍️

**The Art of Smart Shopping**

A modern, feature-rich e-commerce platform built with Next.js, Supabase, and Tailwind CSS. SmartBazaar brings Indian shopping culture online with AI-powered bargaining, gamification, and community features.

## 🎯 Features

### Core E-Commerce
- 🛒 **Shopping Cart** - Add, remove, and manage products
- 💳 **Multiple Payment Methods** - UPI, Card, and Cash on Delivery
- 📦 **Order Management** - Track orders and delivery status
- 🔍 **Advanced Filtering** - Filter by price, rating, brand, category
- ⭐ **Product Reviews** - Rating and review system

### AI Bargaining 🤝
- 💬 **Bhaiya Ji Chatbot** - Interactive negotiation with personality
- 📊 **Smart Pricing** - Dynamic floor prices and offer evaluation
- 🎯 **Negotiation Logic** - Realistic bargaining experience in Hindi/English
- 💰 **Bargain History** - Track all your successful negotiations

### Gamification 🎮
- 💎 **SmartCoins Rewards System** - Earn coins through activities
- 🎯 **Daily Login Bonus** - 10 coins every day
- 🎲 **Spin the Wheel** - Win up to 100 coins
- 🎫 **Scratch Cards** - Instant rewards
- 📊 **Leaderboard** - Compete with other users

### Community Features 👥
- 👫 **Group Buying** - Bulk discounts with shared purchases
- 📢 **Price Alerts** - Get notified when prices drop
- 🔗 **Referral Program** - Earn coins by inviting friends
- 📱 **Live Shopping** - Interactive live streams with sellers
- 🎥 **Virtual Try-On** - See products on you using camera

### Seller Features 🏪
- 📊 **Seller Dashboard** - Manage listings and orders
- 📈 **Analytics** - Sales and performance metrics
- 🔄 **Inventory Management** - Track stock levels
- 💬 **Chat with Buyers** - Direct communication

### Admin Features 👨‍💼
- 📋 **Product Approval** - Moderate seller listings
- 👥 **User Management** - Manage users and roles
- 📊 **Platform Analytics** - Overall performance metrics
- 🚫 **Content Moderation** - Flag and remove inappropriate content

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Indian color palette
- **UI Components**: Custom shadcn-style components
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Icons**: Lucide React

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **Real-time**: Supabase Realtime
- **Storage**: Supabase Storage
- **API**: Supabase REST API

### Infrastructure
- **Hosting**: Vercel (recommended)
- **Payment**: Razorpay (UPI, Cards)
- **Email**: SMTP Configuration

## 📋 Project Structure

```
smartbazaar/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── auth/                    # Authentication pages
│   ├── products/                # Product browsing
│   ├── cart/                    # Shopping cart
│   ├── checkout/                # Checkout flow
│   ├── profile/                 # User profile
│   ├── seller/                  # Seller dashboard
│   ├── admin/                   # Admin panel
│   ├── live-shopping/           # Live streams
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── auth/                    # Authentication components
│   ├── products/                # Product components
│   ├── cart/                    # Cart components
│   ├── checkout/                # Checkout components
│   ├── bargaining/              # Bargaining chat
│   ├── group-buying/            # Group buying features
│   ├── gamification/            # Gamification widgets
│   ├── virtual-tryon/           # Try-on features
│   ├── live-shopping/           # Live shopping
│   ├── seller/                  # Seller components
│   ├── admin/                   # Admin components
│   ├── header.tsx               # Navigation header
│   └── footer.tsx               # Footer
├── lib/
│   ├── auth.ts                  # Authentication functions
│   ├── supabase.ts              # Supabase client
│   ├── store.ts                 # Zustand stores
│   ├── types.ts                 # TypeScript interfaces
│   ├── utils.ts                 # Utility functions
│   └── ai-bargaining.ts         # Bargaining logic
├── database/
│   └── schema.sql               # Supabase schema
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
├── postcss.config.js           # PostCSS config
└── package.json                # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Razorpay account (optional, for payments)
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/noimnotanshul/SmartBazaar.git
   cd SmartBazaar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase**
   - Create a new project on [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the SQL schema from `database/schema.sql` in Supabase SQL editor

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Color Palette
SmartBazaar uses the Indian flag colors as its primary palette:
- **Saffron**: #FF9933
- **India Blue**: #2874F0
- **India Green**: #388E3C

Modify `tailwind.config.ts` to change colors.

### Bargaining Logic
Customize the AI bargaining experience in `lib/ai-bargaining.ts`. Adjust:
- Negotiation thresholds
- Discount calculations
- Bhaiya Ji's responses

### Gamification
Modify game rules in `components/gamification/`:
- Coin rewards
- Daily login amounts
- Spin wheel prizes

## 📱 Features Demo

### Bargaining Flow
1. User selects a product
2. Clicks "Start Bargaining"
3. Bhaiya Ji opens chat with initial offer
4. User makes counter-offer
5. AI evaluates and responds
6. If agreed, discount is applied to cart

### Group Buying Flow
1. User initiates group buy with target count
2. Gets shareable link
3. Invites friends via link
4. When target reached, all get discount
5. Can checkout together

### Gamification Flow
1. User logs in daily → +10 coins
2. Completes purchases → +coins based on amount
3. Wins bargaining → +bonus coins
4. Scratch cards and spin wheel for random rewards
5. Referrals → +coins per successful invite

## 🔐 Security

- **Row Level Security (RLS)**: Database-level access control
- **Authentication**: Supabase Auth with OAuth support
- **Environment Variables**: Sensitive data in `.env.local`
- **HTTPS Only**: All external API calls use HTTPS
- **Data Validation**: Input validation on frontend and backend

## 📊 Database Schema

Key tables:
- **users**: User accounts and profiles
- **products**: Product listings
- **orders**: Customer orders
- **bargains**: Bargaining sessions
- **group_buys**: Group buying campaigns
- **coin_transactions**: Reward tracking
- **reviews**: Product reviews
- **addresses**: Delivery addresses

See `database/schema.sql` for complete schema with indexes and RLS policies.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Built with ❤️ for Indian e-commerce
- Inspired by Indian shopping culture and haggling traditions
- Thanks to Supabase, Next.js, and Tailwind CSS communities

## 📧 Support

For support, email support@smartbazaar.com or open an issue on GitHub.

 ## 🌟 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced AR try-on
- [ ] AI seller chatbot
- [ ] Blockchain-based loyalty
- [ ] Multi-language support
- [ ] Social commerce features
- [ ] Subscription plans
- [ ] B2B portal

---

**Made with ❤️ by Anshul Dabgar**

*"The Art of Smart Shopping" - Where bargaining meets technology* 🎯
