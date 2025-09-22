// Shared type definitions for course data
export interface StepImage {
  stepIndex: number
  description: string
  searchQuery: string
}

export interface ResourceLink {
  title: string
  url: string
  description: string
  type: 'documentation' | 'tutorial' | 'tool' | 'download' | 'example'
}

export interface KeyPoint {
  title: string
  steps: string[]
  example: string
  commands?: string[]
  tryThis?: string
  troubleshooting?: string
  imageDescription?: string
  timestamp?: string
  stepImages?: StepImage[]
  resourceLinks?: ResourceLink[]
}

export interface Chapter {
  title: string
  content: string
  keyPoints: KeyPoint[] | string[]  // Support both old and new format
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Course {
  title: string
  description: string
  chapters: Chapter[]
  keyConcepts: string[]
  summary: string
  quiz: QuizQuestion[]
  qualityScore?: number
}

// API response types
export interface CourseResponse {
  success: boolean
  course: Course
  videoId: string
  videoThumbnail: string
}

export interface ErrorResponse {
  error: string
}
