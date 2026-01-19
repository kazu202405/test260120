import { useEffect, useRef, useState } from 'react'

// 共通セクションラッパー
export default function Section({
  children,
  className = '',
  id,
  withContainer = true,
  paddingY = 'py-16 md:py-24',
  background = 'bg-gray-50' // bg-gray-50 = #f9fafb (ライト系)
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      className={`
        ${paddingY}
        ${background}
        ${className}
        transition-opacity duration-700 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {withContainer ? (
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  )
}
