import { useState } from 'react'
import '../styles/emergency.css'

const earthquakeActions = [
  {
    alert: '緊急地震速報',
    visual: '🙆',
    title: '頭を守る',
    text: (
      <>
        机の下・カバン・腕で
        <br />
        頭を守ってください
      </>
    ),
    button: 'わかった',
  },
  {
    alert: '揺れがおさまったら',
    visual: '🚪',
    title: '外へ出ない',
    text: (
      <>
        ガラス・看板・ブロック塀に
        <br />
        近づかないでください
      </>
    ),
    button: '次へ',
  },
  {
    alert: '移動する前に',
    visual: '👟',
    title: '靴を履く',
    text: (
      <>
        ガラス片や落下物で
        <br />
        足をケガしないように
      </>
    ),
    button: '次へ',
  },
]

function EmergencyModeScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const action = earthquakeActions[currentStep]
  const isLastStep = currentStep === earthquakeActions.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
      return
    }

    setCurrentStep((prev) => prev + 1)
  }

return (
  <div className="emergency-screen">
    <div className="emergency-content">

      <div className="emergency-mode-top">
        <div className="emergency-live-badge">
          緊急モード
        </div>

        <h1>
          落ち着いて、
          <br />
          順番に行動しましょう。
        </h1>

        <p>
          今やることだけを、
          1つずつ案内します。
        </p>
      </div>

      <div className="emergency-alert">
        {action.alert}
      </div>

      <div className="emergency-visual">
        <div className="emergency-person">
          {action.visual}
        </div>
      </div>

      <h1 className="emergency-title">
        {action.title}
      </h1>

      <p className="emergency-text">
        {action.text}
      </p>

      <button
        className="emergency-button"
        onClick={handleNext}
      >
        {isLastStep ? '次の行動へ進む' : action.button}
      </button>

    </div>
  </div>
)
}

export default EmergencyModeScreen