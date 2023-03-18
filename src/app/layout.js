import './globals.css'

export const metadata = {
  title: 'Điều hoà mini247',
  description: 'Điều hoà mini247',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
