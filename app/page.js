'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

const DEFAULT_DATA = [56, 90, 67, 34, 22, 88, 71, 9, 38, 40];

const algorithmInfo = {
  selection: {
    name: "Selection Sort",
    description: "Finds the minimum element and swaps it with the current position",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)"
  },
  insertion: {
    name: "Insertion Sort",
    description: "Builds sorted array one element at a time",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)"
  },
  bubble: {
    name: "Bubble Sort",
    description: "Repeatedly swaps adjacent elements if in wrong order",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)"
  },
  merge: {
    name: "Merge Sort",
    description: "Divides array, sorts recursively, then merges",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)"
  }
};

export default function Home() {
  const [array, setArray] = useState([...DEFAULT_DATA]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('selection');
  const [speed, setSpeed] = useState(50);
  const [delay, setDelay] = useState(500);
  const [status, setStatus] = useState('Ready');
  const [barStates, setBarStates] = useState({});
  const [customData, setCustomData] = useState('');

  useEffect(() => {
    setDelay(1000 - (speed * 9));
  }, [speed]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const renderBars = (states = {}) => {
    setBarStates(states);
  };

  // Selection Sort
  const selectionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    setStatus("Sorting...");
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      for (let j = i + 1; j < n; j++) {
        compCount++;
        setComparisons(compCount);
        renderBars({ [minIdx]: 'current', [j]: 'comparing' });
        await sleep(delay);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        swapCount++;
        setSwaps(swapCount);
        renderBars({ [i]: 'swapping', [minIdx]: 'swapping' });
        await sleep(delay);
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
      }

      const sortedStates = {};
      for (let k = 0; k <= i; k++) {
        sortedStates[k] = 'sorted';
      }
      renderBars(sortedStates);
      await sleep(delay / 2);
    }

    const allSorted = {};
    for (let i = 0; i < n; i++) {
      allSorted[i] = 'sorted';
    }
    renderBars(allSorted);
    setStatus("Complete");
  };

  // Insertion Sort
  const insertionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    setStatus("Sorting...");
    let compCount = 0;
    let swapCount = 0;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      renderBars({ [i]: 'current' });
      await sleep(delay);

      while (j >= 0 && arr[j] > key) {
        compCount++;
        setComparisons(compCount);
        renderBars({ [j]: 'comparing', [j + 1]: 'swapping' });
        await sleep(delay);

        arr[j + 1] = arr[j];
        swapCount++;
        setSwaps(swapCount);
        j--;
        setArray([...arr]);
      }

      if (j >= 0) {
        compCount++;
        setComparisons(compCount);
      }

      arr[j + 1] = key;
      setArray([...arr]);

      const sortedStates = {};
      for (let k = 0; k <= i; k++) {
        sortedStates[k] = 'sorted';
      }
      renderBars(sortedStates);
      await sleep(delay / 2);
    }

    const allSorted = {};
    for (let i = 0; i < n; i++) {
      allSorted[i] = 'sorted';
    }
    renderBars(allSorted);
    setStatus("Complete");
  };

  // Bubble Sort
  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    setStatus("Sorting...");
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        compCount++;
        setComparisons(compCount);
        renderBars({ [j]: 'comparing', [j + 1]: 'comparing' });
        await sleep(delay);

        if (arr[j] > arr[j + 1]) {
          renderBars({ [j]: 'swapping', [j + 1]: 'swapping' });
          await sleep(delay);

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapCount++;
          setSwaps(swapCount);
          swapped = true;
          setArray([...arr]);
        }
      }

      const sortedStates = {};
      for (let k = n - i - 1; k < n; k++) {
        sortedStates[k] = 'sorted';
      }
      renderBars(sortedStates);
      await sleep(delay / 2);

      if (!swapped) break;
    }

    const allSorted = {};
    for (let i = 0; i < arr.length; i++) {
      allSorted[i] = 'sorted';
    }
    renderBars(allSorted);
    setStatus("Complete");
  };

  // Merge Sort
  const mergeSort = async () => {
    setStatus("Sorting...");
    let compCount = 0;
    let swapCount = 0;

    const mergeSortHelper = async (arr, start, end) => {
      if (start >= end) return arr;

      const mid = Math.floor((start + end) / 2);
      await mergeSortHelper(arr, start, mid);
      await mergeSortHelper(arr, mid + 1, end);
      await merge(arr, start, mid, end);
      return arr;
    };

    const merge = async (arr, start, mid, end) => {
      const left = arr.slice(start, mid + 1);
      const right = arr.slice(mid + 1, end + 1);

      let i = 0, j = 0, k = start;

      while (i < left.length && j < right.length) {
        compCount++;
        setComparisons(compCount);
        renderBars({ [k]: 'comparing' });
        await sleep(delay);

        if (left[i] <= right[j]) {
          arr[k] = left[i];
          i++;
        } else {
          arr[k] = right[j];
          j++;
        }

        swapCount++;
        setSwaps(swapCount);
        renderBars({ [k]: 'swapping' });
        setArray([...arr]);
        await sleep(delay);
        k++;
      }

      while (i < left.length) {
        arr[k] = left[i];
        swapCount++;
        setSwaps(swapCount);
        renderBars({ [k]: 'swapping' });
        setArray([...arr]);
        await sleep(delay);
        i++;
        k++;
      }

      while (j < right.length) {
        arr[k] = right[j];
        swapCount++;
        setSwaps(swapCount);
        renderBars({ [k]: 'swapping' });
        setArray([...arr]);
        await sleep(delay);
        j++;
        k++;
      }

      if (start === 0 && end === arr.length - 1) {
        const allSorted = {};
        for (let i = 0; i < arr.length; i++) {
          allSorted[i] = 'sorted';
        }
        renderBars(allSorted);
        setStatus("Complete");
      }
    };

    const arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
    setArray(arr);
  };

  const startSort = async () => {
    setComparisons(0);
    setSwaps(0);
    setIsSorting(true);

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
      setStatus("Error");
    }

    setIsSorting(false);
  };

  const reset = () => {
    if (isSorting) return;
    setArray([...DEFAULT_DATA]);
    setComparisons(0);
    setSwaps(0);
    setBarStates({});
    setStatus("Ready");
  };

  const randomize = () => {
    if (isSorting) return;
    setArray(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1));
    setComparisons(0);
    setSwaps(0);
    setBarStates({});
    setStatus("Randomized");
  };

  const loadCustomData = () => {
    if (isSorting) return;
    const input = customData.trim();
    if (!input) {
      setStatus("Enter data first");
      return;
    }

    const parsed = input.split(/[,\s]+/).map(val => parseInt(val.trim())).filter(val => !isNaN(val) && val > 0);

    if (parsed.length === 0) {
      setStatus("Invalid data");
      return;
    }

    if (parsed.length > 20) {
      setStatus("Max 20 values");
      return;
    }

    setArray(parsed);
    setComparisons(0);
    setSwaps(0);
    setBarStates({});
    setStatus("Custom data loaded");
  };

  const loadDefaultData = () => {
    if (isSorting) return;
    setArray([...DEFAULT_DATA]);
    setComparisons(0);
    setSwaps(0);
    setBarStates({});
    setCustomData('');
    setStatus("Default data loaded");
  };

  const maxValue = Math.max(...array);
  const info = algorithmInfo[algorithm];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Sorting Visualizer</h1>
        <div className={styles.headerInfo}>
          <span>{info.name}</span>
          <span className={styles.separator}>|</span>
          <span className={styles.complexity}>{info.timeComplexity}</span>
        </div>
      </header>

      <div className={styles.controlPanel}>
        <select 
          value={algorithm} 
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSorting}
          className={styles.select}
        >
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="bubble">Bubble Sort</option>
          <option value="merge">Merge Sort</option>
        </select>

        <div className={styles.speedControl}>
          <label>Speed</label>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            disabled={isSorting}
          />
          <span className={styles.speedDisplay}>{speed}%</span>
        </div>

        <button onClick={startSort} disabled={isSorting} className={`${styles.btn} ${styles.btnPrimary}`}>
          Sort
        </button>
        <button onClick={reset} disabled={isSorting} className={`${styles.btn} ${styles.btnSecondary}`}>
          Reset
        </button>
        <button onClick={randomize} disabled={isSorting} className={`${styles.btn} ${styles.btnSecondary}`}>
          Random
        </button>
      </div>

      <div className={styles.dataPanel}>
        <div className={styles.dataInputGroup}>
          <label htmlFor="custom-data">Custom Data:</label>
          <input 
            type="text" 
            id="custom-data"
            placeholder="e.g., 25, 10, 80, 45, 60"
            value={customData}
            onChange={(e) => setCustomData(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && loadCustomData()}
            disabled={isSorting}
            className={styles.input}
          />
        </div>
        <button onClick={loadCustomData} disabled={isSorting} className={`${styles.btn} ${styles.btnAccent}`}>
          Load Custom
        </button>
        <button onClick={loadDefaultData} disabled={isSorting} className={`${styles.btn} ${styles.btnAccent}`}>
          Load Default
        </button>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.label}>Comparisons</span>
          <span className={styles.value}>{comparisons}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Swaps</span>
          <span className={styles.value}>{swaps}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Status</span>
          <span className={`${styles.value} ${styles.status}`}>{status}</span>
        </div>
      </div>

      <div className={styles.visualization}>
        {array.map((value, index) => {
          const height = (value / maxValue) * 300;
          const state = barStates[index] || '';
          return (
            <div 
              key={index} 
              className={`${styles.bar} ${state ? styles[state] : ''}`}
              style={{ height: `${height}px` }}
            >
              <div className={styles.barValue}>{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

