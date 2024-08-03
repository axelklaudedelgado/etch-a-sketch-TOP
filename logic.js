function createGridBoxes (sliderValue) {
  let gridValueCalculation = 100 / slider.value;

  for(let i=0; i < sliderValue * sliderValue; i++){
    const newDiv = document.createElement('div');
    newDiv.id = 'box' + i;
    newDiv.className = "gridBox";
    newDiv.addEventListener('mouseover', changeColor);
    newDiv.addEventListener('mousedown', changeColor);
    newDiv.style.flex = `1 0 ${gridValueCalculation}%`;
    container.appendChild(newDiv);
  }
}

function toggleGridlines () {
  let gridBoxes = document.querySelectorAll(".gridBox");
  for (let i = 0; i < gridBoxes.length; i++) {
      gridBoxes[i].style.outline = "1px solid #F8F8F8";
  }
}

function changeColor(mouseEvent) {
  if (mouseEvent.type === 'mouseover') {
    mouseEvent.target.style.backgroundColor = currentColor;
  }
}

let currentColor = "black";
const slider = document.querySelector(".grid-slider");
const sliderValueDisplay = document.querySelector(".knob-2-text");
const container = document.querySelector("#grid-container");
const colorPicker = document.querySelector("#color-picker");

colorPicker.oninput = function () {
  currentColor = this.value;
}

sliderValueDisplay.textContent = "Grid: " + parseInt(slider.value) + "x" + parseInt(slider.value);

slider.addEventListener("knob-move-change", changeValue);

function changeValue() {
  sliderValueDisplay.textContent = "Grid: " + parseInt(this.value) + "x" + parseInt(this.value);
}

slider.addEventListener("knob-move-end", function () {
  container.replaceChildren();
  createGridBoxes(this.value);
})

createGridBoxes(slider.value);