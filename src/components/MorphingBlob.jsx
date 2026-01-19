import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// モーフィングするブロブ
export function MorphingBlob({
  className = '',
  color = '#1e4d4a',
  size = 400,
  duration = 8,
  opacity = 0.1,
}) {
  const pathRef = useRef(null)

  // 複数のブロブシェイプを定義
  const shapes = [
    'M400,300 Q450,150 350,100 Q200,50 150,150 Q50,250 100,350 Q150,450 300,450 Q400,450 400,300',
    'M380,280 Q420,120 300,80 Q150,40 100,180 Q30,300 120,380 Q200,480 350,420 Q450,380 380,280',
    'M420,320 Q480,180 380,100 Q220,30 120,140 Q20,280 80,400 Q180,500 340,460 Q480,420 420,320',
    'M400,300 Q450,150 350,100 Q200,50 150,150 Q50,250 100,350 Q150,450 300,450 Q400,450 400,300',
  ]

  useEffect(() => {
    if (!pathRef.current) return

    // シェイプ間をモーフィング
    const tl = gsap.timeline({ repeat: -1, yoyo: true })

    shapes.forEach((shape, index) => {
      if (index > 0) {
        tl.to(pathRef.current, {
          attr: { d: shape },
          duration: duration,
          ease: 'sine.inOut',
        })
      }
    })

    return () => tl.kill()
  }, [duration])

  return (
    <svg
      viewBox="0 0 500 500"
      className={`${className}`}
      style={{ width: size, height: size }}
    >
      <path
        ref={pathRef}
        d={shapes[0]}
        fill={color}
        opacity={opacity}
      />
    </svg>
  )
}

// アニメーショングラデーション背景
export function AnimatedGradient({
  className = '',
  colors = ['#1e4d4a', '#2a6b66', '#0d2f2d'],
}) {
  const gradientRef = useRef(null)

  useEffect(() => {
    if (!gradientRef.current) return

    // グラデーションの位置をアニメーション
    gsap.to(gradientRef.current, {
      backgroundPosition: '400% 400%',
      duration: 15,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  return (
    <div
      ref={gradientRef}
      className={`absolute inset-0 ${className}`}
      style={{
        background: `linear-gradient(
          -45deg,
          ${colors[0]}10,
          ${colors[1]}08,
          ${colors[2]}10,
          ${colors[0]}05
        )`,
        backgroundSize: '400% 400%',
      }}
    />
  )
}

// ノイズテクスチャオーバーレイ
export function NoiseTexture({ className = '', opacity = 0.03 }) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        opacity: opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

// 浮遊するパーティクル
export function FloatingParticles({ count = 20, className = '' }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }))

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-emerald-800/10 animate-float"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// 波打つライン
export function WavyLine({
  className = '',
  color = '#1e4d4a',
  amplitude = 20,
  frequency = 0.02,
  speed = 0.5,
}) {
  const pathRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!pathRef.current) return

    let offset = 0

    const animate = () => {
      offset += speed
      const points = []

      for (let x = 0; x <= 1440; x += 10) {
        const y = 50 + Math.sin((x * frequency) + offset) * amplitude
        points.push(`${x},${y}`)
      }

      pathRef.current.setAttribute('d', `M${points.join(' L')}`)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [amplitude, frequency, speed])

  return (
    <svg
      viewBox="0 0 1440 100"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      />
    </svg>
  )
}
