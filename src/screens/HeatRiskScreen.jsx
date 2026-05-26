function HeatRiskScreen({ onBack }) {
  return (
    <div className="danger-screen heat-screen">
      <header className="danger-header">
        <button onClick={onBack}>‹</button>
        <h1>暑さの危険</h1>
        <div />
      </header>

      <main className="danger-body">
        <section className="danger-alert heat-alert">
          <div className="danger-icon">☀</div>
          <p>熱中症の危険があります</p>
        </section>

        <section className="danger-block">
          <h2>危険サイン</h2>

          <div className="danger-item">
            ☀ フラつく
          </div>

          <div className="danger-item">
            ☀ 頭痛
          </div>

          <div className="danger-item">
            ☀ 吐き気
          </div>
        </section>

        <section className="danger-block danger-ok">
          <h2>今すること</h2>

          <div className="danger-item">
            ⭕ 水を飲む
          </div>

          <div className="danger-item">
            ⭕ 日陰へ移動
          </div>

          <div className="danger-item">
            ⭕ 首元を冷やす
          </div>
        </section>

        <button className="danger-main-button heat-button">
          近くの避難場所
        </button>
      </main>
    </div>
  )
}

export default HeatRiskScreen