function NextAction({ disaster, onBack, onShelter }) {
  const actions = {
    earthquake: {
      title: '地震の次にやること',
      color: 'orange',
      steps: [
        'まず頭を守る',
        '揺れがおさまるまで動かない',
        '火元・出口を確認する',
        '危険なら避難場所へ移動する',
      ],
      warning: 'ブロック塀・看板・ガラスの近くには行かないでください',
    },

    flood: {
      title: '洪水の次にやること',
      color: 'blue',
      steps: [
        '低い場所から離れる',
        '川・用水路に近づかない',
        '早めに高い場所へ移動する',
        '避難場所・避難経路を確認する',
      ],
      warning: '水が見えてからの移動は危険です。早めに動いてください',
    },

    fire: {
      title: '火災の次にやること',
      color: 'red',
      steps: [
        '煙を吸わないよう低く動く',
        '戻らず外へ避難する',
        '周囲に火災を知らせる',
        '安全な場所から119番する',
      ],
      warning: '荷物を取りに戻らないでください。命を優先してください',
    },
  }

  const current = actions[disaster]

  return (
    <div className="next-action-screen">
      <div className={`action-header ${current.color}`}>
        <button className="back-button" onClick={onBack}>
          ← 戻る
        </button>

        <h1>{current.title}</h1>
        <p>順番に確認してください</p>
      </div>

      <div className="next-action-content">
        <div className="warning-box">
          ⚠️ {current.warning}
        </div>

        <div className="step-list">
          {current.steps.map((step, index) => (
            <div className="step-card" key={step}>
              <div className="step-number">{index + 1}</div>
              <p>{step}</p>
            </div>
          ))}
        </div>

        <button className="safe-button" onClick={onShelter}>
          避難先を確認する
        </button>
      </div>
    </div>
  )
}

export default NextAction