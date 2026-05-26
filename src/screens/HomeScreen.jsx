import bearAlertIcon from '../assets/stamps/bear-alert-white.png'
function HomeScreen({ onStartLocationCheck, onSelectDisaster }) {
  return (
    <div className="home-screen">
      <header className="home-top">
        <p>危険行動誘導アプリ</p>
        <button type="button" aria-label="設定">⚙</button>
      </header>

      <main className="home-body">
        <section className="home-title-area">
          <div className="home-shield">✓</div>
          <h1>
            今いる場所、<br />
            安全を確認する
          </h1>
        </section>

        <section className="home-main-actions">
          <button className="main-action blue" type="button" onClick={onStartLocationCheck}>
            <span className="action-mark location-mark"></span>
            <span className="action-copy">
              <strong>現在地を確認</strong>
              <small>今いる場所の危険を確認する</small>
            </span>
            <span className="action-arrow">›</span>
          </button>

          <button
            className="main-action orange"
            type="button"
            onClick={() => onSelectDisaster?.({ key: 'bear', label: '熊', title: '熊を見たら' })}
          >
            <span className="action-mark bear-mark">
              <img src={bearAlertIcon} alt="" />
            </span>
            <span className="action-copy">
              <strong>熊を見たら</strong>
              <small>すぐにとるべき行動を表示</small>
            </span>
            <span className="action-arrow">›</span>
          </button>

          <button
            className="main-action yellow"
            type="button"
            onClick={() => onSelectDisaster?.({ key: 'heat', label: '暑さ', title: '暑さの危険' })}
          >
            <span className="action-mark sun-mark"></span>
            <span className="action-copy">
              <strong>暑さの危険</strong>
              <small>熱中症の危険を確認する</small>
            </span>
            <span className="action-arrow">›</span>
          </button>
        </section>

        <section className="home-sub-actions">
          <div className="sub-heading">
            <span></span>
            <p>落ち着いた後に使う機能</p>
            <span></span>
          </div>

          <div className="sub-grid">
            <button type="button"><span>👥</span><strong>家族確認</strong></button>
            <button type="button"><span>⌂</span><strong>避難所</strong></button>
            <button type="button"><span>📣</span><strong>行政情報</strong></button>
            <button type="button"><span>▣</span><strong>備え</strong></button>
          </div>
        </section>
      </main>

      <footer className="home-menu-bar">
        <span>⌂</span>
        <strong>ホーム</strong>
        <span>⚙</span>
      </footer>
    </div>
  )
}

export default HomeScreen