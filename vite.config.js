import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: [
      'sb-oc01hfsau6ei.vercel.run',
      '.vercel.run'
    ]
  }
})