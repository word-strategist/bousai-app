import { useState } from 'react'

const fireSteps = [
  {
    label: '1/4',
    title: '火災発生',
    message: '煙や炎に注意してください',
    action: '煙から離れる',
    mark: '🔥',
  },
  {
    label: '2/4',
    title: '煙から離れる',
    message: '煙を吸わない',
    action: '風上へ移動',
    mark: '💨',
  },
  {
    label: '3/4',
    title: '風上へ移動',
    message: '風下へ行かない',
    action: '避難する',
    mark: '⬆️',
  },
  {
    label: '4/4',
    title: '避難',
    message: '安全な場所へ移動する',
    action: '避難所へ進む',
    mark: '🏃',
  },
]

function FireActionScreen({ onBack, onNext }) {
  const [stepIndex, setStepIndex] = useState(0)

  const step = fireSteps[stepIndex]
  const isLastStep = stepIndex === fireSteps.length - 1

  return (
    <div className="danger-screen earthquake-flow-screen">
      <header className="danger-header">
        <button
          type="button"
          onClick={() => {
            if (stepIndex === 0) {
              onBack()
            } else {
              setStepIndex(stepIndex - 1)
            }
          }}
        >
          ‹
        </button>

        <h1>火災</h1>

        <div />
      </header>

      <main className="earthquake-flow-main">
        <div className="earthquake-flow-progress">
          {step.label}
        </div>

        <section className="earthquake-flow-card">
          <div className="earthquake-flow-mark">
            {step.mark}
          </div>

          <h2>{step.title}</h2>

          <p>{step.message}</p>
        </section>

        <button
          className="earthquake-flow-next"
          type="button"
          onClick={() => {
            if (isLastStep) {
              onNext()
            } else {
              setStepIndex(stepIndex + 1)
            }
          }}
        >
          {step.action}
        </button>
      </main>
    </div>
  )
}

export default FireActionScreen