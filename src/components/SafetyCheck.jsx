function SafetyCheck({
  disaster,
  onBack,
  onTop,
}) {
  const checks = {
    earthquake: [
      '頭を守った',
      '揺れがおさまった',
      '火元を確認した',
      '出口を確認した',
      '周囲の落下物を確認した',
    ],

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

  const currentChecks =
    checks[disaster] || checks.earthquake

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
          安全確認
        </p>

        <h1>
          落ち着いて、
          <br />
          安全を確認しましょう
        </h1>

        <p className="safety-check-lead">
          危険がないか、
          <br />
          順番に確認してください
        </p>
      </header>

      <main className="safety-check-main">
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
      </main>
    </div>
  )
}

export default SafetyCheck