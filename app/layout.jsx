import './globals.css'

export const metadata = {
  title: 'Sorting Visualizer',
  description: 'Interactive sorting algorithm visualizer with real-time metrics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

