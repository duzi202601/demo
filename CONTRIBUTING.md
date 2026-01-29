# Contributing Guidelines

Thank you for your interest in contributing to this project! Please follow these guidelines to ensure accessibility in all contributions.

## Accessibility Requirements

All contributions must meet the following accessibility requirements:

### Code Contributions

1. **Semantic HTML**
   - Use appropriate semantic elements for structure
   - Avoid using `<div>` and `<span>` for interactive elements
   - Use heading levels correctly (don't skip levels)

2. **Images and Media**
   - All images must have meaningful `alt` text
   - Decorative images should use `alt=""`
   - Video content should have captions
   - Audio content should have transcripts

3. **Forms**
   - All form inputs must have associated labels
   - Use proper input types (email, tel, number, etc.)
   - Provide clear error messages
   - Mark required fields appropriately

4. **Interactive Elements**
   - Buttons and links must have accessible names
   - Custom components must include ARIA attributes
   - Focus management must be handled properly
   - No keyboard traps

5. **Color and Styling**
   - Color contrast must meet WCAG AA standards (4.5:1 for normal text)
   - Information must not rely solely on color
   - Focus states must be visible
   - Animations should respect `prefers-reduced-motion`

### Documentation

- Use clear, simple language
- Provide alternative text descriptions for diagrams
- Structure documents with proper headings
- Include accessibility considerations in feature documentation

### Testing

Before submitting a pull request:

1. Test with keyboard navigation only
2. Run automated accessibility checks (Lighthouse, axe)
3. Test with at least one screen reader if making UI changes
4. Verify color contrast ratios

### Pull Request Checklist

- [ ] Code follows semantic HTML principles
- [ ] All images have appropriate alt text
- [ ] Forms have proper labels and error handling
- [ ] Interactive elements are keyboard accessible
- [ ] Color contrast requirements are met
- [ ] Changes have been tested for accessibility

## Questions?

If you have questions about accessibility requirements, please open an issue for discussion.
