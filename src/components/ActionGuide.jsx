function ActionGuide({ disaster, onBack }) {
  const guides = {
    earthquake: {
      title: '地震',
      color: 'orange',
      ng: {
        icon: '🚫',
        title: '外へ飛び出す',
        text: '落下物で危険です',
      },
      ok: {
        icon: '⭕',
        title: '机の下へ',
        text: '頭を守ってください',
      },
    },

    flood: {
      title: '洪水',
      color: 'blue',
      ng: {
        icon: '🚫',
        title: '用水路を見に行く',
        text: '増水で流されます',
      },
      ok: {
        icon: '⭕',
        title: '高い場所へ',
        text: '浸水から離れてください',
      },
    },

    fire: {
      title: '火災',
      color: 'red',
      ng: {
        icon: '🚫',
        title: '荷物を取りに戻る',
        text: '逃げ遅れます',
      },
      ok: {
        icon: '⭕',
        title: '煙から離れる',
        text: '低い姿勢で避難',
      },
    },
  }

  const current = guides[disaster]

  return (
    <div className="action-screen">
      <div className={`action-header ${current.color}`}>
        <button className="back-button" onClick={onBack}>
          ← 戻る
        </button>

        <h1>{current.title}の行動ガイド</h1>

        <p>迷わず行動してください</p>
      </div>

      <div className="action-content">
        <div className="big-alert">
          ⚠️ 今すぐ確認してください
        </div>

        <div className="stamp-grid">
          <div className="stamp-card ng">
            <div className="stamp-icon">
              {current.ng.icon}
            </div>

            <h2>{current.ng.title}</h2>

            <p>{current.ng.text}</p>
          </div>

          <div className="stamp-card ok">
            <div className="stamp-icon">
              {current.ok.icon}
            </div>

            <h2>{current.ok.title}</h2>

            <p>{current.ok.text}</p>
          </div>
        </div>

        <div className="next-guide">
          次に、
          <strong>避難場所・安全情報</strong>
          を確認してください
        </div>

        <button className="safe-button">
          避難場所を確認する
        </button>
      </div>
    </div>
  )
}

export default ActionGuide