function CompletionScreen({ onTop }) {
  return (
    <div className="completion-screen">
      <header className="completion-header">
        <p className="completion-badge">
          デモ終了
        </p>

        <h1>
          地震時の行動案内は
          <br />
          ここまでです
        </h1>

        <p className="completion-lead">
          実際の災害時は、
          <br />
          公的機関の最新情報を確認してください
        </p>
      </header>

      <main className="completion-main">
        <section className="completion-status-card">
          <div
            className="completion-status-icon"
            aria-hidden="true"
          >
            i
          </div>

          <h2>最新情報を確認する</h2>

          <p>
            自治体、気象庁、消防、警察などの
            公的機関が発信する情報を確認してください。
          </p>
        </section>

        <section className="completion-demo-note">
          <h2>この画面について</h2>

          <p>
            これは疑似情報を使用したデモです。
            実際の緊急地震速報や災害情報とは
            連動していません。
          </p>
        </section>

        <button
          className="completion-home-button"
          type="button"
          onClick={onTop}
        >
          TOPへ戻る
        </button>
      </main>
    </div>
  )
}

export default CompletionScreen
