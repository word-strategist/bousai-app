import { useEffect, useState } from 'react'
import './App.css'

const quickActions = [
  {
    title: '近くの避難先を見る',
    desc: '現在地から指定避難所を案内',
    icon: '📍',
  },
  {
    title: 'そなえを確認',
    desc: '備蓄・持ち物を確認',
    icon: '🎒',
  },
  {
    title: '家族・見守り',
    desc: '家族や支援が必要な方を確認',
    icon: '👨‍👩‍👧',
  },
  {
    title: 'お知らせ',
    desc: '自治体通知や警戒情報',
    icon: '🔔',
  },
]

const statusItems = [
  { title: '家族登録', value: '2名登録済み' },
  { title: '備蓄状況', value: '水 2日分' },
  { title: '指定避難先', value: '未確認' },
  { title: 'ポイント', value: '120 pt' },
]

export default function App() {
  const [screen, setScreen] = useState('home')
  const [level, setLevel] = useState(1)
  const [location, setLocation] = useState(null)
  const [locationError, setLocationError] = useState('')

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('この端末では位置情報が使えません')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        setLocation({ lat, lng })
        setLocationError('')
      },
      () => {
        setLocationError('位置情報を取得できませんでした')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  const levelLabel =
    level === 1 ? '警戒レベル 1' : level === 2 ? '警戒レベル 2' : '警戒レベル 3'

  const levelClass =
    level === 1 ? 'safe' : level === 2 ? 'warning' : 'danger'

  const homeTitle =
    level === 1
      ? '現在地は安全です'
      : level === 2
      ? '注意が必要です'
      : 'すぐに避難してください'

  const homeLead =
    level === 1
      ? '今すぐの避難は不要です'
      : level === 2
      ? '避難情報に注意してください'
      : 'すぐに安全な場所へ移動してください'

  const homeText =
    level === 1
      ? '雨が強まる前に、連絡手段と避難先だけ確認しておくと安心です。'
      : level === 2
      ? '今後の雨や河川情報に注意し、避難先と家族との連絡方法を確認してください。'
      : '避難に時間がかかる方は、家族と連絡を取り、早めに移動準備をしてください。'

  const alertTitle =
    level === 1
      ? '現在地は安全です'
      : level === 2
      ? '注意が必要です'
      : '避難準備を始めてください'

  const alertText =
    level === 1 ? (
      <>
        今すぐの避難は不要です。
        <br />
        雨が強まる前に、避難先と連絡手段を確認しておくと安心です。
      </>
    ) : level === 2 ? (
      <>
        今後の雨や河川情報に注意してください。
        <br />
        避難情報が出た場合にすぐ動けるよう備えてください。
      </>
    ) : (
      <>
        河川の水位が上昇しています。
        <br />
        避難に時間がかかる方は、早めの移動準備をしてください。
      </>
    )

  const alertActions =
    level === 1
      ? [
          '避難先を1回確認する',
          '家族との連絡方法を確認する',
          '雨の強まりに備える',
        ]
      : level === 2
      ? [
          '避難情報を確認する',
          '家族と連絡を取れるようにする',
          '持ち出し品をすぐ出せる場所に置く',
        ]
      : [
          '家族と連絡を取る',
          '避難先を確認する',
          '持ち出し品を手元に置く',
        ]

  const mainButtonLabel =
    level === 3 ? '今すぐ避難する' : '今すぐ避難行動を確認する'

  const detailButtonLabel =
    level === 3 ? '近くの避難所を確認する' : '避難先を確認する'

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="screen">
          {screen === 'alert' ? (
            <>
              <header className="topbar">
                <p className="brand">防災ナビ</p>
                <button className="text-button" onClick={() => setScreen('home')}>
                  ← 戻る
                </button>
              </header>

              <section className="alert-page">
                <div className={`alert-chip ${levelClass}`}>{levelLabel}</div>

                <h1 className="alert-title">{alertTitle}</h1>

                <p className="alert-text">{alertText}</p>

                <div className="action-box">
                  <p className="action-box-title">今やること</p>
                  <ol className="action-list">
                    {alertActions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>

                <button
                  className="primary-cta"
                  style={{
                    background:
                      level === 1
                        ? '#22c55e'
                        : level === 2
                        ? '#eab308'
                        : '#ef4444',
                  }}
                >
                  {detailButtonLabel}
                </button>

                <button className="secondary-cta">家族・見守りを確認する</button>

                <button
                  onClick={() => setLevel((prev) => (prev === 3 ? 1 : prev + 1))}
                  style={{
                    width: '100%',
                    marginTop: '12px',
                    border: 'none',
                    background: '#e2e8f0',
                    color: '#334155',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    fontWeight: '700',
                  }}
                >
                  状態切り替え（デモ用）
                </button>
              </section>
            </>
          ) : (
            <>
              <header className="topbar">
                <div>
                  <p className="brand">防災ナビ</p>
                  <p className="brand-sub">LINEミニアプリ想定デモ</p>
                </div>
                <div className="level-chip">防災Lv.3</div>
              </header>

              <section className="hero-card">
                <div className="hero-icon">🌤️</div>
                <div>
                  <h1 className="hero-title">
                    今いる場所で、
                    <br />
                    何をすればいいか分かる。
                  </h1>
                  <p className="hero-text">
                    高齢者・障がい者でも使いやすい、
                    <br />
                    シンプルな防災ナビを想定したデモです。
                  </p>
                </div>
              </section>

              <section className="status-section">
                <div className="status-head">
                  <div>
                    <p className="section-label">現在地と状況</p>
                    <p className="location-text">
                      📍 {location ? '香川県観音寺市付近' : '現在地を取得中...'}
                    </p>

                    {location && (
                      <p
                        style={{
                          margin: '6px 0 0',
                          fontSize: '12px',
                          color: '#94a3b8',
                          fontWeight: '600',
                        }}
                      >
                        緯度 {location.lat.toFixed(3)} / 経度 {location.lng.toFixed(3)}
                      </p>
                    )}

                    {locationError && (
                      <p
                        style={{
                          margin: '8px 0 0',
                          fontSize: '13px',
                          fontWeight: '700',
                          color: '#dc2626',
                        }}
                      >
                        {locationError}
                      </p>
                    )}
                  </div>

                  <div className={`alert-chip ${levelClass}`}>{levelLabel}</div>
                </div>

                <div className="status-main">
                  <p className="status-title">今の状況</p>
                  <p className="status-strong">{homeTitle}</p>
                  <p
                    style={{
                      marginTop: '8px',
                      fontSize: '14px',
                      fontWeight: '700',
                      color:
                        level === 1 ? '#16a34a' : level === 2 ? '#ca8a04' : '#dc2626',
                    }}
                  >
                    ● {homeLead}
                  </p>
                  <p className="status-text">{homeText}</p>

                  <button
                    onClick={getLocation}
                    style={{
                      marginTop: '12px',
                      border: 'none',
                      background: '#dbeafe',
                      color: '#1d4ed8',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      fontWeight: '700',
                    }}
                  >
                    現在地を更新する
                  </button>
                </div>

                <div className="status-grid">
                  {statusItems.map((item) => (
                    <div className="mini-card" key={item.title}>
                      <p className="mini-card-title">{item.title}</p>
                      <p className="mini-card-value">{item.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <button
                className="primary-cta"
                style={{
                  background:
                    level === 1 ? '#22c55e' : level === 2 ? '#eab308' : '#ef4444',
                }}
                onClick={() => setScreen('alert')}
              >
                {mainButtonLabel}
              </button>

                <button
                  onClick={() => setLevel((prev) => (prev === 3 ? 1 : prev + 1))}
                  style={{
                    width: '100%',
                    marginTop: '-4px',
                    marginBottom: '16px',
                    border: 'none',
                    background: '#e2e8f0',
                    color: '#334155',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    fontWeight: '700',
                  }}
                >
                  状態切り替え（デモ用）
                </button>

              <section className="mission-card">
                <div>
                  <p className="mission-label">今日のミッション</p>
                  <p className="mission-title">避難先を1回確認して +10pt</p>
                  <p className="mission-desc">
                    ポイントは目的ではなく、習慣化の補助として配置しています。
                  </p>
                </div>
                <div className="mission-point">+10</div>
              </section>

              <section className="quick-section">
                <p className="section-label">よく使う機能</p>
                <div className="quick-grid">
                  {quickActions.map((item) => (
                    <button className="quick-card" key={item.title}>
                      <div className="quick-icon">{item.icon}</div>
                      <div className="quick-title">{item.title}</div>
                      <div className="quick-desc">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}