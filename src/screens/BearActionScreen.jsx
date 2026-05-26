function BearActionScreen({ onBack }) {
  return (
    <div className="danger-screen bear-screen">
      <header className="danger-header">
        <button onClick={onBack}>‹</button>
        <h1>熊を見たら</h1>
        <div />
      </header>

      <main className="danger-body">
        <section className="danger-alert">
          <div className="danger-icon">🐻</div>
          <p>走らず、落ち着いて離れる</p>
        </section>

        <section className="danger-block danger-ng">
          <h2>やってはいけない</h2>

          <div className="danger-item">
            ❌ 走って逃げる
          </div>

          <div className="danger-item">
            ❌ 背中を向ける
          </div>

          <div className="danger-item">
            ❌ 近づいて撮影
          </div>
        </section>

        <section className="danger-block danger-ok">
          <h2>今すること</h2>

          <div className="danger-item">
            ⭕ ゆっくり離れる
          </div>

          <div className="danger-item">
            ⭕ 子どもを後ろへ
          </div>

          <div className="danger-item">
            ⭕ 落ち着いて行動
          </div>
        </section>

        <button className="danger-main-button">
          現在地を通報
        </button>
      </main>
    </div>
  )
}

export default BearActionScreen