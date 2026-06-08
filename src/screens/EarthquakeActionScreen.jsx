import { useState } from 'react'

const earthquakeSteps = [
  {
    label: '1/4',
    title: '地震発生',
    message: 'まず頭を守ってください',
    action: '頭を守る',
    mark: '🛡',
  },
  {
    label: '2/4',
    title: '頭を守る',
    message: '机の下やカバンで頭を守る',
    action: '待つ',
    mark: '🙆',
  },
  {
    label: '3/4',
    title: '揺れが収まるまで待つ',
    message: 'あわてて外へ出ない',
    action: '避難する',
    mark: '✋',
  },
  {
    label: '4/4',
    title: '安全な場所へ',
    message: '落下物に注意して移動する',
    action: '避難所へ進む',
    mark: '🏃',
  },
]

function EarthquakeActionScreen({ onBack, onNext }) {
  const [stepIndex, setStepIndex] = useState(0)

  const step = earthquakeSteps[stepIndex]
  const isLastStep = stepIndex === earthquakeSteps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onNext()
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
    <div className="danger-screen earthquake-flow-screen">
      <header className="danger-header">
        <button type="button" onClick={handlePrev}>‹</button>
        <h1>地震</h1>
        <div />
      </header>

      <main className="earthquake-flow-main">
        <div className="earthquake-flow-progress">{step.label}</div>

        <section className="earthquake-flow-card">
          <div className="earthquake-flow-mark">{step.mark}</div>
          <h2>{step.title}</h2>
          <p>{step.message}</p>
        </section>

        <button
          className="earthquake-flow-next"
          type="button"
          onClick={handleNext}
        >
          {step.action}
        </button>
      </main>
    </div>
  )
}

export default EarthquakeActionScreen