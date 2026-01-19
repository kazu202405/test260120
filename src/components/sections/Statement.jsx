import { useEffect, useState, useRef } from 'react'

// 視差効果のある背景
function ParallaxBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ベース */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* グラデーションオーバーレイ */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(30, 77, 74, 0.15) 0%, transparent 60%)',
        }}
      />

      {/* ノイズテクスチャ */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 流れるライン */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-100,300 Q400,200 800,300 T1600,250"
          stroke="#1e4d4a"
          strokeWidth="1"
          fill="none"
          opacity="0.15"
        />
        <path
          d="M-100,350 Q500,250 900,350 T1600,300"
          stroke="#1e4d4a"
          strokeWidth="1"
          fill="none"
          opacity="0.1"
        />
        <path
          d="M-100,400 Q600,300 1000,400 T1600,350"
          stroke="#1e4d4a"
          strokeWidth="1"
          fill="none"
          opacity="0.05"
        />
      </svg>

      {/* 円弧 */}
      <svg
        className="absolute -left-1/4 top-1/2 -translate-y-1/2 w-[80%] h-[150%] opacity-[0.04]"
        viewBox="0 0 500 500"
      >
        <circle cx="250" cy="250" r="200" stroke="#ffffff" strokeWidth="1" fill="none" />
        <circle cx="250" cy="250" r="180" stroke="#ffffff" strokeWidth="1" fill="none" />
      </svg>
    </div>
  )
}

// 文字の一文字ずつのアニメーション
function AnimatedText({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const chars = children.split('')

  return (
    <span ref={ref} className="inline-block">
      {chars.map((char, index) => (
        <span
          key={index}
          className={`
            inline-block
            transition-all
            duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
          style={{
            transitionDelay: `${delay + index * 50}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function Statement() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      <ParallaxBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-24 md:py-32">
        <div className="text-center">
          {/* 装飾的なライン */}
          <div
            className={`
              flex items-center justify-center gap-8 mb-12
              transition-all duration-1000
              ${isVisible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase">
              Philosophy
            </span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-white/20" />
          </div>

          {/* メインテキスト */}
          <h2 className="mb-8">
            <span className="
              block
              text-[clamp(2rem,7vw,5rem)]
              font-extralight
              leading-[1.1]
              tracking-tight
              text-white/90
              mb-4
            ">
              <AnimatedText>売ることが、</AnimatedText>
            </span>
            <span className="
              block
              text-[clamp(2rem,7vw,5rem)]
              font-extralight
              leading-[1.1]
              tracking-tight
            ">
              <span className="text-emerald-400/90">
                <AnimatedText delay={400}>正解とは限らない。</AnimatedText>
              </span>
            </span>
          </h2>

          {/* サブテキスト */}
          <div
            className={`
              max-w-xl mx-auto
              transition-all duration-1000 delay-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            <p className="
              text-base
              md:text-lg
              text-white/50
              leading-relaxed
              font-light
            ">
              相続した不動産には、数字では測れない価値がある。
              <br className="hidden md:block" />
              だからこそ、まず整理する。そして、一緒に考える。
            </p>
          </div>

          {/* 装飾的な要素 */}
          <div
            className={`
              mt-16 flex items-center justify-center gap-2
              transition-all duration-1000 delay-1000
              ${isVisible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`
                  w-1.5 h-1.5 rounded-full bg-emerald-400/40
                  ${i === 1 ? 'scale-125' : ''}
                `}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 下部のグラデーション */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  )
}
