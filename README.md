# 🔢 Sorting Visualizer (Next.js)

An interactive web application built with **Next.js** and **React** that visualizes four classic sorting algorithms with real-time metrics and beautiful animations.

## ✨ Features

- **Visual Animations**: Watch sorting algorithms in action with smooth animations
- **Real-time Metrics**: Track comparisons, swaps, and complexity in real-time
- **Four Algorithms**: Selection, Insertion, Bubble, and Merge Sort
- **Modern UI**: Beautiful dark-themed interface with gradient effects
- **Adjustable Speed**: Control animation speed with slider
- **Custom Data Input**: Load your own data or use default/random data
- **Built with Next.js**: Fast, optimized, and production-ready

## 🚀 Algorithms Included

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

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🌐 Deploy to Vercel

### Option 1: Deploy from GitHub

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/sorting-visualizer.git
git branch -M main
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click **"Import Project"**
4. Select your GitHub repository
5. Click **"Deploy"**

That's it! Vercel will automatically detect Next.js and deploy your app.

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Auto-Deployment

Once connected to GitHub, Vercel will automatically deploy every time you push changes!

## 📖 Usage

1. **Select Algorithm**: Choose from the dropdown menu
2. **Adjust Speed**: Use the slider to control animation speed (1-100%)
3. **Load Data**:
   - **Default**: Load original dataset `[56, 90, 67, 34, 22, 88, 71, 9, 38, 40]`
   - **Custom**: Enter your own numbers (comma or space separated)
   - **Random**: Generate random array
4. **Start Sort**: Click "Sort" to begin visualization
5. **Reset**: Return to current dataset

## 🎨 Color Legend

- **Blue**: Unsorted elements
- **Yellow/Orange**: Elements being compared
- **Red**: Elements being swapped
- **Green**: Sorted elements
- **Purple**: Current element in focus

## 🛠 Tech Stack

- **Next.js 14** - React framework
- **React 18** - UI library
- **CSS Modules** - Scoped styling
- **JavaScript (ES6+)** - Logic and algorithms

## 📱 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 🔧 Project Structure

```
sorting-visualizer/
├── app/
│   ├── page.jsx           # Main page component
│   ├── page.module.css    # Page styles
│   ├── layout.jsx         # Root layout
│   └── globals.css        # Global styles
├── package.json
├── next.config.js
├── jsconfig.json
└── README.md
```

## 🎯 Environment Variables

No environment variables needed! This app works out of the box.

## 📄 License

MIT License - feel free to use this project for learning and teaching!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 🌟 Features Coming Soon

- More sorting algorithms (Quick Sort, Heap Sort)
- Sound effects
- Step-by-step mode
- Algorithm comparison mode

---

Made with ❤️ using Next.js and React
