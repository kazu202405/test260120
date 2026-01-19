import { useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function MagneticButton({
  children,
  className = '',
  strength = 0.5,
  ...props
}) {
  const buttonRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <button
      ref={buttonRef}
      className={`
        relative
        inline-flex
        items-center
        justify-center
        overflow-hidden
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {/* 背景エフェクト */}
      <span
        className={`
          absolute
          inset-0
          bg-emerald-800
          transform
          transition-transform
          duration-500
          ease-out
          ${isHovered ? 'scale-100' : 'scale-0'}
        `}
        style={{ borderRadius: 'inherit' }}
      />

      {/* コンテンツ */}
      <span
        className={`
          relative
          z-10
          transition-colors
          duration-300
          ${isHovered ? 'text-white' : ''}
        `}
      >
        {children}
      </span>
    </button>
  )
}

// CTAボタン（マグネット効果付き）
export function MagneticCTA({ children, href = '#contact', className = '' }) {
  return (
    <MagneticButton
      className={`
        px-8
        py-4
        border-2
        border-emerald-800
        text-emerald-800
        rounded-full
        text-sm
        tracking-wider
        uppercase
        font-medium
        ${className}
      `}
      onClick={() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      {children}
    </MagneticButton>
  )
}
