import { useState } from 'react'

const heatSteps = [
  {
    id: 'danger',
    label: '1/4',
    title: '暑さの危険',
    message: '熱中症の危険があります',
    action: '水を飲む',
    mark: '☀',
  },
  {
    id: 'drink',
    label: '2/4',
    title: '水を飲む',
    message: '少しずつ水分をとってください',
    action: '涼しい場所へ',
    mark: '💧',
  },
  {
    id: 'cool-place',
    label: '3/4',
    title: '涼しい場所へ',
    message: '日陰や建物の中に移動してください',
    action: '症状を確認する',
    mark: '🏠',
  },
  {
    id: 'check',
    label: '4/4',
    title: '症状確認',
    message: 'フラつき・頭痛・吐き気があれば助けを呼ぶ',
    action: '完了',
    mark: '⚠',
  },
]

function HeatRiskScreen({ onBack }) {
  const [stepIndex, setStepIndex] = useState(0)

  const step = heatSteps[stepIndex]
  const isLastStep = stepIndex === heatSteps.length - 1

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
    <div className="danger-screen heat-flow-screen">
      <header className="danger-header">
        <button type="button" onClick={handlePrev}>‹</button>
        <h1>暑さの危険</h1>
        <div />
      </header>

      <main className="heat-flow-main">
        <div className="heat-flow-progress">{step.label}</div>

        <section className="heat-flow-card">
          <div className="heat-flow-mark">{step.mark}</div>

          <h2>{step.title}</h2>

          <p>{step.message}</p>
        </section>

        <button
          className="heat-flow-next"
          type="button"
          onClick={handleNext}
        >
          {step.action}
        </button>
      </main>
    </div>
  )
}

export default HeatRiskScreen