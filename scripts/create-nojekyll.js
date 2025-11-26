const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'out');
const nojekyllPath = path.join(outDir, '.nojekyll');

// Only create .nojekyll if out directory exists (build completed)
if (fs.existsSync(outDir)) {
  try {
    fs.writeFileSync(nojekyllPath, '');
    console.log('✅ Created .nojekyll file in out directory');
  } catch (error) {
    console.error('❌ Error creating .nojekyll file:', error.message);
    process.exit(1);
  }
} else {
  console.log('⚠️  out directory does not exist yet. .nojekyll will be created after build.');
}
