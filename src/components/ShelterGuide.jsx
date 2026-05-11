function ShelterGuide({ disaster, onBack, onTop }) {
  const guides = {
    earthquake: {
      title: '地震の避難場所・安全情報',
      color: 'orange',
      locationAdvice: '倒壊・落下物の危険がある場所から離れてください',
      shelters: [
        {
          name: '広い公園・学校のグラウンド',
          text: '建物やブロック塀から離れて待機します',
        },
        {
          name: '指定緊急避難場所',
          text: '自治体が指定する地震時の避難場所を確認します',
        },
      ],
      checks: [
        '建物のひび割れ・傾きがないか',
        '火災・ガス漏れの危険がないか',
        '家族や近隣の安全確認',
      ],
    },

    flood: {
      title: '洪水の避難場所・安全情報',
      color: 'blue',
      locationAdvice: '川・用水路・低い場所からすぐに離れてください',
      shelters: [
        {
          name: '高台・浸水しにくい建物',
          text: '水が来る前に早めに移動します',
        },
        {
          name: '洪水対応の指定避難所',
          text: '浸水想定区域外の避難先を確認します',
        },
      ],
      checks: [
        '川や用水路には近づかない',
        '車で冠水道路に入らない',
        '避難が難しい場合は上階へ移動',
      ],
    },

    fire: {
      title: '火災の避難場所・安全情報',
      color: 'red',
      locationAdvice: '煙と炎から離れ、風上側へ避難してください',
      shelters: [
        {
          name: '火元から離れた屋外の安全地帯',
          text: '煙を吸わない場所まで離れます',
        },
        {
          name: '近くの広い場所',
          text: '消防活動の妨げにならない場所で待機します',
        },
      ],
      checks: [
        '荷物を取りに戻らない',
        '煙を吸わないよう低い姿勢で移動',
        '安全な場所から119番する',
      ],
    },
  }

  const current = guides[disaster]

  return (
    <div className="app shelter-screen">
      <div className={`shelter-header ${current.color}`}>
        <button className="back-button" onClick={onBack}>
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

        <section className="shelter-card">
          <h2>避難先候補</h2>

          {current.shelters.map((shelter) => (
            <div className="shelter-place" key={shelter.name}>
              <strong>{shelter.name}</strong>
              <p>{shelter.text}</p>
            </div>
          ))}
        </section>

        <section className="shelter-card">
          <h2>今すぐ確認すること</h2>

          <ul>
            {current.checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        </section>

        <section className="shelter-card emergency-card">
          <h2>公的情報を確認</h2>
          <p>実際の避難情報は、自治体・気象庁・消防等の発表を確認してください。</p>
        </section>

            <button
                className="primary-return"
                onClick={() => onTop('check')}
            >
            安全確認チェックへ進む
            </button>
      </div>
    </div>
  )
}

export default ShelterGuide