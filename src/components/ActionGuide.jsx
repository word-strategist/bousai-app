import ngOutside from '../assets/stamps/ng-outside.png'
import ngElevator from '../assets/stamps/ng-elevator.png'
import ngWindow from '../assets/stamps/ng-window.png'
import okTable from '../assets/stamps/ok-table.png'
import okHead from '../assets/stamps/ok-head.png'
import okWait from '../assets/stamps/ok-wait.png'

function ActionGuide({ disaster, onBack, onNext }) {
  const guides = {
    earthquake: {
    title: '地震',
    color: 'orange',
    ng: {
        image: ngOutside,
        label: 'NG',
        title: '外へ出ない',
        text: '落下物が危険',
    },
    ok: {
        image: okTable,
        label: 'OK',
        title: '頭を守る',
        text: '机の下・腕・カバン',
    },
    },

    flood: {
      title: '洪水',
      color: 'blue',
      ng: {
        image: ngElevator,
        label: 'NG',
        title: '地下・低い場所へ行かない',
        text: '浸水すると逃げ遅れます',
      },
      ok: {
        image: okHead,
        label: 'OK',
        title: '高い場所へ移動する',
        text: '水が来る前に離れてください',
      },
    },

    fire: {
      title: '火災',
      color: 'red',
      ng: {
        image: ngWindow,
        label: 'NG',
        title: '煙の中を無理に進まない',
        text: '煙を吸うと危険です',
      },
      ok: {
        image: okWait,
        label: 'OK',
        title: '低い姿勢で避難する',
        text: '煙を避けて移動してください',
      },
    },
  }

  const current = guides[disaster]

return (
  <div className="app action-screen">
    <div className={`action-header ${current.color}`}>
      <button className="back-button" onClick={onBack}>
        ← 戻る
      </button>

        <div className="risk-detected-banner">
            📍 現在地判定：
            {current.title}のリスクが高い地域です
        </div>

        <h1>{current.title}発生</h1>
    </div>

      <div className="action-content">
        <div className="big-alert">⚠️ 今すぐ行動</div>

        <div className="stamp-grid">
          <div className="stamp-card ng">
            <div className="stamp-label ng-label">{current.ng.label}</div>

            <img
              src={current.ng.image}
              alt={current.ng.title}
              className="stamp-image"
            />

            <h2>{current.ng.title}</h2>
            <p>{current.ng.text}</p>
          </div>

          <div className="stamp-card ok">
            <div className="stamp-label ok-label">{current.ok.label}</div>

            <img
              src={current.ok.image}
              alt={current.ok.title}
              className="stamp-image"
            />

            <h2>{current.ok.title}</h2>
            <p>{current.ok.text}</p>
          </div>
        </div>

        <button className="safe-button" onClick={onNext}>
          次へ進む
        </button>
      </div>
    </div>
  )
}

export default ActionGuide