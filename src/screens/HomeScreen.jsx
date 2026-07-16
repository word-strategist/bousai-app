import locationIcon from '../assets/app/home/app-home-location-icon-v1.png'
import bearIcon from '../assets/app/home/app-home-bear-icon-v1.png'
import heatIcon from '../assets/app/home/app-home-heat-icon-v1.png'

import familyIcon from '../assets/icons/family.png'
import shelterIcon from '../assets/icons/shelter.png'
import governmentIcon from '../assets/icons/government.png'
import suppliesIcon from '../assets/icons/supplies.png'

function HomeScreen({
  onStartLocationCheck,
  onSelectDisaster,
  onStartShelterGuide,
  onStartAdminInfo,
  onStartSupplies,
  onStartFamilyContact,
}) {
  return (
    <div className="home-screen">
      <main className="home-body">
        {/* =========================
            TOP Hero
        ========================= */}
        <section className="home-hero">
          <div className="home-hero-copy">
            <p className="home-label">地域防災プラットフォーム</p>

            <h1>
              いま、
              <br />
              何の危険がある？
            </h1>
          </div>

          <div className="home-hero-visual" aria-hidden="true">
          </div>
        </section>

        {/* =========================
            Main Actions
        ========================= */}
        <section
          className="home-main-actions"
          aria-label="すぐに確認する機能"
        >
          <button
            className="main-action blue"
            type="button"
            onClick={onStartLocationCheck}
          >
            <span className="action-mark" aria-hidden="true">
              <img src={locationIcon} alt="" />
            </span>

            <span className="action-copy">
              <strong>現在地を確認</strong>
              <small>今いる場所の危険を見る</small>
            </span>

            <span className="action-arrow" aria-hidden="true">
              ›
            </span>
          </button>

          <button
            className="main-action orange"
            type="button"
            onClick={() =>
              onSelectDisaster?.({
                key: 'bear',
                label: '熊',
                title: '',
              })
            }
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
            onClick={() =>
              onSelectDisaster?.({
                key: 'heat',
                label: '暑さ',
                title: '暑さの危険',
              })
            }
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

        {/* =========================
            Sub Actions
        ========================= */}
        <section
          className="home-sub-actions"
          aria-labelledby="home-sub-actions-title"
        >
          <div className="sub-heading">
            <span aria-hidden="true" />

            <p id="home-sub-actions-title">
              落ち着いた後に使う機能
            </p>

            <span aria-hidden="true" />
          </div>

          <div className="sub-grid">
            <button type="button" onClick={onStartFamilyContact}>
              <img src={familyIcon} alt="" />
              <strong>家族確認</strong>
            </button>

            <button type="button" onClick={onStartShelterGuide}>
              <img src={shelterIcon} alt="" />
              <strong>避難所</strong>
            </button>

            <button type="button" onClick={onStartAdminInfo}>
              <img src={governmentIcon} alt="" />
              <strong>行政情報</strong>
            </button>

            <button type="button" onClick={onStartSupplies}>
              <img src={suppliesIcon} alt="" />
              <strong>備え</strong>
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomeScreen