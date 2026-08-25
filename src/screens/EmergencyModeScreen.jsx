import protectHeadImage from '../assets/stamps/action-protect-head.png'

import '../styles/emergency.css'

function EmergencyModeScreen({ onBack, onComplete }) {
  return (
    <div className="emergency-screen">
      {/* =========================
          Header
      ========================= */}
      <header className="emergency-header">
        <button
          type="button"
          className="emergency-back"
          onClick={onBack}
          aria-label="TOPへ戻る"
        >
          ‹
        </button>

        <p>地震時の行動案内</p>

        <span aria-hidden="true" />
      </header>

      {/* =========================
          Main Action
      ========================= */}
      <main className="emergency-main">
          <div className="emergency-status">
            <span>デモ表示</span>
            <strong className="emergency-step-count">
              1/3
            </strong>
          </div>

          <p className="emergency-situation-text">
            地震が起きた想定です
          </p>

        <section className="emergency-action-card">
          <p className="emergency-step-label">
            まず、今すること
          </p>

          <h1>頭を守る</h1>

          <div className="emergency-action-visual">
            <img src={protectHeadImage} alt="" />
          </div>

          <p className="emergency-action-message">
            頭を守り、
            <br />
            安全な姿勢をとる
          </p>
        </section>

        <button
          className="emergency-button"
          type="button"
          onClick={onComplete}
        >
          揺れがおさまるまで待つ
        </button>

        <p className="emergency-demo-note">
          これは疑似情報を使用したデモです。
          <br />
          実際の緊急地震速報や災害情報とは
          連動していません。
        </p>
      </main>
    </div>
  )
}

export default EmergencyModeScreen
