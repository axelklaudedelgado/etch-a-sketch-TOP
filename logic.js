function createGridBoxes (sliderValue) {
  let gridValueCalculation = 100 / slider.value;

  for(let i=0; i < sliderValue * sliderValue; i++){
    let newDiv = document.createElement('div');
    newDiv.id = 'box' + i;
    newDiv.style.flex = `1 0 ${gridValueCalculation}%`;
    container.appendChild(newDiv);
  }
}

let container = document.querySelector("#grid-container");

let slider = document.querySelector("#gridSlider");
let output = document.querySelector("#sliderValue");
output.innerHTML = slider.value + "x" + slider.value; 

slider.oninput = function() {
  output.innerHTML = this.value + "x" + this.value;
}

slider.onchange = function () {
  container.replaceChildren();
  createGridBoxes(this.value);
}

createGridBoxes(slider.value);