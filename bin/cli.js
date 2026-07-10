#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2];

if (!projectName) {
  console.error('Please specify the project directory:');
  console.error('  npx create-thod-full-dev <project-directory>');
  process.exit(1);
}

const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);

if (fs.existsSync(projectDir)) {
  console.error(`Error: Directory ${projectName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(projectDir, { recursive: true });

const templateDir = path.resolve(__dirname, '..');

// Function to copy files recursively
const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    fs.readdirSync(src).forEach((childItemName) => {
      // Exclude unnecessary directories and files
      const excludedItems = ['node_modules', '.git', 'bin', '.npmignore', 'package-lock.json'];
      if (excludedItems.includes(childItemName)) {
        return;
      }
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

console.log(`\n🚀 Creating a new project in ${projectDir}...`);
copyRecursiveSync(templateDir, projectDir);

// Update package.json
const pkgJsonPath = path.join(projectDir, 'package.json');
if (fs.existsSync(pkgJsonPath)) {
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  
  // Set to new project name and reset version
  pkgJson.name = projectName;
  pkgJson.version = '1.0.0';
  pkgJson.description = '';
  
  // Remove CLI specific fields
  delete pkgJson.bin;
  delete pkgJson.files;
  delete pkgJson.publishConfig;

  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
}

// Ensure .env is created from example.env if it doesn't exist
const envPath = path.join(projectDir, '.env');
const exampleEnvPath = path.join(projectDir, 'example.env');
if (!fs.existsSync(envPath) && fs.existsSync(exampleEnvPath)) {
  fs.copyFileSync(exampleEnvPath, envPath);
}

console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { cwd: projectDir, stdio: 'inherit' });
} catch (error) {
  console.error('\nFailed to install dependencies. You can install them manually later.');
}

console.log(`\nSuccess! Created ${projectName} at ${projectDir}`);
console.log('Inside that directory, you can run several commands:\n');
console.log('  npm run dev');
console.log('    Starts the development server with nodemon.\n');
console.log('  npm start');
console.log('    Starts the production server.\n');
console.log('To get started:');
console.log(`  cd ${projectName}`);
console.log('  npm run dev\n');
