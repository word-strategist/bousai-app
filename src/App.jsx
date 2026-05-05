import { useEffect, useMemo, useState } from 'react'
import { ALERT_LEVEL_OPTIONS, ALERT_LEVELS } from './data/alertLevels'
import { DISASTER_TYPES, getDisasterType } from './data/disasterTypes'
import { getShelterCards, judgeAction } from './utils/judgeAction'
import './index.css'

// 画像
import ngOutside from "./assets/stamps/ng-outside.png"
import ngWindow from "./assets/stamps/ng-window.png"
import ngElevator from "./assets/stamps/ng-elevator.png"

import okTable from "./assets/stamps/ok-table.png"
import okHead from "./assets/stamps/ok-head.png"
import okWait from "./assets/stamps/ok-wait.png"

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
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      () => {}
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

            <h1 className="intro-title">防災ナビ</h1>

            <p className="intro-lead">
              今いる場所で、
              <br />
              今どう動くかを案内します。
            </p>

            <button className="primary-button" onClick={() => setStarted(true)}>
              判定を開始する
            </button>

          </section>
        ) : (
          <section className="screen main-screen">

            {/* レベル */}
            <div className={`level-banner level-${alertLevel}`}>
              <div>{selectedLevel.title}</div>
              <div>{disasterType.label}</div>
            </div>

            {/* ===== スタンプUI ===== */}
            <div className="action-card">

              {/* NG */}
              <div className="stamp-section ng">
                <div className="stamp-title">🚫 やってはいけない</div>
                <div className="stamp-grid">

                  <div className="stamp-item">
                    <img src={ngOutside} alt="外に出ない" />
                    <p>外に出ない</p>
                  </div>

                  <div className="stamp-item">
                    <img src={ngWindow} alt="窓に近づかない" />
                    <p>窓に近づかない</p>
                  </div>

                  <div className="stamp-item">
                    <img src={ngElevator} alt="エレベーター使わない" />
                    <p>エレベーター使わない</p>
                  </div>

                </div>
              </div>

              {/* OK */}
              <div className="stamp-section ok">
                <div className="stamp-title">⭕ 今すること</div>
                <div className="stamp-grid">

                  <div className="stamp-item">
                    <img src={okTable} alt="机の下に入る" />
                    <p>机の下に入る</p>
                  </div>

                  <div className="stamp-item">
                    <img src={okHead} alt="頭を守る" />
                    <p>頭を守る</p>
                  </div>

                  <div className="stamp-item">
                    <img src={okWait} alt="待つ" />
                    <p>待つ</p>
                  </div>

                </div>
              </div>

              {/* CTA */}
              <div className="card-label">今すること</div>
              <h2 className="action-title">{result.action}</h2>
              <p className="action-sub">{result.subAction}</p>

              <button
                className="primary-button"
                onClick={() => alert(`${result.cta}\n\n※ デモ表示`)}
              >
                {result.cta}
              </button>

            </div>

            {/* 避難先 */}
            <div className="section-card">
              <div className="section-title">避難先 / 安全行動</div>
              <div className="shelter-list">
                {shelterCards.map((item) => (
                  <div key={item.title}>
                    <div>{item.title}</div>
                    <div>{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}
      </div>
    </div>
  )
}

export default App