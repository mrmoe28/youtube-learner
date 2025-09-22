'use client'

import { useState } from 'react'
import CourseDisplay from '@/components/CourseDisplay'
import type { Course, CourseResponse, ErrorResponse } from '@/types/course'

const getErrorMessage = (error: any): string => {
  if (error.message?.includes('transcript')) {
    return 'This video doesn\'t have captions available. Try a different video with captions enabled.'
  }
  if (error.message?.includes('API key')) {
    return 'Service configuration error. Please contact support.'
  }
  if (error.message?.includes('network') || error.name === 'TypeError') {
    return 'Network error. Please check your internet connection and try again.'
  }
  if (error.message?.includes('timeout')) {
    return 'Request timed out. The video might be too long. Please try a shorter video.'
  }
  if (error.message?.includes('Invalid YouTube URL')) {
    return 'Please enter a valid YouTube URL.'
  }
  return 'An unexpected error occurred. Please try again.'
}

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState<Course | null>(null)
  const [videoThumbnail, setVideoThumbnail] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    try {
      const response = await fetch('/api/generate-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (response.ok) {
        const responseData: CourseResponse = await response.json()
        console.log('Response data:', responseData)
        setCourse(responseData.course)
        setVideoThumbnail(responseData.videoThumbnail || '')
        console.log('Course set:', responseData.course)
      } else {
        let errorData: ErrorResponse
        try {
          errorData = await response.json()
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError)
          errorData = { error: 'Invalid response from server' }
        }
        console.error('Error response:', errorData)
        alert(`Failed to generate course: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = getErrorMessage(error)
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg text-white min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold mb-6">Transform YouTube Videos into Learning Courses</h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Paste any YouTube URL and instantly get a structured course with key concepts, summaries, and quizzes.
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="Paste YouTube URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="input-highlight flex-grow px-6 py-4 rounded-l-lg focus:outline-none text-gray-800"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !url}
                className="bg-indigo-700 hover-bg-indigo-800 px-8 py-4 rounded-r-lg font-semibold transition duration-300 disabled-opacity-50 disabled-cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Course'}
              </button>
            </div>
          </form>

          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
              <div className="mt-4 space-y-2">
                <p className="text-lg font-medium">Creating your personalized course...</p>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <p className="text-sm opacity-90">This may take 30-60 seconds depending on video length</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Course Display Section */}
      {course && (
        <div className="bg-yellow-100 border-2 border-yellow-500 p-3 m-2">
          <h2 className="text-2xl font-bold text-black mb-4">COURSE CONTENT DETECTED!</h2>
          <CourseDisplay course={course} videoThumbnail={videoThumbnail} />
        </div>
      )}


      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform transforms any YouTube video into a comprehensive learning experience.
            </p>
          </div>

          <div className="grid md-grid-cols-3 gap-8">
            <div className="course-card bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 011-1h1a1 1 0 010 2H6a1 1 0 01-1-1zm6 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Paste YouTube URL</h3>
              <p className="text-gray-600">Simply paste any YouTube video URL and let our AI do the rest.</p>
            </div>

            <div className="course-card bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a.5.5 0 00-.707-.707L13 8l-1-1a.5.5 0 00-.707.707L12.586 9l-1.293 1.293a.5.5 0 00.707.707L13 10l1 1a.5.5 0 00.707-.707L13.414 9l1.293-1.293z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
              <p className="text-gray-600">Our AI analyzes the transcript and extracts key learning concepts.</p>
            </div>

            <div className="course-card bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Structured Course</h3>
              <p className="text-gray-600">Get organized content with summaries, key points, and quizzes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md-grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Everything You Need to Learn</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Automatic chapter segmentation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Key concept extraction</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Personalized quizzes</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Progress tracking</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-gray-200 h-64 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5-6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1-2"></div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between">
                    <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg">Key Concepts</button>
                    <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg">Summary</button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Quiz</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="gradient-bg text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Videos into Knowledge?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Start creating personalized courses from any YouTube video in seconds.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-bold text-lg hover-bg-gray-100 transition duration-300"
          >
            Try It Now - Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-2">LearnTube</h3>
              <p className="text-sm">Transforming videos into learning experiences</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover-text-white transition">Twitter</a>
              <a href="#" className="hover-text-white transition">GitHub</a>
              <a href="#" className="hover-text-white transition">LinkedIn</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            © 2023 LearnTube. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}