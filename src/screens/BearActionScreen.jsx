import { useEffect, useState } from 'react'
import bearDontRunImage from '../assets/app/action/app-action-bear-dont-run-v1.png'
import bearBackAwayImage from '../assets/app/action/app-action-bear-back-away-v1.png'
import bearKeepDistanceImage from '../assets/app/action/app-action-bear-keep-distance-v1.png'

const bearSteps = [
  {
    id: 'dont-run',
    label: '1/3',
    title: '走らない',
    message: '大声を出さず、急に動かない',
    action: 'ゆっくり下がる',
    image: bearDontRunImage,
  },
  {
    id: 'back-away',
    label: '2/3',
    title: 'ゆっくり下がる',
    message: '熊を見ながら、少しずつ離れる',
    action: 'もっと離れる',
    image: bearBackAwayImage,
  },
  {
    id: 'keep-distance',
    label: '3/3',
    title: '十分に離れる',
    message: '熊との距離をとり、静かにその場を離れる',
    action: '案内を終える',
    image: bearKeepDistanceImage,
  },
]

function BearActionScreen({ onBack, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    bearSteps.forEach((item) => {
      const image = new Image()
      image.src = item.image
    })
  }, [])

  const step = bearSteps[stepIndex]
  const isLastStep = stepIndex === bearSteps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
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

          <div className="bear-flow-visual">
            <img
              src={step.image}
              alt=""
              className="bear-flow-image"
            />
          </div>

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

        {isLastStep ? (
          <a
            className="flow-official-link"
            href="https://www.env.go.jp/nature/choju/effort/effort12/effort12.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>公的な情報を見る</span>
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}

        <p className="bear-flow-demo-note">
          これはデモです。実際の災害情報とは
          連動していません。
        </p>
      </main>
    </div>
  )
}

export default BearActionScreen