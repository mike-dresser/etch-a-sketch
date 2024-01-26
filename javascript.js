const container = document.querySelector('#container');

const sizeInput = document.querySelector('#size');
const DEFAULT_GRID_WIDTH = 64;
sizeInput.value = DEFAULT_GRID_WIDTH;

const clearButton = document.querySelector('#clear');
const rightControls = document.querySelector('#rightControls');

// Fill container div with pixel divs, whose size and number is determined 
// by the grid width and 4x3 aspect ratio. (Is there is a better way
// to assign height than inline styling?) The container div background is black
// and is revealed by reducing the opacity of the grey pixels in standard
// and progressive modes.
function createGrid(gridWidth) {
    const pixelSize = (container.offsetWidth / gridWidth);
    for (let i = 0; i < (gridWidth * (gridWidth * 3 / 4)); i++) {
        const pixel = document.createElement('div');
        pixel.dataset.passCount = 0;
        pixel.style.height = `${pixelSize}px`;
        pixel.style.width = `${pixelSize}px`;
        container.appendChild(pixel);
    }
}

function clearGrid() {
    const pixels = container.querySelectorAll('div');
    for (const div of pixels) {
        container.removeChild(div);
    }
}

let fillStyle = 'standard';
const rainbowFill = [];
let rainbowCounter = 0;

// Creates an array of random hex color values to be iterated over when changing
// pixel background color in rainbow mode. Runs once at page load.
function createRainbow() {
    for (i = 0; i < 64; i++) {
        const x = Math.floor(Math.random() * 4096);
        rainbowFill.push(x.toString(16));
    }
}



// When mouseover a child div (pixel) of container, check the fillStyle mode
// and change opacity / background color / data-pass-count accordingly.
//  When the grid is cleared, all divs are removed.

container.addEventListener('mouseover', eventTarget => {

    // Toggling the 'active' class to change opacity to 0
    if (fillStyle === 'standard') {
        let classes = eventTarget.target.classList
        classes.add('active');
    }
    // Changing the pixel background to one of the rainbowFill[] colors
    if (fillStyle === 'rainbow'){
        eventTarget.target.style.backgroundColor = `#${rainbowFill[rainbowCounter]}`;
        rainbowCounter >= 63 ? rainbowCounter = 0 : rainbowCounter++;
    }   
    // Use data-pass-count attribute to track mouse passes, opacity is set
    // in stylesheet
    if (fillStyle === 'progressive'){
        const pass = Number(eventTarget.target.dataset.passCount);
        if (pass < 10) eventTarget.target.dataset.passCount = String(pass + 1);
        }
    
} 

)

clearButton.addEventListener('click', () => {
    clearGrid();
    clearButton.textContent = 'Clear'
    createGrid(sizeInput.value);
})

// Clear button doubles as size change button
sizeInput.addEventListener('focus', () => clearButton.textContent = 'Change');


// Pass the fillStyle mode to determine mouseover behavior
rightControls.addEventListener('click', eventTarget => {
    fillStyle = eventTarget.target.id;
})



createGrid(DEFAULT_GRID_WIDTH);
createRainbow();