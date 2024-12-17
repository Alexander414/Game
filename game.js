// Resources
let resources = {
    wood: { count: 0, limit: 200 },
    food: { count: 0, limit: 100 },
    stone: { count: 0, limit: 200 }
};

const logEl = document.getElementById('log');

function updateUI() {
    for (let [type, { count, limit }] of Object.entries(resources)) {
        document.getElementById(`${type}-count`).innerText = count;
        document.getElementById(`${type}-limit`).innerText = limit;
    }

    document.querySelectorAll('.build-button').forEach(button => {
        const type = button.dataset.type;
        const cost = type === 'lumberMill' ? 100 : 100;
        button.disabled = resources[type === 'lumberMill' ? 'wood' : 'stone'].count < cost;
    });
}

function gatherResource(type) {
    if (resources[type].count < resources[type].limit) {
        resources[type].count++;
        updateUI();
    }
}

function buildBuilding(type) {
    const cost = type === 'lumberMill' ? 100 : 100;
    const resourceType = type === 'lumberMill' ? 'wood' : 'stone';

    if (resources[resourceType].count >= cost) {
        resources[resourceType].count -= cost;
        resources[resourceType].limit *= 2;
        log(`You built a ${type === 'lumberMill' ? 'Lumber Mill' : 'Stone Quarry'}!`);
        updateUI();
    }
}

function log(message) {
    logEl.innerHTML += `<div>${message}</div>`;
    logEl.scrollTop = logEl.scrollHeight;
}

document.querySelectorAll('.gather-button').forEach(button => {
    button.addEventListener('click', () => gatherResource(button.dataset.type));
});

document.querySelectorAll('.build-button').forEach(button => {
    button.addEventListener('click', () => buildBuilding(button.dataset.type));
});

updateUI();
