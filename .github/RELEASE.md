# Automated Release Process

Once you push changes to `main` with a new version in `package.json`, GitHub Actions will:

1. Detect the version bump and run the release workflow.
2. Install dependencies, build, test, and lint the package.
3. Publish the package to npm (requires `NPM_TOKEN` secret).
4. Create a new git tag and GitHub Release for the version.
5. Update `CHANGELOG.md` with the commit message and version info.
6. Commit and push the updated changelog to `main`.

## Example steps to create a new release

1. Update the version in `package.json` (e.g., `1.2.3`).
2. Commit your changes:

   ```bash
   git add package.json
   git commit -m "chore: bump version to 1.2.3"
   git push origin main
   ```

3. The workflow will handle publishing and changelog updates automatically.

---

**Note:** Ensure your commit message describes the changes for the release. This message will be included in the GitHub Release and changelog.
