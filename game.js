// Resources
let wood = 0, woodLimit = 200;
let food = 0, foodLimit = 100;
let stone = 0, stoneLimit = 200;

const woodCountEl = document.getElementById('wood-count');
const foodCountEl = document.getElementById('food-count');
const stoneCountEl = document.getElementById('stone-count');
const woodLimitEl = document.getElementById('wood-limit');
const foodLimitEl = document.getElementById('food-limit');
const stoneLimitEl = document.getElementById('stone-limit');
const logEl = document.getElementById('log');

function updateUI() {
    woodCountEl.innerText = wood;
    foodCountEl.innerText = food;
    stoneCountEl.innerText = stone;
    woodLimitEl.innerText = woodLimit;
    foodLimitEl.innerText = foodLimit;
    stoneLimitEl.innerText = stoneLimit;
    checkBuildings();
}

function log(message) {
    logEl.innerHTML += `<div>${message}</div>`;
    logEl.scrollTop = logEl.scrollHeight;
}

function gatherResource(type) {
    switch(type) {
        case 'wood':
            if (wood < woodLimit) {
                wood++;
                updateUI();
            }
            break;
        case 'food':
            if (food < foodLimit) {
                food++;
                updateUI();
            }
            break;
        case 'stone':
            if (stone < stoneLimit) {
                stone++;
                updateUI();
            }
            break;
    }
}

function checkBuildings() {
    if (wood >= 50) {
        document.getElementById('lumber-mill').style.display = 'block';
    }
    if (stone >= 50) {
        document.getElementById('stone-quarry').style.display = 'block';
    }
}

function buildBuilding(type) {
    if (type === 'lumberMill' && wood >= 100) {
        wood -= 100;
        woodLimit *= 2; // Double the wood storage
        updateUI();
        log('You built a Lumber Mill! Wood storage increased.');
    }
    if (type === 'stoneQuarry' && stone >= 100) {
        stone -= 100;
        stoneLimit *= 2; // Double the stone storage
        updateUI();
        log('You built a Stone Quarry! Stone storage increased.');
    }
}
