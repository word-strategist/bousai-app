import { useEffect, useState } from 'react'

import earthquakeAlertImage from '../assets/app/alert/app-alert-earthquake-visual-v1.png'
import bearImage from '../assets/stamps/bear-alert-icon.png'
import fireImage from '../assets/stamps/fire-evacuate.png'
import floodImage from '../assets/stamps/flood-evacuate.png'
import heatImage from '../assets/icons/heat.png'

export default function LocationCheck({
  riskData,
  onNext,
  onBack,
}) {
  const [loading, setLoading] = useState(true)

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
            周辺の危険情報を確認しています
          </p>
        </div>
      </div>
    )
  }

  const riskKey = riskData?.disaster?.key || 'earthquake'
  const areaName = riskData?.areaName || '現在地周辺'

  const contentMap = {
    earthquake: {
      title: '地震',
      messageTop: '今いる場所に',
      messageBottom: '地震の危険があります',
      image: earthquakeAlertImage,
      themeClass: 'is-earthquake',
    },
    flood: {
      title: '洪水',
      messageTop: '今いる場所に',
      messageBottom: '洪水の危険があります',
      image: floodImage,
      themeClass: 'is-flood',
    },
    fire: {
      title: '火災',
      messageTop: '今いる場所に',
      messageBottom: '火災の危険があります',
      image: fireImage,
      themeClass: 'is-fire',
    },
    bear: {
      title: '熊',
      messageTop: '今いる場所に',
      messageBottom: '熊出没の危険があります',
      image: bearImage,
      themeClass: 'is-bear',
    },
    heat: {
      title: '暑さ',
      messageTop: '今いる場所に',
      messageBottom: '暑さの危険があります',
      image: heatImage,
      themeClass: 'is-heat',
    },
  }

  const currentContent =
    contentMap[riskKey] || contentMap.earthquake

  return (
    <div className="location-screen">
      <div className={`location-card danger-card ${currentContent.themeClass}`}>
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
            {areaName}
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
        </div>

        <div className="danger-bottom-area">
          <button
            type="button"
            className="primary-button"
            onClick={onNext}
          >
            次の行動を見る
          </button>
        </div>
      </div>
    </div>
  )
}