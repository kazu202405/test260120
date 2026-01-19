import Header from './components/Header'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'
import Hero from './components/sections/Hero'
import Concept from './components/sections/Concept'
import Problem from './components/sections/Problem'
import Approach from './components/sections/Approach'
import Reasons from './components/sections/Reasons'
import Statement from './components/sections/Statement'
import HorizontalScroll from './components/sections/HorizontalScroll'
import StickyScroll from './components/sections/StickyScroll'
import Flow from './components/sections/Flow'
import FAQ from './components/sections/FAQ'
import Company from './components/sections/Company'
import { WaveDivider, CurveDivider } from './components/SectionDivider'

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Header />
      <main>
        <Hero />

        {/* Hero → Concept の間に波型 */}
        <WaveDivider color="#ffffff" />

        <Concept />

        {/* Concept → Problem の間に曲線 */}
        <CurveDivider color="#f9fafb" />

        <Problem />

        <Approach />

        {/* ドラマチックな黒背景ステートメント */}
        <Statement />

        {/* 横スクロールセクション（黒背景） */}
        <HorizontalScroll />

        <Reasons />

        {/* スティッキースクロールセクション */}
        <StickyScroll />

        {/* Reasons → Flow の間に波型 */}
        <div className="bg-white">
          <WaveDivider color="#ffffff" flip />
        </div>

        <Flow />

        {/* Flow → FAQ の間 */}
        <CurveDivider color="#f9fafb" />

        <FAQ />

        <Company />
      </main>
      <Footer />
    </SmoothScroll>
  )
}

export default App
