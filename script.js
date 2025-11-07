// Initial data
const DEFAULT_DATA = [56, 90, 67, 34, 22, 88, 71, 9, 38, 40];
let array = [...DEFAULT_DATA];
let comparisons = 0;
let swaps = 0;
let isSorting = false;
let delay = 500;

// Algorithm information
const algorithmInfo = {
    selection: {
        name: "Selection Sort",
        description: "Finds the minimum element and swaps it with the current position",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)"
    },
    insertion: {
        name: "Insertion Sort",
        description: "Builds sorted array one element at a time by inserting each element into its correct position",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)"
    },
    bubble: {
        name: "Bubble Sort",
        description: "Repeatedly swaps adjacent elements if they're in the wrong order",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)"
    },
    merge: {
        name: "Merge Sort",
        description: "Divides array in half, sorts recursively, then merges sorted halves",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)"
    }
};

// DOM Elements
const visualization = document.getElementById('visualization');
const sortBtn = document.getElementById('sort-btn');
const resetBtn = document.getElementById('reset-btn');
const randomBtn = document.getElementById('random-btn');
const algorithmSelect = document.getElementById('algorithm-select');
const speedSlider = document.getElementById('speed-slider');
const speedDisplay = document.getElementById('speed-display');
const comparisonsEl = document.getElementById('comparisons');
const swapsEl = document.getElementById('swaps');
const timeComplexityEl = document.getElementById('time-complexity');
const statusText = document.getElementById('status-text');
const currentAlgoName = document.getElementById('current-algo-name');
const customDataInput = document.getElementById('custom-data');
const loadCustomBtn = document.getElementById('load-custom-btn');
const loadDefaultBtn = document.getElementById('load-default-btn');

// Initialize
function init() {
    renderBars();
    updateAlgorithmInfo();
}

// Render bars
function renderBars(highlightIndices = [], states = {}) {
    visualization.innerHTML = '';
    const maxValue = Math.max(...array);
    
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        
        if (states[index]) {
            bar.classList.add(states[index]);
        }
        
        const height = (value / maxValue) * 300;
        bar.style.height = `${height}px`;
        
        const barValue = document.createElement('div');
        barValue.className = 'bar-value';
        barValue.textContent = value;
        bar.appendChild(barValue);
        
        visualization.appendChild(bar);
    });
}

// Update metrics
function updateMetrics() {
    comparisonsEl.textContent = comparisons;
    swapsEl.textContent = swaps;
}

// Update algorithm info
function updateAlgorithmInfo() {
    const algo = algorithmSelect.value;
    const info = algorithmInfo[algo];
    currentAlgoName.textContent = info.name;
    timeComplexityEl.textContent = info.timeComplexity;
}

// Sleep function for animation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Selection Sort
async function selectionSort() {
    const n = array.length;
    statusText.textContent = "Sorting...";
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            updateMetrics();
            
            const states = { [minIdx]: 'current', [j]: 'comparing' };
            renderBars([], states);
            await sleep(delay);
            
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        
        if (minIdx !== i) {
            swaps++;
            updateMetrics();
            
            const states = { [i]: 'swapping', [minIdx]: 'swapping' };
            renderBars([], states);
            await sleep(delay);
            
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
        }
        
        const sortedStates = {};
        for (let k = 0; k <= i; k++) {
            sortedStates[k] = 'sorted';
        }
        renderBars([], sortedStates);
        await sleep(delay / 2);
    }
    
    const allSorted = {};
    for (let i = 0; i < n; i++) {
        allSorted[i] = 'sorted';
    }
    renderBars([], allSorted);
    statusText.textContent = "Complete";
}

// Insertion Sort
async function insertionSort() {
    const n = array.length;
    statusText.textContent = "Sorting...";
    
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        
        const states = { [i]: 'current' };
        renderBars([], states);
        await sleep(delay);
        
        while (j >= 0 && array[j] > key) {
            comparisons++;
            updateMetrics();
            
            const compareStates = { [j]: 'comparing', [j + 1]: 'swapping' };
            renderBars([], compareStates);
            await sleep(delay);
            
            array[j + 1] = array[j];
            swaps++;
            updateMetrics();
            j--;
        }
        
        if (j >= 0) {
            comparisons++;
            updateMetrics();
        }
        
        array[j + 1] = key;
        
        const sortedStates = {};
        for (let k = 0; k <= i; k++) {
            sortedStates[k] = 'sorted';
        }
        renderBars([], sortedStates);
        await sleep(delay / 2);
    }
    
    const allSorted = {};
    for (let i = 0; i < n; i++) {
        allSorted[i] = 'sorted';
    }
    renderBars([], allSorted);
    statusText.textContent = "Complete";
}

