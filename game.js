// Resources and Game State
let resources = {
    wood: { count: 0, limit: 200 },
    food: { count: 0, limit: 100 },
    stone: { count: 0, limit: 200 },
    knowledge: { count: 0, rate: 1 },
    workers: { count: 0, limit: 0 },
};

let workers = { farmer: 0, woodcutter: 0, miner: 0 };

const logEl = document.getElementById('log');

// Update UI
function updateUI() {
    document.getElementById('wood-count').innerText = resources.wood.count;
    document.getElementById('food-count').innerText = resources.food.count;
    document.getElementById('stone-count').innerText = resources.stone.count;
    document.getElementById('knowledge-count').innerText = resources.knowledge.count;
    document.getElementById('worker-count').innerText = resources.workers.count;
    document.getElementById('worker-limit').innerText = resources.workers.limit;
    document.getElementById('knowledge-rate').innerText = resources.knowledge.rate;

    document.getElementById('unassigned-workers').innerText =
        resources.workers.count - Object.values(workers).reduce((a, b) => a + b, 0);
    document.getElementById('farmer-count').innerText = workers.farmer;
    document.getElementById('woodcutter-count').innerText = workers.woodcutter;
    document.getElementById('miner-count').innerText = workers.miner;
}

// Resource Gathering
function gatherResource(type) {
    if (resources[type].count < resources[type].limit) {
        resources[type].count++;
        updateUI();
    }
}

// Build Structures
function buildBuilding(type) {
    if (type === 'house' && resources.wood.count >= 100) {
        resources.wood.count -= 100;
        resources.workers.limit += 2;
        log('You built a House!');
    } else if (type === 'lumberMill' && resources.wood.count >= 100) {
        resources.wood.count -= 100;
        resources.wood.limit *= 2;
        log('You built a Lumber Mill!');
    } else if (type === 'stoneQuarry' && resources.stone.count >= 100) {
        resources.stone.count -= 100;
        resources.stone.limit *= 2;
        log('You built a Stone Quarry!');
    }
    updateUI();
}

// Workers Assignment
function assignWorker(job) {
    const unassigned = resources.workers.count - Object.values(workers).reduce((a, b) => a + b, 0);
    if (unassigned > 0) {
        workers[job]++;
        updateUI();
    }
}

// Housing Upgrade
function purchaseHousingUpgrade() {
    if (resources.food.count >= 50 && resources.knowledge.count >= 100) {
        resources.food.count -= 50;
        resources.knowledge.count -= 100;
        document.getElementById('house-button').style.display = 'inline-block';
        log('Housing upgrade researched!');
        updateUI();
    }
}

// Save and Load Functions
function saveGame() {
    const saveData = JSON.stringify({ resources, workers });
    localStorage.setItem('idleGameSave', saveData);
    log('Game saved!');
}

function loadGame() {
    const savedData = localStorage.getItem('idleGameSave');
    if (savedData) {
        const loaded = JSON.parse(savedData);
        resources = loaded.resources;
        workers = loaded.workers;
        log('Game loaded!');
        updateUI();
    }
}

// Export/Import Save
function exportSave() {
    const dataStr = JSON.stringify({ resources, workers });
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'idleGameSave.json';
    link.click();
    log('Save exported.');
}

function importSave(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const loaded = JSON.parse(reader.result);
            resources = loaded.resources;
            workers = loaded.workers;
            log('Save imported!');
            updateUI();
        };
        reader.readAsText(file);
    }
}

// Log Messages
function log(message) {
    logEl.innerHTML += `<div>${message}</div>`;
    logEl.scrollTop = logEl.scrollHeight;
}

// Tab Switching
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.getElementById(`${tab}-tab`).style.display = 'block';
}

// Event Listeners
document.querySelectorAll('.gather-button').forEach(button => {
    button.addEventListener('click', () => gatherResource(button.dataset.type));
});

document.querySelectorAll('.build-button').forEach(button => {
    button.addEventListener('click', () => buildBuilding(button.dataset.type));
});

document.getElementById('export-save').addEventListener('click', exportSave);
document.getElementById('import-save').addEventListener('click', () => document.getElementById('save-file').click());
document.getElementById('save-file').addEventListener('change', importSave);

setInterval(() => {
    resources.knowledge.count += resources.knowledge.rate;
    resources.food.count -= workers.farmer * 0.25;
    resources.food.count = Math.max(resources.food.count, 0); // Prevent negative food
    updateUI();
}, 1000);

setInterval(saveGame, 60000); // Auto-save every 60 seconds

// Initialize Game
loadGame();
updateUI();
