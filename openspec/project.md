# Project Context

## Purpose
This project aims to create a social media management tool focused on Facebook integration, enabling users to manage advertisements and respond to consumers without requiring official business company papers. The system will provide a streamlined interface for individuals and freelancers to interact with Facebook's APIs for ad management and consumer communication. The application will primarily support Arabic language users with English as a secondary option.

## Tech Stack
- JavaScript/TypeScript (primary language)
- Node.js (backend runtime)
- React.js (frontend framework)
- Facebook Graph API (for social media integration)
- REST API architecture
- OAuth 2.0 (for Facebook authentication)
- JSON Web Tokens (JWT) for session management
- i18next (for internationalization and Arabic language support)

## Project Conventions

### Code Style
- Use ES6+ syntax with proper linting
- Follow Airbnb JavaScript/TypeScript style guide
- Implement consistent naming conventions:
  - Components: PascalCase
  - Functions/Variables: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Files: kebab-case
- Maintain 80-100 character line length
- Use meaningful variable and function names
- Add JSDoc comments for all public functions
- All UI text and labels must support Arabic RTL layout

### Architecture Patterns
- Follow MVC (Model-View-Controller) pattern
- Implement separation of concerns between frontend and backend
- Use modular design with clear boundaries
- Apply dependency injection where appropriate
- Implement proper error handling and logging
- Use environment variables for configuration
- Design UI components with RTL (Right-to-Left) support as default

### Testing Strategy
- Unit tests for all business logic functions
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- Minimum 80% code coverage
- Use Jest for testing framework
- Implement test-driven development for new features
- Include Arabic language testing in all UI tests

### Git Workflow
- Use feature branches for new development
- Follow conventional commit messages:
  - feat: for new features
  - fix: for bug fixes
  - docs: for documentation
  - style: for formatting changes
  - refactor: for code refactoring
  - test: for adding tests
  - chore: for maintenance tasks
- Require pull requests for all changes
- Ensure CI/CD pipeline passes before merging

## Domain Context
This project operates in the social media management domain, specifically focusing on Facebook's ecosystem. Key domain concepts include:
- Facebook App ID and App Secret for API authentication
- Facebook Pages for business representation
- Ad campaigns and ad sets for marketing
- Consumer messaging and engagement
- API rate limiting and permissions
- OAuth 2.0 authentication flow
- Facebook's platform policies and compliance requirements
- Arabic language support for Middle East and North Africa markets
- RTL (Right-to-Left) text direction for Arabic content

## Important Constraints
- Must comply with Facebook's API terms of service
- Respect rate limits imposed by Facebook's APIs
- Handle authentication tokens securely
- Ensure user data privacy and protection
- Maintain compatibility with Facebook's API changes
- Scale appropriately for individual/freelancer use (not enterprise)
- Work within Facebook's limitations for non-verified business accounts
- All UI must properly support Arabic RTL layout and text rendering
- Content generation must support Arabic language with proper grammar and context

## External Dependencies
- Facebook Graph API (primary external service)
- Facebook Marketing API (for ad management)
- Facebook Messenger API (for consumer communication)
- OAuth 2.0 providers (Facebook authentication)
- Cloud hosting provider (for deployment)
- Database service (for user data storage)
- Email service (for notifications)
- Arabic language content generation APIs (for AI-powered content)
- RTL CSS frameworks and libraries for proper Arabic display
