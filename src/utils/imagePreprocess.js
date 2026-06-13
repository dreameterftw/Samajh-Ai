export async function preprocessImage(source) {
  // source = File object or blob URL string
  const img = await loadImage(source)
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')

  ctx.drawImage(img, 0, 0)

  // Boost contrast and convert to grayscale — helps Tesseract a lot
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const gray = 0.299 * r + 0.587 * g + 0.114 * b
    // Boost contrast for better OCR
    const contrast = 1.5
    const boosted = Math.min(255, Math.max(0, (gray - 128) * contrast + 128))
    data[i] = data[i + 1] = data[i + 2] = boosted
  }
  ctx.putImageData(imageData, 0, 0)
  return canvas.toDataURL('image/png')
}

async function loadImage(source) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = typeof source === 'string' ? source : URL.createObjectURL(source)
  })
}
