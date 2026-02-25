// Simple migration runner for Node.js
const { execSync } = require('child_process')

console.log('Running database migration...')
console.log('This will migrate your JSON data to SQLite database.')

try {
  // Use tsx or ts-node to run TypeScript migration
  // First try with tsx, fallback to node with compiled JS
  try {
    execSync('npx tsx scripts/migrate-to-db.ts', { stdio: 'inherit' })
  } catch (e) {
    console.log('tsx not available, trying alternative...')
    // Alternative: compile and run
    execSync('npx tsc scripts/migrate-to-db.ts --outDir scripts --esModuleInterop --module commonjs', { stdio: 'inherit' })
    execSync('node scripts/migrate-to-db.js', { stdio: 'inherit' })
  }
  console.log('Migration completed!')
} catch (error) {
  console.error('Migration failed:', error)
  process.exit(1)
}
