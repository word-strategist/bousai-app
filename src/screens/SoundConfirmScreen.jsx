const soundMessages = {
  bear: {
    title: '熊対策音',
    message: '熊に近づかないよう知らせるための試作機能です。',
    button: '音を鳴らす',
  },
  heat: {
    title: '助けてコール',
    message: '声が出せない時に、周囲へ助けを知らせます。',
    button: '助けてコール',
  },
}

function SoundConfirmScreen({ type, onBack }) {
  const current = soundMessages[type] || soundMessages.bear

  const handleSound = () => {
    window.alert('試作：ここで音を鳴らします')
  }

  return (
    <div className="danger-screen sound-screen">
      <header className="danger-header">
        <button type="button" onClick={onBack}>‹</button>
        <h1>音の確認</h1>
        <div />
      </header>

      <main className="sound-main">
        <section className="sound-card">
          <div className="sound-mark">🔊</div>

          <h2>{current.title}</h2>

          <p>{current.message}</p>

          <div className="sound-warning">
            誤作動防止のため、確認してから音を鳴らします。
          </div>
        </section>

        <button
          className="sound-start-button"
          type="button"
          onClick={handleSound}
        >
          {current.button}
        </button>

        <button
          className="sound-cancel-button"
          type="button"
          onClick={onBack}
        >
          やめる
        </button>
      </main>
    </div>
  )
}

export default SoundConfirmScreen