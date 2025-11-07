'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

const DEFAULT_DATA = [56, 90, 67, 34, 22, 88, 71, 9, 38, 40]

const algorithmInfo = {
  selection: {
    name: 'Selection Sort',
    description: 'Finds the minimum element and swaps it with the current position',
    timeComplexity: 'O(n²)',
  },
  insertion: {
    name: 'Insertion Sort',
    description: 'Builds sorted array one element at a time',
    timeComplexity: 'O(n²)',
  },
  bubble: {
    name: 'Bubble Sort',
    description: 'Repeatedly swaps adjacent elements if in wrong order',
    timeComplexity: 'O(n²)',
  },
  merge: {
    name: 'Merge Sort',
    description: 'Divides array, sorts recursively, then merges',
    timeComplexity: 'O(n log n)',
  },
}

export default function Home() {
  const [array, setArray] = useState([...DEFAULT_DATA])
  const [algorithm, setAlgorithm] = useState('selection')
  const [speed, setSpeed] = useState(50)
  const [comparisons, setComparisons] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const [status, setStatus] = useState('Ready')
  const [isSorting, setIsSorting] = useState(false)
  const [barStates, setBarStates] = useState({})
  const [customInput, setCustomInput] = useState('')

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const sleep = async () => {
    const delayTime = 1000 - speed * 9
    await delay(delayTime)
  }

  const updateBars = async (states = {}) => {
    setBarStates(states)
    await sleep()
  }

  // Selection Sort
  const selectionSort = async () => {
    const arr = [...array]
    let compCount = 0
    let swapCount = 0
    setStatus('Sorting...')

    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i

      for (let j = i + 1; j < arr.length; j++) {
        compCount++
        setComparisons(compCount)
        await updateBars({ [minIdx]: 'current', [j]: 'comparing' })

        if (arr[j] < arr[minIdx]) {
          minIdx = j
        }
      }

      if (minIdx !== i) {
        swapCount++
        setSwaps(swapCount)
        await updateBars({ [i]: 'swapping', [minIdx]: 'swapping' })
        ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        setArray([...arr])
      }

      const sortedStates = {}
      for (let k = 0; k <= i; k++) {
        sortedStates[k] = 'sorted'
      }
      await updateBars(sortedStates)
    }

    const allSorted = {}
    for (let i = 0; i < arr.length; i++) {
      allSorted[i] = 'sorted'
    }
    setBarStates(allSorted)
    setStatus('Complete')
  }

  // Insertion Sort
  const insertionSort = async () => {
    const arr = [...array]
    let compCount = 0
    let swapCount = 0
    setStatus('Sorting...')

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i]
      let j = i - 1

      await updateBars({ [i]: 'current' })

      while (j >= 0 && arr[j] > key) {
        compCount++
        setComparisons(compCount)
        await updateBars({ [j]: 'comparing', [j + 1]: 'swapping' })

        arr[j + 1] = arr[j]
        setArray([...arr])
        swapCount++
        setSwaps(swapCount)
        j--
      }

      if (j >= 0) {
        compCount++
        setComparisons(compCount)
      }

      arr[j + 1] = key
      setArray([...arr])

      const sortedStates = {}
      for (let k = 0; k <= i; k++) {
        sortedStates[k] = 'sorted'
      }
      await updateBars(sortedStates)
    }

    const allSorted = {}
    for (let i = 0; i < arr.length; i++) {
      allSorted[i] = 'sorted'
    }
    setBarStates(allSorted)
    setStatus('Complete')
  }

  // Bubble Sort
  const bubbleSort = async () => {
    const arr = [...array]
    let compCount = 0
    let swapCount = 0
    setStatus('Sorting...')

    for (let i = 0; i < arr.length - 1; i++) {
      let swapped = false

      for (let j = 0; j < arr.length - i - 1; j++) {
        compCount++
        setComparisons(compCount)
        await updateBars({ [j]: 'comparing', [j + 1]: 'comparing' })

        if (arr[j] > arr[j + 1]) {
          await updateBars({ [j]: 'swapping', [j + 1]: 'swapping' })
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
          swapCount++
          setSwaps(swapCount)
          swapped = true
        }
      }

      const sortedStates = {}
      for (let k = arr.length - i - 1; k < arr.length; k++) {
        sortedStates[k] = 'sorted'
      }
      await updateBars(sortedStates)

      if (!swapped) break
    }

    const allSorted = {}
    for (let i = 0; i < arr.length; i++) {
      allSorted[i] = 'sorted'
    }
    setBarStates(allSorted)
    setStatus('Complete')
  }

  // Merge Sort
  const mergeSort = async () => {
    const arr = [...array]
    let compCount = 0
    let swapCount = 0
    setStatus('Sorting...')

    const merge = async (arr, start, mid, end) => {
      const left = arr.slice(start, mid + 1)
      const right = arr.slice(mid + 1, end + 1)
      let i = 0,
        j = 0,
        k = start

      while (i < left.length && j < right.length) {
        compCount++
        setComparisons(compCount)
        await updateBars({ [k]: 'comparing' })

        if (left[i] <= right[j]) {
          arr[k] = left[i]
          i++
        } else {
          arr[k] = right[j]
          j++
        }

        swapCount++
        setSwaps(swapCount)
        setArray([...arr])
        await updateBars({ [k]: 'swapping' })
        k++
      }

      while (i < left.length) {
        arr[k] = left[i]
        swapCount++
        setSwaps(swapCount)
        setArray([...arr])
        await updateBars({ [k]: 'swapping' })
        i++
        k++
      }

      while (j < right.length) {
        arr[k] = right[j]
        swapCount++
        setSwaps(swapCount)
        setArray([...arr])
        await updateBars({ [k]: 'swapping' })
        j++
        k++
      }
    }

    const mergeSortRecursive = async (arr, start, end) => {
      if (start >= end) return

      const mid = Math.floor((start + end) / 2)
      await mergeSortRecursive(arr, start, mid)
      await mergeSortRecursive(arr, mid + 1, end)
      await merge(arr, start, mid, end)
    }

    await mergeSortRecursive(arr, 0, arr.length - 1)

    const allSorted = {}
    for (let i = 0; i < arr.length; i++) {
      allSorted[i] = 'sorted'
    }
    setBarStates(allSorted)
    setStatus('Complete')
  }

  const startSort = async () => {
    if (isSorting) return
    setIsSorting(true)
    setComparisons(0)
    setSwaps(0)
    setBarStates({})

    try {
      switch (algorithm) {
        case 'selection':
          await selectionSort()
          break
        case 'insertion':
          await insertionSort()
          break
        case 'bubble':
          await bubbleSort()
          break
        case 'merge':
          await mergeSort()
          break
      }
    } catch (error) {
      console.error('Sorting error:', error)
      setStatus('Error')
    }

    setIsSorting(false)
  }

  const reset = () => {
    if (isSorting) return
    setArray([...DEFAULT_DATA])
    setComparisons(0)
    setSwaps(0)
    setBarStates({})
    setStatus('Ready')
  }

  const randomize = () => {
    if (isSorting) return
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    setComparisons(0)
    setSwaps(0)
    setBarStates({})
    setStatus('Randomized')
  }

  const loadCustomData = () => {
    if (isSorting) return

    const input = customInput.trim()
    if (!input) {
      setStatus('Enter data first')
      return
    }

    const parsed = input
      .split(/[,\s]+/)
      .map((val) => parseInt(val.trim()))
      .filter((val) => !isNaN(val) && val > 0)

    if (parsed.length === 0) {
      setStatus('Invalid data')
      return
    }

    if (parsed.length > 20) {
      setStatus('Max 20 values')
      return
    }

    setArray(parsed)
    setComparisons(0)
    setSwaps(0)
    setBarStates({})
    setStatus('Custom data loaded')
  }

  const loadDefaultData = () => {
    if (isSorting) return
    setArray([...DEFAULT_DATA])
    setComparisons(0)
    setSwaps(0)
    setBarStates({})
    setCustomInput('')
    setStatus('Default data loaded')
  }

  const maxValue = Math.max(...array)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Sorting Visualizer</h1>
        <div className={styles.headerInfo}>
          <span>{algorithmInfo[algorithm].name}</span>
          <span className={styles.separator}>|</span>
          <span className={styles.complexity}>{algorithmInfo[algorithm].timeComplexity}</span>
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
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
          />
          <span className={styles.speedDisplay}>{speed}%</span>
        </div>

        <button onClick={startSort} disabled={isSorting} className={styles.btnPrimary}>
          Sort
        </button>
        <button onClick={reset} disabled={isSorting} className={styles.btnSecondary}>
          Reset
        </button>
        <button onClick={randomize} disabled={isSorting} className={styles.btnSecondary}>
          Random
        </button>
      </div>

      <div className={styles.dataPanel}>
        <div className={styles.dataInputGroup}>
          <label htmlFor="custom-data">Custom Data:</label>
          <input
            type="text"
            id="custom-data"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && loadCustomData()}
            placeholder="e.g., 25, 10, 80, 45, 60"
            disabled={isSorting}
            className={styles.input}
          />
        </div>
        <button onClick={loadCustomData} disabled={isSorting} className={styles.btnAccent}>
          Load Custom
        </button>
        <button onClick={loadDefaultData} disabled={isSorting} className={styles.btnAccent}>
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
          const height = (value / maxValue) * 300
          const state = barStates[index] || ''
          return (
            <div
              key={`${index}-${value}`}
              className={`${styles.bar} ${styles[state]}`}
              style={{ height: `${height}px` }}
            >
              <div className={styles.barValue}>{value}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

