# Contributing to Sender

First off, thank you for considering contributing to Sender! It's people like you that make Sender such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots if relevant**
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Follow the JavaScript/React style guide
- Include appropriate test cases
- Update documentation as needed
- End all files with a newline

## Development Setup

1. **Fork and clone the repository**
```bash
git clone https://github.com/your-username/sender.git
cd sender
```

2. **Install dependencies**
```bash
npm install
cd client && npm install && cd ..
```

3. **Create a branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

4. **Set up environment**
```bash
cp .env.example .env
# Edit .env with your development settings
```

5. **Start MongoDB**
```bash
mongod
```

6. **Seed the database**
```bash
npm run seed
```

7. **Start development servers**
```bash
# Terminal 1: Backend
npm run dev

# Terminal 2: Frontend
cd client && npm run dev
```

## Project Structure

```
sender/
├── server/           # Backend Express application
│   ├── models/      # Mongoose models
│   ├── routes/      # API routes
│   └── middleware/  # Custom middleware
├── client/          # Frontend React application
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       ├── context/     # React context
│       └── services/    # API services
└── tests/           # Test files (to be added)
```

## Coding Style

### JavaScript/Node.js

- Use ES6+ features
- Use `const` and `let`, not `var`
- Use arrow functions where appropriate
- Use async/await over callbacks
- Meaningful variable and function names
- Add comments for complex logic

### React

- Use functional components with hooks
- Keep components small and focused
- Use PropTypes or TypeScript for props
- Follow the Container/Presentational pattern
- Extract reusable logic into custom hooks

### CSS

- Use existing classes when possible
- Follow BEM naming convention for new classes
- Keep styles modular and scoped
- Use semantic class names

## Testing

Currently, the project doesn't have a comprehensive test suite. We welcome contributions to add tests!

### Adding Tests

When adding tests:
- Use Jest for unit tests
- Use React Testing Library for component tests
- Use Supertest for API tests
- Aim for high code coverage
- Test edge cases and error conditions

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

Types:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect the code meaning
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding missing tests
- **chore**: Changes to the build process or auxiliary tools

Example:
```
feat: Add email filtering by date range

- Add date picker components
- Implement backend filtering logic
- Update API documentation

Closes #123
```

## Code Review Process

1. Create a pull request with a clear title and description
2. Link related issues
3. Ensure all tests pass
4. Wait for maintainer review
5. Address any feedback
6. Once approved, a maintainer will merge

## What to Contribute

### Good First Issues

Look for issues labeled `good first issue` - these are great for newcomers!

### Help Wanted

Issues labeled `help wanted` are features or bugs that need contributors.

### Priority Areas

Current priorities:
- Adding comprehensive tests
- Improving error handling
- Enhancing email search and filtering
- Mobile responsiveness improvements
- Performance optimization
- Accessibility improvements
- Internationalization (i18n)

## Feature Requests

Before implementing a major feature:
1. Open an issue to discuss it
2. Wait for maintainer feedback
3. Once approved, implement and submit PR

This prevents wasted effort on features that might not align with the project goals.

## Questions?

Feel free to:
- Open a GitHub issue with the `question` label
- Join our community discussions
- Email: support@sender.example.com

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the project README

Thank you for contributing to Sender! 🎉
