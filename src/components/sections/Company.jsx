import { useEffect, useState, useRef } from 'react'

const companyInfo = [
  { label: '社名', value: '株式会社○○○○' },
  { label: '所在地', value: '東京都○○区○○ 0-0-0' },
  { label: '代表', value: '○○ ○○' },
  { label: '設立', value: '20XX年X月' },
  { label: '事業内容', value: '不動産売買仲介、相続不動産コンサルティング' },
  { label: '免許番号', value: '東京都知事（X）第XXXXX号' },
]

export default function Company() {
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
      id="company"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* テキスト */}
          <div className="lg:col-span-7">
            <div
              className={`
                flex items-center gap-4 mb-6
                transition-all duration-700
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <div className="w-12 h-12 rounded-full border border-emerald-800/20 flex items-center justify-center">
                <span className="text-xs text-emerald-800/60 tracking-wider">06</span>
              </div>
              <span className="text-xs tracking-[0.3em] text-emerald-800/60 uppercase">
                Company
              </span>
            </div>

            <h2
              className={`
                text-3xl md:text-4xl lg:text-[3.5rem]
                font-extralight
                text-gray-800
                leading-[1.1]
                tracking-tight
                mb-12
                transition-all duration-1000 delay-200
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              会社<span className="text-emerald-800">概要</span>
            </h2>

            <dl className="space-y-4">
              {companyInfo.map((item, index) => (
                <div
                  key={index}
                  className={`
                    flex
                    flex-col
                    sm:flex-row
                    sm:gap-8
                    py-4
                    border-b
                    border-gray-100
                    last:border-b-0
                    transition-all duration-700
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ transitionDelay: `${300 + index * 80}ms` }}
                >
                  <dt className="
                    text-xs
                    text-gray-500
                    uppercase
                    tracking-wider
                    sm:w-28
                    flex-shrink-0
                    mb-1
                    sm:mb-0
                  ">
                    {item.label}
                  </dt>
                  <dd className="
                    text-sm
                    text-gray-800
                  ">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p
              className={`
                mt-10 text-xs text-gray-400
                transition-all duration-1000 delay-700
                ${isVisible ? 'opacity-100' : 'opacity-0'}
              `}
            >
              ※ 情報は変更になる場合があります
            </p>
          </div>

          {/* 画像 */}
          <div
            className={`
              lg:col-span-5
              transition-all duration-1000 delay-300
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `}
          >
            <div className="relative">
              {/* メイン画像 */}
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
                  alt="オフィス"
                  className="w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* 装飾的なサブ画像 */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl overflow-hidden shadow-xl hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=200&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 装飾的な要素 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-emerald-800/10 rounded-xl hidden md:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
