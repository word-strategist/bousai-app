import { useEffect, useState } from 'react'

import earthquakeAlertImage from '../assets/app/alert/app-alert-earthquake-visual-v1.png'
import bearImage from '../assets/stamps/bear-alert-icon.png'
import heatImage from '../assets/icons/heat.png'

const demoContentMap = {
  earthquake: {
    title: '地震',
    description: '地震が起きた想定の案内を見る',
    messageTop: '地震が起きた想定です',
    messageBottom: '次の行動を確認します',
    image: earthquakeAlertImage,
    themeClass: 'is-earthquake',
  },
  bear: {
    title: '熊',
    description: '熊を見かけた想定の案内を見る',
    messageTop: '熊を見かけた想定です',
    messageBottom: '次の行動を確認します',
    image: bearImage,
    themeClass: 'is-bear',
  },
  heat: {
    title: '暑さ',
    description: '暑さによる危険を想定した案内を見る',
    messageTop: '暑さによる危険がある想定です',
    messageBottom: '次の行動を確認します',
    image: heatImage,
    themeClass: 'is-heat',
  },
}

export default function LocationCheck({
  onNext,
  onBack,
}) {
  const [loading, setLoading] = useState(true)
  const [selectedRiskKey, setSelectedRiskKey] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1400)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="location-screen">
        <div className="location-card loading-card">
          <div className="gps-loader">📍</div>

          <h2 className="gps-loading-title">
            現在地を確認中…
          </h2>

          <p className="gps-loading-text">
            位置情報を確認しています
          </p>
        </div>
      </div>
    )
  }

  if (!selectedRiskKey) {
    return (
      <div className="location-screen">
        <div className="location-card danger-card location-demo-select">
          <div className="location-back-area">
            <button
              type="button"
              className="location-back-button"
              onClick={onBack}
            >
              ← 戻る
            </button>
          </div>

          <div className="danger-main-area">
            <p className="location-label">
              現在地確認デモ
            </p>

            <h1 className="location-demo-select-title">
              案内例を選ぶ
            </h1>

            <p className="danger-message">
              位置情報の確認後に表示される
              <br />
              案内例を選んでください
            </p>

            <p className="home-demo-notice">
              これはデモ表示です。
              実際の現在地の災害情報とは連動していません。
            </p>
          </div>

          <div className="danger-bottom-area">
            {Object.entries(demoContentMap).map(([key, content]) => (
              <button
                key={key}
                type="button"
                className="location-demo-option"
                onClick={() => setSelectedRiskKey(key)}
              >
                {content.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const currentContent = demoContentMap[selectedRiskKey]

  return (
    <div className="location-screen">
      <div
        className={`location-card danger-card ${currentContent.themeClass}`}
      >
        <div className="location-back-area">
          <button
            type="button"
            className="location-back-button"
            onClick={() => setSelectedRiskKey(null)}
          >
            ← 戻る
          </button>
        </div>

        <div className="danger-main-area">
          <p className="location-label">
            デモ表示
          </p>

          <h1 className="danger-title">
            {currentContent.title}
          </h1>

          <div className="danger-illustration-box">
            <img
              src={currentContent.image}
              alt=""
              className="danger-illustration"
            />
          </div>

          <p className="danger-message">
            {currentContent.messageTop}
            <br />
            {currentContent.messageBottom}
          </p>

          <p className="home-demo-notice">
            実際の現在地の災害情報とは連動していません。
          </p>
        </div>

        <div className="danger-bottom-area">
          <button
            type="button"
            className="primary-button"
            onClick={() => onNext(selectedRiskKey)}
          >
            次の行動を見る
          </button>
        </div>
      </div>
    </div>
  )
}