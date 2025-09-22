import { NextRequest, NextResponse } from 'next/server'
import { fetchTranscript } from 'youtube-transcript-plus'
import OpenAI from 'openai'

// Initialize OpenAI (you'll need to set OPENAI_API_KEY in your environment)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// Function to extract YouTube video ID from URL
function extractVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|m\.youtube\.com\/watch\?v=|youtube\.com\/watch\?.*&v=)([^#\&\?]*).*/
  const match = url.match(regex)
  return match ? match[1] : null
}

// Function to get video transcript
async function getTranscript(videoId: string): Promise<string> {
  try {
    console.log('Fetching transcript for video ID:', videoId)

    // Try youtube-transcript-plus
    const transcript = await fetchTranscript(videoId)

    console.log('Raw transcript data:', transcript?.length || 0, 'items')

    if (!transcript || transcript.length === 0) {
      throw new Error('No transcript data returned')
    }

    // Extract text from transcript segments
    const transcriptText = transcript
      .map((segment: any) => segment.text || segment.content || '')
      .filter((text: string) => text.trim().length > 0)
      .join(' ')

    console.log('Processed transcript length:', transcriptText.length)

    if (transcriptText.length < 50) {
      throw new Error('Transcript too short or empty')
    }

    return transcriptText
  } catch (error) {
    console.error('Error fetching transcript:', error)
    throw new Error(`Could not fetch video transcript: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Function to generate course content using OpenAI
async function generateCourse(transcript: string, videoTitle?: string): Promise<any> {
  // Validate OpenAI API key
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    throw new Error('OpenAI API key is not properly configured')
  }
  const prompt = `
    You are an expert educator creating a comprehensive, practical learning course from a YouTube video transcript. Your goal is to create a course that someone can actually follow and learn from, not just read.

    Video Title: ${videoTitle || 'Unknown'}

    Transcript: ${transcript}

    CRITICAL LEARNING REQUIREMENTS:
    1. MANDATORY: Create actionable, step-by-step tutorials that someone can follow along with
    2. MANDATORY: Include specific commands, code snippets, file paths, and exact procedures from the video
    3. MANDATORY: Extract real examples and use direct quotes from the transcript
    4. MANDATORY: Make each lesson hands-on with clear "Try This" exercises
    5. MANDATORY: Include troubleshooting tips and common mistakes mentioned in the video
    6. MANDATORY: Create a logical learning progression from beginner to advanced concepts

    Create a JSON response with this EXACT structure:
    {
      "title": "Practical [Topic] Course: [Specific Skill from Video]",
      "description": "A hands-on course teaching [specific skills] with step-by-step tutorials you can follow along with",
      "chapters": [
        {
          "title": "[Specific Topic from Video]",
          "content": "COMPREHENSIVE tutorial content that teaches HOW to do something. Include:\n- Prerequisites and setup requirements\n- Step-by-step instructions with exact commands\n- Real examples from the video\n- Common pitfalls and troubleshooting\n- What you'll achieve by the end",
          "keyPoints": [
            {
              "title": "[Specific Skill/Technique from Video]",
              "steps": [
                "Step 1: [Exact action with specific details, commands, or procedures]",
                "Step 2: [Next specific action with file names/commands if mentioned]",
                "Step 3: [Continue with precise steps from the video]",
                "Step 4: [Include troubleshooting or tips mentioned]",
                "Step 5: [Verification or completion step]"
              ],
              "example": "[Real example directly from the video transcript]",
              "commands": ["[actual command1 from video]", "[specific command2 mentioned]"],
              "tryThis": "[Specific exercise the learner should try]",
              "troubleshooting": "[Common issues and solutions mentioned in video]",
              "timestamp": "[approximate time when this topic is discussed]",
              "stepImages": [
                {
                  "stepIndex": 0,
                  "description": "[What the viewer sees on screen during this step]",
                  "searchQuery": "[specific tool/interface from video]"
                }
              ],
              "resourceLinks": [
                {
                  "title": "[Relevant Documentation]",
                  "url": "[actual URL if mentioned in video]",
                  "description": "[Why this resource is useful for this step]",
                  "type": "documentation"
                }
              ]
            }
          ]
        }
      ],
      "keyConcepts": [
        "Specific technical term 1 mentioned in video",
        "Actual concept 2 discussed by speaker",
        "Real terminology 3 used in the video",
        "Important principle 4 explained",
        "Key method 5 demonstrated",
        "Essential tool 6 referenced",
        "Core technique 7 shown",
        "Fundamental approach 8 taught",
        "Critical skill 9 covered",
        "Vital process 10 explained"
      ],
      "summary": "Summary of what was actually taught and how to apply it",
      "quiz": [
        {
          "question": "[Practical question testing understanding of a key concept from the video]",
          "options": ["[Option A - specific detail from video]", "[Option B - specific detail from video]", "[Option C - specific detail from video]", "[Option D - specific detail from video]"],
          "correctAnswer": 0,
          "explanation": "[Detailed explanation with reference to specific content from the video and why this knowledge is important]"
        }
      ]
    }

    FAILURE CONDITIONS - The response will be rejected if:
    - keyPoints have empty or generic steps arrays
    - keyConcepts contains fewer than 8 items or generic placeholders
    - Content is not extracted from the actual video transcript
    - Steps are vague instead of specific and actionable
    - No real commands, tools, or procedures are mentioned when they exist in the video

    SUCCESS CRITERIA - The response must:
    - Extract REAL steps that someone can follow to achieve the same results as shown in the video
    - Include ACTUAL commands, file paths, tool names, or procedures mentioned by the speaker
    - Have 5+ detailed steps for each keyPoint
    - List 8-12 specific concepts that were genuinely discussed in the video
    - Provide actionable content that directly relates to the video's content
    - Generate stepImages array with relevant search queries for visual examples (e.g., "VS Code interface", "terminal command line", "github repository")

    STEP IMAGES REQUIREMENTS:
    - For each step in the steps array, create a corresponding stepImages entry with EXACT keywords from the video
    - Extract the SPECIFIC tool names, interface elements, and UI components the speaker actually shows or mentions
    - Use precise search queries like: "vscode terminal integrated", "github new repository", "cloud code browser tab", "npm install terminal"
    - If speaker mentions specific tools (VS Code, GitHub, Terminal, Chrome DevTools, etc.), use those exact names
    - Focus on the ACTUAL interfaces shown in the video, not generic development images
    - Include specific UI elements like "file explorer panel", "command palette", "settings menu", "browser developer tools"

    RESOURCE LINKS REQUIREMENTS:
    - Generate 2-4 useful resourceLinks for each keyPoint based on tools/technologies mentioned in the video
    - Include REAL, working URLs to official documentation, downloads, tutorials, and examples
    - Use actual URLs like: "https://code.visualstudio.com/docs/", "https://github.com/", "https://nodejs.org/", "https://docs.docker.com/"
    - Types: "documentation" (official docs), "tutorial" (guides), "tool" (web tools), "download" (software downloads), "example" (code examples)
    - Only include links that are directly relevant to the specific tools, commands, or concepts mentioned in that keyPoint
    - Provide helpful descriptions that explain why each link is useful for that specific step
  `

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert educator who creates structured learning courses from video content. CRITICAL: You must respond with ONLY valid JSON. Do not include any markdown formatting, code blocks, or any text before or after the JSON. Return only the raw JSON object.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content generated')
    }

    // Parse the JSON response, handling potential markdown wrapping
    let jsonContent = content.trim()

    // Remove markdown code block wrapper if present
    if (jsonContent.startsWith('```json')) {
      jsonContent = jsonContent.slice(7) // Remove ```json
    }
    if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.slice(3) // Remove ```
    }
    if (jsonContent.endsWith('```')) {
      jsonContent = jsonContent.slice(0, -3) // Remove closing ```
    }

    jsonContent = jsonContent.trim()

    const courseData = JSON.parse(jsonContent)
    return courseData
  } catch (error) {
    console.error('Error generating course:', error)

    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON response from AI: ${error.message}`)
    }

    throw new Error(`Could not generate course content: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Extract video ID from URL
    const videoId = extractVideoId(url)
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    // Get transcript first
    console.log('Attempting to fetch transcript for video ID:', videoId)

    let transcript
    try {
      transcript = await getTranscript(videoId)
      console.log('Transcript length:', transcript?.length || 0)
    } catch (error) {
      console.error('Transcript fetch error:', error)
      return NextResponse.json({
        error: `Could not fetch transcript: ${error instanceof Error ? error.message : 'Unknown error'}`
      }, { status: 400 })
    }

    if (!transcript || transcript.length < 100) {
      console.log('Transcript too short or empty')
      return NextResponse.json({
        error: `Could not fetch transcript or transcript too short. Length: ${transcript?.length || 0}`
      }, { status: 400 })
    }

    // Require OpenAI API key for course generation
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return NextResponse.json({
        error: 'OpenAI API key is required to generate course content. Please add your API key to the environment variables.'
      }, { status: 400 })
    }

    // Generate course content with OpenAI
    const courseData = await generateCourse(transcript)

    return NextResponse.json({
      success: true,
      course: courseData,
      videoId,
      videoThumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 })
  }
}