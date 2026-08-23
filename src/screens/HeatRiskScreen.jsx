import { useEffect, useState } from 'react'
import heatCoolPlaceImage from '../assets/app/action/app-action-heat-cool-place-v1.png'
import heatCoolBodyImage from '../assets/app/action/app-action-heat-cool-body-v1.png'
import heatDrinkImage from '../assets/app/action/app-action-heat-drink-v1.png'
import heatEmergencyCallImage from '../assets/app/action/app-action-heat-emergency-call-v1.png'

const heatSteps = [
  {
    id: 'cool-place',
    label: '1/3',
    title: '涼しい場所へ',
    message: '日陰や冷房のある場所へ移動する',
    action: '体を冷やす',
    image: heatCoolPlaceImage,
  },
  {
    id: 'cool-body',
    label: '2/3',
    title: '体を冷やす',
    message: '衣服をゆるめて、首・脇・足の付け根などを冷やす',
    action: '水分をとる',
    image: heatCoolBodyImage,
  },
  {
    id: 'drink',
    label: '3/3',
    title: '水分をとる',
    message: '自分で飲めるなら、水分・塩分を補給する',
    action: '案内を終える',
    image: heatDrinkImage,
  },
]

function HeatRiskScreen({ onBack, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [showEmergency, setShowEmergency] = useState(false)
  const [showCallConfirm, setShowCallConfirm] = useState(false)

  useEffect(() => {
    const images = [
      ...heatSteps.map((item) => item.image),
      heatEmergencyCallImage,
    ]

    images.forEach((src) => {
      const image = new Image()
      image.src = src
    })
  }, [])

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
    if (showCallConfirm) {
      setShowCallConfirm(false)
      return
    }

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

    if (showCallConfirm) {
    return (
      <div className="danger-screen heat-flow-screen">
        {/* =========================
            Header
        ========================= */}
        <header className="danger-header">
          <button
            type="button"
            onClick={() => setShowCallConfirm(false)}
            aria-label="前の画面へ戻る"
          >
            ‹
          </button>

          <h1>暑さの危険</h1>

          <div aria-hidden="true" />
        </header>

        {/* =========================
            119 Call Confirmation
        ========================= */}
        <main className="heat-flow-main">
          <div className="heat-flow-status">
            <span>確認</span>
          </div>

          <section className="heat-flow-card heat-flow-emergency-card heat-flow-confirm-card">
            <h2>119番へ</h2>
          </section>

        <a
          className="heat-flow-emergency-call"
          href="tel:119"
          aria-label="119番へ電話する"
        >
          <svg
            className="heat-flow-call-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M6.6 10.8c1.7 3.3 3.3 4.9 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.7c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1l-2.2 2.2Z"
              fill="currentColor"
            />
          </svg>

          <span className="heat-flow-emergency-call-label">
            119へ
            <br />
            電話する
          </span>
        </a>

          <button
            className="heat-flow-emergency-link"
            type="button"
            onClick={() => setShowCallConfirm(false)}
          >
            やめる
          </button>
        </main>
      </div>
    )
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

          <div className="heat-flow-visual">
            <img
              src={heatEmergencyCallImage}
              alt=""
              className="heat-flow-image"
            />
          </div>

            <p className="heat-flow-message">
              自分で水が飲めない、
              <br />
              反応がおかしいときは
              <br />
              救急車を呼ぶ
            </p>
          </section>

            <button
              className="heat-flow-emergency-call"
              type="button"
              onClick={() => setShowCallConfirm(true)}
            >
              119に電話する
            </button>

              <p className="heat-flow-demo-note">
                緊急時は実際の状況を確認し、
                <br />
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

        <div className="heat-flow-visual">
          <img
            src={step.image}
            alt=""
            className="heat-flow-image"
          />
        </div>

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

        {isLastStep ? (
          <a
            className="flow-official-link"
            href="https://www.wbgt.env.go.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>公的な情報を見る</span>
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}

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