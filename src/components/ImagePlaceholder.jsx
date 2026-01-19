// ダミー画像プレースホルダー
// picsum.photos を使用した実際の画像
export default function ImagePlaceholder({
  aspectRatio = '4/3',
  className = '',
  alt = '画像',
  width = 800,
  height = 600,
  seed // 固定画像用のシード値
}) {
  // アスペクト比から高さを計算
  const ratioMap = {
    '16/9': 9/16,
    '4/3': 3/4,
    '3/2': 2/3,
    '1/1': 1,
    '4/5': 5/4,
    '3/4': 4/3,
  }

  const ratio = ratioMap[aspectRatio] || 3/4
  const imgHeight = Math.round(width * ratio)

  // picsum.photos URL（grayscale + blur で上品に）
  const imageUrl = seed
    ? `https://picsum.photos/seed/${seed}/${width}/${imgHeight}?grayscale`
    : `https://picsum.photos/${width}/${imgHeight}?grayscale`

  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-xl
        bg-gray-100
        ${className}
      `}
      style={{ aspectRatio }}
    >
      <img
        src={imageUrl}
        alt={alt}
        loading="lazy"
        className="
          w-full
          h-full
          object-cover
          opacity-90
          hover:opacity-100
          transition-opacity
          duration-300
        "
      />
      {/* 上品なオーバーレイ */}
      <div className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/5
        to-transparent
        pointer-events-none
      " />
    </div>
  )
}
