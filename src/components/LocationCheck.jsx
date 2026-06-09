import { useEffect, useState } from 'react'

import protectHeadImage from '../assets/stamps/action-protect-head.png'
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

  const illustrationMap = {
    earthquake: protectHeadImage,
    flood: floodImage,
    fire: fireImage,
    bear: bearImage,
    heat: heatImage,
  }

  const currentImage =
    illustrationMap[riskData?.disaster?.key] ||
    protectHeadImage

  return (
    <div className="location-screen">
      <div className="location-card danger-card">
        <div className="location-back-area">
          <button
            className="location-back-button"
            onClick={onBack}
          >
            ← 戻る
          </button>
        </div>

        <p className="location-label">
          {riskData?.areaName || '現在地周辺'}で注意
        </p>

        <h1 className="danger-title">
          {riskData?.disaster?.name || '危険'}に注意
        </h1>

        <div className="danger-illustration-box">
          <img
            src={currentImage}
            alt="危険時の行動"
            className="danger-illustration"
          />
        </div>

        <div className="danger-bottom-area">
          <p className="danger-action">
            次の行動へ進む
          </p>

          <button
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