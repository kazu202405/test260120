import { useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function TiltCard({
  children,
  className = '',
  maxTilt = 15,
  scale = 1.02,
  perspective = 1000,
  glareEnable = true,
}) {
  const cardRef = useRef(null)
  const glareRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // 回転角度を計算
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt
    const rotateX = -(mouseY / (rect.height / 2)) * maxTilt

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: scale,
      duration: 0.3,
      ease: 'power2.out',
    })

    // グレア効果
    if (glareRef.current && glareEnable) {
      const glareX = ((e.clientX - rect.left) / rect.width) * 100
      const glareY = ((e.clientY - rect.top) / rect.height) * 100
      glareRef.current.style.background = `
        radial-gradient(
          circle at ${glareX}% ${glareY}%,
          rgba(255, 255, 255, 0.15) 0%,
          transparent 60%
        )
      `
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    })

    if (glareRef.current) {
      glareRef.current.style.background = 'transparent'
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="relative"
    >
      <div
        ref={cardRef}
        className={`
          relative
          transform-gpu
          will-change-transform
          ${className}
        `}
        style={{ transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {children}

        {/* グレアオーバーレイ */}
        {glareEnable && (
          <div
            ref={glareRef}
            className={`
              absolute
              inset-0
              pointer-events-none
              rounded-inherit
              transition-opacity
              duration-300
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ borderRadius: 'inherit' }}
          />
        )}
      </div>
    </div>
  )
}
