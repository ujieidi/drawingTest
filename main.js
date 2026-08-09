let drawing = false
let erasing = false

let oldX
let oldY

const button = document.getElementById("button")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.lineCap = "round"

function toggle(){erasing = !erasing}

button.addEventListener("click", toggle)

document.addEventListener("keydown", (e) => {
  if (e.key === "1"){toggle()}
})



canvas.addEventListener("mousedown", (e) => {
  drawing = true
  
  const rect = canvas.getBoundingClientRect()
  
  const x = e.offsetX
  const y = e.offsetY
  
  oldX = x
  oldY = y
})

canvas.addEventListener("mousemove", (e) => {
  const x = e.offsetX
  const y = e.offsetY
  
  if (erasing === true) {
  ctx.globalCompositeOperation = "destination-out"
  ctx.lineWidth = 20
  } else {
  ctx.globalCompositeOperation = "source-over"
  ctx.lineWidth = 2
  }
  
  if (drawing === true){
    ctx.beginPath()
    ctx.moveTo(oldX, oldY)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  
  oldX = x
  oldY = y
})

document.addEventListener("mouseup", () => {
  drawing = false
})

canvas.addEventListener("touchstart", (e) => {
  drawing = true
  
  const rect = canvas.getBoundingClientRect()
  
  const x = e.touches[0].clientX - rect.left
  const y = e.touches[0].clientY - rect.top
  
  oldX = x
  oldY = y
})

canvas.addEventListener("touchmove", (e) => {
  const rect = canvas.getBoundingClientRect()
  
  const x = e.touches[0].clientX - rect.left
  const y = e.touches[0].clientY - rect.top
  
  if (erasing === true) {
  ctx.globalCompositeOperation = "destination-out"
  ctx.lineWidth = 20
  } else {
  ctx.globalCompositeOperation = "source-over"
  ctx.lineWidth = 2
  }
  
  if (drawing === true){
    ctx.beginPath()
    ctx.moveTo(oldX, oldY)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  
  oldX = x
  oldY = y
})

document.addEventListener("touchend", () => {
  drawing = false
})