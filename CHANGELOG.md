# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.5] - 2025-08-06

### Workflow Optimization

- Fixed GitHub Actions workflow step order: build before test
- Ensure tests run against built components for accurate validation
- Optimized workflow execution sequence

## [0.1.4] - 2025-08-06

### CI/CD Fixes

- Fixed GitHub Actions workflow to use `pnpm install` instead of `pnpm ci`
- Resolved publish workflow dependency installation issues
- Improved automated npm publishing reliability

## [0.1.3] - 2025-08-06

### Documentation & Project Management

- Added comprehensive CHANGELOG.md following Keep a Changelog format
- Documented complete version history from initial release to current state
- Added project statistics, icon categories, and migration guides
- Improved project documentation structure
- Added git tags for all historical versions (v0.0.1, v0.1.0, v0.1.1, v0.1.2)
- Established proper semantic versioning workflow
- Enhanced release management process

## [0.1.2] - 2025-08-06

### CI/CD Improvements

- Fixed GitHub Actions workflow configuration for automated publishing
- Improved CI/CD pipeline reliability
- Migrated from changesets to custom GitHub Actions workflow for version management
- Enhanced publish workflow with proper version change detection

## [0.1.1] - 2025-08-05

### New Features

- Comprehensive README documentation with usage examples
- Enhanced package configuration for optimal tree-shaking
- Support for individual icon imports (`@zappicon/react/icons/*`)
- Improved TypeScript support with proper type definitions

### Improvements

- Enhanced package.json exports configuration for better module resolution
- Optimized bundle size with tree-shaking improvements

### Documentation

- Added detailed installation instructions
- Added comprehensive usage examples
- Added feature highlights and benefits
- Added customization guide
- Added TypeScript usage examples

## [0.1.0] - 2025-08-04

### Major Features

- **1,110 SVG icons** across 5 different visual variants:
  - Filled: Bold, solid icons for primary actions
  - Regular: Balanced stroke icons for general use
  - Light: Thin stroke icons for subtle interfaces
  - Duotone: Two-tone icons with depth and hierarchy
  - Duotone Line: Outlined duotone icons for modern designs

### Breaking Changes

- **BREAKING**: Migrated package to `@zappicon` organization scope
- Package name changed from previous scope to `@zappicon/react`
- Reorganized package.json scripts for better workflow clarity

### Infrastructure

- Added automated versioning and releases with changesets
- Migrated from npm to pnpm package manager
- Added commitlint for automated commit message validation
- Added comprehensive Jest testing framework with test suite
- Added Husky for automated Git hooks and code quality enforcement
- Added ESLint configuration for code quality and consistency

### Technical Features

- Zero external dependencies - pure React components
- Full TypeScript support with proper type definitions
- Tree-shakeable architecture - only bundle icons you use
- Modern React 19+ compatibility
- SVG-based icons that scale perfectly on any device
- Customizable with CSS or inline styles
- Support for both ESM and CommonJS module formats

### Developer Experience

- Automated pre-commit hooks for code quality
- Comprehensive test coverage
- Linting and formatting rules
- Type checking and validation
- Modern build toolchain with Rollup

## [0.0.1] - 2025-08-03

### Initial Release

- Initial project setup and foundation
- Core icon processing pipeline
- Basic React component generation
- SVG optimization and transformation
- Build system configuration

---

## Project Statistics

- **Total Icons**: 1,110 unique icons
- **Icon Variants**: 5 (Filled, Regular, Light, Duotone, Duotone Line)
- **Bundle Formats**: ESM, CommonJS
- **TypeScript**: Full support with type definitions
- **React Version**: 19+
- **License**: MIT

## Icon Categories

The icon library covers comprehensive categories including:

- Interface & Navigation
- Communication & Social
- Business & Commerce
- Media & Entertainment
- System & Hardware
- Weather & Nature
- Transportation
- Education & Learning
- Health & Medical
- And many more...

## Migration Guide

### From 0.0.x to 0.1.x

- Update import statements to use `@zappicon/react` scope
- Review TypeScript types (improved in 0.1.x)
- Take advantage of tree-shaking with individual icon imports

### Future Considerations

- New icons are added regularly
- Performance improvements are ongoing
- Community feedback drives feature development

## Contributing

This project follows conventional commits and maintains high code quality standards. All contributions are welcome through our GitHub repository.

## Links

- [Homepage](https://zappicon.com)
- [Repository](https://github.com/zappicon/zappicon-react)
- [Issues](https://github.com/zappicon/zappicon-react/issues)
- [npm Package](https://www.npmjs.com/package/@zappicon/react)
