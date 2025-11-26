# Omega-Visual Landing Page

A stunning, modern landing page for Omega-Visual - "The Operating System for Code". Built with Next.js 14, React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Dark theme with vibrant accent colors
- **Smooth Animations**: Framer Motion animations throughout
- **Interactive Demo**: Canvas-based node visualization
- **Fully Responsive**: Mobile-first design approach
- **SEO Optimized**: Next.js SSR for better SEO
- **Type Safe**: Full TypeScript support

## 📋 Sections

1. **Hero Section** - Main CTA with email capture and animated counter
2. **Problem/Solution** - Split view showing problems and solutions
3. **Interactive Demo** - Canvas with clickable nodes and code preview
4. **Use Cases** - 6 use case cards with icons
5. **Features** - 10 enterprise-grade features
6. **Comparison** - Comparison table vs competitors
7. **Testimonials** - 3 developer testimonials
8. **Architecture** - Tech stack visualization
9. **Roadmap** - Timeline of future features
10. **Pricing** - 3 pricing tiers
11. **FAQ** - Accordion-style FAQ section
12. **Final CTA** - Secondary email capture
13. **Footer** - Links and contact information

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Color Palette

- **Primary**: `#FF6B35` (Orange - Assembly)
- **Secondary**: `#00D9FF` (Cyan - Code)
- **Background**: `#0A0E27` (Deep blue)
- **Surface**: `#1A1F3A` (Cards)
- **Text**: `#E0E7FF` (Light blue-white)
- **Accent**: `#FFD93D` (Yellow - Highlights)

## 📝 Customization

### Update Colors
Edit `tailwind.config.ts` to change the color scheme.

### Add Sections
Create new components in `app/components/` and import them in `app/page.tsx`.

### Modify Content
Each component is self-contained. Edit the data arrays in each component file.

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify

1. Push to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`

## 📊 Performance

- Lighthouse score target: 95+
- Optimized images with Next.js Image
- Code splitting with dynamic imports
- Lazy loading for videos and heavy components

## 🔧 Environment Variables

Create a `.env.local` file for any API keys (email service, analytics, etc.):

```env
NEXT_PUBLIC_EMAIL_SERVICE_API_KEY=your_key_here
```

## 📄 License

Proprietary - All rights reserved

## 🤝 Contributing

This is a private project. For inquiries, contact hello@omega-visual.dev

---

Built with ❤️ using Omega-Visual (meta)

