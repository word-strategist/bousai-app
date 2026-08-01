import { useEffect, useState } from 'react'

import locationIcon from '../assets/app/home/app-home-location-icon-v1.png'
import earthquakeIcon from '../assets/app/home/app-home-earthquake-icon-v1.png'
import bearPreviewIcon from '../assets/app/home/app-home-bear-preview-icon-v1.png'
import heatPreviewIcon from '../assets/app/home/app-home-heat-icon-v1.png'

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
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M4 7h10M18 7h2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <circle
                cx="16"
                cy="7"
                r="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />

              <path
                d="M4 17h2M10 17h10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <circle
                cx="8"
                cy="17"
                r="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
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
              公開機能
          ========================= */}
          <section
            className="home-main-actions"
            aria-label="防災サプリの公開機能"
          >
            {/* =========================
                主役：地震時の行動案内
            ========================= */}
            <button
              className="home-primary-action"
              type="button"
              onClick={onStartEarthquakeDemo}
              aria-label="地震時の行動案内デモを体験する"
            >
              <span
                className="home-primary-action-icon"
                aria-hidden="true"
              >
                <img src={earthquakeIcon} alt="" />
              </span>

              <span className="home-primary-action-copy">
                <strong>地震時の行動案内</strong>
                <small>
                  一つずつ、今することを確認する
                </small>
              </span>

              <span
                className="home-primary-action-arrow"
                aria-hidden="true"
              >
                ›
              </span>
            </button>

            {/* =========================
                第二導線：現在地確認デモ
            ========================= */}
            <button
              className="home-location-action"
              type="button"
              onClick={onStartLocationCheck}
              disabled={isLocationLoading}
            >
              <span
                className="home-location-action-icon"
                aria-hidden="true"
              >
                <img src={locationIcon} alt="" />
              </span>

              <span className="home-location-action-copy">
                <strong>
                  {isLocationLoading
                    ? '現在地を確認中'
                    : '現在地確認デモ'}
                </strong>

                <small>
                  {isLocationLoading
                    ? '位置情報を取得しています'
                    : '位置情報を使った案内例を見る'}
                </small>
              </span>

              <span
                className="home-location-action-arrow"
                aria-hidden="true"
              >
                ›
              </span>
            </button>

            {locationError ? (
              <p className="home-location-error" role="status">
                {locationError}
              </p>
            ) : null}

      {/* =========================
          準備中の画面イメージ
      ========================= */}
      <section
        className="home-preview-section"
        aria-labelledby="home-preview-title"
      >
        <div className="home-preview-heading">
          <p>今後追加予定の案内</p>

          <h2 id="home-preview-title">
            準備中の画面イメージ
          </h2>
        </div>

        <div className="home-preview-grid">
          {/* =========================
              熊の案内プレビュー
          ========================= */}
          <article className="home-preview-card">
            <div
              className="home-preview-visual home-preview-visual-bear"
              aria-hidden="true"
            >
              <img src={bearPreviewIcon} alt="" />
            </div>

            <div className="home-preview-copy">
              <strong>熊の案内</strong>
              <span>画面イメージ</span>
            </div>

            <span className="home-preview-badge">
              準備中
            </span>
          </article>

          {/* =========================
              暑さの案内プレビュー
          ========================= */}
          <article className="home-preview-card">
            <div
              className="home-preview-visual home-preview-visual-heat"
              aria-hidden="true"
            >
              <img src={heatPreviewIcon} alt="" />
            </div>

            <div className="home-preview-copy">
              <strong>暑さの案内</strong>
              <span>画面イメージ</span>
            </div>

            <span className="home-preview-badge">
              準備中
            </span>
          </article>
        </div>
      </section>
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
            onClick={() => runAndClose(onStartLocationCheck)}
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

            <span>現在地</span>
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
                  {/* =========================
                      公的機関の防災情報
                  ========================= */}
                  <a
                    className="home-menu-external-link"
                    href="https://www.jma.go.jp/bosai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closePanel}
                  >
                    <span className="home-menu-icon">
                      <img src={governmentIcon} alt="" />
                    </span>

                    <span className="home-menu-external-copy">
                      <strong>公的機関の防災情報</strong>
                      <small>
                        気象庁の最新情報を確認します
                      </small>
                    </span>

                    <span
                      className="home-menu-external-mark"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
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
