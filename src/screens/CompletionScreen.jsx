function CompletionScreen({ onTop }) {
  return (
    <div className="completion-screen">
      {/* =========================
          完了画面ヘッダー
      ========================= */}
      <header className="completion-header">
        <p className="completion-badge">
          デモ終了
        </p>

        <h1>
          ここまでです
        </h1>
      </header>

      {/* =========================
          完了画面メイン
      ========================= */}
      <main className="completion-main">
        {/* =========================
            公的機関の防災情報
        ========================= */}
          <a
            className="completion-official-link"
            href="https://www.jma.go.jp/bosai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>公的な情報を見る</span>
            <span aria-hidden="true">↗</span>
          </a>

        {/* =========================
            デモ版の説明
        ========================= */}
        <section className="completion-demo-note">
          <p>
            これはデモです。
            <br />
            実際の災害情報とは連動していません。
          </p>
        </section>

        {/* =========================
            TOPへ戻る
        ========================= */}
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