# 🌾 AgriConnect Nepal

A modern, full-stack e-commerce platform connecting farmers and customers in Nepal. Built with Next.js 14, TypeScript, and Tailwind CSS, featuring a comprehensive themed loading system for enhanced user experience.

![AgriConnect Nepal](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.0-black?style=for-the-badge&logo=next.js)

## ✨ Features

### 🎨 **Themed Loading System**
- **Customer Portal**: Blue-themed loading states for shopping experience
- **Farmer Portal**: Green-themed loading states for farm management
- **Landing Page**: Mixed green/blue theme for brand consistency
- **Responsive Design**: Optimized loading states for all screen sizes

### 👥 **Dual User Portals**

#### **Customer Portal** (`/customer/*`)
- 🛒 **Shopping Cart**: Add/remove products with real-time updates
- ❤️ **Favorites**: Save and manage favorite products
- 📦 **Product Browsing**: Filter, search, and view product details
- 👤 **Profile Management**: Personal information and order history
- ⚙️ **Settings**: Account preferences and notifications

#### **Farmer Portal** (`/farmer/*`)
- 📊 **Dashboard**: Analytics, sales metrics, and farm overview
- 📋 **Order Management**: Process and track customer orders
- ➕ **Product Management**: Add, edit, and manage farm products
- 💡 **AI Suggestions**: Market trends and farming recommendations
- 👤 **Farm Profile**: Farm details and business information

### 🏠 **Landing Page**
- 🎯 **Hero Section**: Compelling value proposition
- ✨ **Feature Showcase**: Platform benefits and capabilities
- 📈 **Statistics**: Trust indicators and platform metrics
- 💬 **Testimonials**: Customer and farmer success stories

## 🚀 **Loading System Architecture**

### **Theme-Based Components**

```typescript
// LoadingSpinner with theme support
<LoadingSpinner 
  size="md" 
  text="Loading products..." 
  theme="customer" // "customer" | "farmer" | "landing"
/>

// Skeleton with themed colors
<Skeleton 
  className="h-8 w-64" 
  theme="farmer" // Blue, Green, or Landing theme
/>
```

### **Color Schemes**
- **Customer Theme**: `blue-100`, `blue-500`, `blue-600`
- **Farmer Theme**: `green-100`, `green-500`, `green-600`
- **Landing Theme**: Mixed green/blue with neutral grays

### **Loading Patterns**
- **Form Loading**: Login/signup with field skeletons
- **Grid Loading**: Product lists and dashboard stats
- **Detail Loading**: Profile pages with user information
- **Card Loading**: Consistent card-based layouts

## 🛠️ **Tech Stack**

### **Frontend**
- **Next.js 14**: App Router, Server Components, and API Routes
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom themes
- **Shadcn/ui**: High-quality component library
- **Lucide React**: Beautiful icon library

### **Backend**
- **NextAuth.js**: Authentication and session management
- **MongoDB**: NoSQL database for data persistence
- **Prisma**: Type-safe database client

### **Development Tools**
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **PostCSS**: CSS processing
- **pnpm**: Fast package manager

## 📁 **Project Structure**

```
agriconnectnepal/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── customer/             # Customer API routes
│   │   ├── farmer/               # Farmer API routes
│   │   ├── orders/               # Order management
│   │   ├── products/             # Product management
│   │   └── reviews/              # Review system
│   ├── customer/                 # Customer portal pages
│   │   ├── cart/                 # Shopping cart
│   │   ├── favorites/            # Saved products
│   │   ├── login/                # Customer login
│   │   ├── signup/               # Customer registration
│   │   ├── profile/              # Customer profile
│   │   ├── settings/             # Account settings
│   │   ├── products/             # Product browsing
│   │   └── product/[id]/         # Product details
│   ├── farmer/                   # Farmer portal pages
│   │   ├── login/                # Farmer login
│   │   ├── signup/               # Farmer registration
│   │   ├── dashboard/            # Farm dashboard
│   │   ├── orders/               # Order management
│   │   ├── add-products/         # Product creation
│   │   ├── suggestions/          # AI recommendations
│   │   ├── profile/              # Farm profile
│   │   └── settings/             # Farm settings
│   ├── loading.tsx               # Landing page loading
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable components
│   ├── ui/                       # Shadcn/ui components
│   ├── customer-layout.tsx       # Customer portal layout
│   ├── farmer-layout.tsx         # Farmer portal layout
│   ├── loading-spinner.tsx       # Themed loading spinner
│   ├── providers.tsx             # Context providers
│   └── theme-provider.tsx        # Theme management
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Authentication utilities
│   ├── db.ts                     # Database configuration
│   └── utils.ts                  # Helper functions
├── models/                       # Database models
│   ├── Customer.ts               # Customer model
│   ├── Farmer.ts                 # Farmer model
│   ├── Order.ts                  # Order model
│   ├── Product.ts                # Product model
│   ├── Review.ts                 # Review model
│   └── User.ts                   # User model
└── public/                       # Static assets
```

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB database

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/agriconnectnepal.git
   cd agriconnectnepal
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   # Database
   DATABASE_URL="mongodb://localhost:27017/agriconnect"
   
   # NextAuth.js
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Run database migrations
   pnpm prisma db push
   ```

5. **Start Development Server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 **Customization**

### **Adding New Loading States**

1. **Create loading file**
   ```bash
   touch app/your-page/loading.tsx
   ```

2. **Use themed components**
   ```tsx
   import { Skeleton } from "@/components/ui/skeleton"
   
   export default function YourPageLoading() {
     return (
       <div className="space-y-6">
         <Skeleton className="h-8 w-64" theme="customer" />
         {/* Your loading content */}
       </div>
     )
   }
   ```

### **Theme Customization**

Update theme colors in `components/ui/skeleton.tsx`:
```typescript
const themeColors = {
  customer: "bg-blue-100",
  farmer: "bg-green-100", 
  landing: "bg-gray-200"
}
```

## 📱 **Responsive Design**

The application is fully responsive with:
- **Mobile-first approach**
- **Breakpoint optimization**
- **Touch-friendly interfaces**
- **Progressive enhancement**

## 🔒 **Security Features**

- **NextAuth.js authentication**
- **CSRF protection**
- **Input validation**
- **Secure API routes**
- **Environment variable protection**

## 🧪 **Testing**

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 📦 **Deployment**

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### **Other Platforms**
- **Netlify**: Configure build settings
- **Railway**: Connect database and deploy
- **Docker**: Use provided Dockerfile

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Use conventional commits
- Maintain theme consistency
- Add loading states for new pages
- Write comprehensive tests

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Next.js Team** for the amazing framework
- **Shadcn/ui** for the component library
- **Tailwind CSS** for the utility-first CSS framework
- **Vercel** for the deployment platform

## 📞 **Support**

- **Email**: support@agriconnectnepal.com
- **Documentation**: [docs.agriconnectnepal.com](https://docs.agriconnectnepal.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/agriconnectnepal/issues)

---

**Made with ❤️ for Nepal's Agriculture Community**
