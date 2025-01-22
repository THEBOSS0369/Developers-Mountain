export const EXCLUDED_FILES = [
  // Package manager files
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lockb",
  "composer.lock", // PHP composer
  "Gemfile.lock", // Ruby bundler

  // Build outputs
  "dist/",
  "build/",
  ".next/",
  "out/",
  "target/", // Rust/Cargo and Java/Maven
  "bin/",
  "obj/",
  ".vercel/",

  // Dependencies
  "node_modules/",
  "vendor/", // PHP composer
  "Pods/", // iOS projects (CocoaPods)
  ".venv/", // Python virtual environment
  "__pycache__/", // Python bytecode cache
  "elm-stuff/", // Elm
  ".nuxt/", // Nuxt.js
  "jspm_packages/", // JSPM

  // Environment and config files
  ".env",
  ".env.local",
  ".env.development",
  ".env.production",
  ".env.*", // Wildcard for any env variants
  ".git/",
  ".gitignore",
  ".gitattributes",
  "README.md",
  "LICENSE",

  // Cache directories
  ".cache/",
  ".gradle/", // Android/Java Gradle
  ".terraform/", // Terraform
  ".serverless/", // Serverless framework
  ".webpack/", // Webpack cache
  ".esbuild/", // Esbuild cache
  "logs/",

  // IDE specific
  ".vscode/",
  ".idea/",
  "*.iml", // IntelliJ IDEA project files
  ".classpath",
  ".project",
  ".settings/", // Eclipse

  // Misc generated files
  "*.min.js",
  "*.min.css",
  "*.map", // Source maps
  "*.log", // Log files
  "generated/",
  "coverage/",
  "*.swp", // Vim swap files
  "*.tmp", // Temporary files
  "*.bak", // Backup files
  "*.orig", // Conflict resolution files
  ".DS_Store", // macOS system file
  "Thumbs.db", // Windows system file
  "desktop.ini", // Windows system file

  // Language-specific
  "*.pyc",
  "*.pyo",
  "*.pyd", // Python
  "*.class",
  "*.jar",
  "*.war", // Java
  "*.o",
  "*.so",
  "*.a",
  "*.out", // C/C++
  "*.d.ts",
  "*.tsbuildinfo", // TypeScript
  "*.exe",
  "*.dll",
  "*.lib", // Windows binaries
  "*.dylib", // macOS binaries
  "*.apk",
  "*.ipa", // Android/iOS builds
  "*.lock", // General lock files
];
