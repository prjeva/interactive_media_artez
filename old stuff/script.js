function updateBrush() {
  const size = document.getElementById('size').value; 
  const opacity = document.getElementById('opacity').value; 
  const roundedness = document.getElementById('roundedness').value;

  const brushCircle = document.querySelector('.brush-circle');
  brushCircle.style.width = `${Math.min(25 + (size / 2), 80)}px`; 
  brushCircle.style.height = `${Math.min(25 + (size / 2), 80)}px`; 
  brushCircle.style.borderRadius = `${roundedness}%`; 
  brushCircle.style.backgroundColor = `rgba(0, 0, 0, ${opacity / 100})`; 
}

updateBrush();

let video;
let snapButton;
let p5Canvas;

function setup() {
  // Set up the p5 canvas in the drawing pad container
  const container = document.getElementById('drawingPadContainer');
  p5Canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  p5Canvas.parent(container);

  // Initialize the live webcam feed and position it in the videoContainer div
  const videoContainer = document.getElementById('videoContainer');
  video = createCapture(VIDEO);
  video.size(container.offsetWidth, container.offsetHeight); // Match container dimensions
  video.parent(videoContainer); // Attach video feed to videoContainer

  // Set up the snap button to capture the video feed onto the drawing pad
  snapButton = select('#snapButton');
  snapButton.mousePressed(takesnap);
}

function takesnap() {
  // Capture the current video frame and draw it onto the drawing pad

  image(video, 0, 0,width, height);

}

function draw() {
  // Basic drawing functionality on the drawing pad
  if (mouseIsPressed) {
    ellipse(mouseX, mouseY, 50, 50);
  }
}
