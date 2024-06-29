const copyAddressBtn = document.querySelector('.join-now__address-copy-button');
const addressValue = document.querySelector('.join-now__address').value;

const openButton = document.querySelector('.open-button');
const loaderContainer = document.querySelector('.loader-container');
const preloader = document.querySelector('.preloader');

const loaderInner = document.querySelector('.loader-inner');
const loaderProgress = document.querySelector('.loader-number-progress');


const sound = document.querySelector('.sound');
const audioRegulator = document.getElementById('sound-regulator');
const audio = document.getElementById('audio');

window.addEventListener('scroll', function () {
    var block = document.getElementById('socials-block');
    var scrollHeight = window.pageYOffset;

    var targetHeight = 2400;

    if (scrollHeight > targetHeight) {
        block.style.display = 'none';
    } else {
        block.style.display = 'flex';
    }
});

copyAddressBtn.addEventListener('click', () => {
    copyAddressBtn.innerHTML = `<img src="./img/copy-icon.svg" alt="copy" class="copy-icon">
                    COPIED`;
    const el = document.createElement('textarea');
    el.value = addressValue;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setTimeout(() => {
        copyAddressBtn.innerHTML = `<img src="./img/copy-icon.svg" alt="copy" class="copy-icon">
                    COPY`;
    }, 1000);
});

openButton.addEventListener('click', () => {
    openButton.style.display = 'none';
    loaderContainer.style.display = 'flex';
    playAudio();
    sound.style.display = 'flex'
});

let progress = 0;
document.body.style.overflow = 'hidden';

function updateProgress() {
    const width = (loaderInner.clientWidth / loaderInner.parentNode.clientWidth) * 100;
    progress = Math.round(width);
    loaderProgress.textContent = `${progress}/100`;

    if (progress === 1) {
        const lasers = document.querySelector('.preloader-lasers');
        lasers.style.animation = 'smoothMoveAndRotate 50s infinite linear';
    }

    if (progress === 100) {
        preloader.style.animation = 'fadeOutPreloader 1s linear forwards';
        document.body.style.overflow = 'auto';
        document.querySelector('.first-section__info').style.animation = 'showText 1s ease-in-out';
        document.querySelector('.first-section__image').style.animation = 'rocketFlight 2s ease-in-out';
    }
}

const intervalId = setInterval(() => {
    updateProgress();
}, 30);

audioRegulator.addEventListener('input', adjustVolume);

function adjustVolume() {
    audio.volume = audioRegulator.value / 100;
}

function playAudio() {
    audio.play();
}