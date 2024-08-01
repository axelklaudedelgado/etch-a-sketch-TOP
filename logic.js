function createGridBoxes (sliderValue) {
  let gridValueCalculation = 100 / slider.value;

  for(let i=0; i < sliderValue * sliderValue; i++){
    const newDiv = document.createElement('div');
    newDiv.id = 'box' + i;
    newDiv.addEventListener('mouseover', boxToBlack);
    newDiv.addEventListener('mousedown', boxToBlack);
    newDiv.style.flex = `1 0 ${gridValueCalculation}%`;
    container.appendChild(newDiv);
  }
}

function boxToBlack(mouseEvent) {
  if (mouseEvent.type === 'mouseover') {
    mouseEvent.target.style.backgroundColor = "black";
  }
}

const container = document.querySelector("#grid-container");

const slider = document.querySelector("#gridSlider");
const output = document.querySelector("#sliderValue");
output.innerHTML = slider.value + "x" + slider.value; 

slider.oninput = function() {
  output.innerHTML = this.value + "x" + this.value;
}

slider.onchange = function () {
  container.replaceChildren();
  createGridBoxes(this.value);
}

createGridBoxes(slider.value);