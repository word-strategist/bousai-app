function AdminInfoScreen({ onBack }) {
  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const adminNoticeLinks = [
    {
      title: '自治体防災ページ',
      text: '避難情報・災害時のお知らせ',
      url: 'https://www.city.osaka.lg.jp/kikikanrishitsu/page/0000104403.html',
    },
  ]

  const disasterInfoLinks = [
    {
      title: '気象庁 防災情報',
      text: '警報・注意報・キキクル',
      url: 'https://www.jma.go.jp/bosai/',
    },
    {
      title: 'キキクル',
      text: '土砂災害・浸水害・洪水の危険度',
      url: 'https://www.jma.go.jp/bosai/risk/',
    },
    {
      title: '熱中症警戒アラート',
      text: '暑さの危険情報',
      url: 'https://www.wbgt.env.go.jp/alert.php',
    },
  ]

  const officialLinks = [
    {
      title: '避難所・防災マップ',
      text: '各区の防災マップ・避難所情報',
      url: 'https://www.city.osaka.lg.jp/kikikanrishitsu/page/0000139402.html',
    },
    {
      title: 'ハザードマップ',
      text: '洪水・土砂災害などの危険区域',
      url: 'https://www.osaka-bousai.net/27000/hazardmap.html',
    },
  ]

  return (
    <div className="admin-info-screen">
      <header className="admin-info-header">
        <button type="button" onClick={onBack}>
          ← 戻る
        </button>

        <p>落ち着いた後に確認</p>

        <h1>
          行政・災害情報
        </h1>

        <span>
          公式情報を確認できます
        </span>
      </header>

      <main className="admin-info-body">
        <section className="admin-info-section">
          <h2>行政からのお知らせ</h2>

          {adminNoticeLinks.map((link) => (
            <button
              key={link.title}
              type="button"
              className="admin-link-card primary"
              onClick={() => openLink(link.url)}
            >
              <strong>{link.title}</strong>
              <span>{link.text}</span>
            </button>
          ))}
        </section>

        <section className="admin-info-section">
          <h2>災害情報を確認</h2>

          {disasterInfoLinks.map((link) => (
            <button
              key={link.title}
              type="button"
              className="admin-link-card"
              onClick={() => openLink(link.url)}
            >
              <strong>{link.title}</strong>
              <span>{link.text}</span>
            </button>
          ))}
        </section>

        <section className="admin-info-section">
          <h2>公式リンク</h2>

          {officialLinks.map((link) => (
            <button
              key={link.title}
              type="button"
              className="admin-link-card"
              onClick={() => openLink(link.url)}
            >
              <strong>{link.title}</strong>
              <span>{link.text}</span>
            </button>
          ))}
        </section>
      </main>
    </div>
  )
}

export default AdminInfoScreen