import { useEffect, useState } from 'react'

import earthquakeAlertImage from '../assets/app/alert/app-alert-earthquake-visual-v1.png'
import bearImage from '../assets/stamps/bear-alert-icon.png'
import heatImage from '../assets/icons/heat.png'

const demoContentMap = {
  earthquake: {
    title: '地震',
    message: '地震の想定です',
    image: earthquakeAlertImage,
    themeClass: 'is-earthquake',
  },
  bear: {
    title: '熊',
    message: '熊を見た想定です',
    image: bearImage,
    themeClass: 'is-bear',
  },
  heat: {
    title: '暑さ',
    message: '暑さによる危険を想定しています',
    image: heatImage,
    themeClass: 'is-heat',
  },
}

export default function LocationCheck({
  onNext,
  onBack,
  skipLoading = false,
}) {
  const [loading, setLoading] = useState(!skipLoading)
  const [selectedRiskKey, setSelectedRiskKey] = useState(null)

  useEffect(() => {
    if (skipLoading) {
      return undefined
    }

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1400)

    return () => clearTimeout(timer)
  }, [skipLoading])

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
          {/* =========================
              Back
          ========================= */}
          <div className="location-back-area">
            <button
              type="button"
              className="location-back-button"
              onClick={onBack}
              aria-label="ホームへ戻る"
            >
              ←
            </button>
          </div>

          {/* =========================
              Demo Selector
          ========================= */}
          <div className="danger-main-area">
            <p className="location-demo-badge">
              デモ版
            </p>

            <h1 className="location-demo-select-title">
              どれを見る？
            </h1>
          </div>

          <div className="danger-bottom-area location-demo-options">
            {Object.entries(demoContentMap).map(([key, content]) => (
              <button
                key={key}
                type="button"
                className={`location-demo-option ${content.themeClass}`}
                onClick={() => setSelectedRiskKey(key)}
                aria-label={`${content.title}の行動案内を見る`}
              >
                <span
                  className="location-demo-option-icon"
                  aria-hidden="true"
                >
                  <img
                    src={content.image}
                    alt=""
                  />
                </span>

                <strong>
                  {content.title}
                </strong>

                <span
                  className="location-demo-option-arrow"
                  aria-hidden="true"
                >
                  ›
                </span>
              </button>
            ))}
          </div>

          {/* =========================
              Demo Notice
          ========================= */}
          <div className="location-demo-notice">
            <span>
              実際の現在地の災害情報とは
              <br />
              連動していません。
            </span>
          </div>
        </div>
      </div>
    )
  }

  const currentContent = demoContentMap[selectedRiskKey]

  return (
    <div className="location-screen">
      <div
        className={`location-card danger-card location-demo-preview ${currentContent.themeClass}`}
      >
        {/* =========================
            Back
        ========================= */}
        <div className="location-back-area">
          <button
            type="button"
            className="location-back-button"
            onClick={() => setSelectedRiskKey(null)}
            aria-label="案内例の選択へ戻る"
          >
            ←
          </button>
        </div>

        {/* =========================
            Preview
        ========================= */}
        <main className="location-demo-preview-main">
          <p className="location-demo-badge">
            デモ版
          </p>

          <h1 className="location-demo-preview-title">
            {currentContent.title}
          </h1>

          <div className="location-demo-preview-visual">
            <img
              src={currentContent.image}
              alt=""
            />
          </div>

          <p className="location-demo-preview-message">
            {currentContent.message}
          </p>
        </main>

        {/* =========================
            Main Action
        ========================= */}
        <div className="location-demo-preview-action">
          <button
            type="button"
            className="primary-button"
            onClick={() => onNext(selectedRiskKey)}
          >
            行動を見る
          </button>
        </div>

        {/* =========================
            Demo Notice
        ========================= */}
        <p className="location-demo-preview-notice">
          実際の現在地の災害情報とは
          <br />
          連動していません。
        </p>
      </div>
    </div>
  )
}