let drawing = false
let erasing = false

let size = 3
let oldX
let oldY

const cursorOutline = document.getElementById("cursorOutline")
const button = document.getElementById("button")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

function toggle(){
  erasing = !erasing
  
  if (erasing === true) {
  ctx.globalCompositeOperation = "destination-out"
  ctx.lineWidth = 20
  size = 20
  } else {
  ctx.globalCompositeOperation = "source-over"
  ctx.lineWidth = 3
  size = 3
  }
  cursorOutline.style.width = size + "px"
  cursorOutline.style.height = size + "px"
  console.log(erasing)
}

function outlinePosition(x, y){
  cursorOutline.style.left = x - size/2 + "px"
  cursorOutline.style.top = y - size/2 + "px"
}

button.addEventListener("click", toggle)

document.addEventListener("keydown", (e) => {
  if (e.key === "1"){toggle()}
})

canvas.addEventListener("mousedown", (e) => {
  drawing = true
  
  const x = e.offsetX
  const y = e.offsetY
  
  oldX = x
  oldY = y
})

canvas.addEventListener("mousemove", (e) => {
  const x = e.offsetX
  const y = e.offsetY
  
  outlinePosition(e.clientX, e.clientY)
  
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
  
  outlinePosition(e.touches[0].clientX, e.touches[0].clientY)
  
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

function update(){
  ctx.lineCap = "round"
  ctx.lineWidth = 3
  cursorOutline.style.width = 3 + "px"
  cursorOutline.style.height = 3 + "px"
}

update()