// Bubble Sort
async function bubbleSort() {
    const n = array.length;
    statusText.textContent = "Sorting...";
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            updateMetrics();
            
            const states = { [j]: 'comparing', [j + 1]: 'comparing' };
            renderBars([], states);
            await sleep(delay);
            
            if (array[j] > array[j + 1]) {
                const swapStates = { [j]: 'swapping', [j + 1]: 'swapping' };
                renderBars([], swapStates);
                await sleep(delay);
                
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swaps++;
                updateMetrics();
                swapped = true;
            }
        }
        
        const sortedStates = {};
        for (let k = n - i - 1; k < n; k++) {
            sortedStates[k] = 'sorted';
        }
        renderBars([], sortedStates);
        await sleep(delay / 2);
        
        if (!swapped) break;
    }
    
    const allSorted = {};
    for (let i = 0; i < array.length; i++) {
        allSorted[i] = 'sorted';
    }
    renderBars([], allSorted);
    statusText.textContent = "Complete";
}

// Merge Sort
async function mergeSort(start = 0, end = array.length - 1, depth = 0) {
    if (start >= end) return;
    
    statusText.textContent = "Sorting...";
    
    const mid = Math.floor((start + end) / 2);
    
    await mergeSort(start, mid, depth + 1);
    await mergeSort(mid + 1, end, depth + 1);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;
    
    while (i < left.length && j < right.length) {
        comparisons++;
        updateMetrics();
        
        const states = { [k]: 'comparing' };
        renderBars([], states);
        await sleep(delay);
        
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        
        swaps++;
        updateMetrics();
        
        const swapStates = { [k]: 'swapping' };
        renderBars([], swapStates);
        await sleep(delay);
        
        k++;
    }
    
    while (i < left.length) {
        array[k] = left[i];
        swaps++;
        updateMetrics();
        
        const states = { [k]: 'swapping' };
        renderBars([], states);
        await sleep(delay);
        
        i++;
        k++;
    }
    
    while (j < right.length) {
        array[k] = right[j];
        swaps++;
        updateMetrics();
        
        const states = { [k]: 'swapping' };
        renderBars([], states);
        await sleep(delay);
        
        j++;
        k++;
    }
    
    if (start === 0 && end === array.length - 1) {
        const allSorted = {};
        for (let i = 0; i < array.length; i++) {
            allSorted[i] = 'sorted';
        }
        renderBars([], allSorted);
        statusText.textContent = "Complete";
    }
}

// Start sorting
async function startSort() {
    if (isSorting) return;
    
    isSorting = true;
    sortBtn.disabled = true;
    resetBtn.disabled = true;
    randomBtn.disabled = true;
    loadCustomBtn.disabled = true;
    loadDefaultBtn.disabled = true;
    customDataInput.disabled = true;
    algorithmSelect.disabled = true;
    
    comparisons = 0;
    swaps = 0;
    updateMetrics();
    
    const algorithm = algorithmSelect.value;
    
    try {
        switch (algorithm) {
            case 'selection':
                await selectionSort();
                break;
            case 'insertion':
                await insertionSort();
                break;
            case 'bubble':
                await bubbleSort();
                break;
            case 'merge':
                await mergeSort();
                break;
        }
    } catch (error) {
        console.error('Sorting error:', error);
        statusText.textContent = "Error";
    }
    
    isSorting = false;
    sortBtn.disabled = false;
    resetBtn.disabled = false;
    randomBtn.disabled = false;
    loadCustomBtn.disabled = false;
    loadDefaultBtn.disabled = false;
    customDataInput.disabled = false;
    algorithmSelect.disabled = false;
}

// Reset to original data
function reset() {
    if (isSorting) return;
    
    array = [...DEFAULT_DATA];
    comparisons = 0;
    swaps = 0;
    updateMetrics();
    renderBars();
    statusText.textContent = "Ready";
}

// Randomize array
function randomize() {
    if (isSorting) return;
    
    array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    comparisons = 0;
    swaps = 0;
    updateMetrics();
    renderBars();
    statusText.textContent = "Randomized";
}

// Load custom data
function loadCustomData() {
    if (isSorting) return;
    
    const input = customDataInput.value.trim();
    if (!input) {
        statusText.textContent = "Enter data first";
        return;
    }
    
    // Parse the input - split by comma, space, or both
    const parsed = input.split(/[,\s]+/).map(val => parseInt(val.trim())).filter(val => !isNaN(val) && val > 0);
    
    if (parsed.length === 0) {
        statusText.textContent = "Invalid data";
        return;
    }
    
    if (parsed.length > 20) {
        statusText.textContent = "Max 20 values";
        return;
    }
    
    array = parsed;
    comparisons = 0;
    swaps = 0;
    updateMetrics();
    renderBars();
    statusText.textContent = "Custom data loaded";
}

// Load default data
function loadDefaultData() {
    if (isSorting) return;
    
    array = [...DEFAULT_DATA];
    comparisons = 0;
    swaps = 0;
    updateMetrics();
    renderBars();
    customDataInput.value = '';
    statusText.textContent = "Default data loaded";
}

// Event Listeners
sortBtn.addEventListener('click', startSort);
resetBtn.addEventListener('click', reset);
randomBtn.addEventListener('click', randomize);
loadCustomBtn.addEventListener('click', loadCustomData);
loadDefaultBtn.addEventListener('click', loadDefaultData);

algorithmSelect.addEventListener('change', () => {
    updateAlgorithmInfo();
});

speedSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    speedDisplay.textContent = value + '%';
    delay = 1000 - (value * 9);
});

// Allow Enter key to load custom data
customDataInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadCustomData();
    }
});

// Initialize on load
init();

