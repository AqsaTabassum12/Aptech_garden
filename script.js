let currentId = null;
let currentTab = null;
const tabContainerHeight = 70;
const tabs = document.querySelectorAll('.hero-tab-link');
const tabSlider = document.querySelector('.hero-tab-slider');

function init() {
    currentTab = tabs[0];
    setSliderCss();

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => onTabClick(event, tab));
    });
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
}

function onTabClick(event, element) {
    event.preventDefault();
    const targetId = element.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const scrollTop = targetElement.offsetTop - tabContainerHeight + 1;
    window.scrollTo({ top: scrollTop, behavior: 'smooth' });
}

function onScroll() {
    checkTabContainerPosition();
    findCurrentTabSelector();
}

function onResize() {
    if (currentId) {
        setSliderCss();
    }
}

function checkTabContainerPosition() {
    const offset = document.querySelector('.hero-tabs').offsetTop + document.querySelector('.hero-tabs').offsetHeight - tabContainerHeight;
    const tabContainer = document.querySelector('.hero-tabs-container');
    if (window.scrollY > offset) {
        tabContainer.classList.add('hero-tabs-container--top');
    } else {
        tabContainer.classList.remove('hero-tabs-container--top');
    }
}

function findCurrentTabSelector() {
    let newCurrentId = null;
    let newCurrentTab = null;
    tabs.forEach(tab => {
        const id = tab.getAttribute('href');
        const targetElement = document.querySelector(id);
        const offsetTop = targetElement.offsetTop - tabContainerHeight;
        const offsetBottom = targetElement.offsetTop + targetElement.offsetHeight - tabContainerHeight;
        if (window.scrollY > offsetTop && window.scrollY < offsetBottom) {
            newCurrentId = id;
            newCurrentTab = tab;
        }
    });
    if (currentId !== newCurrentId || currentId === null) {
        currentId = newCurrentId;
        currentTab = newCurrentTab;
        setSliderCss();
    }
}

function setSliderCss() {
    if (currentTab) {
        const width = currentTab.offsetWidth + 'px';
        const left = currentTab.offsetLeft + 'px';
        tabSlider.style.width = width;
        tabSlider.style.left = left;
    }
}

document.addEventListener('DOMContentLoaded', init);
