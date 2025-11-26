// Script to verify video is in the correct location
const fs = require('fs')
const path = require('path')

const videoPath = path.join(__dirname, '../public/videos/Video-01.mp4')
const outVideoPath = path.join(__dirname, '../out/videos/Video-01.mp4')

console.log('🎥 Verificando video...\n')

// Check source
if (fs.existsSync(videoPath)) {
  const stats = fs.statSync(videoPath)
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2)
  console.log('✅ Video encontrado en:', videoPath)
  console.log(`   Tamaño: ${sizeMB} MB`)
  
  // Check if it's too large for GitHub
  if (stats.size > 25 * 1024 * 1024) {
    console.log('⚠️  ADVERTENCIA: El video es mayor a 25MB, puede tener problemas en GitHub Pages')
    console.log('   Considera comprimir el video')
  }
} else {
  console.log('❌ Video NO encontrado en:', videoPath)
  console.log('   Asegúrate de que Video-01.mp4 esté en public/videos/')
  process.exit(1)
}

// Check build output
if (fs.existsSync(outVideoPath)) {
  console.log('\n✅ Video encontrado en build output:', outVideoPath)
} else {
  console.log('\n⚠️  Video NO encontrado en build output')
  console.log('   Ejecuta: npm run build')
}

console.log('\n✅ Verificación completada')

