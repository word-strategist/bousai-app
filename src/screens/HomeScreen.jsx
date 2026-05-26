import bearAlertIcon from '../assets/stamps/bear-alert-icon.png'
function HomeScreen({
  selectedDisaster,
  disasters,
  isCheckingLocation,
  onSelectDisaster,
  onStartLocationCheck,
}) {
  const primaryDisaster = selectedDisaster || disasters[0]

  return (
    <div className="home-screen">

      <button className="bear-alert-button">
        <img
          src={bearAlertIcon}
          alt="熊警戒"
          className="bear-alert-icon"
        />

        <span className="bear-alert-text">
          熊を見たら
        </span>
      </button>

      <main className="home-main">
        <section className="location-first-card">
          <div className="location-first-icon">📍</div>

          <p className="home-kicker">現在地から確認</p>

          <h1>今いる場所は安全？</h1>

          <p className="home-lead">
            危険がある時は、<br />
            次の行動だけを大きく表示します。
          </p>

          <button className="primary-button" onClick={onStartLocationCheck}>
            {isCheckingLocation
              ? '現在地を確認中…'
              : '現在地から確認する'}
          </button>
        </section>

        <section className="detected-risk-preview">
          <p className="section-label">危険がある場合</p>

          <div className="risk-preview-card">
            <div className="risk-preview-main">
              <span className="risk-preview-icon">{primaryDisaster.icon}</span>

              <div>
                <p className="risk-preview-label">現在地周辺で注意</p>
                <h2>{primaryDisaster.label}</h2>
                <p>{primaryDisaster.message}</p>
              </div>
            </div>

            <button
              className="emergency-button"
              onClick={() => {
                onSelectDisaster(primaryDisaster)
                onStartLocationCheck()
              }}
            >
              次の行動を見る
            </button>
          </div>
        </section>

        <section className="home-sub-actions">
          <p className="section-label">落ち着いた後に確認</p>

          <div className="home-grid compact">
            <button className="home-menu-card">
              <span>👨‍👩‍👧</span>
              <strong>家族確認</strong>
            </button>

            <button className="home-menu-card">
              <span>🏫</span>
              <strong>避難所</strong>
            </button>

            <button className="home-menu-card">
              <span>📢</span>
              <strong>行政情報</strong>
            </button>

            <button className="home-menu-card">
              <span>🧠</span>
              <strong>備え</strong>
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomeScreen