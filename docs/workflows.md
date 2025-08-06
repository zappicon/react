# GitHub Workflows Documentation

This project uses several GitHub workflows to ensure code quality, security, and automated publishing.

## Workflows Overview

### 1. CI Workflow (`.github/workflows/ci.yaml`)

**Triggers:** Pull requests and pushes to main branch  
**Purpose:** Run comprehensive tests and quality checks

**What it does:**

- Tests on multiple Node.js versions (18, 20, 22)
- Runs linting checks
- Executes test suite with coverage
- Builds the package
- Type checking via TypeScript compilation
- Bundle size analysis
- Uploads coverage to Codecov (optional)

### 2. Publish Workflow (`.github/workflows/publish.yaml`)

**Triggers:** Push to main branch  
**Purpose:** Automatically publish to npm when version changes

**What it does:**

- **Quality Gates:** Always runs comprehensive checks first (lint, test, build)
- **Version Detection:** Compares current version with previous commit
- **Smart Publishing:** Only publishes if version changed and doesn't exist on npm
- **Safety Checks:** Validates package contents and checks npm registry
- **Git Tagging:** Creates release tags automatically
- **Detailed Logging:** Clear status messages for each step

### 3. Security Workflow (`.github/workflows/security.yaml`)

**Triggers:** Weekly schedule, pushes, and pull requests  
**Purpose:** Monitor dependencies for security vulnerabilities

**What it does:**

- Runs `pnpm audit` to check for known vulnerabilities
- Dependency review for pull requests
- Allows only approved licenses (MIT, Apache-2.0, BSD, ISC)
- Weekly automated security scans

### 4. Update Dependencies Workflow (`.github/workflows/update-dependencies.yaml`)

**Triggers:** Monthly schedule or manual trigger  
**Purpose:** Keep dependencies up to date

**What it does:**

- Updates all dependencies to latest versions
- Runs full test suite after updates
- Creates automated pull requests with dependency updates
- Only runs on the main repository (not forks)

## Manual Publishing Process

Since you've removed changesets, here's how to publish manually:

### Option 1: Using npm scripts (Recommended)

```bash
# For patch release (0.1.2 → 0.1.3)
pnpm run release:patch

# For minor release (0.1.2 → 0.2.0)
pnpm run release:minor

# For major release (0.1.2 → 1.0.0)
pnpm run release:major
```

### Option 2: Manual version bump

```bash
# 1. Update version in package.json manually
npm version patch  # or minor/major

# 2. Push with tags
git push --follow-tags

# 3. GitHub workflow will automatically publish
```

### Option 3: Direct publishing (not recommended)

```bash
# Only if you need to bypass the workflow
pnpm run validate  # Run all checks first
pnpm publish
```

## Required Secrets

Add these secrets to your GitHub repository:

- `NPM_TOKEN`: Your npm authentication token for publishing

## Quality Assurance

The workflows enforce these quality standards:

- ✅ **Linting:** ESLint checks for code style and potential issues
- ✅ **Testing:** Jest tests with coverage reporting
- ✅ **Type Safety:** TypeScript compilation ensures type correctness
- ✅ **Build Validation:** Ensures package builds successfully
- ✅ **Security:** Regular dependency vulnerability scanning
- ✅ **Multi-Node Support:** Tests on Node.js 18, 20, and 22

## Workflow Status

You can monitor workflow status in the GitHub Actions tab. Each workflow provides detailed logs and clear success/failure indicators.

## Troubleshooting

### Publishing Issues

1. **Version not changed:** Workflow skips publishing if version hasn't changed
2. **Already exists on npm:** Workflow checks npm registry before publishing
3. **Failed quality checks:** Fix linting, tests, or build errors first

### Security Issues

1. **Audit failures:** Run `pnpm audit --fix` to resolve vulnerabilities
2. **License issues:** Only approved licenses are allowed (see security.yaml)

### Dependency Updates

1. **Failed after update:** Dependency updates may break tests - review and fix
2. **Manual trigger:** Use "Run workflow" button in Actions tab for immediate updates
