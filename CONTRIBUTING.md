# Contributing

First off, thanks for taking the time to contribute! These are the guidelines for contributing to this project.

## Code of Conduct

All contributors are expected to adhere to the [Code of Conduct](CODE_OF_CONDUCT.md). 

## Reporting Issues

Before writing any code, please [open an issue](https://github.com/jrwnnnn/rekord/issues) or comment on an existing one. This ensures we do not have multiple people working on the same feature and allows us to discuss the approach before you invest time in building it.

## Development Setup

Make sure you have the latest LTS version of [Node.js](https://nodejs.org/en/download/current) installed.

Clone the repository:

```bash
git clone https://github.com/jrwnnnn/rekord.git
cd rekord
```

Install the required dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev       # optional: pass --host flag to expose the server to the local network
```

Bundle the project for production:

```bash
npm run build
```

## Development Guidelines

### Branching Strategy

- `main` contains the latest stable development code.
- Create a new branch for each feature or bug fix. Use descriptive names, e.g., `feat/new-feature-name` or `fix/issue-description`.

### Testing

Ensure all checks pass before submitting a pull request by running:

```bash
npm run test

```

### Code Style

This project enforces a consistent code style using [Prettier](https://prettier.io/). 

A `.prettierrc` file is included in the project root to configure Prettier. Please ensure that your code adheres to the formatting rules defined in this file before submitting a pull request.

### Commit Messages

Follow the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) specification.

## Submitting a Pull Request
1. Push your branch to your fork.
2. Open a Pull Request against the main branch.
3. Provide a concise summary of changes, problem analysis, and testing steps in the PR description.
4. Ensure continuous integration checks pass.
5. Address reviewer feedback promptly.
