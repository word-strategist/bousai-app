function ShelterGuide({ disaster, location, onBack, onNext }) {
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

  const mapUrl = location
    ? `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=避難所&travelmode=walking`
    : 'https://www.google.com/maps/search/?api=1&query=避難所'

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

          {location ? (
            <>
              <p className="location-large">GPS取得済み</p>
              <span>現在地から避難所までの経路を開けます</span>
            </>
          ) : (
            <>
              <p className="location-large">現在地未取得</p>
              <span>地図検索で近くの避難所を確認します</span>
            </>
          )}
        </section>

        <section className="shelter-card map-card">
          <h2>近くの避難所</h2>

          <a
            className="map-open-button"
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            Google Mapsで経路を見る
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