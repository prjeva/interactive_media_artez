let p5Canvas;
let brushSize = 50; // Default brush size
let brushWidth = 50;
let brushHeight = 50;
let brushShape = "circle"; // Default brush shape (circle, square, or rectangle)
let isEraserActive = false; // Toggle state for eraser

function setup() {
  const containerHeight = 800; // Fixed height of the container
  const headerHeight = containerHeight * 0.1; // 10% for header
  const footerHeight = containerHeight * 0.4; // 40% for footer
  const canvasHeight = containerHeight - (headerHeight + footerHeight); // Remaining space for canvas
  const canvasWidth = canvasHeight; // Set the width to be the same as the height (square canvas)

  // Create canvas, but don't specify size here
  p5Canvas = createCanvas(canvasWidth, canvasHeight);

  const canvasContainer = document.querySelector(".p5-canvas-container");
  p5Canvas.parent(canvasContainer); // Attach canvas to new wrapper

  // Resize canvas to match the wrapper's height (which will be square)
  resizeCanvas(canvasContainer.clientHeight, canvasContainer.clientHeight);

  // Set initial aspect ratio for preview
  const canvasWrapper = document.querySelector(".brush-preview-wrapper");
  canvasWrapper.style.aspectRatio = `${canvasHeight} / ${canvasHeight}`;

  updateBrush(); // Initialize the brush
}

// Adjust the canvas size when the window resizes
window.addEventListener("resize", () => {
  const canvasContainer = document.querySelector(".p5-canvas-container");
  const containerHeight = canvasContainer.clientHeight;

  // Resize the canvas to be square, matching the height of the container
  resizeCanvas(containerHeight, containerHeight);
});

// Toggle between brush and eraser when the button is clicked
document.querySelector(".eraser-button").addEventListener("click", () => {
  isEraserActive = !isEraserActive;
  const eraserButton = document.querySelector(".eraser-button");

  // Update button appearance based on state
  if (isEraserActive) {
    eraserButton.style.backgroundColor = "#f44336"; // Reset to red
    eraserButton.textContent = "Eraser"; // Reset text
  } else {
    eraserButton.style.backgroundColor = "#ffa500"; // Highlight eraser button (orange)
    eraserButton.textContent = "Brush"; // Change text to indicate switching back to brush
  }
});

document.querySelector(".reset-button").addEventListener("click", () => {
  //https://p5js.org/reference/p5/clear/
  const resetButton = document.querySelector(".reset-button");
  clear();
});
// Handle shape changes
document.querySelector(".brush-shape").addEventListener("change", (event) => {
  brushShape = event.target.value; // Update brush shape
});

function draw() {
  brushShape = document.getElementById("brushShape").value;
  noStroke();
  if (mouseIsPressed) {
      if (isEraserActive) {
        fill(255);
      } else {
        fill(0);
      }
      //https://p5js.org/reference/
      if (brushShape == "circle") {
        ellipse(mouseX, mouseY, brushWidth, brushHeight); // Draw a circle
      } else if (brushShape == "triangle") {
        triangle(mouseX-brushWidth, mouseY, mouseX, mouseY-brushWidth, mouseX+brushWidth, mouseY);
      } else if (brushShape == "rectangle") {
        square(mouseX, mouseY, brushWidth);
      }
  }
}

function saveFunction() {
  const outputCanvas = createGraphics(width, height);
  outputCanvas.background(255); // Set background to white
  outputCanvas.image(p5Canvas, 0, 0); // Draw the canvas onto the white background

  const base64Image = outputCanvas.canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = base64Image;
  link.download = "brush_preview.png";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Update the brush size dynamically based on input
function updateBrush() {
  //shape selector functions https://www.w3schools.com/howto/howto_css_shapes.asp
  
  const size = document.getElementById('size').value; 
  //brushCircle updates the preview
  const brushCircle = document.querySelector('.brush-circle');
  brushShape = document.getElementById("brushShape").value;
  
  //this is needed because otherwise the styles are being appended to each other, not applied from scratch
  brushCircle.removeAttribute('style')
  


  if (brushShape == "circle") {
  //create circle css
  brushCircle.style.width = `${Math.min(25 + (size / 2), 80)}px`;
  brushCircle.style.height = `${Math.min(25 + (size / 2), 80)}px`; 
  brushCircle.style.borderRadius = `100%`;
  brushCircle.style.backgroundColor = `rgba(0,0,0, 100)`;
  
  //the actual brush need to be updated by updating the global variables defined at the begin
  brushWidth = Math.min(25 + (size / 2), 80);
  brushHeight = Math.min(25 + (size / 2), 80);


  } else if (brushShape == "triangle") {
  //create triangle css
  brushCircle.style.width = `0`
  brushCircle.style.height = `0`
  brushCircle.style.borderLeft = `${Math.min(25 + (size / 2), 80)}px solid transparent`;
	brushCircle.style.borderRight = `${Math.min(25 + (size / 2), 80)}px solid transparent`;
	brushCircle.style.borderBottom = `${Math.min(25 + (size / 2), 80)}px solid #000`;
  brushWidth = Math.min(25 + (size / 2), 80);
  
  } else if (brushShape == "rectangle") {
  //create rectangle css
  //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_shapes_square
  brushCircle.style.width = `${Math.min(25 + (size / 2), 80)}px`
  brushCircle.style.height = `${Math.min(25 + (size / 2), 80)}px`
  brushCircle.style.backgroundColor = `rgba(0,0,0, 100)`;
  brushWidth = Math.min(25 + (size / 2), 80);
  }
}
