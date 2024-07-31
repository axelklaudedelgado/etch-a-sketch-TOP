var slider = document.querySelector("#gridSlider");
var output = document.querySelector("#sliderValue");
output.innerHTML = slider.value + "x" + slider.value; 

slider.oninput = function() {
  output.innerHTML = this.value + "x" + this.value;
}