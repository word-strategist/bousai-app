function CompletionScreen({ onTop }) {
  const completedActions = [
    '身の安全を確認',
    '避難先を確認',
    '家族・周囲へ連絡',
    '公的情報を確認',
  ]

  return (
    <div className="completion-screen">
      <header className="completion-header">
        <p className="completion-badge">
          完了
        </p>

        <h1>ここまでできました</h1>

        <p className="completion-lead">
          安全の確保と、
          <br />
          必要な連絡まで完了しました
        </p>
      </header>

      <main className="completion-main">
        <section className="completion-status-card">
          <div
            className="completion-status-icon"
            aria-hidden="true"
          >
            ✓
          </div>

          <h2>安全な場所で待機してください</h2>

          <p>
            自治体や気象庁などの公的情報を確認しながら、
            周囲の安全に注意してください。
          </p>
        </section>

        <section className="completion-actions-card">
          <h2>ここまでの行動</h2>

          <div className="completion-action-list">
            {completedActions.map((action) => (
              <div
                className="completion-action-item"
                key={action}
              >
                <span aria-hidden="true">✓</span>
                <p>{action}</p>
              </div>
            ))}
          </div>
        </section>

        <button
          className="completion-home-button"
          type="button"
          onClick={onTop}
        >
          ホームへ戻る
        </button>
      </main>
    </div>
  )
}

export default CompletionScreen