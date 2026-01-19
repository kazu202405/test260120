import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from '../TiltCard'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    number: '01',
    title: '状況の可視化',
    description: '複雑に絡み合った相続不動産の現状を、わかりやすく整理・可視化します。',
    accent: 'from-emerald-800/10 to-emerald-600/5',
  },
  {
    number: '02',
    title: '選択肢の明確化',
    description: '売却、賃貸、保有、それぞれのメリット・デメリットを明確にします。',
    accent: 'from-emerald-700/10 to-emerald-500/5',
  },
  {
    number: '03',
    title: '家族間の調整',
    description: '相続人間の意見調整をサポートし、円満な解決を目指します。',
    accent: 'from-emerald-600/10 to-emerald-400/5',
  },
  {
    number: '04',
    title: '専門家連携',
    description: '税理士、司法書士など、必要な専門家との連携をコーディネートします。',
    accent: 'from-teal-700/10 to-teal-500/5',
  },
]

export default function HorizontalScroll() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return

    const container = containerRef.current
    const scrollWidth = container.scrollWidth - window.innerWidth

    // 横スクロールアニメーション（スクロール量を0.5倍に）
    const tween = gsap.to(container, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth * 0.5}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* 背景のノイズテクスチャ */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 横スクロールコンテナ */}
      <div
        ref={containerRef}
        className="flex items-center min-h-screen"
        style={{ width: 'fit-content' }}
      >
        {/* イントロパネル（コンパクト） */}
        <div className="flex-shrink-0 w-[50vw] md:w-[40vw] h-screen flex items-center justify-center px-8">
          <div className="max-w-md">
            <span className="text-emerald-400/60 text-xs tracking-[0.3em] uppercase mb-4 block">
              Services
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight text-white leading-tight mb-4">
              私たちが
              <span className="text-emerald-400">できること</span>
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-emerald-400/50" />
              <svg className="w-5 h-5 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* フィーチャーカード（コンパクト） */}
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] h-screen flex items-center justify-center px-4"
          >
            <TiltCard
              className="w-full max-w-md"
              maxTilt={8}
              glareEnable={true}
            >
              <div
                className={`
                  relative
                  p-6
                  md:p-8
                  rounded-2xl
                  bg-gradient-to-br
                  ${feature.accent}
                  border
                  border-white/10
                  backdrop-blur-sm
                `}
              >
                {/* 番号 */}
                <span className="absolute top-4 right-4 text-6xl font-extralight text-white/5">
                  {feature.number}
                </span>

                {/* コンテンツ */}
                <div className="relative">
                  <span className="text-emerald-400/80 text-[10px] tracking-[0.3em] uppercase mb-3 block">
                    Feature {feature.number}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>
        ))}

        {/* 終了パネル（コンパクト） */}
        <div className="flex-shrink-0 w-[50vw] md:w-[40vw] h-screen flex items-center justify-center px-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-4xl font-extralight text-white mb-6">
              まずは、
              <span className="text-emerald-400">お話を</span>
            </h3>
            <button className="px-6 py-3 border border-emerald-400/50 text-emerald-400 rounded-full text-xs tracking-wider uppercase hover:bg-emerald-400 hover:text-black transition-all duration-500">
              Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
