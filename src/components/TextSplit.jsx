import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 文字を1文字ずつアニメーション
export function TextReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.03,
  duration = 0.8,
  trigger = true,
}) {
  const containerRef = useRef(null)
  const text = typeof children === 'string' ? children : ''

  useEffect(() => {
    if (!containerRef.current || !text) return

    const chars = containerRef.current.querySelectorAll('.char')

    const animation = gsap.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: duration,
        stagger: stagger,
        ease: 'power3.out',
        delay: delay,
        scrollTrigger: trigger
          ? {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          : undefined,
      }
    )

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [text, delay, stagger, duration, trigger])

  return (
    <span
      ref={containerRef}
      className={`inline-block overflow-hidden ${className}`}
      style={{ perspective: '1000px' }}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          style={{
            transformOrigin: 'center bottom',
            willChange: 'transform, opacity',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

// 行ごとにアニメーション
export function LineReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.15,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const lines = containerRef.current.querySelectorAll('.line')

    gsap.fromTo(
      lines,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: stagger,
        ease: 'power3.out',
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [delay, stagger])

  // childrenが配列の場合はそれぞれをlineとして扱う
  const lines = Array.isArray(children) ? children : [children]

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <div key={index} className="line overflow-hidden">
          <div>{line}</div>
        </div>
      ))}
    </div>
  )
}

// マスク表示アニメーション
export function MaskReveal({
  children,
  className = '',
  direction = 'up', // up, down, left, right
  delay = 0,
  duration = 1,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const content = containerRef.current.querySelector('.mask-content')

    const directions = {
      up: { y: '100%' },
      down: { y: '-100%' },
      left: { x: '100%' },
      right: { x: '-100%' },
    }

    gsap.fromTo(
      content,
      directions[direction],
      {
        x: 0,
        y: 0,
        duration: duration,
        ease: 'power3.out',
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [direction, delay, duration])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div className="mask-content">{children}</div>
    </div>
  )
}

// パララックステキスト
export function ParallaxText({ children, className = '', speed = 0.5 }) {
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    gsap.to(textRef.current, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [speed])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
