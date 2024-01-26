const container = document.querySelector('#container');
const sizeInput = document.querySelector('#size');
const clear = document.querySelector('#clear');
const rightControls = document.querySelector('#rightControls');

const DEFAULT_GRID_WIDTH = 64;
sizeInput.value = DEFAULT_GRID_WIDTH;

function createGrid(gridWidth) {
    const pixelSize = (560 / gridWidth);
    for (let i = 0; i < (gridWidth * (gridWidth * 3 / 4)); i++) {
        const pixel = document.createElement('div');
        pixel.style.height = `${pixelSize}px`;
        pixel.style.width = `${pixelSize}px`;
        container.appendChild(pixel);
    }
}

function clearGrid() {
    const pixels = container.querySelectorAll('div');
    for (const div of pixels) {
        div.classList.remove('active');
        container.removeChild(div);
    }
}

let fillStyle = 'standard';
const rainbowFill = [];
let rainbowCounter = 0;

function createRainbow() {
    for (i = 0; i < 64; i++) {
        const x = Math.floor(Math.random() * 4096);
        rainbowFill.push(x.toString(16));
    }
}

container.addEventListener('mouseover', eventTarget => {
    if (fillStyle === 'standard') {
        // eventTarget.target.style.opacity = '0';
        let classes = eventTarget.target.classList
        classes.add('active');
    }
    if (fillStyle === 'rainbow'){
        eventTarget.target.style.backgroundColor = `#${rainbowFill[rainbowCounter]}`;
        rainbowCounter >= 63 ? rainbowCounter = 0 : rainbowCounter++;
    }   
    if (fillStyle === 'progressive'){
        console.log(`foo: ${eventTarget.target.style.width}`);
        let x = Number(eventTarget.target.style.opacity)
        
        if (x > 0) eventTarget.target.style.opacity = String(x - 0.1);
        }
    
} 

)
container.addEventListener('mouseleave', eventTarget => {
}, true)

clear.addEventListener('click', () => {
    clearGrid();
    clear.textContent = 'Clear'
    createGrid(sizeInput.value);
})
sizeInput.addEventListener('focus', () => clear.textContent = 'Change');



rightControls.addEventListener('click', eventTarget => {
    fillStyle = eventTarget.target.id;
})



createGrid(DEFAULT_GRID_WIDTH);
createRainbow();