let drawing = false
let erasing = false

let size = 5
let oldX
let oldY

const cursorOutline = document.getElementById("cursorOutline")
const colorPicker = document.getElementById("colorPicker")
const button = document.getElementById("button")
const clearButton = document.getElementById("clearButton")
const sizeSlider = document.getElementById("sizeSlider")
const brushSizeDisplay = document.getElementById("brushSizeDisplay")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth / 2
canvas.height = window.innerHeight / 2
ctx.strokeStyle = "#000"

function clearLayer(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function toggle(){
  erasing = !erasing
  
  if (erasing === true) {
  ctx.globalCompositeOperation = "destination-out"
  ctx.lineWidth = size
  } else {
  ctx.globalCompositeOperation = "source-over"
  ctx.lineWidth = size
  }
  cursorOutline.style.width = size + "px"
  cursorOutline.style.height = size + "px"
  console.log("is erasing " + erasing)
}

function outlinePosition(x, y){
  cursorOutline.style.left = x + "px"
  cursorOutline.style.top = y + "px"
}

clearButton.addEventListener("click", clearLayer )
button.addEventListener("click", toggle)
colorPicker.addEventListener("input", () => {
  ctx.strokeStyle = colorPicker.value
  console.log(`setted color to ${colorPicker.value}`)
})

document.addEventListener("keydown", (e) => {
  if (e.key === "1"){toggle(); console.log(`clicked ${e.key}`)}
})

document.addEventListener("keydown", (e) => {
    if (e.key === "c") {
        colorPicker.click()
        console.log(`clicked ${e.key}`)
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

sizeSlider.addEventListener("input", () => {
  size = Number(sizeSlider.value)
  console.log(size)
  update()
})

function update(){
  ctx.lineCap = "round"
  ctx.lineWidth = size
  cursorOutline.style.width = size + "px"
  cursorOutline.style.height = size + "px"
  brushSizeDisplay.textContent = size
}

update()