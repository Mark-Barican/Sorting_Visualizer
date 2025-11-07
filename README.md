# 🔢 Sorting Algorithm Visualizer

An interactive web application that visualizes four classic sorting algorithms with real-time metrics and beautiful animations.

## Features

- ✨ **Visual Animations**: Watch sorting algorithms in action with smooth animations
- 📊 **Real-time Metrics**: Track comparisons, swaps, and complexity in real-time
- 🎯 **Four Algorithms**: Selection, Insertion, Bubble, and Merge Sort
- 🎨 **Modern UI**: Beautiful dark-themed interface with gradient effects
- ⚡ **Adjustable Speed**: Control animation speed with slider
- 🔄 **Interactive Controls**: Reset, randomize, and sort with ease

## Algorithms Included

### 1. Selection Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- Finds the minimum element and swaps it with the current position

### 2. Insertion Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- Builds sorted array one element at a time

### 3. Bubble Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- Repeatedly swaps adjacent elements if they're in wrong order

### 4. Merge Sort
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- Divides array, sorts recursively, then merges

## Default Data

The visualizer starts with the following dataset:
```
56, 90, 67, 34, 22, 88, 71, 9, 38, 40
```

## Deployment to Vercel

### Quick Deploy

1. Install Vercel CLI (if not already installed):
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the project:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

That's it! Your sorting visualizer will be live.

## Local Development

To run locally, simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Then visit http://localhost:8000
```

## Usage

1. **Select Algorithm**: Choose from the dropdown menu
2. **Adjust Speed**: Use the slider to control animation speed
3. **Start Sort**: Click "Start Sort" to begin visualization
4. **Reset**: Return to original data
5. **Randomize**: Generate a new random array

## Color Legend

- 🔵 **Blue**: Unsorted elements
- 🟡 **Yellow/Orange**: Elements being compared
- 🔴 **Red**: Elements being swapped
- 🟢 **Green**: Sorted elements
- 🟣 **Purple**: Current element in focus

## Technologies Used

- Pure HTML5
- CSS3 (Gradients, Animations, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- No frameworks or dependencies required!

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## License

MIT License - feel free to use this project for learning and teaching!

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

