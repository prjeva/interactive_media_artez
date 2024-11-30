let p5Canvas;
let brushSize = 50; // Default brush size
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

  updateBrush(); // Initialize the brush preview
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
    eraserButton.style.backgroundColor = "#ffa500"; // Highlight eraser button (orange)
    eraserButton.textContent = "Brush"; // Change text to indicate switching back to brush
  } else {
    eraserButton.style.backgroundColor = "#f44336"; // Reset to red
    eraserButton.textContent = "Eraser"; // Reset text
  }
});

// Handle shape changes
document.querySelector(".brush-shape").addEventListener("change", (event) => {
  brushShape = event.target.value; // Update brush shape
});

function draw() {
  if (mouseIsPressed) {
    if (isEraserActive) {
      erase(); // Enable eraser
      ellipse(mouseX, mouseY, brushSize, brushSize);
      noErase();
    } else {
      noStroke();
      fill(0);

      if (brushShape === "circle") {
        ellipse(mouseX, mouseY, brushSize, brushSize); // Draw a circle
      } else if (brushShape === "square") {
        rectMode(CENTER);
        rect(mouseX, mouseY, brushSize, brushSize); // Draw a square
      } else if (brushShape === "rectangle") {
        rectMode(CENTER);
        rect(mouseX, mouseY, brushSize * 1.5, brushSize); // Draw a rectangle (2:1 aspect ratio)
      }
    }
    updateBrushPreview(); // Update brush preview in real-time
  }
}

function updateBrushPreview() {
  const brushPreview = document.querySelector(".brush-shape-preview");
  const img = createImage(width, height);
  img.copy(p5Canvas, 0, 0, width, height, 0, 0, width, height);

  // Update the preview with the canvas content
  const dataUrl = img.canvas.toDataURL();
  brushPreview.style.backgroundImage = `url(${dataUrl})`;
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
  const sizeInput = document.querySelector("#size");
  if (sizeInput) {
    brushSize = parseInt(sizeInput.value, 10);
    updateBrushPreview();
  }
}
