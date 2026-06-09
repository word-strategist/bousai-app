function SuppliesScreen({ onBack }) {
  const supplyGroups = [
    {
      title: 'まず必要なもの',
      items: ['水', '食料', 'モバイルバッテリー', '常備薬'],
    },
    {
      title: '停電・夜間に備える',
      items: ['懐中電灯', '乾電池', 'ラジオ', '笛'],
    },
    {
      title: '避難時に持つもの',
      items: ['現金', '身分証コピー', '保険証コピー', 'タオル'],
    },
    {
      title: '家族・高齢者向け',
      items: ['お薬手帳', '眼鏡', '介護用品', '子ども用品'],
    },
  ]

  return (
    <div className="supplies-screen">
      <header className="supplies-header">
        <button type="button" onClick={onBack}>
          ← 戻る
        </button>

        <p>平常時に確認</p>

        <h1>
          防災セット
        </h1>

        <span>
          すぐ持ち出せるものを確認できます
        </span>
      </header>

      <main className="supplies-body">
        {supplyGroups.map((group) => (
          <section className="supplies-section" key={group.title}>
            <h2>{group.title}</h2>

            <div className="supplies-grid">
              {group.items.map((item) => (
                <div className="supply-card" key={item}>
                  <span>□</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="supplies-note">
          <h2>まずは3日分</h2>
          <p>
            家族構成や持病に合わせて、必要なものを少しずつ追加してください。
          </p>
        </section>
      </main>
    </div>
  )
}

export default SuppliesScreen