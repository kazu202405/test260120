import { CornerAccent } from '../SectionDivider'

const initialItems = [
  {
    title: '登記情報の確認',
    text: '現在の名義、権利関係、抵当権の有無などを確認します。',
  },
  {
    title: '相続人の把握',
    text: '関係する相続人の範囲と、それぞれの意向を整理します。',
  },
  {
    title: '物件の現況',
    text: '建物の状態、土地の形状、接道状況などを把握します。',
  },
  {
    title: '費用の概算',
    text: '維持費、税金、手続き費用などの概算を算出します。',
  },
]

// 抽象的なプロセス図
function ProcessIllustration() {
  return (
    <svg viewBox="0 0 300 400" className="w-full h-auto max-w-xs mx-auto">
      <defs>
        <linearGradient id="processGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e4d4a" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1e4d4a" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Background curve */}
      <path
        d="M150,20
           Q250,100 150,180
           Q50,260 150,340
           Q200,380 150,380"
        stroke="url(#processGrad)"
        strokeWidth="40"
        fill="none"
        strokeLinecap="round"
      />

      {/* Main flowing line */}
      <path
        d="M150,30
           Q230,100 150,180
           Q70,260 150,340"
        stroke="#1e4d4a"
        strokeWidth="2"
        fill="none"
        opacity="0.2"
      />

      {/* Step markers */}
      {[80, 180, 280, 340].map((y, i) => (
        <g key={i}>
          <circle
            cx="150"
            cy={y}
            r="20"
            fill="white"
            stroke="#1e4d4a"
            strokeWidth="1"
            opacity="0.3"
          />
          <circle cx="150" cy={y} r="6" fill="#1e4d4a" opacity="0.4" />
          <text
            x="150"
            y={y + 4}
            textAnchor="middle"
            fontSize="10"
            fill="#1e4d4a"
            opacity="0.6"
          >
            {String(i + 1).padStart(2, '0')}
          </text>
        </g>
      ))}

      {/* Decorative dots */}
      <g fill="#1e4d4a" opacity="0.1">
        <circle cx="80" cy="130" r="3" />
        <circle cx="220" cy="230" r="3" />
        <circle cx="100" cy="310" r="3" />
      </g>
    </svg>
  )
}

export default function Approach() {
  return (
    <section id="approach" className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
      {/* 斜めの背景装飾 */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `
            repeating-linear-gradient(
              -45deg,
              #1e4d4a,
              #1e4d4a 1px,
              transparent 1px,
              transparent 80px
            )
          `
        }}
      />

      <CornerAccent position="bottom-left" size="lg" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* テキスト */}
          <div className="lg:col-span-7">
            {/* ヘッダー */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border border-emerald-800/20 flex items-center justify-center">
                  <span className="text-xs text-emerald-800/60 tracking-wider">02</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-800/10 to-transparent" />
              </div>

              <h2 className="
                text-3xl
                md:text-4xl
                lg:text-5xl
                font-light
                text-gray-800
                leading-tight
                mb-6
              ">
                まず、
                <span className="text-emerald-800">状況を整理</span>
                します。
              </h2>

              <p className="text-gray-600 text-lg">
                最初にお話しする際、以下の項目を一緒に確認していきます。
              </p>
            </div>

            {/* アイテムリスト */}
            <div className="space-y-8">
              {initialItems.map((item, index) => (
                <div
                  key={index}
                  className="
                    group
                    relative
                    pl-8
                    py-4
                    border-l-2
                    border-gray-200
                    hover:border-emerald-800/40
                    transition-colors
                    duration-300
                  "
                >
                  {/* 番号 */}
                  <span className="
                    absolute
                    -left-3
                    top-4
                    w-6
                    h-6
                    rounded-full
                    bg-white
                    border
                    border-gray-200
                    group-hover:border-emerald-800/40
                    flex
                    items-center
                    justify-center
                    text-[10px]
                    text-gray-400
                    group-hover:text-emerald-800
                    transition-colors
                    duration-300
                  ">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="
                    text-lg
                    text-gray-800
                    mb-2
                    group-hover:text-emerald-800
                    transition-colors
                    duration-300
                  ">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-12 text-sm text-gray-500 pl-8">
              状況によって確認項目は異なります。
              無理に情報を集める必要はありません。
            </p>
          </div>

          {/* イラスト */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <ProcessIllustration />
          </div>
        </div>
      </div>
    </section>
  )
}
