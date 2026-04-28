import { useEffect, useMemo, useState } from 'react'
import { ALERT_LEVEL_OPTIONS, ALERT_LEVELS } from './data/alertLevels'
import { DISASTER_TYPES, getDisasterType } from './data/disasterTypes'
import { getShelterCards, judgeAction } from './utils/judgeAction'
import './index.css'

const MOCK_LOCATION_LABEL = '岡山県真庭市付近'

function App() {
  const [started, setStarted] = useState(false)

  const [alertLevel, setAlertLevel] = useState(4)
  const [disasterTypeKey, setDisasterTypeKey] = useState('flood')
  const [isVulnerable, setIsVulnerable] = useState(true)
  const [homeRisk, setHomeRisk] = useState('high')
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

    <div className="flow-visual">
      <div className="flow-step">
        <div className="flow-icon">📍</div>
        <div>
          <div className="flow-title">現在地を確認</div>
          <div className="flow-text">GPSで今いる場所を取得</div>
        </div>
      </div>

      <div className="flow-arrow">↓</div>

      <div className="flow-step">
        <div className="flow-icon">⚠️</div>
        <div>
          <div className="flow-title">危険度を判定</div>
          <div className="flow-text">警戒レベル・災害種別を確認</div>
        </div>
      </div>

      <div className="flow-arrow">↓</div>

      <div className="flow-step important">
        <div className="flow-icon">👉</div>
        <div>
          <div className="flow-title">今する行動を案内</div>
          <div className="flow-text">避難・屋内安全確保を表示</div>
        </div>
      </div>
    </div>

            <h1 className="intro-title">防災ナビ</h1>

            <p className="intro-lead">
              今いる場所で、
              <br />
              今どう動くかを案内します。
            </p>

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
              判定を開始する
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
                  ? `現在地：${MOCK_LOCATION_LABEL}（GPS取得）`
                  : `現在地：${MOCK_LOCATION_LABEL}（取得中）`}
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

            {isVulnerable && (
              <div className="section-card">
                <div className="section-title">要配慮者向け案内</div>
                <div className="notice-card">
                  高齢者・介助が必要な方は、通常より早めの避難判断が必要です。
                  <br />
                  危険な場所にいる場合は、避難を優先してください。
                </div>
              </div>
            )}

            <div className="section-card">
              <div className="section-title">現在地の状況（デモ）</div>
              <div className="notice-card">
                現在地を確認しました。
                <br />
                {MOCK_LOCATION_LABEL} は浸水の可能性があるエリアとして表示しています。
                <br />
                避難行動を優先してください。
              </div>
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