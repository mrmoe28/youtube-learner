'use client'

import { useState } from 'react'
import type { Course } from '@/types/course'

interface KeyConceptsComponentProps {
  course: Course
}

export default function KeyConceptsComponent({ course }: KeyConceptsComponentProps) {
  const [expandedConcepts, setExpandedConcepts] = useState<{[key: string]: boolean}>({})

  const toggleConcept = (conceptIndex: number) => {
    setExpandedConcepts(prev => ({
      ...prev,
      [conceptIndex]: !prev[conceptIndex]
    }))
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

  return (
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
  )
}
