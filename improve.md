# Improvement Plan

## Critical Issues (Performance & Robustness)

### 1. **Memory Leak in Favicon Rotation**
- `startUniqueFaviconRotation()` creates an interval but never clears it
- Interval continues running even after component unmount
- **Fix**: Return cleanup function from favicon manager

### 2. **Content Duplication**
- Mobile and Desktop layouts duplicate all content (experience, education, skills, projects, contact)
- Violates DRY principle
- Increases bundle size and maintenance burden
- **Fix**: Extract content to shared constants, create reusable components

### 3. **TypeScript Strict Mode Disabled**
- `tsconfig.json` has `"strict": false`
- Allows unsafe type operations
- **Fix**: Enable strict mode and fix type errors

### 4. **No Error Boundaries**
- Client components can crash entire app
- No graceful error handling for runtime failures
- **Fix**: Add error boundary wrapper

### 5. **Unsafe Window Access**
- Direct `window.open()` calls without checks
- Direct `window.innerWidth` access could fail during SSR
- **Fix**: Add proper window existence checks

### 6. **Missing Favicon Error Handling**
- Favicon operations can fail silently
- Canvas operations not wrapped in try-catch
- **Fix**: Add error handling in favicon-manager

### 7. **Unthrottled Resize Listener**
- Resize handler fires on every pixel change
- Can cause performance issues during window resize
- **Fix**: Throttle or debounce resize handler

### 8. **No TypeScript for favicon-manager.js**
- Plain JavaScript file in TypeScript project
- No type safety
- **Fix**: Convert to TypeScript

## Code Quality Issues

### 9. **Hard-coded Content**
- All portfolio data embedded in JSX
- Makes updates error-prone
- **Fix**: Extract to data constants file

### 10. **Missing Accessibility**
- No ARIA labels on interactive elements
- No skip navigation link
- No semantic landmarks in some areas
- **Fix**: Add proper ARIA attributes and semantic HTML

### 11. **Repeated Content in Site**
- Contact information appears 3 times (mobile contact, mobile header click, desktop contact, desktop sidebar)
- Skills information duplicated in different formats
- Location appears in multiple places
- **Fix**: Unify contact display logic

### 12. **No Loading States**
- Fonts could cause FOIT/FOUT
- No loading indicator
- **Fix**: Add font loading strategy

### 13. **Unused CSS Classes**
- Several animation classes defined but not used
- **Fix**: Remove unused styles

### 14. **Magic Numbers**
- Hard-coded values (768px breakpoint, 20000ms interval, etc.)
- **Fix**: Extract to constants

### 15. **Inconsistent Spacing**
- Desktop uses clamp(), mobile uses fixed values
- **Fix**: Use consistent approach

## Best Practices

### 16. **Missing Key Props Validation**
- Array maps use index as key
- **Fix**: Use stable identifiers

### 17. **Inline Styles in JSX**
- Performance impact from style recalculation
- **Fix**: Move to CSS classes where possible

### 18. **Multiple Render Paths**
- Separate mobile/desktop components
- **Fix**: Use single component with responsive CSS

### 19. **No Memoization for Callbacks**
- Some callbacks passed to memoized components not wrapped
- **Fix**: Wrap all callbacks with useCallback

### 20. **Font Preload Strategy**
- Fonts loaded but not optimally preloaded
- **Fix**: Add proper font-display strategy

## Implementation Order

1. Fix critical memory leak (favicon rotation)
2. Add error boundaries and error handling
3. Enable TypeScript strict mode
4. Extract and deduplicate content
5. Convert favicon-manager to TypeScript
6. Add throttling to resize handler
7. Add accessibility improvements
8. Extract magic numbers to constants
9. Optimize performance (memoization, lazy loading)
10. Clean up unused CSS and optimize styles
