# Parallel Development Workflow

This document outlines the workflow for simultaneous development using Claude Code and Cursor IDE.

## 🔄 Current Branch Structure

```
main                    ← Production branch
├── feature/ai-improvements     ← Claude Code work (Backend/AI)
└── feature/ui-improvements     ← Cursor IDE work (Frontend/UX)
```

## 👥 Responsibility Division

### Claude Code (Backend/AI Focus)
**Branch**: `feature/ai-improvements`
**Files**:
- `app/api/generate-course/route.ts` (AI processing logic)
- `types/course.ts` (type definitions)
- New utility files for AI processing
- Documentation updates

**Current Tasks**:
- [x] GPT-4 model upgrade
- [x] Transcript fallback system
- [ ] Content validation system
- [ ] Quality scoring algorithm

### Cursor IDE (Frontend/UX Focus)
**Branch**: `feature/ui-improvements`
**Files**:
- `app/page.tsx` (main UI)
- `components/CourseDisplay.tsx` (course display)
- `app/globals.css` (styling)
- Component refinements

**Suggested Tasks**:
- [ ] Real-time progress indicators
- [ ] Interactive course navigation
- [ ] Quality score display UI
- [ ] Better loading animations
- [ ] Export functionality UI

## 🚀 Workflow Commands

### For Cursor IDE
```bash
# Start working on UI improvements
git checkout main
git pull origin main
git checkout -b feature/ui-improvements

# After making changes
git add .
git commit -m "feat: improve loading animations and progress indicators"
git push origin feature/ui-improvements

# When ready to merge
git checkout main
git pull origin main
git merge feature/ui-improvements
git push origin main
```

### For Claude Code
```bash
# Already on feature/ai-improvements branch
# After making changes
git add .
git commit -m "feat: upgrade to GPT-4 and add transcript fallbacks"
git push origin feature/ai-improvements

# When ready to merge
git checkout main
git pull origin main
git merge feature/ai-improvements
git push origin main
```

## 🔄 Sync Protocol

### Before Starting Work
1. Pull latest changes: `git pull origin main`
2. Check what the other tool is working on
3. Announce your focus area

### During Work
- Commit frequently with descriptive messages
- Push to your feature branch regularly
- Avoid modifying the same files simultaneously

### When Ready to Merge
1. `git checkout main`
2. `git pull origin main` (get latest changes)
3. `git merge feature/your-branch`
4. Resolve any conflicts if they exist
5. Test the merged changes
6. `git push origin main`

## 🚨 Conflict Resolution

If conflicts occur:
```bash
# During merge
git merge feature/other-branch
# Fix conflicts in files
git add .
git commit -m "resolve: merge conflicts between ai and ui improvements"
git push origin main
```

## 📋 Current Status

- **Claude Code**: Working on AI improvements (GPT-4 upgrade, transcript reliability)
- **Cursor IDE**: Focus on UI/UX enhancements (loading, navigation, styling)
- **Next Sync**: After each completes current task set

## 🎯 Success Metrics

- No merge conflicts
- Both tools can push changes independently
- Features integrate smoothly
- Faster development velocity