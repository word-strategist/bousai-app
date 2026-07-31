import { useEffect, useState } from 'react'

import locationIcon from '../assets/app/home/app-home-location-icon-v1.png'
import bearIcon from '../assets/app/home/app-home-bear-icon-v1.png'
import heatIcon from '../assets/app/home/app-home-heat-icon-v1.png'
import earthquakeDemoVisual from '../assets/app/home/app-home-earthquake-demo-visual-v1.png'

import familyIcon from '../assets/icons/family.png'
import shelterIcon from '../assets/icons/shelter.png'
import governmentIcon from '../assets/icons/government.png'
import suppliesIcon from '../assets/icons/supplies.png'

function HomeScreen({
  onStartLocationCheck,
  onStartEarthquakeDemo,
  onSelectDisaster,
  onStartShelterGuide,
  onStartAdminInfo,
  onStartSupplies,
  onStartFamilyContact,
  isCheckingLocation,
  locationStatus,
  locationError,
}) {
  const [activePanel, setActivePanel] = useState(null)

  const isLocationLoading =
    isCheckingLocation || locationStatus === 'loading'

  const closePanel = () => {
    setActivePanel(null)
  }

  const openPanel = (panelName) => {
    setActivePanel(panelName)
  }

  const runAndClose = (callback) => {
    closePanel()
    callback?.()
  }

  const openBear = () => {
    runAndClose(() =>
      onSelectDisaster?.({
        key: 'bear',
        label: '熊',
        title: '',
      })
    )
  }

  const openHeat = () => {
    runAndClose(() =>
      onSelectDisaster?.({
        key: 'heat',
        label: '暑さ',
        title: '暑さの危険',
      })
    )
  }

  useEffect(() => {
    if (!activePanel) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closePanel()
      }
    }

    document.body.classList.add('app-panel-open')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('app-panel-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activePanel])

  return (
    <div className="home-screen">
      {/* =========================
          App Header
      ========================= */}
      <header className="home-app-header">
        <div className="home-app-brand">
          <img
            src="/favicon.svg"
            alt=""
            className="home-app-brand-icon"
          />

          <span>防災サプリ</span>
        </div>

        <button
          className="home-settings-button"
          type="button"
          onClick={() => openPanel('settings')}
          aria-label="設定を開く"
          aria-expanded={activePanel === 'settings'}
          aria-controls="home-settings-panel"
        >
          <svg
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="
                M20 3h8l2 6
                5 2 6-3 5 6-4 5
                1 5 5 4-3 8-6 1
                -3 5 1 7-7 4-4-5
                h-6l-4 5-7-4 1-7
                -3-5-6-1-3-8 5-4
                1-5-4-5 5-6 6 3
                5-2 2-6Z
              "
            />

            <circle cx="24" cy="24" r="7" />
          </svg>
        </button>
      </header>

      {/* =========================
          TOP Main
      ========================= */}
      <main className="home-body">
        {/* =========================
            TOP Hero
        ========================= */}
        <section className="home-hero">
          <div className="home-hero-copy">
            <p className="home-label">
              地域防災プラットフォーム
            </p>

            <h1>
              いま、
              <br />
              何の危険がある？
            </h1>
          </div>
        </section>

        {/* =========================
            Main Actions
        ========================= */}
        <section
          className="home-main-actions"
          aria-label="すぐに確認する機能"
        >
          {/* =========================
              地震デモ導入
          ========================= */}
          <button
            className="earthquake-demo-card"
            type="button"
            onClick={onStartEarthquakeDemo}
            aria-label="地震時の行動案内デモを体験する"
          >
            <span className="earthquake-demo-copy">
              <span className="earthquake-demo-badge">
                防災サプリ デモ版
              </span>

              <strong className="earthquake-demo-title">
                地震時の行動案内を
                <br />
                体験する
              </strong>

              <span className="earthquake-demo-description">
                一つずつ行動を確認します
              </span>
            </span>

            <span
              className="earthquake-demo-visual"
              aria-hidden="true"
            >
              <img
                src={earthquakeDemoVisual}
                alt=""
              />
            </span>

            <span
              className="earthquake-demo-arrow"
              aria-hidden="true"
            >
              ›
            </span>
          </button>

          <button
            className="main-action blue"
            type="button"
            onClick={onStartLocationCheck}
            disabled={isLocationLoading}
          >
            <span className="action-mark" aria-hidden="true">
              <img src={locationIcon} alt="" />
            </span>

            <span className="action-copy">
              <strong>
                {isLocationLoading
                  ? '現在地を確認中'
                  : '現在地を確認'}
              </strong>

              <small>
                {isLocationLoading
                  ? '位置情報を取得しています'
                  : '今いる場所の危険を見る'}
              </small>
            </span>

            <span className="action-arrow" aria-hidden="true">
              ›
            </span>
          </button>

          {locationError ? (
            <p className="home-location-error" role="status">
              {locationError}
            </p>
          ) : null}

          <button
            className="main-action orange"
            type="button"
            onClick={openBear}
          >
            <span className="action-mark" aria-hidden="true">
              <img src={bearIcon} alt="" />
            </span>

            <span className="action-copy">
              <strong>熊を見たら</strong>
              <small>すぐにとる行動を見る</small>
            </span>

            <span className="action-arrow" aria-hidden="true">
              ›
            </span>
          </button>

          <button
            className="main-action yellow"
            type="button"
            onClick={openHeat}
          >
            <span className="action-mark" aria-hidden="true">
              <img src={heatIcon} alt="" />
            </span>

            <span className="action-copy">
              <strong>暑さの危険</strong>
              <small>熱中症の危険を見る</small>
            </span>

            <span className="action-arrow" aria-hidden="true">
              ›
            </span>
          </button>
        </section>

        <p className="home-demo-notice">
          これはデモ版です。実際の災害情報とは連動していません。
        </p>
      </main>

      {/* =========================
          Bottom Navigation
      ========================= */}
      <nav
        className="home-bottom-nav"
        aria-label="主要メニュー"
      >
        <button
          type="button"
          className="is-active"
          onClick={closePanel}
        >
          <span className="home-bottom-nav-icon">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M3 11.5 12 4l9 7.5V21h-6v-6H9v6H3Z" />
            </svg>
          </span>

          <span>ホーム</span>
        </button>

        <button
          type="button"
          onClick={() => runAndClose(onStartShelterGuide)}
        >
          <span className="home-bottom-nav-icon">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M12 22s7-6.2 7-13a7 7 0 1 0-14 0c0 6.8 7 13 7 13Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              <circle
                cx="12"
                cy="9"
                r="2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>

          <span>避難所</span>
        </button>

        <button
          type="button"
          onClick={() => runAndClose(onStartSupplies)}
        >
          <span className="home-bottom-nav-icon">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M7 8V6a5 5 0 0 1 10 0v2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M5 8h14l1 13H4L5 8Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              <path
                d="M9 14h6M12 11v6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <span>備え</span>
        </button>

        <button
          type="button"
          onClick={() => openPanel('menu')}
          aria-label="メニューを開く"
          aria-expanded={activePanel === 'menu'}
          aria-controls="home-menu-panel"
        >
          <span className="home-bottom-nav-icon home-menu-lines">
            <i />
            <i />
            <i />
          </span>

          <span>メニュー</span>
        </button>
      </nav>

      {/* =========================
          Panel Overlay
      ========================= */}
      {activePanel ? (
        <div className="home-menu-layer">
          <button
            type="button"
            className="home-menu-backdrop"
            onClick={closePanel}
            aria-label="パネルを閉じる"
          />

          <section
            id={
              activePanel === 'menu'
                ? 'home-menu-panel'
                : 'home-settings-panel'
            }
            className="home-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-panel-title"
          >
            <div className="home-menu-handle" />

            <header className="home-menu-panel-header">
              <div>
                <p>
                  {activePanel === 'menu'
                    ? '補助機能'
                    : '防災サプリ'}
                </p>

                <h2 id="home-panel-title">
                  {activePanel === 'menu'
                    ? 'メニュー'
                    : '設定・ご案内'}
                </h2>
              </div>

              <button
                type="button"
                onClick={closePanel}
                aria-label="閉じる"
              >
                ×
              </button>
            </header>

            {activePanel === 'menu' ? (
              <div className="home-menu-list">
                <button
                  type="button"
                  onClick={() =>
                    runAndClose(onStartFamilyContact)
                  }
                >
                  <span className="home-menu-icon">
                    <img src={familyIcon} alt="" />
                  </span>

                  <span>家族確認</span>
                  <span aria-hidden="true">›</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    runAndClose(onStartAdminInfo)
                  }
                >
                  <span className="home-menu-icon">
                    <img src={governmentIcon} alt="" />
                  </span>

                  <span>行政情報</span>
                  <span aria-hidden="true">›</span>
                </button>
              </div>
            ) : (
              <div className="home-settings-content">
                <section>
                  <h3>デモ版について</h3>

                  <p>
                    現在の防災サプリはデモ版です。
                    実際の緊急地震速報や災害情報とは
                    連動していません。
                  </p>
                </section>

                <section>
                  <h3>位置情報について</h3>

                  <p>
                    位置情報は「現在地を確認」を押した後に、
                    端末の確認画面が表示されます。
                  </p>
                </section>
              </div>
            )}
          </section>
        </div>
      ) : null}
    </div>
  )
}

export default HomeScreen
