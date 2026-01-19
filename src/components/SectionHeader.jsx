// セクションヘッダー統一コンポーネント
export default function SectionHeader({
  caption,
  title,
  description,
  align = 'left'
}) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <header className={`mb-12 md:mb-16 ${alignClass}`}>
      {caption && (
        <span className="
          block
          text-xs
          tracking-widest
          uppercase
          text-gray-500
          mb-3
        ">
          {caption}
        </span>
      )}
      <h2 className="
        text-2xl
        md:text-3xl
        lg:text-4xl
        text-gray-800
        mb-4
      ">
        {title}
      </h2>
      {description && (
        <p className="
          text-gray-600
          text-base
          md:text-lg
          max-w-2xl
          leading-relaxed
        " style={align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}}>
          {description}
        </p>
      )}
    </header>
  )
}
