'use client'

import { useState } from 'react'
import type { Course } from '@/types/course'
import TabNavigation from './TabNavigation'
import QuizComponent from './QuizComponent'
import KeyConceptsComponent from './KeyConceptsComponent'
import { explainForTeenager } from '@/lib/utils'

interface CourseDisplaySimplifiedProps {
  course: Course
  videoThumbnail?: string
}

export default function CourseDisplaySimplified({ course, videoThumbnail }: CourseDisplaySimplifiedProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'learn' | 'concepts' | 'summary' | 'quiz'>('content')
  const [expandedKeyPoints, setExpandedKeyPoints] = useState<{[key: string]: boolean}>({})

  const toggleKeyPoint = (chapterIndex: number, pointIndex: number) => {
    const key = `${chapterIndex}-${pointIndex}`
    setExpandedKeyPoints(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
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

          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

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
                <div className="space-y-8">
                  {course.chapters.map((chapter, chapterIndex) => (
                    <div
                      key={chapterIndex}
                      className="p-6 rounded-lg border-l-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500"
                    >
                      <h4 className="text-xl font-bold mb-6 flex items-center">
                        <span className="rounded w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 text-white bg-blue-500">
                          {chapterIndex + 1}
                        </span>
                        <span className="text-blue-700">{chapter.title}</span>
                      </h4>

                      <div className="mb-6 p-5 bg-white rounded-lg shadow-sm border-l-4 border-gray-300">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="w-4 h-4 bg-gray-500 rounded mr-2"></span>
                          Learning Objective
                        </h5>
                        <div className="bg-gray-50 p-4 rounded-lg border-l-2 border-gray-400">
                          <p className="text-gray-700 font-medium">By the end of this module, you will be able to:</p>
                          <p className="text-gray-700 mt-2">{chapter.content}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {chapter.keyPoints.map((point, pointIndex) => {
                          const pointTitle = typeof point === 'object' ? point.title : point
                          return (
                            <div key={pointIndex} className="p-4 rounded-lg border-l-4 bg-white border-blue-300">
                              <div className="flex items-start mb-3">
                                <span className="rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 text-white bg-blue-500">
                                  {pointIndex + 1}
                                </span>
                                <div className="flex-1">
                                  <h6 className="font-medium text-gray-800 mb-2">{String(pointTitle)}</h6>
                                  <div className="bg-gray-50 p-3 rounded">
                                    <p className="text-gray-700 text-sm">
                                      <strong>Core Concept:</strong> {explainForTeenager(pointTitle)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'concepts' && <KeyConceptsComponent course={course} />}

            {activeTab === 'summary' && (
              <div>
                <h3 className="text-2xl font-semibold mb-6">Course Summary</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed text-lg">{course.summary}</p>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && <QuizComponent course={course} />}
          </div>
        </div>
      </div>
    </div>
  )
}
