import { useState } from 'react'

const floodSteps = [
  {
    label: '1/4',
    title: '洪水危険',
    message: '水位上昇のおそれがあります',
    action: '川に近づかない',
    mark: '🌊',
  },
  {
    label: '2/4',
    title: '川に近づかない',
    message: '川や用水路から離れる',
    action: '高い場所へ',
    mark: '🚫',
  },
  {
    label: '3/4',
    title: '高い場所へ',
    message: '上階や高台へ移動する',
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

function FloodActionScreen({ onBack, onNext }) {
  const [stepIndex, setStepIndex] = useState(0)

  const step = floodSteps[stepIndex]
  const isLastStep = stepIndex === floodSteps.length - 1

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

        <h1>洪水</h1>
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

export default FloodActionScreen