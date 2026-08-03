/**
 * One-off Spotify authorization — run once, then never again.
 * Run from site/:  node scripts/spotifyAuth.mjs
 *
 * Walks the authorization-code grant for the `user-top-read` scope and
 * writes the resulting refresh token into .env.local. The refresh token
 * is long-lived; the site mints short-lived access tokens from it.
 *
 * No dependencies — reads .env.local directly rather than pulling in a
 * dotenv package for a script that runs once.
 */
import {createServer} from 'node:http'
import {readFileSync, writeFileSync, existsSync} from 'node:fs'
import {spawn} from 'node:child_process'
import {randomBytes} from 'node:crypto'

const ENV_PATH = new URL('../.env.local', import.meta.url)
const PORT = 4321
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`
const SCOPE = 'user-top-read'

function readEnv() {
  if (!existsSync(ENV_PATH)) fail('.env.local not found in site/')
  const raw = readFileSync(ENV_PATH, 'utf8')
  const env = {}
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)
    if (m) env[m[1]] = m[2].trim()
  }
  return {raw, env}
}

function fail(msg) {
  console.error(`\n  ✗ ${msg}\n`)
  process.exit(1)
}

const {raw, env} = readEnv()
const CLIENT_ID = env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET

if (!CLIENT_ID || !CLIENT_SECRET) {
  fail('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in site/.env.local first.')
}

const state = randomBytes(8).toString('hex')
const authUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
    state,
  })

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`)
  if (url.pathname !== '/callback') {
    res.writeHead(404).end()
    return
  }

  const err = url.searchParams.get('error')
  const code = url.searchParams.get('code')

  // Stay listening on failure rather than exiting — a failed attempt is
  // usually a config problem worth retrying against the same listener.
  if (err || !code) {
    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.end(`Authorization failed: ${err || 'no code returned'}`)
    console.error(`  ✗ Attempt failed: ${err || 'no code returned'} — still listening.`)
    return
  }

  if (url.searchParams.get('state') !== state) {
    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.end('State mismatch — aborted.')
    console.error('  ✗ State mismatch — nothing written. Still listening.')
    return
  }

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })

  const data = await tokenRes.json()

  if (!tokenRes.ok || !data.refresh_token) {
    res.writeHead(500, {'Content-Type': 'text/plain'})
    res.end('Token exchange failed. Check the terminal.')
    console.error(
      `  ✗ Token exchange failed: ${data.error_description || data.error || tokenRes.status} — still listening.`,
    )
    return
  }

  // Write it back rather than printing it — keeps the credential out of
  // scrollback and out of any terminal-sharing session.
  const line = `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`
  const next = /^SPOTIFY_REFRESH_TOKEN=.*$/m.test(raw)
    ? raw.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, line)
    : raw.replace(/\n*$/, '\n') + line + '\n'
  writeFileSync(ENV_PATH, next)

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end('<p style="font:14px system-ui">Authorized. Close this tab and return to the terminal.</p>')

  console.log('\n  ✓ Refresh token written to site/.env.local')
  console.log('    Add the same three vars to Vercel before deploying.\n')
  server.close()
  process.exit(0)
})

// --manual leaves the browser alone, so the URL can be opened in a private
// window signed in as a specific account.
const manual = process.argv.includes('--manual')

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  Listening on ${REDIRECT_URI}`)
  console.log(`  Open this${manual ? ' in a private window' : ''}:\n\n  ${authUrl}\n`)
  if (!manual && process.platform === 'darwin') {
    spawn('open', [authUrl], {stdio: 'ignore', detached: true})
  }
})
