import { useState } from 'react'

const heatSteps = [
  {
    id: 'cool-place',
    label: '1/3',
    title: '涼しい場所へ',
    message: '日陰や冷房のある場所へ移動する',
    action: '体を冷やす',
  },
  {
    id: 'cool-body',
    label: '2/3',
    title: '体を冷やす',
    message: '衣服をゆるめて、首・脇・足の付け根などを冷やす',
    action: '水分をとる',
  },
  {
    id: 'drink',
    label: '3/3',
    title: '水分をとる',
    message: '自分で飲めるなら、水分・塩分を補給する',
    action: '案内を終える',
  },
]

function HeatRiskScreen({ onBack, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [showEmergency, setShowEmergency] = useState(false)

  const step = heatSteps[stepIndex]
  const isLastStep = stepIndex === heatSteps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
      return
    }

    setStepIndex((current) => current + 1)
  }

  const handlePrev = () => {
    if (showEmergency) {
      setShowEmergency(false)
      return
    }

    if (stepIndex === 0) {
      onBack()
      return
    }

    setStepIndex((current) => current - 1)
  }

  if (showEmergency) {
    return (
      <div className="danger-screen heat-flow-screen">
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

          <h1>暑さの危険</h1>

          <div aria-hidden="true" />
        </header>

        {/* =========================
            Emergency Action
        ========================= */}
        <main className="heat-flow-main">
          <div className="heat-flow-status">
            <span>緊急時</span>
          </div>

          <section className="heat-flow-card heat-flow-emergency-card">
            <p className="heat-flow-step-label">
              すぐにすること
            </p>

            <h2>119を呼ぶ</h2>

            <div
              className="heat-flow-visual"
              aria-hidden="true"
            />

            <p className="heat-flow-message">
              自分で水が飲めない、
              反応がおかしいときは
              救急車を呼ぶ
            </p>
          </section>

          <a
            className="heat-flow-emergency-call"
            href="tel:119"
          >
            119に電話する
          </a>

          <p className="heat-flow-demo-note">
            緊急時は実際の状況を確認し、
            必要に応じて119番へ連絡してください。
          </p>
        </main>
      </div>
    )
  }

  return (
    <div className="danger-screen heat-flow-screen">
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

        <h1>暑さの危険</h1>

        <div aria-hidden="true" />
      </header>

      {/* =========================
          Current Action
      ========================= */}
      <main className="heat-flow-main">
        <div className="heat-flow-status">
          <span>デモ表示</span>
          <strong>{step.label}</strong>
        </div>

        <section className="heat-flow-card">
          <p className="heat-flow-step-label">
            次にすること
          </p>

          <h2>{step.title}</h2>

          <div
            className="heat-flow-visual"
            aria-hidden="true"
          />

          <p className="heat-flow-message">
            {step.message}
          </p>
        </section>

        <button
          className="heat-flow-next"
          type="button"
          onClick={handleNext}
        >
          {step.action}
        </button>

        <button
          className="heat-flow-emergency-link"
          type="button"
          onClick={() => setShowEmergency(true)}
        >
          水が飲めない・反応がおかしい
        </button>

        <p className="heat-flow-demo-note">
          これはデモです。実際の災害情報とは
          連動していません。
        </p>
      </main>
    </div>
  )
}

export default HeatRiskScreen