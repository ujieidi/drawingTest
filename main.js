let drawing = false
let erasing = false

let size = 3
let oldX
let oldY

const cursorOutline = document.getElementById("cursorOutline")
const colorPicker = document.getElementById("colorPicker")
const button = document.getElementById("button")
const clearButton = document.getElementById("clearButton")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth / 2
canvas.height = window.innerHeight / 2

function clearLayer(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function toggle(){
  erasing = !erasing
  
  if (erasing === true) {
  ctx.globalCompositeOperation = "destination-out"
  ctx.lineWidth = 15
  size = 15
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
  cursorOutline.style.left = x + "px"
  cursorOutline.style.top = y + "px"
}

clearButton.addEventListener("click", clearLayer )
button.addEventListener("click", toggle)
colorPicker.addEventListener("input", () => {
  ctx.strokeStyle = colorPicker.value
})

document.addEventListener("keydown", (e) => {
  if (e.key === "1"){toggle()}
})

document.addEventListener("keydown", (e) => {
    if (e.key === "c") {
        colorPicker.click()
    }
})

canvas.addEventListener("mousedown", (e) => {
  e.preventDefault()
  drawing = true
  const rect = canvas.getBoundingClientRect()

  const x = (e.clientX - rect.left) * (canvas.width / rect.width)
  const y = (e.clientY - rect.top) * (canvas.height / rect.height)
  
  oldX = x
  oldY = y
})

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect()

  const x = (e.clientX - rect.left) * (canvas.width / rect.width)
  const y = (e.clientY - rect.top) * (canvas.height / rect.height)
  
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
  
  const x = (e.touches[0].clientX - rect.left) * (canvas.width/rect.width)
  const y = (e.touches[0].clientY - rect.top) * (canvas.height/rect.height)
  
  oldX = x
  oldY = y
})

canvas.addEventListener("touchmove", (e) => {
  const rect = canvas.getBoundingClientRect()
  
  const x = (e.touches[0].clientX - rect.left) * (canvas.width/rect.width)
  const y = (e.touches[0].clientY - rect.top) * (canvas.height/rect.height)
  
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
  ctx.lineWidth = size
  cursorOutline.style.width = size + "px"
  cursorOutline.style.height = size + "px"
}

update()