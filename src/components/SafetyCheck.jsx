function SafetyCheck({
  disaster,
  onBack,
  onTop,
}) {
  const isEarthquakeDemo = disaster === 'earthquake'

  const earthquakeGuides = [
    'けがはない？',
    '落ちてくるものはない？',
    '火や煙はない？',
    '危険な場所から離れる',
  ]

  const checks = {
    flood: [
      '低い場所から離れた',
      '川・用水路へ近づいていない',
      '避難経路を確認した',
      '高い場所へ移動できる',
      '冠水道路へ入っていない',
    ],
    fire: [
      '煙を吸っていない',
      '安全な場所へ移動した',
      '荷物を取りに戻っていない',
      '周囲へ知らせた',
      '119番できる状態',
    ],
  }

  const currentChecks = checks[disaster] || []

  return (
    <div className="safety-check-screen">
      <header className="safety-check-header">
        <button
          className="safety-check-back"
          type="button"
          onClick={onBack}
        >
          ← 戻る
        </button>

        <p className="safety-phase-badge">
          {isEarthquakeDemo ? 'デモ表示' : '安全確認'}
        </p>

        <h1>
          {isEarthquakeDemo ? (
            <>
              安全を確認する
            </>
          ) : (
            <>
              落ち着いて、
              <br />
              安全を確認しましょう
            </>
          )}
        </h1>

        {!isEarthquakeDemo ? (
          <p className="safety-check-lead">
            危険がないか、
            <br />
            順番に確認してください
          </p>
        ) : null}
      </header>

      <main className="safety-check-main">
        {isEarthquakeDemo ? (
          <>

            <div className="safety-guide-list">
              {earthquakeGuides.map((guide, index) => (
                <div
                  className="safety-guide-item"
                  key={guide}
                >
                  <span aria-hidden="true">
                    {index + 1}
                  </span>
                  <p>{guide}</p>
                </div>
              ))}
            </div>

            <button
              className="safety-check-next"
              type="button"
              onClick={() => onTop('completion')}
            >
              最新情報を見る
            </button>

            <p className="safety-check-demo-note">
              これはデモです。実際の災害情報とは
              連動していません。
            </p>
          </>
        ) : (
          <>
            <p className="safety-check-guide">
              確認できた項目にチェック
            </p>

            <div className="safety-check-list">
              {currentChecks.map((check) => (
                <label
                  className="safety-check-item"
                  key={check}
                >
                  <input type="checkbox" />
                  <span>{check}</span>
                </label>
              ))}
            </div>

            <button
              className="safety-check-next"
              type="button"
              onClick={() => onTop('contact')}
            >
              家族・周囲へ連絡する
            </button>
          </>
        )}
      </main>
    </div>
  )
}

export default SafetyCheck
