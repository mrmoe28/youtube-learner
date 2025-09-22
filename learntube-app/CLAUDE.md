# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LearnTube is a Next.js application that transforms YouTube videos into structured learning courses using AI. The app extracts video transcripts, processes them with OpenAI's GPT models, and generates comprehensive educational content including chapters, key concepts, summaries, and interactive quizzes.

## Development Commands

```bash
# Development server with Turbopack (faster builds)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Core Architecture

### Application Structure
- **Next.js 15 App Router**: Modern file-based routing with `/app` directory
- **API Route**: Single endpoint `/api/generate-course` handles all course generation
- **TypeScript**: Full type safety with shared interfaces in `/types`
- **Tailwind CSS 4**: Modern styling with custom CSS fixes for Next.js compatibility

### Data Flow
1. **User Input**: YouTube URL submitted via main form in `app/page.tsx`
2. **Transcript Extraction**: `app/api/generate-course/route.ts` extracts video ID and fetches transcript using `youtube-transcript-plus`
3. **AI Processing**: OpenAI GPT-3.5-turbo generates structured course content via detailed prompt engineering
4. **Response**: Structured course data returned and displayed via `components/CourseDisplay.tsx`

### Key Components
- `app/page.tsx` - Main landing page with form and course display
- `app/api/generate-course/route.ts` - Core API logic for transcript extraction and AI generation
- `components/CourseDisplay.tsx` - Renders generated course content with tabs
- `types/course.ts` - Shared TypeScript interfaces for all course data structures

### YouTube Integration
The app supports multiple YouTube URL formats via regex extraction:
- `youtube.com/watch?v=VIDEO_ID`
- `youtu.be/VIDEO_ID`
- `m.youtube.com/watch?v=VIDEO_ID`
- YouTube Music URLs

Multiple transcript libraries are used as fallbacks:
- Primary: `youtube-transcript-plus`
- Backup options: `youtube-transcript`, `youtube-transcript-api`, `youtubei.js`

### OpenAI Integration
- Model: GPT-3.5-turbo with 4000 token limit
- System prompt enforces JSON-only responses
- Comprehensive prompt engineering generates detailed course structure including:
  - Chapter segmentation with actionable content
  - KeyPoints with step-by-step instructions
  - Commands and examples extracted from transcript
  - Resource links and visual descriptions
  - Interactive quiz questions

### Error Handling
- Comprehensive error categorization in `getErrorMessage()` function
- Specific handling for transcript availability, API key issues, network problems
- User-friendly error messages for common failure scenarios

## Environment Requirements

```bash
# Required
OPENAI_API_KEY=sk-...

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Type System

Core interfaces in `types/course.ts`:
- `Course`: Main course structure with chapters, concepts, summary, quiz
- `Chapter`: Contains title, content, and keyPoints (supports both string[] and KeyPoint[] formats)
- `KeyPoint`: Detailed learning objectives with steps, examples, commands, timestamps
- `QuizQuestion`: Interactive questions with multiple choice answers

## CSS Architecture

Uses Tailwind CSS 4 with custom class naming to avoid Next.js parser issues:
- Use hyphens instead of colons: `hover-bg-gray-100` not `hover:bg-gray-100`
- No escaped characters in class names
- See `CSS_FIXES.md` for detailed fixes applied

## Deployment

Optimized for Vercel deployment with:
- Environment variables configured in Vercel dashboard
- Turbopack enabled for faster builds
- PostCSS configuration for Tailwind CSS 4 compatibility

## Known Issues

1. **Transcript Availability**: Not all YouTube videos have accessible transcripts
2. **Processing Time**: Longer videos (30+ minutes) may timeout or take significant processing time
3. **CSS Parsing**: Next.js CSS parser requires specific class naming conventions (documented in CSS_FIXES.md)
4. **API Costs**: OpenAI API usage scales with video length and complexity

## Testing Strategy

No formal test suite currently implemented. Manual testing focuses on:
- Various YouTube URL formats
- Videos with/without transcripts
- Error handling scenarios
- Course content generation quality
- UI responsiveness across devices