# Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# OpenAI API Configuration
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Set a custom model (defaults to gpt-3.5-turbo)
# OPENAI_MODEL=gpt-3.5-turbo

# Optional: Set max tokens for course generation (defaults to 4000)
# OPENAI_MAX_TOKENS=4000

# Optional: Set temperature for AI responses (defaults to 0.7)
# OPENAI_TEMPERATURE=0.7
```

## Setup Instructions

1. **Get OpenAI API Key:**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Sign up or log in to your account
   - Create a new API key
   - Copy the key (it starts with `sk-`)

2. **Create Environment File:**
   ```bash
   # In the project root directory
   touch .env.local
   ```

3. **Add Your API Key:**
   ```bash
   # Edit .env.local and replace 'your_openai_api_key_here' with your actual API key
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

4. **Verify Setup:**
   - The `.env.local` file should be in your `.gitignore` (it already is)
   - Restart your development server after adding the environment variables
   - Test the application with a YouTube URL

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your API key secure and don't share it publicly
- Consider using environment-specific keys for development vs production
- Monitor your OpenAI usage to avoid unexpected charges

## Troubleshooting

If you encounter API key errors:
1. Verify the key is correctly set in `.env.local`
2. Check that the key starts with `sk-`
3. Ensure you have sufficient credits in your OpenAI account
4. Restart the development server after making changes
