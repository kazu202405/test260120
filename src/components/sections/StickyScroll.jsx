import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    id: 1,
    title: '相談する',
    subtitle: 'Consultation',
    description: '電話やメールでお気軽にご連絡ください。初回相談は無料です。現在の状況や気になっていることをお聞かせください。',
    visual: (
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e4d4a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1e4d4a" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="url(#grad1)" />
        <circle cx="200" cy="200" r="100" fill="none" stroke="#1e4d4a" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
        <circle cx="200" cy="200" r="50" fill="#1e4d4a" opacity="0.1" />
        <path d="M180,180 L220,180 L220,220 L180,220 Z" fill="#1e4d4a" opacity="0.2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: '整理する',
    subtitle: 'Organization',
    description: '登記情報、相続人の確認、物件の現況把握など、必要な情報を一緒に整理していきます。',
    visual: (
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e4d4a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1e4d4a" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect x="100" y="100" width="200" height="200" fill="url(#grad2)" rx="8" />
        <line x1="100" y1="150" x2="300" y2="150" stroke="#1e4d4a" strokeWidth="1" opacity="0.2" />
        <line x1="100" y1="200" x2="300" y2="200" stroke="#1e4d4a" strokeWidth="1" opacity="0.2" />
        <line x1="100" y1="250" x2="300" y2="250" stroke="#1e4d4a" strokeWidth="1" opacity="0.2" />
        <line x1="200" y1="100" x2="200" y2="300" stroke="#1e4d4a" strokeWidth="1" opacity="0.2" />
        <circle cx="150" cy="175" r="8" fill="#1e4d4a" opacity="0.3" />
        <circle cx="250" cy="225" r="8" fill="#1e4d4a" opacity="0.3" />
        <circle cx="150" cy="275" r="8" fill="#1e4d4a" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: 3,
    title: '選ぶ',
    subtitle: 'Decision',
    description: '売却、賃貸、保有など、それぞれの選択肢のメリット・デメリットを明確にし、最適な方針を選んでいただきます。',
    visual: (
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e4d4a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1e4d4a" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d="M200,50 L350,200 L200,350 L50,200 Z" fill="url(#grad3)" />
        <circle cx="200" cy="200" r="40" fill="none" stroke="#1e4d4a" strokeWidth="2" opacity="0.3" />
        <path d="M170,200 L190,220 L230,180" stroke="#1e4d4a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: '実行する',
    subtitle: 'Execution',
    description: '決定した方針に沿って、専門家と連携しながら手続きを進めます。完了までしっかりサポートします。',
    visual: (
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e4d4a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1e4d4a" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="url(#grad4)" />
        <path d="M100,200 Q150,100 200,200 T300,200" stroke="#1e4d4a" strokeWidth="2" fill="none" opacity="0.3" />
        <circle cx="100" cy="200" r="8" fill="#1e4d4a" opacity="0.2" />
        <circle cx="200" cy="200" r="8" fill="#1e4d4a" opacity="0.3" />
        <circle cx="300" cy="200" r="8" fill="#1e4d4a" opacity="0.4" />
        <path d="M280,180 L300,200 L280,220" stroke="#1e4d4a" strokeWidth="2" fill="none" opacity="0.4" />
      </svg>
    ),
  },
]

export default function StickyScroll() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) return

    const panels = sectionRef.current.querySelectorAll('.scroll-panel')

    panels.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* スティッキーサイド（ビジュアル） */}
        <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-0 lg:h-screen">
          <div className="h-full flex items-center justify-center p-12">
            <div className="relative w-full max-w-md aspect-square">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`
                    absolute inset-0
                    transition-all duration-700 ease-out
                    ${activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                  `}
                >
                  {step.visual}
                </div>
              ))}

              {/* プログレスインジケーター */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`
                      w-2 h-2 rounded-full transition-all duration-500
                      ${activeIndex === index ? 'bg-emerald-800 scale-125' : 'bg-gray-300'}
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* スクロールサイド（テキスト） */}
        <div className="lg:w-1/2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="scroll-panel min-h-screen flex items-center px-8 lg:px-16 py-24"
            >
              <div className="max-w-lg">
                {/* モバイル用ビジュアル */}
                <div className="lg:hidden mb-8 w-48 h-48 mx-auto">
                  {step.visual}
                </div>

                <span className="text-emerald-800/50 text-xs tracking-[0.3em] uppercase block mb-2">
                  Step {String(step.id).padStart(2, '0')}
                </span>

                <span className="text-gray-400 text-sm tracking-wider block mb-4">
                  {step.subtitle}
                </span>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-800 mb-6 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {step.description}
                </p>

                {/* 装飾ライン */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-16 h-px bg-gradient-to-r from-emerald-800/30 to-transparent" />
                  <span className="text-emerald-800/40 text-xs">
                    {index + 1} / {steps.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
