import { useEffect, useState, useRef } from 'react'
import { FloatingShapes } from '../SectionDivider'

// 抽象的なイラスト - 整理・構造を表現（アニメーション付き）
function AbstractIllustration({ isVisible }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className="w-full h-auto max-w-sm mx-auto"
    >
      <defs>
        <linearGradient id="conceptGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e4d4a" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#1e4d4a" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Background shape */}
      <rect
        x="50" y="50" width="300" height="400" rx="8"
        fill="url(#conceptGrad)"
        className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Grid lines - representing organization */}
      <g
        stroke="#1e4d4a"
        strokeWidth="1"
        className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-10' : 'opacity-0'}`}
      >
        <line x1="50" y1="150" x2="350" y2="150" />
        <line x1="50" y1="250" x2="350" y2="250" />
        <line x1="50" y1="350" x2="350" y2="350" />
        <line x1="150" y1="50" x2="150" y2="450" />
        <line x1="250" y1="50" x2="250" y2="450" />
      </g>

      {/* Accent circles at intersections */}
      <g
        fill="#1e4d4a"
        className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-20' : 'opacity-0'}`}
      >
        <circle cx="150" cy="150" r="8" />
        <circle cx="250" cy="250" r="8" />
        <circle cx="150" cy="350" r="8" />
      </g>

      {/* Flowing curve - representing process */}
      <path
        d="M80,420 Q150,380 200,250 T320,80"
        stroke="#1e4d4a"
        strokeWidth="2"
        fill="none"
        className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-25' : 'opacity-0'}`}
        style={{
          strokeDasharray: 500,
          strokeDashoffset: isVisible ? 0 : 500,
          transition: 'stroke-dashoffset 1.5s ease-out, opacity 1s ease-out',
        }}
      />

      {/* Corner brackets */}
      <g
        stroke="#1e4d4a"
        strokeWidth="2"
        className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-30' : 'opacity-0'}`}
      >
        <path d="M60,60 L60,90 M60,60 L90,60" />
        <path d="M340,60 L340,90 M340,60 L310,60" />
        <path d="M60,440 L60,410 M60,440 L90,440" />
        <path d="M340,440 L340,410 M340,440 L310,440" />
      </g>

      {/* Central emphasis */}
      <circle
        cx="200" cy="250" r="40"
        fill="none" stroke="#1e4d4a" strokeWidth="1"
        className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-15' : 'opacity-0'}`}
      />
      <circle
        cx="200" cy="250" r="25"
        fill="none" stroke="#1e4d4a" strokeWidth="1"
        className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-20' : 'opacity-0'}`}
      />
      <circle
        cx="200" cy="250" r="6"
        fill="#1e4d4a"
        className={`transition-all duration-700 delay-600 ${isVisible ? 'opacity-40' : 'opacity-0'}`}
      />
    </svg>
  )
}

export default function Concept() {
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
      id="concept"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      <FloatingShapes />

      {/* 大きな装飾的ナンバー */}
      <div
        className={`
          absolute -right-8 top-1/4 text-[20rem] font-extralight text-gray-100/50 leading-none select-none
          hidden xl:block
          transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}
        `}
      >
        01
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* イラスト */}
          <div
            className={`
              lg:col-span-5 order-2 lg:order-1
              transition-all duration-1000
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}
            `}
          >
            <AbstractIllustration isVisible={isVisible} />
          </div>

          {/* テキスト */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            {/* セクションヘッダー */}
            <div className="mb-12">
              <div
                className={`
                  flex items-center gap-4 mb-6
                  transition-all duration-700
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
              >
                <div className="w-12 h-12 rounded-full border border-emerald-800/20 flex items-center justify-center">
                  <span className="text-xs text-emerald-800/60 tracking-wider">01</span>
                </div>
                <span className="text-xs tracking-[0.3em] text-emerald-800/60 uppercase">
                  Philosophy
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-800/20 to-transparent" />
              </div>

              <h2
                className={`
                  text-3xl
                  md:text-4xl
                  lg:text-[3.5rem]
                  font-extralight
                  text-gray-800
                  leading-[1.1]
                  tracking-tight
                  transition-all duration-1000 delay-200
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
              >
                判断の前に、
                <br />
                <span className="text-emerald-800">整理を。</span>
              </h2>
            </div>

            {/* 本文 */}
            <div
              className={`
                space-y-6
                transition-all duration-1000 delay-400
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <p className="
                text-lg
                text-gray-600
                leading-relaxed
              ">
                相続した不動産をどうするか。
                <br />
                その判断を急ぐ前に、まず状況を整理することが大切です。
              </p>

              <div className="
                pl-6
                border-l-2
                border-emerald-800/10
                space-y-4
              ">
                <p className="text-gray-600 leading-relaxed">
                  不動産には、権利関係、税務、維持費用、家族の意向など、
                  さまざまな要素が絡み合っています。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  私たちは、売却や活用といった「結論」を急がせません。
                  まず現状を把握し、選択肢を整理し、
                  ご家族にとって納得のいく判断ができる状態をつくることを大切にしています。
                </p>
              </div>
            </div>

            {/* 強調テキスト */}
            <div
              className={`
                mt-10 pt-8 border-t border-gray-100
                flex items-center gap-6
                transition-all duration-1000 delay-600
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <div className="
                w-16
                h-16
                rounded-full
                bg-gradient-to-br from-emerald-800/10 to-emerald-800/5
                flex
                items-center
                justify-center
                flex-shrink-0
              ">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-800/60">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"
                  />
                </svg>
              </div>
              <p className="
                text-xl
                text-gray-800
                font-light
                leading-relaxed
              ">
                整理ができれば、
                <span className="text-emerald-800 font-normal">判断は自ずと見えてきます。</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
