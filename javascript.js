const container = document.querySelector('#container');
const sizeInput = document.querySelector('#size');
const clear = document.querySelector('#clear');
const DEFAULT_GRID_SIZE = 16;
sizeInput.value = DEFAULT_GRID_SIZE;

function createGrid(squareValue) {
    const pixelSize = (320 / squareValue);
    for (let i = 0; i < (squareValue * squareValue); i++) {
        const pixel = document.createElement('div');
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
    createGrid(sizeInput.value);
}

container.addEventListener('mouseover', eventTarget => {
    eventTarget.target.style.backgroundColor = 'black';
})
container.addEventListener('mouseleave', eventTarget => {
    eventTarget.target.style.backgroundColor = 'hotpink';
}, true)
clear.addEventListener('click', () => {
    clearGrid();
    clear.textContent = 'Clear'
})
sizeInput.addEventListener('focus', () => clear.textContent = 'Change');

createGrid(DEFAULT_GRID_SIZE);