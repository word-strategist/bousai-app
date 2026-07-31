import { useState } from 'react'

import waitImage from '../assets/app/action/app-action-earthquake-wait-v1.png'
import dontGoOutImage from '../assets/app/action/app-action-earthquake-dont-go-out-v1.png'

const earthquakeSteps = [
  {
    label: '2/3',
    title: 'その場で待つ',
    message:
      '揺れがおさまるまで、動かずに待ってください。',
    action: 'あわてて外へ出ない',
    image: waitImage,
  },
  {
    label: '3/3',
    title: 'あわてて出ない',
    message:
      '揺れがおさまった後も、周囲を確認してから動いてください。',
    action: '周囲と自分の安全を確認する',
    image: dontGoOutImage,
  },
]

function EarthquakeActionScreen({ onBack, onNext }) {
  const [stepIndex, setStepIndex] = useState(0)

  const step = earthquakeSteps[stepIndex]
  const isLastStep =
    stepIndex === earthquakeSteps.length - 1

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
      {/* =========================
          Header
      ========================= */}
      <header className="earthquake-flow-header">
        <button
          type="button"
          className="earthquake-flow-back"
          onClick={handlePrev}
          aria-label="前の画面へ戻る"
        >
          ‹
        </button>

        <h1>地震時の行動案内</h1>

        <div aria-hidden="true" />
      </header>

      {/* =========================
          Current Action
      ========================= */}
      <main className="earthquake-flow-main">
        <div className="earthquake-flow-status">
          <span>デモ表示</span>
          <strong>{step.label}</strong>
        </div>

        <section className="earthquake-flow-card">
          <p className="earthquake-flow-step-label">
            次にすること
          </p>

          <h2>{step.title}</h2>

          <div className="earthquake-flow-visual">
            <img
              src={step.image}
              alt=""
              className="earthquake-flow-image"
            />
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

        <p className="earthquake-flow-demo-note">
          これはデモです。実際の災害情報とは
          連動していません。
        </p>
      </main>
    </div>
  )
}

export default EarthquakeActionScreen
