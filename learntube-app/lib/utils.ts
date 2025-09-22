// Utility functions for the LearnTube app

export const explainForTeenager = (concept: string): string => {
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

export const generateExampleImage = (searchQuery: string, stepIndex: number): string => {
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

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
    return false
  }
}
