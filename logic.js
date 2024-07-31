let slider = document.querySelector("#gridSlider");
let output = document.querySelector("#sliderValue");
output.innerHTML = slider.value + "x" + slider.value; 

slider.oninput = function() {
  output.innerHTML = this.value + "x" + this.value;
}

let container = document.querySelector("#grid-container");

let divToAdd = document.createDocumentFragment();
for(let i=0; i < slider.value * slider.value; i++){
   let newDiv = document.createElement('div');
   newDiv.id = 'box' + i;
   newDiv.className = 'gridBox';
   divToAdd.appendChild(newDiv);
}

container.appendChild(divToAdd);

let gridValueCalculation = 100 / slider.value;

let gridBoxes = document.querySelectorAll(".gridBox");
for (let i = 0; i < gridBoxes.length; i++) {
    gridBoxes[i].style.flex = `1 0 ${gridValueCalculation}%`;
}
