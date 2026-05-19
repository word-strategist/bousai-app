function HomeScreen({
  selectedDisaster,
  disasters,
  onSelectDisaster,
  onStartLocationCheck,
}) {
  return (
    <div className="home-screen">
      <header className="home-hero">
        <div>
          <p className="home-kicker">今日の防災</p>
          <h1>防災ナビ</h1>
          <p>
            ふだんは少しずつ備える。<br />
            いざという時は、迷わず行動する。
          </p>
        </div>
      </header>

      <main className="home-main">
        <section className="daily-card">
          <div>
            <p className="section-label">今日の防災ミッション</p>
            <h2>玄関の近くに靴はありますか？</h2>
            <p>避難時に足を守るため、今すぐ確認しましょう。</p>
          </div>
          <button className="primary-button">確認した</button>
        </section>

        <section className="home-grid">
          <button className="home-menu-card">
            <span>🧠</span>
            <strong>3秒クイズ</strong>
            <small>防災判断を練習</small>
          </button>

          <button className="home-menu-card">
            <span>🖼️</span>
            <strong>防災スタンプ</strong>
            <small>行動を絵で覚える</small>
          </button>

          <button className="home-menu-card">
            <span>👨‍👩‍👧</span>
            <strong>家族確認</strong>
            <small>連絡先を確認</small>
          </button>

          <button className="home-menu-card" onClick={onStartLocationCheck}>
            <span>📍</span>
            <strong>現在地確認</strong>
            <small>今いる場所を確認</small>
          </button>
        </section>

<section className="emergency-entry">
  <div className="emergency-entry-header">
    <span className="emergency-badge">緊急時</span>
    <div>
      <h2>災害が起きた時はこちら</h2>
      <p>今やることを、順番に案内します。</p>
    </div>
  </div>

    <div className="disaster-select">
        {disasters.map((disaster) => (
        <button
            key={disaster.id}
            className={
            selectedDisaster === disaster.id
                ? "disaster-chip active"
                : "disaster-chip"
            }
            onClick={() => onSelectDisaster(disaster.id)}
        >
            {disaster.label}
        </button>
        ))}
    </div>

    <button className="emergency-button" onClick={onStartLocationCheck}>
        緊急モードを開始
    </button>
    </section>
      </main>
    </div>
  );
}

export default HomeScreen;