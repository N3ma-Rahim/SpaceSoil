import './styles.css'
import Phaser from 'phaser'

// The game and app code in src/legacy/ is written as classic (non-module) scripts that
// share one global scope and are referenced by inline onclick handlers in the generated HTML.
// To preserve behaviour exactly, the files are concatenated in numeric order and run as a
// single classic script. See README.md ("Architecture") for the planned ES-module migration.
window.Phaser = Phaser

const files = import.meta.glob('./legacy/*.js', { query: '?raw', import: 'default', eager: true })
const code = Object.keys(files)
  .sort()
  .map((k) => files[k])
  .join('\n')

const el = document.createElement('script')
el.textContent = code
document.body.appendChild(el)
