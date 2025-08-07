# GitHub Actions Setup Guide

This guide provides step-by-step instructions for setting up automated publishing with GitHub Actions for the @zappicon/react icon library.

## Overview

The automated publishing workflow:

- Detects version changes in `package.json`
- Runs quality checks (build, test, lint)
- Automatically publishes to npm when version is bumped
- Creates git tags for the new version
- Creates GitHub releases with commit messages
- Automatically updates CHANGELOG.md
- Supports semantic versioning and conventional commits

## Prerequisites

Before setting up GitHub Actions, ensure you have:

1. **GitHub Repository**: Repository with admin access
2. **NPM Account**: Account with publishing permissions
3. **Package Configuration**: Properly configured `package.json`
4. **Local Development**: Working local development environment

## Step 1: NPM Token Setup

### 1.1 Generate NPM Access Token

1. Log in to [npmjs.com](https://www.npmjs.com)
2. Go to **Account Settings** → **Access Tokens**
3. Click **Generate New Token**
4. Select **Automation** type for CI/CD usage
5. Copy the generated token (starts with `npm_`)

### 1.2 Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **Add secret**

## Step 2: Workflow File Creation

### 2.1 Create Workflow Directory

Create the GitHub Actions workflow directory structure:

```bash
mkdir -p .github/workflows
```

### 2.2 Create Publish Workflow

Create `.github/workflows/publish.yml`:

````yaml
name: Publish to NPM

on:
  push:
    branches: [main]

jobs:
  check-version:
    runs-on: ubuntu-latest
    outputs:
      version-changed: ${{ steps.version-check.outputs.changed }}
      current-version: ${{ steps.version-check.outputs.current_version }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Check if version changed
        id: version-check
        run: |
          current_version=$(node -p "require('./package.json').version")
          echo "current_version=$current_version" >> $GITHUB_OUTPUT

          if git diff HEAD~1 HEAD --name-only | grep -q "package.json"; then
            prev_version=$(git show HEAD~1:package.json | node -p "JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf8')).version")
            if [ "$current_version" != "$prev_version" ]; then
              echo "changed=true" >> $GITHUB_OUTPUT
              echo "Version changed from $prev_version to $current_version"
            else
              echo "changed=false" >> $GITHUB_OUTPUT
              echo "Version unchanged: $current_version"
            fi
          else
            echo "changed=false" >> $GITHUB_OUTPUT
            echo "package.json not modified"
          fi

  publish:
    needs: check-version
    if: needs.check-version.outputs.version-changed == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          registry-url: "https://registry.npmjs.org"

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build package
        run: pnpm run build

      - name: Run tests
        run: pnpm run test

      - name: Run linting
        run: pnpm run lint

      - name: Publish to NPM
        run: pnpm publish --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Get commit message
        id: commit_message
        run: echo "message=$(git log -1 --pretty=%B)" >> $GITHUB_OUTPUT

      - name: Create and push tag
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git tag -a "v${{ needs.check-version.outputs.current-version }}" -m "Release v${{ needs.check-version.outputs.current-version }}"
          git push origin "v${{ needs.check-version.outputs.current-version }}"

      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v${{ needs.check-version.outputs.current-version }}
          release_name: Release v${{ needs.check-version.outputs.current-version }}
          body: |
            ## Release v${{ needs.check-version.outputs.current-version }}

            ${{ steps.commit_message.outputs.message }}

            ### Package Information
            - **Package**: @zappicon/react
            - **Version**: ${{ needs.check-version.outputs.current-version }}

            ### Installation
            ```bash
            npm install @zappicon/react@${{ needs.check-version.outputs.current-version }}
            ```
          draft: false
          prerelease: false

      - name: Update CHANGELOG.md
        run: |
          current_date=$(date '+%Y-%m-%d')
          cp CHANGELOG.md CHANGELOG.md.bak
          {
            echo "# Changelog"
            echo ""
            echo "All notable changes to this project will be documented in this file."
            echo ""
            echo "The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),"
            echo "and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)."
            echo ""
            echo "## [v${{ needs.check-version.outputs.current-version }}] - $current_date"
            echo ""
            echo "### Changes"
            echo ""
            echo "${{ steps.commit_message.outputs.message }}"
            echo ""
            tail -n +7 CHANGELOG.md.bak
          } > CHANGELOG.md
          rm CHANGELOG.md.bak

      - name: Commit and push changelog update
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add CHANGELOG.md
          git commit -m "docs: update CHANGELOG.md for v${{ needs.check-version.outputs.current-version }}"
          git push origin main
````

## Step 3: Package Configuration

### 3.1 Verify package.json

Ensure your `package.json` has the required fields:

```json
{
  "name": "@zappicon/react",
  "version": "0.1.6",
  "description": "React icon library with 1,110+ SVG icons",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "build": "pnpm run clean && pnpm run svgr && rollup -c",
    "test": "jest",
    "lint": "eslint ."
  }
}
```

### 3.2 Required Scripts

Ensure these npm scripts are defined:

- **`build`**: Compiles the package
- **`test`**: Runs test suite
- **`lint`**: Checks code quality

## Step 4: Version Management

### 4.1 Semantic Versioning

Follow semantic versioning (SemVer):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes, backward compatible

### 4.2 Version Bump Process

To trigger publishing:

1. **Update version in package.json**:

   ```bash
   npm version patch  # 0.1.6 → 0.1.7
   npm version minor  # 0.1.6 → 0.2.0
   npm version major  # 0.1.6 → 1.0.0
   ```

2. **Commit and push**:

   ```bash
   git add package.json
   git commit -m "bump: version to 0.1.7"
   git push origin main
   ```

3. **Automatic publishing**: GitHub Actions detects the version change and publishes

## Step 5: Automated Release Features

After successful publishing, the workflow automatically:

### 5.1 Git Tagging

- Creates an annotated git tag with the version number (e.g., `v0.1.7`)
- Pushes the tag to the repository
- Tag includes release message

### 5.2 GitHub Release Creation

- Creates a GitHub release attached to the new tag
- Includes the commit message in the release notes
- Provides package information and installation instructions
- Links the release to the specific version

### 5.3 Changelog Updates

- Automatically updates `CHANGELOG.md` with the new version
- Adds the current date and commit message
- Maintains the Keep a Changelog format
- Commits and pushes the changelog update

## Step 6: Workflow Monitoring

### 6.1 Check Workflow Status

Monitor workflow execution:

1. Go to repository **Actions** tab
2. Click on latest workflow run
3. Monitor job progress and logs

### 6.2 Common Issues and Solutions

#### Issue: "unclean working tree"

**Solution**: Use `--no-git-checks` flag (already included)

#### Issue: NPM authentication failed

**Solution**:

- Verify NPM_TOKEN secret exists
- Check token has publishing permissions
- Ensure token hasn't expired

#### Issue: Version not detected

**Solution**:

- Ensure package.json version was actually changed
- Check commit includes package.json modifications

#### Issue: Build/test failures

**Solution**:

- Run locally first: `pnpm install && pnpm run build && pnpm run test`
- Fix any failing tests or build errors
- Commit fixes before version bump

## Step 7: Best Practices

### 7.1 Pre-publish Checklist

Before bumping version:

- [ ] All tests pass locally
- [ ] Build completes successfully
- [ ] Lint checks pass
- [ ] CHANGELOG.md updated
- [ ] Documentation updated if needed

### 7.2 Release Process

1. **Development**: Make changes on feature branch
2. **Testing**: Ensure all checks pass
3. **Documentation**: Update CHANGELOG.md
4. **Version Bump**: Update package.json version
5. **Commit**: Use conventional commit format
6. **Push**: Trigger automated publishing

### 7.3 Conventional Commits

Use conventional commit format for better changelog generation:

```bash
feat: add new icon variants
fix: resolve icon rendering issue
docs: update README with examples
ci: improve workflow performance
```

## Step 8: Advanced Configuration

### 8.1 Conditional Publishing

Modify workflow to publish only for specific branches:

```yaml
on:
  push:
    branches: [main, release/*]
```

### 8.2 Pre-release Versions

For beta/alpha releases:

```bash
npm version prerelease --preid=beta  # 0.1.6-beta.1
```

### 8.3 Manual Workflow Trigger

Add manual trigger option:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch: # Manual trigger
```

## Troubleshooting

### Common Error Messages

1. **"Version not changed"**

   - Verify package.json version was modified
   - Check git diff includes package.json

2. **"NPM publish failed"**

   - Verify NPM_TOKEN secret
   - Check package name availability
   - Ensure version doesn't already exist

3. **"Build failed"**
   - Run build locally first
   - Check for missing dependencies
   - Verify Node.js version compatibility

### Debug Steps

1. **Check workflow logs** in GitHub Actions tab
2. **Run commands locally** to reproduce issues
3. **Verify secrets** are properly configured
4. **Test with dry run**:

   ```bash
   pnpm publish --dry-run
   ```

## Maintenance

### Regular Tasks

- **Monitor workflow runs** for failures
- **Update dependencies** in workflow file
- **Rotate NPM tokens** annually
- **Review and update** workflow as needed

### Security Considerations

- Use **repository secrets** for sensitive data
- **Rotate tokens** regularly
- **Limit token permissions** to publishing only
- **Monitor package downloads** for suspicious activity

## Support

If you encounter issues:

1. Check this documentation
2. Review GitHub Actions logs
3. Test commands locally
4. Check npm and GitHub status pages

---

_This workflow ensures reliable, automated publishing while maintaining code quality and security best practices._
