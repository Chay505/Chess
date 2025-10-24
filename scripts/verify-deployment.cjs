#!/usr/bin/env node

/**
 * Vercel Deployment Verification Script
 *
 * This script verifies that the Vercel deployment is configured correctly
 * and all required components are functioning.
 */

const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function success(message) {
  log(`✓ ${message}`, 'green');
}

function error(message) {
  log(`✗ ${message}`, 'red');
}

function warning(message) {
  log(`⚠ ${message}`, 'yellow');
}

function info(message) {
  log(`ℹ ${message}`, 'cyan');
}

function section(message) {
  log(`\n${'='.repeat(60)}`, 'blue');
  log(message, 'blue');
  log('='.repeat(60), 'blue');
}

// Verification checks
const checks = {
  gitConfig: () => {
    section('1. Git Configuration');
    try {
      const remotes = execSync('git remote -v', { encoding: 'utf8' });
      if (remotes.includes('philbeliveau/Chess')) {
        success('Fork remote configured correctly');
        info('   Origin: philbeliveau/Chess (your fork)');
      } else {
        warning('Fork remote not found');
      }

      if (remotes.includes('Chay505/Chess')) {
        success('Upstream remote configured correctly');
        info('   Upstream: Chay505/Chess (original)');
      } else {
        warning('Upstream remote not configured');
        info('   Run: git remote add upstream https://github.com/Chay505/Chess.git');
      }

      return true;
    } catch (err) {
      error('Failed to check git configuration');
      return false;
    }
  },

  vercelConfig: () => {
    section('2. Vercel Configuration Files');

    const configPath = path.join(process.cwd(), 'vercel.json');
    if (fs.existsSync(configPath)) {
      success('vercel.json found');
      try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        info(`   Framework: ${config.framework || 'nextjs (default)'}`);
        info(`   Build Command: ${config.buildCommand || 'npm run build (default)'}`);
        return true;
      } catch (err) {
        error('vercel.json is invalid JSON');
        return false;
      }
    } else {
      warning('vercel.json not found (optional, Vercel auto-detects Next.js)');
      return true;
    }
  },

  environmentVariables: () => {
    section('3. Environment Variables');

    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      success('.env.local found');
      const envContent = fs.readFileSync(envPath, 'utf8');

      if (envContent.includes('DATABASE_URL')) {
        success('DATABASE_URL configured');

        // Check for connection pooling
        if (envContent.includes('pgbouncer=true')) {
          success('Connection pooling enabled (pgbouncer=true)');
        } else {
          warning('Connection pooling not enabled - add pgbouncer=true to DATABASE_URL');
        }

        if (envContent.includes('connection_limit=1')) {
          success('Connection limit set for serverless');
        } else {
          warning('Add connection_limit=1 to DATABASE_URL for Vercel');
        }
      } else {
        error('DATABASE_URL not found in .env.local');
        return false;
      }

      info('\n   Remember to add these to Vercel dashboard:');
      info('   Settings → Environment Variables');
      return true;
    } else {
      error('.env.local not found');
      return false;
    }
  },

  nextConfig: () => {
    section('4. Next.js Configuration');

    const configPath = path.join(process.cwd(), 'next.config.ts');
    if (fs.existsSync(configPath)) {
      success('next.config.ts found');
      return true;
    } else {
      const jsConfigPath = path.join(process.cwd(), 'next.config.js');
      if (fs.existsSync(jsConfigPath)) {
        success('next.config.js found');
        return true;
      }
      warning('Next.js config not found (using defaults)');
      return true;
    }
  },

  packageJson: () => {
    section('5. Package.json Scripts');

    const pkgPath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

      if (pkg.scripts.build) {
        success('Build script configured');
        info(`   Command: ${pkg.scripts.build}`);
      } else {
        error('Build script missing in package.json');
        return false;
      }

      if (pkg.scripts.dev) {
        success('Dev script configured');
      }

      if (pkg.scripts.start) {
        success('Start script configured');
      }

      return true;
    } else {
      error('package.json not found');
      return false;
    }
  },

  prismaConfig: () => {
    section('6. Database Configuration (Prisma)');

    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
    if (fs.existsSync(schemaPath)) {
      success('Prisma schema found');

      const schema = fs.readFileSync(schemaPath, 'utf8');
      if (schema.includes('postgresql')) {
        success('PostgreSQL configured as database provider');
      }

      info('\n   Ensure Prisma is included in build process');
      info('   Vercel automatically runs: npx prisma generate');

      return true;
    } else {
      warning('Prisma schema not found');
      return true;
    }
  },

  buildTest: () => {
    section('7. Build Test (Local)');

    info('Running local build to verify configuration...');
    info('This may take a few minutes...\n');

    try {
      execSync('npm run build', {
        encoding: 'utf8',
        stdio: 'inherit'
      });
      success('Local build succeeded');
      info('   This indicates your build will likely succeed on Vercel');
      return true;
    } catch (err) {
      error('Local build failed');
      error('   Fix build errors before deploying to Vercel');
      return false;
    }
  }
};

// Main execution
async function main() {
  log('\n╔════════════════════════════════════════════════════════════╗', 'blue');
  log('║        Vercel Deployment Verification Script              ║', 'blue');
  log('╚════════════════════════════════════════════════════════════╝\n', 'blue');

  const results = {
    passed: 0,
    failed: 0,
    warnings: 0
  };

  // Run all checks except build test initially
  const checkList = Object.keys(checks).filter(key => key !== 'buildTest');

  for (const checkName of checkList) {
    try {
      const result = checks[checkName]();
      if (result === true) {
        results.passed++;
      } else if (result === false) {
        results.failed++;
      }
    } catch (err) {
      error(`Check failed: ${checkName}`);
      results.failed++;
    }
  }

  // Summary
  section('Verification Summary');
  log(`Passed: ${results.passed}`, 'green');
  if (results.failed > 0) {
    log(`Failed: ${results.failed}`, 'red');
  }

  // Ask about build test
  if (results.failed === 0) {
    info('\nAll configuration checks passed!');
    info('\nOptional: Run local build test? (This will take a few minutes)');
    info('Run: npm run build\n');
  } else {
    error('\nSome checks failed. Please fix the issues above before deploying.');
  }

  // Next steps
  section('Next Steps');
  info('1. Push changes to GitHub:');
  info('   git add .');
  info('   git commit -m "Configure Vercel deployment"');
  info('   git push origin main');
  info('\n2. Vercel will automatically deploy your changes');
  info('\n3. Check deployment status:');
  info('   https://vercel.com/dashboard');
  info('\n4. Verify production URL once deployed');

  log('\n' + '='.repeat(60) + '\n', 'blue');
}

// Run the script
main().catch(err => {
  error('Script failed with error:');
  console.error(err);
  process.exit(1);
});
