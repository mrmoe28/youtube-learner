# Troubleshooting Guide

## Build Issues and Solutions

### Issue: "Cannot find module 'tailwindcss'"
**Problem**: Tailwind CSS was listed in dependencies but not actually installed.

**Solution**: 
```bash
npm install tailwindcss
```

### Issue: "The PostCSS plugin has moved to a separate package"
**Problem**: Tailwind CSS v4 requires a different PostCSS plugin.

**Solution**: 
1. Install the correct PostCSS plugin:
```bash
npm install @tailwindcss/postcss
```

2. Update `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### Issue: "Type error: Cannot find name 'content'"
**Problem**: Undefined variable reference in error handling.

**Solution**: Remove the undefined variable reference from the catch block.

### Issue: "Type 'KeyPoint' is not assignable to type 'ReactNode'"
**Problem**: TypeScript type mismatch when rendering dynamic content.

**Solution**: Cast the variable to string:
```typescript
{String(pointTitle)}
```

### Issue: "The config property `experimental.turbo` is deprecated"
**Problem**: Next.js configuration uses deprecated property.

**Solution**: Update `next.config.js`:
```javascript
// Change from:
experimental: {
  turbo: { ... }
}

// To:
turbopack: { ... }
```

## Configuration Files Created

### tailwind.config.ts
```typescript
import { type Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config
```

### postcss.config.js
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

## Environment Setup

### Required Environment Variables
Create a `.env.local` file with:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Getting OpenAI API Key
1. Go to [OpenAI's website](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Add billing information (required for API usage)

## Build Commands

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Common Issues

1. **"OpenAI API key not configured"**
   - Make sure `.env.local` file exists with correct API key
   - Restart the development server after adding the key

2. **"Could not fetch transcript"**
   - Some videos don't have available transcripts
   - Try a different video or check if captions are enabled

3. **"Invalid YouTube URL"**
   - Make sure the URL is in correct YouTube format
   - Supports: youtube.com/watch?v=ID, youtu.be/ID, etc.

## Performance Tips

- Videos with shorter transcripts process faster
- Educational/tutorial videos typically work best
- Ensure stable internet connection for API calls
