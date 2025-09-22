'use client'

interface TabNavigationProps {
  activeTab: 'content' | 'learn' | 'concepts' | 'summary' | 'quiz'
  setActiveTab: (tab: 'content' | 'learn' | 'concepts' | 'summary' | 'quiz') => void
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    { id: 'content' as const, label: 'Course Content' },
    { id: 'learn' as const, label: 'Learn' },
    { id: 'concepts' as const, label: 'Key Concepts' },
    { id: 'summary' as const, label: 'Summary' },
    { id: 'quiz' as const, label: 'Quiz' },
  ]

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-100 p-1 rounded-lg flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
