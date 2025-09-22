# CSS Build Error Fixes

## Problem
CSS parser fails with escaped characters and pseudo-class syntax

## Root Cause
Next.js CSS parser doesn't recognize:
- Escaped backslashes (`\\`)
- Complex pseudo-class combinations
- Tailwind-style class naming with colons

## Solution
Use simple class names without special characters

## Fixed Class Names
| Old (Broken) | New (Fixed) |
|-------------|-------------|
| `hover:bg-gray-100` | `hover-bg-gray-100` |
| `disabled:opacity-50` | `disabled-opacity-50` |
| `md:grid-cols-3` | `md-grid-cols-3` |
| `w-5\\/6` | `w-5-6` |

## Prevention
1. **Never use escaped characters** in CSS class names
2. **Use hyphens instead of colons** for pseudo-states
3. **Use hyphens instead of slashes** for fractions
4. **Test CSS immediately** after changes