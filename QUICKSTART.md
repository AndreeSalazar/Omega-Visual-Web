# 🚀 Quick Start Guide

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Update Content

- **Hero Section**: Edit `app/components/Hero.tsx`
- **Use Cases**: Edit the `useCases` array in `app/components/UseCases.tsx`
- **Features**: Edit the `features` array in `app/components/Features.tsx`
- **Pricing**: Edit the `plans` array in `app/components/Pricing.tsx`
- **FAQ**: Edit the `faqs` array in `app/components/FAQ.tsx`

### Change Colors

Edit `tailwind.config.ts` to modify the color palette:

```typescript
colors: {
  primary: '#FF6B35',    // Change this
  secondary: '#00D9FF',  // Change this
  // ... etc
}
```

### Add Email Integration

1. Choose an email service (Mailchimp, ConvertKit, etc.)
2. Update the email form handlers in:
   - `app/components/Hero.tsx`
   - `app/components/FinalCTA.tsx`

Example with API route:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
  // Handle response
}
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚢 Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically!

## 📝 Next Steps

- [ ] Add real email service integration
- [ ] Add analytics (Google Analytics, Plausible)
- [ ] Add hero video to `public/videos/hero-demo.mp4`
- [ ] Add screenshots to `public/images/screenshots/`
- [ ] Customize meta tags in `app/layout.tsx`
- [ ] Add favicon to `public/favicon.ico`

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Use a different port
npm run dev -- -p 3001
```

**Build errors?**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**TypeScript errors?**
```bash
# Check types
npx tsc --noEmit
```

---

Need help? Check the [README.md](./README.md) for more details.

