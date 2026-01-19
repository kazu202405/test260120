import { useEffect, useState, useRef } from 'react'

const situations = [
  '相続した不動産があるが、名義変更がまだ済んでいない。',
  '複数の相続人がいて、意見がまとまらないまま時間が経っている。',
  '空き家になっている実家をどうするか、判断がつかない。',
  '売却か賃貸か、選択肢はあるが情報が整理できていない。',
  '税金や費用のことが気になるが、誰に聞けばいいかわからない。',
]

export default function Problem() {
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
      id="problem"
      className="relative py-24 md:py-32 bg-gray-50 overflow-hidden"
    >
      {/* 背景画像 */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`
            absolute right-0 top-0 w-1/2 h-full
            transition-all duration-1000
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.07] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent" />
        </div>
      </div>

      {/* 背景装飾 - 大きな円弧 */}
      <svg
        className="absolute top-0 right-0 w-2/3 h-full opacity-[0.03]"
        viewBox="0 0 600 800"
        preserveAspectRatio="xMaxYMid slice"
      >
        <circle cx="600" cy="400" r="500" stroke="#1e4d4a" strokeWidth="1" fill="none" />
        <circle cx="600" cy="400" r="400" stroke="#1e4d4a" strokeWidth="1" fill="none" />
        <circle cx="600" cy="400" r="300" stroke="#1e4d4a" strokeWidth="1" fill="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* ヘッダー部分 */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div
                className={`
                  flex items-center gap-4 mb-6
                  transition-all duration-700
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
              >
                <div className="w-12 h-12 rounded-full border border-emerald-800/20 flex items-center justify-center">
                  <span className="text-xs text-emerald-800/60 tracking-wider">02</span>
                </div>
                <span className="text-xs tracking-[0.3em] text-emerald-800/60 uppercase">
                  Situation
                </span>
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
                  mb-6
                  transition-all duration-1000 delay-200
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
              >
                よくある
                <br />
                <span className="text-emerald-800">状況</span>
              </h2>

              <p
                className={`
                  text-gray-600 leading-relaxed mb-8
                  transition-all duration-1000 delay-400
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
              >
                相続不動産をめぐる課題は、ひとつひとつは小さくても、絡み合うと複雑になります。
              </p>

              {/* 小さな画像 */}
              <div
                className={`
                  hidden lg:block mt-8 rounded-xl overflow-hidden
                  transition-all duration-1000 delay-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
              >
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80"
                  alt=""
                  className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>

          {/* リスト部分 */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {situations.map((text, index) => (
                <div
                  key={index}
                  className={`
                    group
                    relative
                    p-6
                    bg-white
                    rounded-xl
                    border
                    border-gray-100
                    hover:border-emerald-800/20
                    hover:shadow-sm
                    transition-all
                    duration-500
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  {/* 番号 */}
                  <span className="
                    absolute
                    top-6
                    right-6
                    text-4xl
                    font-light
                    text-gray-100
                    group-hover:text-emerald-800/10
                    transition-colors
                    duration-300
                  ">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* ドット */}
                  <div className="
                    flex
                    items-start
                    gap-4
                  ">
                    <div className="
                      w-2
                      h-2
                      mt-2
                      rounded-full
                      bg-emerald-800/30
                      group-hover:bg-emerald-800
                      transition-colors
                      duration-300
                      flex-shrink-0
                    " />
                    <p className="
                      text-gray-700
                      leading-relaxed
                      pr-12
                    ">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 補足 */}
            <div
              className={`
                mt-12
                pl-6
                border-l-2
                border-emerald-800/10
                transition-all duration-1000 delay-700
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <p className="text-sm text-gray-500">
                このような状況に心当たりがあれば、
                まずは情報を整理することから始めてみてください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
