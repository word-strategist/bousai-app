import { useState } from 'react'

import protectHeadImage from '../assets/stamps/action-protect-head.png'
import waitImage from '../assets/app/action/app-action-earthquake-wait-v1.png'
import dontGoOutImage from '../assets/app/action/app-action-earthquake-dont-go-out-v1.png'
import moveToShelterImage from '../assets/app/action/app-action-earthquake-move-to-shelter-v1.png'

const earthquakeSteps = [
  {
    label: '1/4',
    title: '頭を守る',
    message: 'まず、頭を守ってください',
    action: '頭を守る',
    image: protectHeadImage,
    mark: null,
  },
  {
    label: '2/4',
    title: 'その場で待つ',
    message: '揺れが収まるまで動かない',
    action: '待つ',
    image: waitImage,
    mark: null,
  },
  {
    label: '3/4',
    title: 'あわてて出ない',
    message: '揺れが収まるまで外へ出ない',
    action: '安全を確認',
    image: dontGoOutImage,
    mark: null,
  },
  {
    label: '4/4',
    title: '安全な場所へ',
    message: '落下物に注意して移動する',
    action: '避難所へ進む',
    image: moveToShelterImage,
    mark: null,
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
    <div className="earthquake-flow-screen">
      <header className="earthquake-flow-header">
        <button
          type="button"
          className="earthquake-flow-back"
          onClick={handlePrev}
          aria-label="前の画面へ戻る"
        >
          ‹
        </button>

        <h1>地震</h1>

        <div aria-hidden="true" />
      </header>

      <main className="earthquake-flow-main">
        <div className="earthquake-flow-progress">
          {step.label}
        </div>

        <section className="earthquake-flow-card">
          <h2>{step.title}</h2>

          <div className="earthquake-flow-visual">
            {step.image ? (
              <img
                src={step.image}
                alt=""
                className="earthquake-flow-image"
              />
            ) : (
              <span
                className="earthquake-flow-mark"
                aria-hidden="true"
              >
                {step.mark}
              </span>
            )}
          </div>

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