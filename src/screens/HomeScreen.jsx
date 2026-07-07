import locationIcon from '../assets/icons/location.png'
import bearIcon from '../assets/icons/bear.png'
import heatIcon from '../assets/icons/heat.png'
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
        <section className="home-hero">
          <p className="home-label">地域防災プラットフォーム</p>

          <div className="home-shield">✓</div>

          <h1>
            迷わない。<br />
            押すだけ。
          </h1>

          <p className="home-lead">
            いざという時、<br />
            次の一歩へ。
          </p>
        </section>

        <section className="home-main-actions">
          <button className="main-action main-action-primary" type="button" onClick={onStartLocationCheck}>
            <span className="action-mark">
              <img src={locationIcon} alt="" />
            </span>

            <span className="action-copy">
              <strong>現在地を確認</strong>
              <small>今いる場所の危険を見る</small>
            </span>
          </button>

          <button
            className="main-action main-action-danger"
            type="button"
            onClick={() => onSelectDisaster?.({ key: 'bear', label: '熊', title: '' })}
          >
            <span className="action-mark">
              <img src={bearIcon} alt="" />
            </span>

            <span className="action-copy">
              <strong>熊を見たら</strong>
              <small>すぐにとる行動を見る</small>
            </span>
          </button>

          <button
            className="main-action main-action-warning"
            type="button"
            onClick={() => onSelectDisaster?.({ key: 'heat', label: '暑さ', title: '暑さの危険' })}
          >
            <span className="action-mark">
              <img src={heatIcon} alt="" />
            </span>

            <span className="action-copy">
              <strong>暑さの危険</strong>
              <small>熱中症の危険を見る</small>
            </span>
          </button>
        </section>

        <section className="home-sub-actions">
          <p className="home-sub-title">落ち着いた後に使う機能</p>

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