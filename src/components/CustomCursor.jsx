import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    // タッチデバイスではカーソルを表示しない
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mousemove', updatePosition)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // タッチデバイスでは何も表示しない
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* メインカーソル（小さい緑の点） */}
      <div
        className={`
          fixed pointer-events-none z-[9999]
          w-3 h-3 rounded-full
          bg-emerald-800
          transition-transform duration-75
          ${isVisible ? 'opacity-100' : 'opacity-0'}
          ${isClicking ? 'scale-75' : 'scale-100'}
        `}
        style={{
          left: position.x - 6,
          top: position.y - 6,
        }}
      />
    </>
  )
}
