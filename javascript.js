const container = document.querySelector('#container');

for (let i = 0; i < (16 * 16); i++) {
    const pixel = document.createElement('div');
    container.appendChild(pixel);
}
const pixels = document.querySelectorAll('#container div')

for (const pixel of pixels) {
    pixel.addEventListener('mouseenter', () => {
        pixel.style.backgroundColor = 'pink';
    })
        

}
