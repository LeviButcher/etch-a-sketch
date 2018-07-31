const onLoadRowCount = 16;
const onLoadColCount = 16;
let colorMode = true;
let changePercentage = .10;
let lightenColor = false;

window.onload = () => {
  addItemsToGrid(onLoadRowCount * onLoadColCount);
  setGridDimension(onLoadRowCount, onLoadColCount);
  addMouseOverListeners();

  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', clearGridColor);

  const resizeButton = document.querySelector("#resize");
  resizeButton.addEventListener('click', changeGrid);

  const lightKnob = document.querySelector('#lightenKnob');
  lightKnob.addEventListener('click', changeLightenColorMode);

  const colorKnob = document.querySelector('#colorKnob');
  colorKnob.addEventListener('click', changeColorMode);

  const slider = document.querySelector('#colorPercentage');
  slider.addEventListener('change', (e) => {
    console.log(slider.value);
    changePercentage = slider.value;
  })
}

function addItemsToGrid(number) {
  const container = document.querySelector('.container');
  for (let i = 0; i < number; i++) {
    let div = document.createElement('div');
    container.appendChild(div);
  }
}

function setGridDimension(row, col) {
  const container = document.querySelector('.container');
  const sizeEle = document.querySelector('#size');
  let rowAuto = '';
  let colAuto = '';
  let count = 0;
  do {
    if (count < row) {
      rowAuto += 'auto ';
    }

    if (count < col) {
      colAuto += 'auto ';
    }

    count++;
  } while (count < row || count < col);
  container.style.cssText = `grid-template-rows: ${rowAuto}; grid-template-columns: ${colAuto};`;
  sizeEle.textContent = `${row} x ${col}`;
}

/*
  Add mouse over listeners to all divs inside the #container
*/
function addMouseOverListeners(){
  const gridItems = document.querySelectorAll('.container > div');
  console.log(gridItems)
  gridItems.forEach((item) => {
    item.addEventListener('mouseover', (e) =>{
      if(!item.style.backgroundColor){
        //Assign random color OR black
        if(colorMode){
          //Do random color
          item.style.backgroundColor = `rgb(${getRandomIntInclusive(0,255)}, ${getRandomIntInclusive(0,255)}, ${getRandomIntInclusive(0,255)})`;
        }
        else{
          //black
          let randomValue = getRandomIntInclusive(0,255);
          item.style.backgroundColor = `rgb(${randomValue}, ${randomValue}, ${randomValue})`;
        }
      }
      else{
        //Darken the color
        let color = item.style.backgroundColor;
        let rgbValues = extractRGBValues(color);
        let changedRGB = changeRGBColor(rgbValues, lightenColor, changePercentage);
        item.style.backgroundColor = `rgb(${changedRGB[0]}, ${changedRGB[1]}, ${changedRGB[2]})`;
      }
    })
  })
}

function extractRGBValues(rgbString){
  let reg = /\D/;
  let numberArr = rgbString.split(reg);
  let rgbValues = [];
  for(let i = 0; i < numberArr.length; i++){
    if(numberArr[i]){
      rgbValues.push(Number(numberArr[i]));
    }
  }
  return rgbValues;
}

/*
  darkens or lightens the rgb value by a percentage
  Precondition: rgbArr is a 3 element number array
*/
function changeRGBColor(rgbArr, lighter, percentage) {
  let changedRGB = [];
  let changeValue = Math.ceil(255 * percentage);
  for(let i = 0; i < rgbArr.length; i++) {
    if(lighter){
      console.log("rgbARr " + rgbArr[i]);
      console.log("changeValue "+ changeValue);
      changedRGB[i] = rgbArr[i] + changeValue;
      console.log(changedRGB[i]);
    }
    else{
      changedRGB[i] = rgbArr[i] - changeValue;
    }
    if(changedRGB[i] > 255){
      changedRGB[i] = 255;
    }
    else if(changedRGB[i] < 0){
      changedRGB[i] = 0;
    }
  }
  return changedRGB;
}

function changeLightenColorMode(){
  lightenColor = !lightenColor;
  const mark = document.querySelector('#lightenKnob > div');
  changeMarkDirection(mark);
}

function changeColorMode(){
  colorMode = !colorMode;
  const mark = document.querySelector('#colorKnob > div');
  changeMarkDirection(mark);
}

function changeLightOrDarkPercentage(value){
  if(value < 1 && value > 0)
    changePercentage = value;
}

function changeMarkDirection(mark) {
  if(mark.classList.contains('face-left')){
    mark.classList.remove('face-left');
    mark.classList.add('face-right');
  }
  else {
    mark.classList.remove('face-right');
    mark.classList.add('face-left');
  }
}

/*
  onClick eventHandler
*/
function changeGrid(){
  let dimension = prompt('Enter new grid size. 16x16 or 16. up to 200');
  let row = 0, col = 0;
  if(dimension){
    console.log(dimension);
    let dimArr = dimension.split('x');
    if (dimArr.every(value => value <= 200 && value > 0)) {
      row = dimArr[0];
      col = dimArr[1] || dimArr[0];

      clearGridContent();
      setGridDimension(row, col)
      addItemsToGrid(row * col);
      addMouseOverListeners();
    }
    else {
      alert(`Your values, ${dimArr}, is not a valid value, try again`);
    }
  }
  else {
    alert(`You didn't enter a value`);
  }
}

function clearGridColor(){
  const gridItems = document.querySelectorAll('.container > div');
  gridItems.forEach(item => {
    item.style.backgroundColor = '';
  })
}

function clearGridContent(){
  const container = document.querySelector('.container');
  while(container.firstChild){
    container.removeChild(container.firstChild);
  }
}

//Credits go to -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
