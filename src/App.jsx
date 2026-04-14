import { useEffect, useMemo, useState } from 'react'
import { ALERT_LEVEL_OPTIONS, ALERT_LEVELS } from './data/alertLevels'
import { DISASTER_TYPES, getDisasterType } from './data/disasterTypes'
import { getShelterCards, judgeAction } from './utils/judgeAction'
import './index.css'

function App() {
  const [started, setStarted] = useState(false)

  const [alertLevel, setAlertLevel] = useState(3)
  const [disasterTypeKey, setDisasterTypeKey] = useState('flood')
  const [isVulnerable, setIsVulnerable] = useState(false)
  const [homeRisk, setHomeRisk] = useState('medium')
  const [canMoveUpstairs, setCanMoveUpstairs] = useState(true)
  const [outsideTooDangerous, setOutsideTooDangerous] = useState(false)
  const [location, setLocation] = useState(null)

  useEffect(() => {
  if (!navigator.geolocation) {
    console.log('GPS未対応')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    },
    (error) => {
      console.log('GPS取得失敗', error)
    }
  )
}, [])

  const selectedLevel = ALERT_LEVELS[alertLevel]
  const disasterType = getDisasterType(disasterTypeKey)

  const result = useMemo(() => {
    return judgeAction({
      alertLevel,
      disasterType: disasterType.label,
      isVulnerable,
      homeRisk,
      canMoveUpstairs,
      outsideTooDangerous,
    })
  }, [
    alertLevel,
    disasterType,
    isVulnerable,
    homeRisk,
    canMoveUpstairs,
    outsideTooDangerous,
  ])

  const shelterCards = useMemo(() => {
    return getShelterCards(result.actionMode)
  }, [result.actionMode])

  return (
    <div className="page">
      <div className="phone-frame">
        {!started ? (
          <section className="screen intro-screen">
            <div className="hero-badge">LINEミニアプリ想定デモ</div>

            <div className="illustration-wrap">
              <div className="cloud cloud-1" />
              <div className="cloud cloud-2" />
              <div className="hill hill-1" />
              <div className="hill hill-2" />
              <div className="person-head" />
              <div className="person-body" />
            </div>

            <h1 className="intro-title">防災ナビ</h1>
            <p className="intro-lead">
              今いる場所で、
              <br />
              今どう動くかを案内します。
            </p>

            <div className="intro-card">
              <div className="intro-card-title">このデモで見るもの</div>
              <ul className="intro-list">
                <li>現在地ベースの判断イメージ</li>
                <li>警戒レベルごとの行動表示</li>
                <li>避難 / 屋内安全確保の分岐</li>
              </ul>
            </div>

            <label className="toggle-card">
              <div>
                <div className="toggle-title">高齢者・介助が必要</div>
                <div className="toggle-sub">要配慮者として優先行動を表示</div>
              </div>
              <input
                type="checkbox"
                checked={isVulnerable}
                onChange={(e) => setIsVulnerable(e.target.checked)}
              />
            </label>

            <button className="primary-button" onClick={() => setStarted(true)}>
              判定画面へ進む
            </button>
          </section>
        ) : (
          <section className="screen main-screen">
            <div className="topbar">
              <button className="ghost-button" onClick={() => setStarted(false)}>
                ← 戻る
              </button>
              <div className="location-pill">
                {location
                  ? `現在地：緯度 ${location.lat.toFixed(3)} / 経度 ${location.lng.toFixed(3)}`
                  : '現在地を取得中...'}
              </div>
            </div>

            <div className={`level-banner level-${alertLevel}`}>
              <div className="level-banner-left">
                <div className="level-number">{selectedLevel.shortLabel}</div>
                <div className="level-title">{selectedLevel.title}</div>
              </div>
              <div className="disaster-chip">
                <span>{disasterType.icon}</span>
                <span>{disasterType.label}</span>
              </div>
            </div>

            <div className="action-card">
              <div className="card-label">今すること</div>
              <h2 className="action-title">{result.action}</h2>
              <p className="action-sub">{result.subAction}</p>
              <button
                className="primary-button"
                onClick={() => alert(`${result.cta}\n\n※ 現在はデモ表示です`)}
              >
                {result.cta}
              </button>
            </div>

            <div className="section-card">
              <div className="section-title">判定条件（デモ操作）</div>

              <div className="field-group">
                <label className="field-label">警戒レベル</label>
                <select
                  className="field-select"
                  value={alertLevel}
                  onChange={(e) => setAlertLevel(Number(e.target.value))}
                >
                  {ALERT_LEVEL_OPTIONS.map((item) => (
                    <option key={item.level} value={item.level}>
                      {item.label}｜{item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label className="field-label">災害種別</label>
                <div className="chip-row">
                  {DISASTER_TYPES.map((item) => (
                    <button
                      key={item.key}
                      className={`choice-chip ${disasterTypeKey === item.key ? 'active' : ''}`}
                      onClick={() => setDisasterTypeKey(item.key)}
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">自宅の危険性</label>
                <div className="chip-row">
                  <button
                    className={`choice-chip ${homeRisk === 'low' ? 'active' : ''}`}
                    onClick={() => setHomeRisk('low')}
                  >
                    低い
                  </button>
                  <button
                    className={`choice-chip ${homeRisk === 'medium' ? 'active' : ''}`}
                    onClick={() => setHomeRisk('medium')}
                  >
                    中くらい
                  </button>
                  <button
                    className={`choice-chip ${homeRisk === 'high' ? 'active' : ''}`}
                    onClick={() => setHomeRisk('high')}
                  >
                    高い
                  </button>
                </div>
              </div>

              <label className="toggle-card compact">
                <div>
                  <div className="toggle-title">建物の上階へ移動できる</div>
                  <div className="toggle-sub">屋内安全確保の分岐に使用</div>
                </div>
                <input
                  type="checkbox"
                  checked={canMoveUpstairs}
                  onChange={(e) => setCanMoveUpstairs(e.target.checked)}
                />
              </label>

              <label className="toggle-card compact">
                <div>
                  <div className="toggle-title">外へ出る方が危険</div>
                  <div className="toggle-sub">レベル4・5で屋内安全確保を優先</div>
                </div>
                <input
                  type="checkbox"
                  checked={outsideTooDangerous}
                  onChange={(e) => setOutsideTooDangerous(e.target.checked)}
                />
              </label>

              <label className="toggle-card compact">
                <div>
                  <div className="toggle-title">高齢者・介助が必要</div>
                  <div className="toggle-sub">要配慮者導線を確認</div>
                </div>
                <input
                  type="checkbox"
                  checked={isVulnerable}
                  onChange={(e) => setIsVulnerable(e.target.checked)}
                />
              </label>
            </div>

            <div className="section-card">
              <div className="section-title">避難先 / 安全行動</div>
              <div className="shelter-list">
                {shelterCards.map((item) => (
                  <div className="mini-card" key={item.title}>
                    <div className="mini-card-title">{item.title}</div>
                    <div className="mini-card-text">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-card">
              <div className="section-title">行政からのお知らせ（モック）</div>
              <div className="notice-card">
                {selectedLevel.label} 相当の状況です。
                <br />
                危険な場所にいる場合は、自治体の避難情報を確認してください。
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default App