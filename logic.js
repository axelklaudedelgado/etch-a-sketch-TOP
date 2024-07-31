function createGridBoxes (sliderValue) {
  let divsToAdd = document.createDocumentFragment();
  for(let i=0; i < sliderValue * sliderValue; i++){
    let newDiv = document.createElement('div');
    newDiv.id = 'box' + i;
    newDiv.className = 'gridBox';
    divsToAdd.appendChild(newDiv);
  }

  container.appendChild(divsToAdd);

  let gridValueCalculation = 100 / slider.value;

  let gridBoxes = document.querySelectorAll(".gridBox");
  for (let i = 0; i < gridBoxes.length; i++) {
      gridBoxes[i].style.flex = `1 0 ${gridValueCalculation}%`;
  }
}

function deleteGridBoxes() {
  let box = container.lastElementChild;
  while (box) {
      container.removeChild(box);
      box = container.lastElementChild;
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
  deleteGridBoxes();
  createGridBoxes(this.value);
}

createGridBoxes(slider.value);