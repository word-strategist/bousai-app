function ShelterGuide({ disaster, onBack, onNext }) {
  const guides = {
    earthquake: {
      title: '避難先を確認',
      color: 'orange',
      locationAdvice: '倒壊・落下物の危険がある場所から離れてください',
    },

    flood: {
      title: '避難先を確認',
      color: 'blue',
      locationAdvice: '川・用水路・低い場所からすぐに離れてください',
    },

    fire: {
      title: '避難先を確認',
      color: 'red',
      locationAdvice: '煙と炎から離れ、風上側へ避難してください',
    },
  }

  const current = guides[disaster] || guides.earthquake

  return (
    <div className="app shelter-screen">
      <div className={`shelter-header ${current.color}`}>
        <button className="back-button" type="button" onClick={onBack}>
          ← 戻る
        </button>

        <h1>{current.title}</h1>
        <p>{current.locationAdvice}</p>
      </div>

      <div className="shelter-content">
        <section className="shelter-card">
          <h2>現在地付近</h2>
          <p className="location-large">岡山県真庭市付近</p>
          <span>※ GPS連動は後で実装予定</span>
        </section>

        <section className="shelter-card map-card">
          <h2>近くの避難所</h2>

          <a
            className="map-open-button"
            href="https://www.google.com/maps/search/?api=1&query=避難所"
            target="_blank"
            rel="noreferrer"
          >
            地図で開く
          </a>
        </section>

        <button
          className="primary-return"
          type="button"
          onClick={onNext}
        >
          安全確認へ進む
        </button>
      </div>
    </div>
  )
}

export default ShelterGuide