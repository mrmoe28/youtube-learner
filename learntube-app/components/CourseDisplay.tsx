'use client'

import { useState } from 'react'
import type { Course } from '@/types/course'

interface CourseDisplayProps {
  course: Course
  videoThumbnail?: string
}

function CourseDisplay({ course, videoThumbnail }: CourseDisplayProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'learn' | 'concepts' | 'summary' | 'quiz'>('content')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [expandedKeyPoints, setExpandedKeyPoints] = useState<{[key: string]: boolean}>({})
  const [expandedConcepts, setExpandedConcepts] = useState<{[key: string]: boolean}>({})
  const [focusedLearningModule, setFocusedLearningModule] = useState<{chapterIndex: number, pointIndex: number} | null>(null)
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const toggleKeyPoint = (chapterIndex: number, pointIndex: number) => {
    const key = `${chapterIndex}-${pointIndex}`
    setExpandedKeyPoints(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const toggleConcept = (conceptIndex: number) => {
    setExpandedConcepts(prev => ({
      ...prev,
      [conceptIndex]: !prev[conceptIndex]
    }))
  }

  const navigateToLearning = (chapterIndex: number, pointIndex: number) => {
    setFocusedLearningModule({ chapterIndex, pointIndex })
    setActiveTab('learn')
    // Scroll to the specific module after a brief delay to allow tab change
    setTimeout(() => {
      const element = document.getElementById(`learning-module-${chapterIndex}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const copyCommand = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedCommand(command)
      setTimeout(() => setCopiedCommand(null), 2000) // Clear after 2 seconds
    } catch (err) {
      console.error('Failed to copy command:', err)
    }
  }

  const generateExampleImage = (searchQuery: string, stepIndex: number): string => {
    // More specific, contextual images based on common development tasks
    const specificImages: {[key: string]: string} = {
      // Cloud/Browser Development
      'cloud': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
      'browser': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop',
      'code': 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop',
      'claude': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',

      // Terminal/Command Line
      'terminal': 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop',
      'command': 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop',
      'bash': 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop',
      'shell': 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop',

      // GitHub/Git
      'github': 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop',
      'git': 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop',
      'repository': 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop',

      // Development Tools
      'vscode': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      'editor': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      'development': 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&h=400&fit=crop',
      'ide': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',

      // Package Management & Tools
      'npm': 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=600&h=400&fit=crop',
      'install': 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=600&h=400&fit=crop',
      'package': 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=600&h=400&fit=crop',
      'setup': 'https://raw.githubusercontent.com/microsoft/vscode-docs/main/docs/editor/images/codebasics/hero.png',
    }

    // Find the best matching image based on search query
    const query = searchQuery.toLowerCase()
    for (const [keyword, imageUrl] of Object.entries(specificImages)) {
      if (query.includes(keyword)) {
        return imageUrl
      }
    }

    // Fallback to contextual images based on step content
    const fallbackImages = [
      'https://raw.githubusercontent.com/microsoft/vscode-docs/main/docs/editor/images/codebasics/hero.png', // VS Code
      'https://code.visualstudio.com/assets/docs/terminal/basics/integrated-terminal.png', // Terminal
      'https://docs.github.com/assets/cb-142248/mw-1440/images/help/repository/create-repository-button.webp', // GitHub
      'https://raw.githubusercontent.com/github/docs/main/assets/images/help/codespaces/codespace-browser.png', // Cloud Code
      'https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png', // Git
    ]

    return fallbackImages[stepIndex % fallbackImages.length]
  }

  const explainForTeenager = (concept: string): string => {
    const explanations: {[key: string]: string} = {
      'AI-driven transformation in engineering': "Think of AI like having a super-smart assistant that can help engineers design and build things faster. Just like how Netflix recommends movies you'll like, AI can help engineers solve problems and create better products automatically.",
      'Necessity for engineers to embrace AI': "Engineers today need to learn AI tools just like they learned to use computers and smartphones. It's like learning a new language that makes you way more powerful at your job - you can build cooler stuff and solve harder problems.",
      'Challenges and opportunities in the shift to AI': "Learning AI can be tough (like learning to drive), but once you get it, you can do amazing things. The challenge is that it's new and changing fast, but the opportunity is huge - you could invent the next big thing!",
      'Paradigm shift in problem-solving': "This means completely changing how we think about solving problems. Instead of doing everything step-by-step manually, we're teaching computers to figure out patterns and solutions on their own - like teaching a robot to play chess.",
      'Aligning problems with AI capabilities': "This means matching what you want to solve with what AI is actually good at. AI is great at finding patterns in data but terrible at understanding emotions - so you use it for the right tasks.",
      'Maximizing AI integration through problem shaping': "Instead of forcing AI into old ways of working, we reshape our problems to work better with AI. It's like redesigning a video game to work better with a new controller.",
      'AI integration': "Adding AI into existing systems and workflows, like adding GPS to cars - it makes everything smarter and more efficient.",
      'Problem-solving methodologies': "These are step-by-step approaches to tackle difficult challenges, like having a playbook for solving different types of puzzles.",
      'Engineering transformation': "The complete change in how engineers work, design, and build things - like how smartphones completely changed how we communicate.",
      'Artificial intelligence': "Computer systems that can learn and make decisions like humans do, but often much faster and with access to way more information than any person could handle."
    }

    return explanations[concept] || `${concept} is an important topic covered in this course. When you encounter unfamiliar terms, think of them as building blocks that help you understand the bigger picture of what's being taught.`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < course.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setShowResults(false)
  }

  const calculateScore = () => {
    let correct = 0
    course.quiz.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / course.quiz.length) * 100)
  }

  return (
    <div className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
            <p className="text-xl text-gray-600">{course.description}</p>
            {videoThumbnail && (
              <div className="mt-6 flex justify-center">
                <img
                  src={videoThumbnail}
                  alt="Video thumbnail"
                  className="rounded-lg shadow-lg max-w-sm w-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button
                onClick={() => setActiveTab('content')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'content'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Course Content
              </button>
              <button
                onClick={() => setActiveTab('learn')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'learn'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Learn
              </button>
              <button
                onClick={() => setActiveTab('concepts')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'concepts'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Key Concepts
              </button>
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'summary'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'quiz'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Quiz
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {activeTab === 'content' && (
              <div className="space-y-8">
                {course.chapters.map((chapter, index) => (
                  <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                    <h3 className="text-2xl font-semibold mb-4">{chapter.title}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">{chapter.content}</p>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-indigo-800 mb-2 flex items-center">
                        <span className="w-4 h-4 bg-indigo-500 rounded mr-2"></span>
                        Key Points (Click to learn more)
                      </h4>
                      <ul className="space-y-2">
                        {chapter.keyPoints.map((point, pointIndex) => {
                          const isExpanded = expandedKeyPoints[`${index}-${pointIndex}`]
                          const pointTitle = typeof point === 'object' ? point.title : point
                          return (
                            <li key={pointIndex} className="border-l-2 border-indigo-300 pl-3">
                              <div className="space-y-2">
                                <button
                                  onClick={() => toggleKeyPoint(index, pointIndex)}
                                  className="flex items-start w-full text-left hover:bg-indigo-100 p-2 rounded transition-colors"
                                >
                                  <span className="text-indigo-600 mr-2">
                                    <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                                    </svg>
                                  </span>
                                  <span className="text-indigo-700 font-medium">{pointTitle}</span>
                                </button>
                                {isExpanded && (
                                  <div className="mt-2 ml-8 space-y-3">
                                    <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                      <p className="text-blue-800 text-sm leading-relaxed">
                                        {explainForTeenager(pointTitle)}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => navigateToLearning(index, pointIndex)}
                                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                                    >
                                      Learn This Topic →
                                    </button>
                                  </div>
                                )}
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'learn' && (
              <div>
                <h3 className="text-2xl font-semibold mb-6">Interactive Learning Modules</h3>
                {focusedLearningModule && (
                  <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                    <p className="text-yellow-800 font-medium">
                      <span className="inline-block w-4 h-4 bg-yellow-500 rounded mr-2"></span>
                      Focused Learning: You navigated here to learn about a specific topic from Chapter {focusedLearningModule.chapterIndex + 1}
                    </p>
                  </div>
                )}
                <div className="space-y-8">
                  {course.chapters.map((chapter, chapterIndex) => {
                    const isFocused = focusedLearningModule?.chapterIndex === chapterIndex
                    return (
                      <div
                        key={chapterIndex}
                        id={`learning-module-${chapterIndex}`}
                        className={`p-6 rounded-lg border-l-4 transition-all duration-300 ${
                          isFocused
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-500 shadow-lg'
                            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500'
                        }`}
                      >
                        <h4 className="text-xl font-bold mb-6 flex items-center">
                          <span className={`rounded w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 text-white ${
                            isFocused ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {chapterIndex + 1}
                          </span>
                          <span className={isFocused ? 'text-orange-700' : 'text-blue-700'}>
                            {chapter.title}
                          </span>
                        </h4>

                        {/* Learning Objective - 2025 Best Practice */}
                        <div className="mb-6 p-5 bg-white rounded-lg shadow-sm border-l-4 border-gray-300">
                          <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="w-4 h-4 bg-gray-500 rounded mr-2"></span>
                            Learning Objective (What You'll Achieve)
                          </h5>
                          <div className="bg-gray-50 p-4 rounded-lg border-l-2 border-gray-400">
                            <p className="text-gray-700 font-medium">By the end of this module, you will be able to:</p>
                            <p className="text-gray-700 mt-2">{chapter.content}</p>
                          </div>
                        </div>

                        {/* Step-by-Step Learning Content */}
                        <div className="space-y-4 mb-6">
                          <h5 className="font-semibold text-gray-800 flex items-center">
                            <span className="w-4 h-4 bg-blue-500 rounded mr-2"></span>
                            Step-by-Step Learning
                          </h5>

                          {chapter.keyPoints.map((point, pointIndex) => {
                            const isSpecificFocus = focusedLearningModule?.chapterIndex === chapterIndex &&
                                                   focusedLearningModule?.pointIndex === pointIndex

                            // Handle both old format (string) and new format (object)
                            const isDetailedPoint = typeof point === 'object' && point.steps
                            const pointTitle = isDetailedPoint ? point.title : point

                            return (
                              <div
                                key={pointIndex}
                                className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
                                  isSpecificFocus
                                    ? 'bg-yellow-100 border-yellow-500 shadow-md'
                                    : 'bg-white border-blue-300'
                                }`}
                              >
                                <div className="flex items-start mb-3">
                                  <span className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 text-white ${
                                    isSpecificFocus ? 'bg-yellow-500' : 'bg-blue-500'
                                  }`}>
                                    {pointIndex + 1}
                                  </span>
                                  <div className="flex-1">
                                    <h6 className="font-medium text-gray-800 mb-2">{String(pointTitle)}</h6>
                                    {isSpecificFocus && (
                                      <div className="mb-3 p-3 bg-yellow-50 rounded border-l-2 border-yellow-400">
                                        <p className="text-yellow-800 text-sm font-medium">
                                          <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                                          </svg>
                                          You're focusing on this specific topic
                                        </p>
                                      </div>
                                    )}

                                    {/* Video Context Image */}
                                    {videoThumbnail && isSpecificFocus && (
                                      <div className="mb-4">
                                        <img
                                          src={videoThumbnail}
                                          alt="Video reference"
                                          className="rounded-lg shadow-md max-w-xs w-full mx-auto"
                                          onError={(e) => {
                                            e.currentTarget.style.display = 'none'
                                          }}
                                        />
                                        <p className="text-xs text-gray-500 text-center mt-2">Reference from the video</p>
                                      </div>
                                    )}

                                    {/* Enhanced Learning Content for Detailed Points */}
                                    {isDetailedPoint && point.steps ? (
                                      <div className="space-y-4">
                                        {/* Step-by-Step Instructions */}
                                        <div className="bg-gray-600 p-4 rounded-lg">
                                          <div className="font-semibold text-white mb-3">Step-by-Step Instructions:</div>
                                          <div className="space-y-4">
                                            {point.steps.map((step, stepIndex) => (
                                              <div key={stepIndex} className="space-y-3">
                                                <div className="flex items-start text-sm">
                                                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">
                                                    {stepIndex + 1}
                                                  </span>
                                                  <span className="text-white">{step}</span>
                                                </div>
                                                {/* Example Image for this step */}
                                                {point.stepImages?.[stepIndex] && (
                                                  <div className="ml-7 mt-3">
                                                    <div className="bg-gray-700 p-3 rounded-lg">
                                                      <img
                                                        src={generateExampleImage(point.stepImages[stepIndex].searchQuery || 'development interface', stepIndex)}
                                                        alt={point.stepImages[stepIndex].description || `Step ${stepIndex + 1} example`}
                                                        className="rounded-lg shadow-lg max-w-full h-auto"
                                                        style={{ maxHeight: '250px', width: '100%', objectFit: 'contain' }}
                                                        onError={(e) => {
                                                          // Fallback to placeholder if image fails to load
                                                          e.currentTarget.src = `https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=${encodeURIComponent(point.stepImages?.[stepIndex]?.description || `Step ${stepIndex + 1}`)}`
                                                        }}
                                                      />
                                                      <p className="text-xs text-gray-300 mt-2 text-center italic">
                                                        {point.stepImages[stepIndex].description || `Example visualization for step ${stepIndex + 1}`}
                                                      </p>
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                        {/* Commands Section */}
                                        {point.commands && point.commands.length > 0 && (
                                          <div className="space-y-3">
                                            {point.commands.map((command, cmdIndex) => (
                                              <div key={cmdIndex} className="bg-gray-600 rounded-xl overflow-hidden shadow-lg border border-gray-500">
                                                {/* Terminal Header */}
                                                <div className="bg-gray-500 px-4 py-2 flex items-center justify-between border-b border-gray-400">
                                                  <div className="flex items-center space-x-2">
                                                    <div className="flex space-x-1">
                                                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                    </div>
                                                    <span className="text-white text-sm font-medium">bash</span>
                                                  </div>
                                                  <button
                                                    onClick={() => copyCommand(command)}
                                                    className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-gray-400 hover:bg-gray-300 transition-colors text-white hover:text-gray-800 text-xs font-medium"
                                                    title="Copy command"
                                                  >
                                                    {copiedCommand === command ? (
                                                      <>
                                                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                        </svg>
                                                        <span className="text-green-600">Copied</span>
                                                      </>
                                                    ) : (
                                                      <>
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                                                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                                                        </svg>
                                                        <span>Copy</span>
                                                      </>
                                                    )}
                                                  </button>
                                                </div>
                                                {/* Terminal Content */}
                                                <div className="px-4 py-4 bg-gray-600">
                                                  <div className="font-mono text-base">
                                                    <span className="text-green-300 font-bold text-lg">$</span>
                                                    <span className="text-white ml-2 font-medium">{command}</span>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        )}

                                        {/* Example Section */}
                                        {point.example && (
                                          <div className="bg-green-50 p-4 rounded-lg">
                                            <div className="font-semibold text-green-800 mb-2">Real Example:</div>
                                            <p className="text-green-700 text-sm leading-relaxed">{point.example}</p>
                                          </div>
                                        )}

                                        {/* Try This Section */}
                                        {point.tryThis && (
                                          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                            <div className="font-semibold text-blue-800 mb-2 flex items-center">
                                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                              </svg>
                                              Try This Exercise
                                            </div>
                                            <p className="text-blue-700 text-sm leading-relaxed">{point.tryThis}</p>
                                          </div>
                                        )}

                                        {/* Troubleshooting Section */}
                                        {point.troubleshooting && (
                                          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                                            <div className="font-semibold text-orange-800 mb-2 flex items-center">
                                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                              </svg>
                                              Troubleshooting Tips
                                            </div>
                                            <p className="text-orange-700 text-sm leading-relaxed">{point.troubleshooting}</p>
                                          </div>
                                        )}

                                        {/* Resource Links Section */}
                                        {point.resourceLinks && point.resourceLinks.length > 0 && (
                                          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                                            <div className="font-semibold text-indigo-800 mb-3 flex items-center">
                                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
                                              </svg>
                                              Useful Resources & Links
                                            </div>
                                            <div className="grid gap-3">
                                              {point.resourceLinks.map((link, linkIndex) => (
                                                <a
                                                  key={linkIndex}
                                                  href={link.url}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="flex items-start p-3 bg-white rounded-lg border border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all duration-200 group"
                                                >
                                                  <div className="flex-shrink-0 mr-3">
                                                    {link.type === 'documentation' && (
                                                      <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                                                      </svg>
                                                    )}
                                                    {link.type === 'tutorial' && (
                                                      <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                                                      </svg>
                                                    )}
                                                    {link.type === 'tool' && (
                                                      <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                                                      </svg>
                                                    )}
                                                    {link.type === 'download' && (
                                                      <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                                                      </svg>
                                                    )}
                                                    {link.type === 'example' && (
                                                      <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                                                      </svg>
                                                    )}
                                                  </div>
                                                  <div className="flex-1 min-w-0">
                                                    <div className="flex items-center">
                                                      <h4 className="text-sm font-medium text-indigo-800 group-hover:text-indigo-900 truncate">
                                                        {link.title}
                                                      </h4>
                                                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                      </svg>
                                                    </div>
                                                    <p className="text-xs text-indigo-600 mt-1">{link.description}</p>
                                                  </div>
                                                </a>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      /* Fallback for Simple Points */
                                      <div className="space-y-3">
                                        <div className="bg-gray-50 p-3 rounded">
                                          <p className="text-gray-700 text-sm">
                                            <strong>Core Concept:</strong> {typeof point === 'string' ? explainForTeenager(point) : explainForTeenager(String(point.title))}
                                          </p>
                                        </div>

                                        <div className="bg-blue-50 p-3 rounded">
                                          <p className="text-blue-800 text-sm">
                                            <strong>How to Apply:</strong> Start by understanding the basic principle, then identify specific situations in your work where this concept applies. Practice implementing it in small, controlled scenarios before using it in larger projects.
                                          </p>
                                        </div>

                                        <div className="bg-green-50 p-3 rounded">
                                          <p className="text-green-800 text-sm">
                                            <strong>Success Indicators:</strong> You'll know you've mastered this when you can explain it to someone else and successfully apply it to solve real problems in your domain.
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Interactive Exercise - 2025 Best Practice */}
                        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-l-4 border-amber-400">
                          <h5 className="font-semibold text-amber-800 mb-3 flex items-center">
                            <span className="w-4 h-4 bg-amber-500 rounded mr-2"></span>
                            Interactive Exercise
                          </h5>
                          <div className="text-amber-700 space-y-3">
                            <p><strong>Hands-on Challenge:</strong> Apply "{chapter.title}" concepts</p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white p-3 rounded shadow-sm">
                                <h6 className="font-medium text-amber-800 mb-2">Reflection Questions:</h6>
                                <ul className="text-sm space-y-1">
                                  <li>• How does this relate to your current work?</li>
                                  <li>• What would change if you implemented this?</li>
                                  <li>• What obstacles might you encounter?</li>
                                </ul>
                              </div>
                              <div className="bg-white p-3 rounded shadow-sm">
                                <h6 className="font-medium text-amber-800 mb-2">Action Steps:</h6>
                                <ul className="text-sm space-y-1">
                                  <li>• Identify one specific use case</li>
                                  <li>• Create a simple implementation plan</li>
                                  <li>• Set measurable success criteria</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Progress Indicator */}
                        <div className="mt-6 flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                          <span className="text-sm text-gray-600">Module {chapterIndex + 1} of {course.chapters.length}</span>
                          <div className="flex space-x-1">
                            {Array.from({ length: course.chapters.length }, (_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-full ${
                                  i === chapterIndex ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Course Completion */}
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                    <div className="flex items-center justify-center mb-4">
                      <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </span>
                      <h4 className="text-xl font-bold text-green-700">Learning Complete</h4>
                    </div>
                    <p className="text-green-600 mb-4">You've completed all interactive learning modules. Ready to test your knowledge?</p>
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                    >
                      Take the Assessment →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'concepts' && (
              <div>
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <span className="w-6 h-6 bg-indigo-500 rounded mr-3"></span>
                  Key Concepts (Click to learn more)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.keyConcepts.map((concept, index) => {
                    const isExpanded = expandedConcepts[index]
                    return (
                      <div key={index} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleConcept(index)}
                          className="w-full p-4 text-left hover:bg-black hover:bg-opacity-10 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="w-6 h-6 bg-white bg-opacity-30 rounded mr-3 flex items-center justify-center">
                                <span className="w-3 h-3 bg-white rounded-full"></span>
                              </span>
                              <span className="font-medium">{concept}</span>
                            </div>
                            <span className="text-lg ml-2">
                              <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                              </svg>
                            </span>
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4">
                            <div className="bg-white bg-opacity-20 p-3 rounded-lg border-l-4 border-white">
                              <p className="text-white text-sm leading-relaxed">
{explainForTeenager(concept)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === 'summary' && (
              <div>
                <h3 className="text-2xl font-semibold mb-6">Course Summary</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed text-lg">{course.summary}</p>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div>
                <h3 className="text-2xl font-semibold mb-6">Knowledge Check</h3>

                {!showResults ? (
                  <div>
                    <div className="mb-4">
                      <span className="text-sm text-gray-500">
                        Question {currentQuestionIndex + 1} of {course.quiz.length}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentQuestionIndex + 1) / course.quiz.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-xl font-medium mb-6">{course.quiz[currentQuestionIndex].question}</h4>
                      <div className="space-y-3">
                        {course.quiz[currentQuestionIndex].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                              selectedAnswers[currentQuestionIndex] === index
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={nextQuestion}
                        disabled={selectedAnswers[currentQuestionIndex] === undefined}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {currentQuestionIndex === course.quiz.length - 1 ? 'Finish Quiz' : 'Next Question'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="mb-4">
                        <span className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${calculateScore() >= 70 ? 'bg-green-500' : 'bg-blue-500'}`}>
                          {calculateScore() >= 70 ? (
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                          ) : (
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                          )}
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold mb-2">Quiz Complete!</h4>
                      <p className="text-xl text-gray-600">
                        Your Score: {calculateScore()}% ({selectedAnswers.filter((answer, index) => answer === course.quiz[index].correctAnswer).length} out of {course.quiz.length} correct)
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {course.quiz.map((question, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg text-left">
                          <div className="flex items-start">
                            <span className="mr-3">
                              {selectedAnswers[index] === question.correctAnswer ? (
                                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                              ) : (
                                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                                </svg>
                              )}
                            </span>
                            <div>
                              <p className="font-medium mb-2">{question.question}</p>
                              <p className="text-sm text-gray-600 mb-2">
                                Your answer: {question.options[selectedAnswers[index]]}
                              </p>
                              {selectedAnswers[index] !== question.correctAnswer && (
                                <p className="text-sm text-green-600 mb-2">
                                  Correct answer: {question.options[question.correctAnswer]}
                                </p>
                              )}
                              <p className="text-sm text-gray-700">{question.explanation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={resetQuiz}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Retake Quiz
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDisplay