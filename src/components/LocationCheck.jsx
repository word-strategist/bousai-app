import { useEffect, useState } from 'react'

export default function LocationCheck({ riskData, onNext, onBack }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="location-screen">
        <div className="location-card loading-card">
          <div className="gps-loader">📍</div>

          <h2 className="gps-loading-title">
            現在地を確認しています…
          </h2>

          <p className="gps-loading-text">
            周辺地域の災害リスクを確認中です
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="location-screen">
      <div className="location-card">
        <div className="location-back-area">
          <button className="location-back-button" onClick={onBack}>
            ← 戻る
          </button>
        </div>

        <div className="location-icon">📍</div>

        <p className="location-label">
          現在地から危険度を確認しました
        </p>

        <h2 className="location-title">
        {riskData.disaster.name}リスクが{riskData.riskLevel}地域です
        </h2>

        <p className="location-text">
          この地域で今、注意したい災害リスクをもとに、
          次に取るべき行動を案内します。
        </p>

        <div className="reason-box">
            <p className="reason-title">判定理由</p>
            <p className="reason-text">
                現在地周辺で、避難情報と浸水リスクを確認しました。
            </p>
            </div>

        <div className="risk-box">
          <div className="risk-row danger">
            <span>今いちばん注意</span>
            <strong>洪水</strong>
          </div>

          <div className="risk-row warning">
            <span>あわせて注意</span>
            <strong>地震</strong>
          </div>

          <div className="risk-row normal">
            <span>現在は通常</span>
            <strong>火災</strong>
          </div>
        </div>

        <button className="primary-button" onClick={onNext}>
          今の状況でやることを見る
        </button>
      </div>
    </div>
  )
}