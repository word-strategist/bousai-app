function FamilyContact({
  disaster,
  onBack,
  onNext,
}) {
  const messages = {
    earthquake: '地震のため、安全確認をしています。',
    flood: '洪水のおそれがあるため、安全な場所へ移動しています。',
    fire: '火災のため、安全な場所へ避難しています。',
  }

  const currentMessage =
    messages[disaster] || messages.earthquake

  const contacts = [
    '家族',
    '近所の人',
    '支援が必要な人',
    '職場・学校',
  ]

  return (
    <div className="family-contact-screen">
      <header className="family-contact-header">
        <button
          className="family-contact-back"
          type="button"
          onClick={onBack}
        >
          ← 戻る
        </button>

        <p className="family-contact-badge">
          安否連絡
        </p>

        <h1>無事を知らせる</h1>

        <p className="family-contact-lead">
          家族や周囲へ
          <br />
          状況を伝えてください
        </p>
      </header>

      <main className="family-contact-main">
        <section className="family-message-card">
          <p className="family-section-label">
            連絡メッセージ例
          </p>

          <p className="family-message-text">
            {currentMessage}
            <br />
            今いる場所と安全状況を伝えます。
          </p>
        </section>

        <section className="family-recipient-card">
          <h2>連絡する相手</h2>

          <div className="family-recipient-list">
            {contacts.map((contact) => (
              <div
                className="family-recipient-item"
                key={contact}
              >
                {contact}
              </div>
            ))}
          </div>
        </section>

        <section className="family-emergency-note">
          <h2>命の危険があるとき</h2>

          <p>
            家族への連絡より先に、
            119番・110番・自治体の指示を
            優先してください。
          </p>
        </section>

        <button
          className="family-contact-next"
          type="button"
          onClick={onNext}
        >
          完了へ進む
        </button>
      </main>
    </div>
  )
}

export default FamilyContact