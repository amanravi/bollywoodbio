const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { existsSync, mkdirSync, copyFileSync } = require('fs')
const { join, resolve } = require('path')

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || '0.0.0.0'
const port = parseInt(process.env.PORT || '3000', 10)

// Initialize persistent storage before starting the app
function initPersistentStorage() {
  const dataDir = process.env.DATA_DIR
    ? resolve(process.cwd(), process.env.DATA_DIR, 'data')
    : join(process.cwd(), 'data')
  const uploadsDir = process.env.DATA_DIR
    ? resolve(process.cwd(), process.env.DATA_DIR, 'uploads')
    : join(process.cwd(), 'public', 'images')

  console.log(`> Data directory: ${dataDir}`)
  console.log(`> Uploads directory: ${uploadsDir}`)
  console.log(`> Persistent storage: ${process.env.DATA_DIR ? 'YES' : 'NO (using project dirs)'}`)

  // Create directories if they don't exist
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true })
    console.log(`> Created data directory: ${dataDir}`)
  }
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true })
    console.log(`> Created uploads directory: ${uploadsDir}`)
  }

  // Seed data files from the repo's data/ folder if they don't exist in persistent storage
  const seedDir = join(process.cwd(), 'data')
  const seedFiles = ['movies.json', 'posts.json', 'events.json', 'contacts.json']

  for (const file of seedFiles) {
    const destPath = join(dataDir, file)
    const seedPath = join(seedDir, file)
    if (!existsSync(destPath) && existsSync(seedPath)) {
      copyFileSync(seedPath, destPath)
      console.log(`> Seeded ${file} from defaults`)
    }
  }
}

initPersistentStorage()

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, '0.0.0.0', (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
    console.log(`> Environment: ${process.env.NODE_ENV}`)
    console.log(`> Working directory: ${process.cwd()}`)
  })
})
