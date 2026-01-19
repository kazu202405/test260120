export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="
      py-12
      md:py-16
      bg-gray-50
      border-t
      border-gray-200
    ">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="
          flex
          flex-col
          md:flex-row
          md:items-end
          md:justify-between
          gap-8
        ">
          {/* ロゴ・社名 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-6 h-6">
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
              ">
                相続不動産相談室
              </span>
            </div>
            <p className="
              text-xs
              text-gray-500
            ">
              株式会社○○○○
            </p>
          </div>

          {/* コピーライト */}
          <div className="
            text-xs
            text-gray-400
          ">
            <p>&copy; {currentYear} All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
