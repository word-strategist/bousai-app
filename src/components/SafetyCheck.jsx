function SafetyCheck({ disaster, onBack, onTop }) {
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

  const currentChecks = checks[disaster]

  return (
    <div className="app shelter-screen">
      <div className="shelter-header">
        <button className="back-button" onClick={onBack}>
          ← 戻る
        </button>

        <h1>安全確認チェック</h1>

        <p>
            <p>
            1つずつ確認してください
            </p>
        </p>
      </div>

      <div className="shelter-content">
        <div className="warning-box">
          ⚠️ 確認できたらチェック
        </div>

        <div className="check-list">
          {currentChecks.map((check) => (
            <label className="check-card" key={check}>
              <input type="checkbox" />
              <span>{check}</span>
            </label>
          ))}
        </div>

        <button
            className="primary-return"
            onClick={() => onTop('contact')}
        >
            家族・周囲へ連絡する
        </button>
      </div>
    </div>
  )
}

export default SafetyCheck