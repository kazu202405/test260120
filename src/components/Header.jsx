import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#concept', label: '考え方' },
  { href: '#approach', label: '進め方' },
  { href: '#flow', label: '流れ' },
  { href: '#company', label: '会社概要' },
]

function Logo() {
  return (
    <a href="#" className="flex items-center gap-3 group">
      <div className="relative w-8 h-8">
        <div className="
          absolute
          inset-0
          border
          border-gray-800
          opacity-20
          transform
          rotate-45
        " />
        <div className="
          absolute
          inset-1
          bg-emerald-800
          opacity-80
        " />
      </div>
      <span className="
        text-sm
        tracking-wider
        text-gray-800
        font-medium
      ">
        相続不動産相談室
      </span>
    </a>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        transition-all
        duration-300
        ${isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
        }
      `}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="
                    text-sm
                    text-gray-600
                    hover:text-emerald-800
                    transition-colors
                    duration-200
                  "
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="
              md:hidden
              w-8
              h-8
              flex
              flex-col
              items-center
              justify-center
              gap-1.5
            "
            aria-label="メニュー"
          >
            <span className={`
              block w-5 h-px bg-gray-800
              transition-transform duration-200
              ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}
            `} />
            <span className={`
              block w-5 h-px bg-gray-800
              transition-opacity duration-200
              ${isMobileMenuOpen ? 'opacity-0' : ''}
            `} />
            <span className={`
              block w-5 h-px bg-gray-800
              transition-transform duration-200
              ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}
            `} />
          </button>
        </div>

        <div className={`
          md:hidden
          overflow-hidden
          transition-all
          duration-300
          bg-white
          ${isMobileMenuOpen ? 'max-h-64 pb-6' : 'max-h-0'}
        `}>
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    block
                    text-sm
                    text-gray-600
                    hover:text-emerald-800
                    transition-colors
                    duration-200
                    py-2
                  "
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
