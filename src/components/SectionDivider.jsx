// セクション間のデザイン要素
// 直線的でない、有機的な区切り

// 波型ディバイダー
export function WaveDivider({ flip = false, color = '#f9fafb' }) {
  return (
    <div className={`w-full overflow-hidden ${flip ? 'rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1440 120"
        className="w-full h-16 md:h-24"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60
             C240,120 480,0 720,60
             C960,120 1200,0 1440,60
             L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

// 斜めカットディバイダー
export function DiagonalDivider({ direction = 'right', color = '#ffffff' }) {
  const path = direction === 'right'
    ? 'M0,0 L1440,80 L1440,120 L0,120 Z'
    : 'M0,80 L1440,0 L1440,120 L0,120 Z'

  return (
    <div className="w-full overflow-hidden -mb-px">
      <svg
        viewBox="0 0 1440 120"
        className="w-full h-12 md:h-20"
        preserveAspectRatio="none"
      >
        <path d={path} fill={color} />
      </svg>
    </div>
  )
}

// 曲線ディバイダー
export function CurveDivider({ color = '#f9fafb' }) {
  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox="0 0 1440 100"
        className="w-full h-12 md:h-20"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100
             Q720,0 1440,100
             L1440,100 L0,100 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

// 装飾ライン（セクション内で使用）
export function DecorativeLine({ className = '' }) {
  return (
    <svg
      viewBox="0 0 200 20"
      className={`w-32 h-4 ${className}`}
    >
      <line x1="0" y1="10" x2="60" y2="10" stroke="currentColor" strokeWidth="2" />
      <circle cx="80" cy="10" r="3" fill="currentColor" />
      <line x1="100" y1="10" x2="200" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
    </svg>
  )
}

// 抽象的なコーナー装飾
export function CornerAccent({ position = 'top-left', size = 'md' }) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }

  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} opacity-[0.06]`}
    >
      <path
        d="M0,0 L0,100 M0,0 L100,0"
        stroke="#1e4d4a"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M0,30 Q30,30 30,0"
        stroke="#1e4d4a"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="0" cy="0" r="5" fill="#1e4d4a" />
    </svg>
  )
}

// フローティングシェイプ（背景装飾用）
export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Circle 1 */}
      <div className="
        absolute
        -top-20
        -right-20
        w-80
        h-80
        rounded-full
        border
        border-emerald-800/5
      " />

      {/* Circle 2 */}
      <div className="
        absolute
        -bottom-40
        -left-20
        w-96
        h-96
        rounded-full
        border
        border-emerald-800/5
      " />

      {/* Diagonal lines */}
      <svg className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03]">
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#1e4d4a" strokeWidth="1" />
        <line x1="100%" y1="20%" x2="20%" y2="100%" stroke="#1e4d4a" strokeWidth="1" />
      </svg>
    </div>
  )
}

export default {
  WaveDivider,
  DiagonalDivider,
  CurveDivider,
  DecorativeLine,
  CornerAccent,
  FloatingShapes,
}
