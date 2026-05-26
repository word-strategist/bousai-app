import { useEffect, useState } from 'react'
import protectHeadImage from '../assets/stamps/action-protect-head.png'

export default function LocationCheck({ riskData, onNext, onBack }) {
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
            危険情報を確認しています
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="location-screen">
      <div className="location-card danger-card">
        <div className="location-back-area">
          <button className="location-back-button" onClick={onBack}>
            ← 戻る
          </button>
        </div>

        <p className="location-label">
          現在地周辺で注意
        </p>

        <h1 className="danger-title">
          強い揺れに注意
        </h1>

        <div className="danger-illustration-box">
          <img
            src={protectHeadImage}
            alt="頭を守る"
            className="danger-illustration"
          />
        </div>

        <div className="danger-bottom-area">
          <p className="danger-action">
            頭を守る
          </p>

          <button className="primary-button" onClick={onNext}>
            次の行動を見る
          </button>
        </div>

      </div>
    </div>
  )
}