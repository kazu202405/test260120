import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { MorphingBlob, FloatingParticles, NoiseTexture } from '../MorphingBlob'
import { MagneticCTA } from '../MagneticButton'
import { TextReveal } from '../TextSplit'

// 無限スクロールテキスト（reel-re風）
function EndlessText() {
  const text = "相続不動産の整理  ·  INHERITANCE REAL ESTATE  ·  "
  const repeated = text.repeat(10)

  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-6 border-t border-gray-200/50">
      <div
        className="whitespace-nowrap animate-endless"
        style={{ width: 'fit-content' }}
      >
        <span className="text-[10px] md:text-xs tracking-[0.3em] text-gray-400 uppercase">
          {repeated}
        </span>
      </div>
    </div>
  )
}

// 背景のジェネラティブアート（強化版）
function GenerativeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ベース */}
      <div className="absolute inset-0 bg-[#fafafa]" />

      {/* 背景画像 */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1000&q=80"
          alt=""
          className="w-full h-full object-cover opacity-[0.06] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/70 to-transparent" />
      </div>

      {/* ノイズテクスチャ */}
      <NoiseTexture opacity={0.02} />

      {/* モーフィングブロブ */}
      <div className="absolute -right-32 top-1/4 opacity-30">
        <MorphingBlob size={600} opacity={0.08} duration={12} />
      </div>

      {/* フローティングパーティクル */}
      <FloatingParticles count={15} />

      {/* 大きな円弧 */}
      <svg
        className="absolute -right-1/4 -top-1/4 w-[150%] h-[150%] opacity-[0.03] animate-spin-slow"
        viewBox="0 0 1000 1000"
      >
        <circle cx="700" cy="300" r="400" stroke="#1e4d4a" strokeWidth="1" fill="none" />
        <circle cx="700" cy="300" r="350" stroke="#1e4d4a" strokeWidth="1" fill="none" />
        <circle cx="700" cy="300" r="300" stroke="#1e4d4a" strokeWidth="1" fill="none" />
      </svg>

      {/* 流れるライン */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-100,600 Q400,400 800,500 T1600,400"
          stroke="#1e4d4a"
          strokeWidth="1"
          fill="none"
          opacity="0.06"
        />
        <path
          d="M-100,650 Q500,450 900,550 T1600,450"
          stroke="#1e4d4a"
          strokeWidth="1"
          fill="none"
          opacity="0.04"
        />
      </svg>
    </div>
  )
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    setIsLoaded(true)

    // GSAPでタイトルアニメーション
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.hero-char')
      gsap.fromTo(
        chars,
        {
          y: 120,
          opacity: 0,
          rotateX: -80,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    }
  }, [])

  // タイトルを文字ごとに分割
  const title1 = "相続不動産を、"
  const title2a = "静かに、"
  const title2b = "整える。"

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <GenerativeBackground />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 w-full pt-32 pb-32">
        {/* キャプション */}
        <div
          className={`
            flex items-center gap-6 mb-8
            transition-all duration-1000 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <div className="w-16 h-px bg-emerald-800/30" />
          <span className="text-[10px] tracking-[0.4em] text-gray-500 uppercase">
            Since 20XX
          </span>
        </div>

        {/* メインコピー - GSAP文字アニメーション */}
        <h1 ref={titleRef} className="mb-12" style={{ perspective: '1000px' }}>
          <span className="block overflow-hidden">
            <span className="flex">
              {title1.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-char inline-block text-[clamp(2.5rem,10vw,8rem)] font-extralight leading-[0.95] tracking-tighter text-gray-900"
                  style={{ transformOrigin: 'center bottom' }}
                >
                  {char}
                </span>
              ))}
            </span>
          </span>
          <span className="block overflow-hidden mt-2">
            <span className="flex">
              {title2a.split('').map((char, i) => (
                <span
                  key={`a-${i}`}
                  className="hero-char inline-block text-[clamp(2.5rem,10vw,8rem)] font-extralight leading-[0.95] tracking-tighter text-emerald-800"
                  style={{ transformOrigin: 'center bottom' }}
                >
                  {char}
                </span>
              ))}
              {title2b.split('').map((char, i) => (
                <span
                  key={`b-${i}`}
                  className="hero-char inline-block text-[clamp(2.5rem,10vw,8rem)] font-extralight leading-[0.95] tracking-tighter text-gray-900"
                  style={{ transformOrigin: 'center bottom' }}
                >
                  {char}
                </span>
              ))}
            </span>
          </span>
        </h1>

        {/* サブコピー */}
        <div
          className={`
            max-w-lg
            transition-all duration-1000 delay-700 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <p className="
            text-base
            md:text-lg
            text-gray-600
            leading-relaxed
            mb-8
          ">
            売る前に。残す前に。
            <br />
            まず、状況を一緒に整えます。
          </p>

          {/* マグネットボタン */}
          <MagneticCTA href="#contact">
            無料相談はこちら
          </MagneticCTA>
        </div>

        {/* 装飾的なナンバリング */}
        <div
          className={`
            absolute right-8 top-1/2 -translate-y-1/2
            hidden xl:flex flex-col items-end gap-4
            transition-all duration-1000 delay-800 ease-out
            ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
          `}
        >
          <span className="text-[12rem] font-extralight text-gray-100 leading-none select-none">
            01
          </span>
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-widest text-gray-400 uppercase">Top</span>
            <div className="w-12 h-px bg-gray-300" />
          </div>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div
        className={`
          absolute bottom-24 left-8
          flex items-center gap-4
          transition-all duration-1000 delay-1000 ease-out
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-widest text-gray-400 uppercase writing-vertical">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-800 animate-scroll-line" />
          </div>
        </div>
      </div>

      {/* 無限スクロールテキスト */}
      <EndlessText />
    </section>
  )
}
