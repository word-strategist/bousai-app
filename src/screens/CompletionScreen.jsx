function CompletionScreen({ onTop }) {
  return (
    <div className="completion-screen">
      <div className="screen-header emergency-header">
        <div className="screen-label">完了</div>
        <h2>ここまでできました</h2>
        <p>まずは安全を確保し、必要な連絡まで完了しました。</p>
      </div>

      <section className="completion-card">
        <div className="completion-icon">✅</div>
        <h3>一旦、落ち着いて大丈夫です</h3>
        <p>
          次は、自治体や気象庁などの公的情報を確認しながら、
          安全な場所で待機してください。
        </p>
      </section>

      <section className="completion-checklist">
        <div>✅ 身の安全を確認</div>
        <div>✅ 避難先を確認</div>
        <div>✅ 家族・周囲へ連絡</div>
        <div>✅ 公的情報を確認</div>
      </section>

      <button className="primary-button" onClick={onTop}>
        ホームへ戻る
      </button>
    </div>
  )
}

export default CompletionScreen