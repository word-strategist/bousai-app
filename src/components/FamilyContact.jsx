function FamilyContact({ disaster, onBack, onTop }) {
  const messages = {
    earthquake: '地震のため、安全確認をしています。',
    flood: '洪水のおそれがあるため、安全な場所へ移動しています。',
    fire: '火災のため、安全な場所へ避難しています。',
  }

  return (
    <div className="app shelter-screen">
      <div className="shelter-header">
        <button className="back-button" onClick={onBack}>
          ← 戻る
        </button>

        <h1>家族・周囲へ連絡</h1>
        <p>無事を伝え、必要な人に知らせてください</p>
      </div>

      <div className="shelter-content">
        <section className="shelter-card">
          <h2>連絡メッセージ例</h2>
          <p className="contact-message">
            {messages[disaster]}
            <br />
            今いる場所と安全状況を確認してください。
          </p>
        </section>

        <section className="shelter-card">
          <h2>連絡する相手</h2>

          <div className="contact-list">
            <div className="contact-card">家族</div>
            <div className="contact-card">近所の人</div>
            <div className="contact-card">支援が必要な人</div>
            <div className="contact-card">職場・学校</div>
          </div>
        </section>

        <section className="shelter-card emergency-card">
          <h2>緊急時</h2>
          <p>
            命の危険がある場合は、家族連絡よりも先に
            119番・110番・自治体の指示を優先してください。
          </p>
        </section>

        <button className="primary-return" onClick={onTop}>
          TOPへ戻る
        </button>
      </div>
    </div>
  )
}

export default FamilyContact