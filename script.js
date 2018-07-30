const onLoadRowCount = 16;
const onLoadColCount = 16;
const colorMode = true;

function addItemsToGrid(number) {
  const container = document.querySelector('.container');
  for (let i = 0; i < number; i++) {
    let div = document.createElement('div');
    container.appendChild(div);
  }
}

function setGridDimension(row, col) {
  const container = document.querySelector('.container');
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
  } while (count < row && count < col);
  container.style.cssText = `grid-template-rows: ${rowAuto}; grid-template-columns: ${colAuto};`;
}

window.onload = () => {
  addItemsToGrid(onLoadRowCount * onLoadColCount);
  setGridDimension(onLoadRowCount,onLoadColCount);

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
          item.style.backgroundColor = `rgb(254, 254, 254)`;
        }
      }
      else{
        //Darken the color
        let color = item.style.backgroundColor;
        console.log(color);
      }
    })
  })
}

function changeColor(element){
  console.log(element);
}

//onClick eventHandler
function changeGrid(){

}

//Credits go to -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
