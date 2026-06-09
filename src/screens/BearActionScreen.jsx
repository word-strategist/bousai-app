import { useState } from 'react'

const bearSteps = [
  {
    id: 'seen',
    label: '1/4',
    title: '熊を見た',
    message: 'まず立ち止まってください',
    action: '走らない準備をする',
    mark: '🐻',
  },
  {
    id: 'dont-run',
    label: '2/4',
    title: '走らない',
    message: '走ると追われる危険があります',
    action: 'ゆっくり離れる',
    mark: '✋',
  },
  {
    id: 'back-away',
    label: '3/4',
    title: '静かに離れる',
    message: '熊に背中を向けずに下がる',
    action: '安全な場所へ向かう',
    mark: '↙',
  },
  {
    id: 'shelter',
    label: '4/4',
    title: '建物へ避難',
    message: '近くの建物や車に入ってください',
    action: '完了',
    mark: '🏠',
  },
]

function BearActionScreen({ onBack, onStartSound }) {
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
      <header className="danger-header">
        <button type="button" onClick={handlePrev}>‹</button>
        <h1>熊を見たら</h1>
        <div />
      </header>

      <main className="bear-flow-main">
        <div className="bear-flow-progress">{step.label}</div>

        <section className="bear-flow-card">
          <div className="bear-flow-mark">{step.mark}</div>

          <h2>{step.title}</h2>

          <p>{step.message}</p>
        </section>

        <button
          className="bear-flow-next"
          type="button"
          onClick={handleNext}
        >
          {step.action}
        </button>

        <button
          className="bear-flow-sound"
          type="button"
          onClick={onStartSound}
        >
          熊対策音
        </button>
      </main>
    </div>
  )
}

export default BearActionScreen