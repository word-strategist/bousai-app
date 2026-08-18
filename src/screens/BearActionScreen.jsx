import { useState } from 'react'

const bearSteps = [
  {
    id: 'dont-run',
    label: '1/3',
    title: '走らない',
    message: '大声を出さず、急に動かない',
    action: 'ゆっくり下がる',
  },
  {
    id: 'back-away',
    label: '2/3',
    title: 'ゆっくり下がる',
    message: '熊を見ながら、少しずつ離れる',
    action: 'もっと離れる',
  },
  {
    id: 'keep-distance',
    label: '3/3',
    title: '十分に離れる',
    message: '熊から距離をとって、安全な場所へ移動する',
    action: '案内を終える',
  },
]

function BearActionScreen({ onBack }) {
  const [stepIndex, setStepIndex] = useState(0)

  const step = bearSteps[stepIndex]
  const isLastStep = stepIndex === bearSteps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onBack()
      return
    }

    setStepIndex((current) => current + 1)
  }

  const handlePrev = () => {
    if (stepIndex === 0) {
      onBack()
      return
    }

    setStepIndex((current) => current - 1)
  }

  return (
    <div className="danger-screen bear-flow-screen">
      {/* =========================
          Header
      ========================= */}
      <header className="danger-header">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="前の画面へ戻る"
        >
          ‹
        </button>

        <h1>熊を見たら</h1>

        <div aria-hidden="true" />
      </header>

      {/* =========================
          Current Action
      ========================= */}
      <main className="bear-flow-main">
        <div className="bear-flow-status">
          <span>デモ表示</span>
          <strong>{step.label}</strong>
        </div>

        <section className="bear-flow-card">
          <p className="bear-flow-step-label">
            次にすること
          </p>

          <h2>{step.title}</h2>

          <div
            className="bear-flow-visual"
            aria-hidden="true"
          />

          <p className="bear-flow-message">
            {step.message}
          </p>
        </section>

        <button
          className="bear-flow-next"
          type="button"
          onClick={handleNext}
        >
          {step.action}
        </button>

        <p className="bear-flow-demo-note">
          これはデモです。実際の災害情報とは
          連動していません。
        </p>
      </main>
    </div>
  )
}

export default BearActionScreen