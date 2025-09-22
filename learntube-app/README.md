# 🎓 LearnTube - YouTube to Learning Course Generator

<div align="center">

  [![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.1-blue?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-blue?logo=tailwind-css)](https://tailwindcss.com/)
  [![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green?logo=openai)](https://openai.com/)
  [![License](https://img.shields.io/badge/License-MIT-yellow)](./LICENSE)

  **Transform any YouTube video into an interactive learning experience powered by AI**

  [Demo](https://youtube-learner.vercel.app) • [Report Bug](https://github.com/mrmoe28/youtube-learner/issues) • [Request Feature](https://github.com/mrmoe28/youtube-learner/issues)

</div>

## 📚 Overview

LearnTube is an innovative AI-powered educational platform that automatically converts YouTube videos into comprehensive, structured learning courses. By leveraging OpenAI's GPT models and YouTube's transcript API, it creates interactive educational content complete with key concepts, summaries, and knowledge assessment quizzes.

## ✨ Key Features

### 🎯 Core Functionality
- **🎬 YouTube URL Input**: Support for all YouTube video formats (youtube.com/watch, youtu.be, YouTube Music)
- **🤖 AI-Powered Analysis**: Intelligent transcript extraction and content generation using GPT-4
- **📚 Structured Learning Paths**: Auto-generated chapters with progressive learning objectives
- **💡 Concept Extraction**: Automatic identification and explanation of key concepts
- **📝 Smart Summaries**: Concise, digestible course overviews
- **🧠 Interactive Assessment**: Dynamic quiz generation with instant feedback
- **📱 Responsive Interface**: Seamless experience across all devices

### 🚀 Technical Highlights
- **Real-time Processing**: Live progress updates during course generation
- **Error Resilience**: Robust error handling and user-friendly feedback
- **Performance Optimized**: Fast load times with Next.js 15 and Turbopack
- **Type-Safe**: Full TypeScript implementation for reliability
- **Modern UI/UX**: Clean, intuitive interface with Tailwind CSS 4

## 🎯 Recent Improvements

- ✅ **Fixed CSS Class Syntax Errors**: Corrected `md-grid-cols-3` → `md:grid-cols-3` for proper Tailwind CSS syntax
- ✅ **Environment Setup Documentation**: Created comprehensive setup guide in `docs/ENVIRONMENT_SETUP.md`
- ✅ **Component Optimization**: Broke down large components into smaller, reusable modules
- ✅ **Repository Organization**: Moved documentation to `docs/` folder for better structure
- ✅ **Code Reusability**: Added utility functions in `lib/utils.ts` for common operations

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 15.5](https://nextjs.org/) with App Router
- **UI Library**: [React 19.1](https://react.dev/)
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Build Tool**: [Turbopack](https://turbo.build/pack)

### Backend & APIs
- **AI Model**: [OpenAI GPT-4](https://openai.com/) for content generation
- **Transcript API**: YouTube Transcript extraction
- **Runtime**: Node.js 20+

### Infrastructure
- **Deployment**: [Vercel](https://vercel.com/) (optimized)
- **Package Manager**: npm/pnpm/yarn
- **Version Control**: Git & GitHub

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** (or pnpm/yarn)
- **OpenAI API Key** with GPT-4 access

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mrmoe28/youtube-learner.git
cd youtube-learner/learntube-app
```

#### 2️⃣ Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

#### 3️⃣ Environment Setup

Create a `.env.local` file in the root directory:

```env
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional (for enhanced features)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 4️⃣ Obtain OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key and add to `.env.local`
6. Enable billing (required for API usage)

#### 5️⃣ Start Development Server

```bash
npm run dev
# or
npm run dev -- --turbo  # Use Turbopack for faster builds
```

🎉 Open [http://localhost:3000](http://localhost:3000) and start learning!

## 📖 Usage Guide

### Step-by-Step Instructions

1. **🔗 Input Video URL**
   - Paste any YouTube video URL in the input field
   - Supported formats: `youtube.com/watch?v=`, `youtu.be/`, YouTube Music links

2. **🎯 Generate Course**
   - Click the "Create Course" button
   - Watch real-time progress as AI processes the content
   - Processing time: ~30-60 seconds depending on video length

3. **📚 Explore Generated Content**
   - **Course Content Tab**: Navigate structured chapters with learning objectives
   - **Key Concepts Tab**: Review extracted important concepts and terminology
   - **Summary Tab**: Read the comprehensive course overview
   - **Quiz Tab**: Test your knowledge with interactive questions

### 💡 Pro Tips
- **Best Results**: Use educational, tutorial, or lecture videos
- **Transcript Quality**: Videos with clear audio and captions work best
- **Processing Speed**: Shorter videos (5-20 minutes) process fastest
- **Learning Path**: Follow the chapter sequence for optimal understanding

## API Endpoints

### POST /api/generate-course

Generates a course from a YouTube video URL.

**Request Body:**
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```json
{
  "success": true,
  "course": {
    "title": "Course Title",
    "description": "Course description",
    "chapters": [...],
    "keyConcepts": [...],
    "summary": "Course summary",
    "quiz": [...]
  },
  "videoId": "VIDEO_ID"
}
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mrmoe28/youtube-learner)

#### Manual Deployment Steps

1. **Fork/Clone Repository**
   ```bash
   git clone https://github.com/mrmoe28/youtube-learner.git
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

3. **Connect to Vercel**
   - Visit [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings

4. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add: `OPENAI_API_KEY` = `your_api_key_here`
   - Optional: `NEXT_PUBLIC_APP_URL` = `https://your-domain.vercel.app`

5. **Deploy**
   - Click "Deploy"
   - Wait for build completion (~2-3 minutes)
   - Access your app at the provided URL

### Alternative Deployment Platforms

#### Netlify
```bash
npm run build
netlify deploy --prod --dir=.next
```

#### Railway
```bash
railway login
railway link
railway up
```

#### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
```

## Limitations

- Requires videos with available transcripts
- OpenAI API usage costs apply
- Some videos may not have accessible transcripts
- Processing time depends on video length and AI response time

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/mrmoe28/youtube-learner.git
   cd youtube-learner
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow existing code style and conventions
   - Add tests for new features
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm run dev  # Test locally
   npm run build  # Ensure build passes
   npm run lint  # Check code style
   ```

5. **Submit a Pull Request**
   - Push your branch to GitHub
   - Open a PR with clear description
   - Link any related issues
   - Wait for review and feedback

### Development Guidelines

- **Code Style**: Follow TypeScript and React best practices
- **Commits**: Use clear, descriptive commit messages
- **Testing**: Add tests for new features
- **Documentation**: Update README for significant changes
- **Issues**: Check existing issues before creating new ones

## 🐛 Troubleshooting

### Common Issues & Solutions

<details>
<summary><strong>🔑 "OpenAI API key not configured"</strong></summary>

- Verify `.env.local` file exists in root directory
- Check API key is correctly formatted (starts with `sk-`)
- Restart development server after adding key
- Ensure API key has sufficient credits
</details>

<details>
<summary><strong>📝 "Could not fetch transcript"</strong></summary>

- Video must have captions/subtitles enabled
- Some videos restrict transcript access
- Try a different video with visible CC option
- Check if video is age-restricted or private
</details>

<details>
<summary><strong>🔗 "Invalid YouTube URL"</strong></summary>

- Supported formats:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://m.youtube.com/watch?v=VIDEO_ID`
  - YouTube Music URLs
- Ensure URL is complete and properly formatted
- Remove any timestamp parameters (`&t=123s`)
</details>

<details>
<summary><strong>⚡ "Processing timeout or slow performance"</strong></summary>

- Longer videos take more time to process
- Check your internet connection stability
- OpenAI API might be experiencing high load
- Try videos under 30 minutes for best performance
</details>

<details>
<summary><strong>🚧 "Build or deployment errors"</strong></summary>

- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires 18+)
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Review `TROUBLESHOOTING.md` for detailed solutions
</details>

### 📊 Performance Optimization

| Video Length | Processing Time | Recommended For |
|--------------|-----------------|-----------------|
| 0-10 min | ~20-30 seconds | Quick tutorials |
| 10-30 min | ~30-60 seconds | Standard lectures |
| 30-60 min | ~60-90 seconds | Long-form content |
| 60+ min | 90+ seconds | Full courses |

### 🆘 Getting Help

1. **📖 Documentation**: Review this README and `TROUBLESHOOTING.md`
2. **🐛 Bug Reports**: [Open an issue](https://github.com/mrmoe28/youtube-learner/issues/new)
3. **💡 Feature Requests**: [Suggest improvements](https://github.com/mrmoe28/youtube-learner/issues/new)
4. **💬 Discussions**: [Join community discussions](https://github.com/mrmoe28/youtube-learner/discussions)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 LearnTube

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- YouTube for video content and transcript access
- Vercel for hosting and deployment
- The open-source community for invaluable tools and libraries

---

<div align="center">

**Built with ❤️ by the LearnTube Team**

[⬆ Back to Top](#-learntube---youtube-to-learning-course-generator)

</div>