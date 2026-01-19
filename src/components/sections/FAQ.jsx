import { useState } from 'react'
import Section from '../Section'
import SectionHeader from '../SectionHeader'

const faqs = [
  {
    question: '相談に費用はかかりますか？',
    answer: '初回のご相談は無料です。状況の整理や選択肢の説明までは費用をいただきません。実際に手続きを進める段階で、内容に応じた費用についてご説明します。',
  },
  {
    question: '名義変更がまだの場合でも相談できますか？',
    answer: 'はい。名義変更（相続登記）がまだの方からのご相談も多くいただいています。登記を含めた全体の段取りを整理するところからお手伝いできます。',
  },
  {
    question: '遠方の不動産でも対応できますか？',
    answer: '全国の物件に対応しています。現地調査が必要な場合は、提携先と連携して対応いたします。オンラインでのご相談も可能です。',
  },
  {
    question: '相続人の間で意見が分かれている場合は？',
    answer: '意見の相違がある場合こそ、状況の整理が重要です。選択肢ごとのメリット・デメリットを客観的に整理することで、話し合いの土台をつくるお手伝いをします。',
  },
  {
    question: '売却を勧められることはありますか？',
    answer: '売却ありきのご提案はしません。保有、賃貸、売却、それぞれの選択肢を整理した上で、ご家族にとって最適な判断をしていただくことを大切にしています。',
  },
]

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="
          w-full
          py-5
          flex
          items-start
          justify-between
          gap-4
          text-left
          group
        "
        aria-expanded={isOpen}
      >
        <span className="
          text-base
          text-gray-800
          group-hover:text-emerald-800
          transition-colors
          duration-200
        ">
          {question}
        </span>
        <span className="
          flex-shrink-0
          w-5
          h-5
          flex
          items-center
          justify-center
          text-gray-500
          transition-transform
          duration-200
        " style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="7" y1="0" x2="7" y2="14" />
            <line x1="0" y1="7" x2="14" y2="7" />
          </svg>
        </span>
      </button>

      <div
        className="
          overflow-hidden
          transition-all
          duration-200
          ease-out
        "
        style={{
          maxHeight: isOpen ? '300px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="
          pb-5
          text-sm
          text-gray-600
          leading-relaxed
        ">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section id="faq" background="bg-gray-50">
      <SectionHeader
        caption="FAQ"
        title="よくあるご質問"
      />

      <div className="max-w-2xl">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </Section>
  )
}
