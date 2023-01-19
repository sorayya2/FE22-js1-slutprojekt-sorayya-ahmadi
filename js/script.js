const dropdown = document.querySelector('.dropdown')
const toggleButton = document.querySelector('.dropdown-toggle')
const menu = document.querySelector('.dropdown-menu')
const options = document.querySelectorAll('.dropdown-option')

const gallery = document.querySelector('.galler');
const photoContainer = document.querySelector('.photoContainer');

const nextButton = document.querySelector('.next-button')
const searchButton = document.querySelector('.searchButton');

const inputText = document.querySelector('#search');
const inputSize = document.querySelector('#size-options');
const inputSort = document.querySelector('#sort-options');
const inputNumber = document.querySelector('#number-options');

let optionSizeValue = '';
let sortValue = '';
let imgNumberValue = '';
let textValue = '';

inputText.addEventListener('blur', (e) => {
    textValue = e.target.value;
    console.log(textValue);
    inputText.focus();
});
inputSize.addEventListener('change', function (e) {
    console.log(e.target.value);
    optionSizeValue = e.target.value;
});
inputNumber.addEventListener('change', function (e) {
    console.log(e.target.value);
    imgNumberValue = e.target.value;
});

toggleButton.addEventListener('click', function () {
    menu.classList.toggle('show');
});

options.forEach(function (item) {
    item.addEventListener('click', selectOption)
});

function selectOption() {
    sortValue = this.textContent;
    console.log(sortValue);
    toggleButton.textContent = sortValue;
    menu.classList.remove('show');
};

function displayLoading() {
    anime({
        targets: ".loading1",
        scale: ['0', '3'],
        easing: "easeInOutQuad",
        opacity: 1,
        duration: '100',
        loop: '1',
    });
}
function hideLoading() {
    anime({
        targets: ".loading1",
        scale: ['3', '0'],
        easing: "easeInOutQuad",
        opacity: 0,
        duration: '100',
        loop: '1',
    });
}
function fetchGetData() {
   
    displayLoading();


    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=358be4901f416ebee58ec9ab473d4b4d&text=${textValue}&sort=${sortValue}&per_page=${imgNumberValue}&format=json&nojsoncallback=1`;
    
fetch(url)
.then((res) => res.json())

.then((result) => {
        
            const photoarr = result.photos.photo;

            photoarr.forEach((result) => {
                console.log(result);
                const img = document.createElement('img');

                img.src = `https://live.staticflickr.com/${result.server}/${result.id}_${result.secret}_${optionSizeValue}.jpg`;

                photoContainer.appendChild(img);

            })
            hideLoading();
            if(result.photos.pages === 0){
            const p = document.createElement('p');
            p.innerText = `Try it again!!`;
    
            p.style.fontSize = '40px';
            p.style.height = '60px';
            p.style.color = 'black';
            photoContainer.appendChild(p); 
         }
        })

        .catch((error) => {
            console.log(error.name);

            const p = document.createElement('p');
            p.innerText = `Try it again!!!`;
    
            p.style.fontSize = '40px';
            p.style.height = '60px';
            p.style.color = 'black';
            photoContainer.appendChild(p); 

        })
};

function clear() {
    inputText.value = '';
    inputSize.value = '';
    toggleButton.textContent = 'Select options';
    toggleButton.classList.remove('selected');
   
    inputNumber.value = '';
    photoContainer.innerHTML = '';
};

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    clear();
    fetchGetData();
});

