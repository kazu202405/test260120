import { useEffect, useState, useRef } from 'react'
import TiltCard from '../TiltCard'

const reasons = [
  {
    number: '01',
    title: '売却を急がせない',
    text: '不動産会社としての立場はありますが、売却ありきの提案はしません。状況整理が先、判断はその後です。',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M15,20 L25,20" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    number: '02',
    title: '専門家との連携',
    text: '税理士、司法書士、弁護士など、状況に応じた専門家と連携し、必要な手続きをサポートします。',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <circle cx="14" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="26" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
  {
    number: '03',
    title: '家族の合意形成',
    text: '相続人間の意見調整は、不動産の問題以上に重要です。丁寧な説明と段取りで、合意形成を支援します。',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <path d="M10,30 Q20,10 30,30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="20" cy="18" r="4" fill="currentColor" opacity="0.2" />
      </svg>
    ),
  },
]

export default function Reasons() {
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
      id="reasons"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 left-0 w-full h-1/2 opacity-[0.02]"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
        >
          <path
            d="M0,400 Q360,300 720,350 T1440,300 L1440,400 Z"
            fill="#1e4d4a"
          />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        {/* ヘッダー */}
        <div
          className={`
            text-center max-w-2xl mx-auto mb-20
            transition-all duration-1000
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-emerald-800/20" />
            <span className="text-xs tracking-[0.3em] text-emerald-800/60 uppercase">
              Reasons
            </span>
            <div className="w-12 h-px bg-emerald-800/20" />
          </div>

          <h2 className="
            text-3xl
            md:text-4xl
            lg:text-[3.5rem]
            font-extralight
            text-gray-800
            leading-[1.1]
            tracking-tight
          ">
            選ばれる<span className="text-emerald-800">理由</span>
          </h2>
        </div>

        {/* カード（3Dティルト付き） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`
                transition-all duration-700
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <TiltCard maxTilt={10} glareEnable={true}>
                <article className="
                  relative
                  p-8
                  bg-gray-50
                  rounded-2xl
                  border
                  border-gray-100
                  hover:border-emerald-800/20
                  hover:bg-white
                  transition-colors
                  duration-500
                  group
                  h-full
                ">
                  {/* 背景の番号 */}
                  <span className="
                    absolute
                    top-6
                    right-6
                    text-6xl
                    font-light
                    text-gray-100
                    group-hover:text-emerald-800/5
                    transition-colors
                    duration-500
                  ">
                    {reason.number}
                  </span>

                  {/* アイコン */}
                  <div className="
                    text-emerald-800/40
                    group-hover:text-emerald-800/60
                    transition-colors
                    duration-300
                    mb-6
                  ">
                    {reason.icon}
                  </div>

                  {/* タイトル */}
                  <h3 className="
                    text-xl
                    text-gray-800
                    mb-4
                    group-hover:text-emerald-800
                    transition-colors
                    duration-300
                  ">
                    {reason.title}
                  </h3>

                  {/* 説明 */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {reason.text}
                  </p>

                  {/* 下部のライン */}
                  <div className="
                    absolute
                    bottom-0
                    left-8
                    right-8
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-emerald-800/0
                    to-transparent
                    group-hover:via-emerald-800/20
                    transition-all
                    duration-500
                  " />
                </article>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
