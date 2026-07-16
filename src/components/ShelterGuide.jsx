function ShelterGuide({
  disaster,
  location,
  onBack,
  onNext,
}) {
  const guides = {
    earthquake: {
      title: '避難所を確認',
      label: '地震',
      advice: '倒壊や落下物に注意して移動してください',
      themeClass: 'is-earthquake',
    },

    flood: {
      title: '避難所を確認',
      label: '洪水',
      advice: '川や低い場所から離れてください',
      themeClass: 'is-flood',
    },

    fire: {
      title: '避難所を確認',
      label: '火災',
      advice: '煙と炎から離れてください',
      themeClass: 'is-fire',
    },
  }

  const current =
    guides[disaster] || guides.earthquake

  const mapUrl = location
    ? `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=避難所&travelmode=walking`
    : 'https://www.google.com/maps/search/?api=1&query=避難所'

  return (
    <div className={`shelter-guide-screen ${current.themeClass}`}>
      <header className="shelter-guide-header">
        <button
          className="shelter-guide-back"
          type="button"
          onClick={onBack}
        >
          ← 戻る
        </button>

        <p className="shelter-guide-label">
          {current.label}
        </p>

        <h1>{current.title}</h1>
      </header>

      <main className="shelter-guide-main">
        <section className="shelter-location-card">
          <p className="shelter-location-label">
            現在地
          </p>

          <h2>
            {location
              ? 'GPS取得済み'
              : '現在地未取得'}
          </h2>

          <p>
            {location
              ? '現在地から近くの避難所を確認できます'
              : '現在地周辺の避難所を検索します'}
          </p>
        </section>

        <section className="shelter-map-card">
          <div className="shelter-map-icon" aria-hidden="true">
            ⌖
          </div>

          <h2>近くの避難所</h2>

          <p>{current.advice}</p>

          <a
            className="shelter-map-button"
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            Google Mapsで確認
          </a>
        </section>

        <button
          className="shelter-next-button"
          type="button"
          onClick={onNext}
        >
          安全確認へ進む
        </button>
      </main>
    </div>
  )
}

export default ShelterGuide