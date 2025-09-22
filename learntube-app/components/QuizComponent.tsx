'use client'

import { useState } from 'react'
import type { Course } from '@/types/course'

interface QuizComponentProps {
  course: Course
}

export default function QuizComponent({ course }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

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

  if (!showResults) {
    return (
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
    )
  }

  return (
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
  )
}
