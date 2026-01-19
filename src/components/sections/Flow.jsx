import { useEffect, useState, useRef } from 'react'

const steps = [
  {
    step: '01',
    title: 'ご相談',
    description: '現在の状況や気になっていることをお聞かせください。費用はかかりません。',
  },
  {
    step: '02',
    title: '情報の整理',
    description: '登記情報、相続人、物件の状態など、必要な情報を一緒に整理します。',
  },
  {
    step: '03',
    title: '選択肢の提示',
    description: '売却、賃貸、保有など、状況に応じた選択肢とそれぞれの概要をお伝えします。',
  },
  {
    step: '04',
    title: '方針の決定',
    description: 'ご家族で話し合い、納得のいく方針を決めていただきます。急かすことはありません。',
  },
  {
    step: '05',
    title: '手続きの実行',
    description: '決定した方針に沿って、必要な手続きを専門家と連携しながら進めます。',
  },
]

// 個別ステップカード（アニメーション付き）
function StepCard({ item, index, totalSteps }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`
        relative
        ${index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-24'}
        transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* カード */}
      <div className="
        relative
        p-6
        bg-gray-50
        rounded-2xl
        border
        border-gray-100
        hover:border-emerald-800/20
        hover:bg-white
        hover:shadow-lg
        hover:shadow-emerald-800/5
        transition-all
        duration-500
        group
      ">
        {/* ステップ番号 */}
        <div className="
          absolute
          -top-4
          left-6
          w-10
          h-10
          rounded-full
          bg-white
          border-2
          border-emerald-800/20
          flex
          items-center
          justify-center
          group-hover:border-emerald-800
          group-hover:bg-emerald-800
          transition-all
          duration-500
        ">
          <span className="
            text-xs
            font-medium
            text-emerald-800/60
            group-hover:text-white
            transition-colors
            duration-300
          ">
            {item.step}
          </span>
        </div>

        {/* コネクター（モバイル用） */}
        {index < totalSteps - 1 && (
          <div className="
            lg:hidden
            absolute
            -bottom-8
            left-1/2
            w-px
            h-8
            bg-gradient-to-b
            from-emerald-800/20
            to-transparent
          " />
        )}

        <h3 className="
          text-xl
          text-gray-800
          mt-3
          mb-3
          group-hover:text-emerald-800
          transition-colors
          duration-300
        ">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed">
          {item.description}
        </p>

        {/* 装飾的なコーナー */}
        <div className="
          absolute
          bottom-3
          right-3
          w-8
          h-8
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-500
          transform
          group-hover:translate-x-0
          translate-x-2
        ">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              d="M20,4 L20,20 L4,20"
              stroke="#1e4d4a"
              strokeWidth="1.5"
              fill="none"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function Flow() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="flow"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* 背景の曲線装飾 */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-100,400 Q200,200 500,400 T1100,400 T1600,400"
          stroke="#1e4d4a"
          strokeWidth="1"
          fill="none"
          opacity="0.05"
        />
        <path
          d="M-100,450 Q250,250 550,450 T1150,450 T1600,450"
          stroke="#1e4d4a"
          strokeWidth="1"
          fill="none"
          opacity="0.03"
        />
      </svg>

      {/* 大きな装飾的テキスト */}
      <div
        className={`
          absolute right-0 top-1/3 text-[15rem] font-extralight text-gray-100/30 leading-none select-none
          hidden xl:block writing-vertical
          transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}
        `}
      >
        FLOW
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        {/* ヘッダー */}
        <div
          className={`
            max-w-2xl mb-20
            transition-all duration-1000
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full border border-emerald-800/20 flex items-center justify-center">
              <span className="text-xs text-emerald-800/60 tracking-wider">04</span>
            </div>
            <span className="text-xs tracking-[0.3em] text-emerald-800/60 uppercase">
              Process
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-800/20 to-transparent" />
          </div>

          <h2 className="
            text-3xl
            md:text-4xl
            lg:text-[3.5rem]
            font-extralight
            text-gray-800
            leading-[1.1]
            tracking-tight
            mb-6
          ">
            整理から完了までの
            <span className="text-emerald-800">流れ</span>
          </h2>

          <p className="text-gray-600 text-lg">
            一般的な進め方をご紹介します。状況によって順序や内容は変わります。
          </p>
        </div>

        {/* タイムライン */}
        <div className="relative">
          {/* 曲線のパス（デスクトップ） */}
          <svg
            className={`
              hidden lg:block absolute top-0 left-0 w-full h-full
              transition-opacity duration-1000 delay-500
              ${isVisible ? 'opacity-100' : 'opacity-0'}
            `}
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <path
              d="M50,50
                 C200,50 200,150 350,150
                 C500,150 500,50 650,50
                 C800,50 800,150 950,150"
              stroke="#1e4d4a"
              strokeWidth="2"
              fill="none"
              opacity="0.1"
              strokeDasharray="8,8"
              style={{
                strokeDashoffset: isVisible ? 0 : 1000,
                transition: 'stroke-dashoffset 2s ease-out',
              }}
            />
          </svg>

          {/* ステップカード */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((item, index) => (
              <StepCard
                key={index}
                item={item}
                index={index}
                totalSteps={steps.length}
              />
            ))}
          </div>
        </div>

        {/* 補足テキスト */}
        <div
          className={`
            mt-16 text-center
            transition-all duration-1000 delay-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <p className="text-sm text-gray-500">
            ※ 各ステップにかかる期間は状況により異なります。
            <br className="md:hidden" />
            無理のないペースで進めていきます。
          </p>
        </div>
      </div>
    </section>
  )
}
