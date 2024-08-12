/**
 * Copyright [2024] [Seytooth]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function createGridBoxes (sliderValue) {
  let gridValueCalculation = 100 / parseInt(slider.value);

  for(let i=0; i < sliderValue * sliderValue; i++){
    const newDiv = document.createElement('div');
    newDiv.id = 'box' + i;
    newDiv.className = "gridBox";
    newDiv.style.flex = `1 0 ${gridValueCalculation}%`;
    if (gridStatus == "On") {
      newDiv.style.outline = "1px solid #F8F8F8";
    }
    container.appendChild(newDiv);
  }
}

function toggleGridlines () {
  currentGrid = getGridBoxes();

  if (gridStatus == "Off") {
    gridStatus = "On";
    gridToggle.textContent = "Grid: " + gridStatus;
    for (let i = 0; i < currentGrid.length; i++) {
      currentGrid[i].style.outline = "1px solid #F8F8F8";
    }
  } else {
    gridStatus = "Off";
    gridToggle.textContent = "Grid: " + gridStatus;
    for (let i = 0; i < currentGrid.length; i++) {
      currentGrid[i].style.outline = "";
    }
  }
}

function clearColor () {
  currentGrid = getGridBoxes();
  
  if (currentMode == "Shade") {
    container.replaceChildren();
    createGridBoxes(parseInt(slider.value));

    currentGrid = getGridBoxes();
    for (let i = 0; i < currentGrid.length; i++) {
      currentGrid[i].addEventListener("mouseover", shadeMode);
    }
  }
  for (let i = 0; i < currentGrid.length; i++) {
    currentGrid[i].style.backgroundColor = "";
  }
}

function rainbowMode(mouseEvent) { 
  let color = '#'; 
  let letters = ["FF5733", "33FF57", "3357FF", "FFD700", "8A2BE2", "FF1493", "00CED1", "FF4500", "7CFC00", "8B0000", "20B2AA", "DDA0DD", "FF8C00", "4682B4", "6A5ACD", "ADFF2F"]; 
  color += letters[Math.floor(Math.random() * letters.length)];
  if (mouseEvent.type === 'mouseover') {
    mouseEvent.target.style.backgroundColor = color;
  }
}

function colorMode(mouseEvent) {
  if (mouseEvent.type === 'mouseover') {
    mouseEvent.target.style.backgroundColor = currentColor;
  }
}

function shadeMode (mouseEvent) {
  let target = mouseEvent.target;
  let percentValue = parseInt(target.dataset.percent);

  if (isNaN(percentValue)) percentValue = 100;
  if (percentValue >= 10) {
    percentValue -= 10;
    target.dataset.percent = percentValue;
  }
  
  let rgbColor = `rgb(${percentValue}%,${percentValue}%,${percentValue}%)`;

  if (mouseEvent.type === 'mouseover') {
    target.style.backgroundColor = rgbColor;
  }
}

function changeMode () {
  currentGrid = getGridBoxes();

  if (currentMode == "Color") {
    currentMode = "Rainbow"
    mode.textContent = currentMode;
    clearColor();
    colorCircleChange();
    for (let i = 0; i < currentGrid.length; i++) {
      currentGrid[i].removeEventListener('mouseover', colorMode);
      currentGrid[i].addEventListener('mouseover', rainbowMode);
    }
  } else if (currentMode == "Rainbow") {
    currentMode = "Shade"
    mode.textContent = currentMode;
    clearColor();
    colorCircleChange();
    for (let i = 0; i < currentGrid.length; i++) {
      currentGrid[i].removeEventListener('mouseover', rainbowMode);
      currentGrid[i].addEventListener('mouseover', shadeMode);
    }
  } else if (currentMode == "Shade") {
    currentMode = "Color"
    mode.textContent = currentMode;
    clearColor();
    colorCircleChange();
    for (let i = 0; i < currentGrid.length; i++) {
      currentGrid[i].removeEventListener('mouseover', shadeMode);
      currentGrid[i].addEventListener('mouseover', colorMode);
    }
  } 
}

function getGridBoxes () {
  const gridBoxes = document.querySelectorAll(".gridBox");

  return gridBoxes;
}

function changeValue() {
  sliderValueDisplay.textContent = "Grid: " + parseInt(this.value) + "x" + parseInt(this.value);
}

function colorCircleChange () {
  if (currentMode == "Color") {
    colorCircle.classList.remove("circle");
    colorPicker.style.display = "block";
  } else if (currentMode == "Rainbow") {
    colorCircle.classList.add("circle");
    colorPicker.style.display = "none";
    colorCircle.style.background = "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)";
  } else  if (currentMode == "Shade") {
    colorCircle.classList.add("circle");
    colorCircle.style.background = "conic-gradient(#fff, #000)";
  }
}

let gridStatus = "Off";
let currentColor = "black";
let currentMode = "Color";
let currentGrid;
const knobContainer = document.querySelector(".knob-container");
const colorCircle = document.querySelector("#color-circle");
const gridToggle = document.querySelector("#toggle-grid");
const clear = document.querySelector("#clear");
const mode = document.querySelector("#mode");
const slider = document.querySelector("#grid-slider");
const sliderValueDisplay = document.querySelector(".knob-2-text");
const container = document.querySelector("#grid-container");
const colorPicker = document.querySelector("#color-picker");

slider.addEventListener("knob-move-change", changeValue);
gridToggle.addEventListener("click", toggleGridlines);
clear.addEventListener("click", clearColor);
mode.addEventListener("click", changeMode);

colorPicker.oninput = function () {
  currentColor = this.value;
}

sliderValueDisplay.textContent = "Grid: " + parseInt(slider.value) + "x" + parseInt(slider.value);

slider.addEventListener("knob-move-end", function () {
  container.replaceChildren();
  createGridBoxes(parseInt(this.value));

  currentGrid = getGridBoxes();
  for (let i = 0; i < currentGrid.length; i++) {
    if (currentMode == "Color") {
      currentGrid[i].addEventListener('mouseover', colorMode);
    } else if (currentMode == "Rainbow") {
      currentGrid[i].addEventListener('mouseover', rainbowMode);
    } else {
      currentGrid[i].addEventListener('mouseover', shadeMode);
    }
  }
})

createGridBoxes(parseInt(slider.value));
gridToggle.textContent = "Grid: " + gridStatus;
mode.textContent = currentMode;

currentGrid = getGridBoxes();
for (let i = 0; i < currentGrid.length; i++) {
  currentGrid[i].addEventListener('mouseover', colorMode);
}