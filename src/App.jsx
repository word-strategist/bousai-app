import { useState } from 'react'
import './App.css'
import ActionGuide from './components/ActionGuide'
import NextAction from './components/NextAction'
import ShelterGuide from './components/ShelterGuide'
import SafetyCheck from './components/SafetyCheck'
import FamilyContact from './components/FamilyContact'
import LocationCheck from './components/LocationCheck'

const MOCK_LOCATION_RISK = {
  disaster: {
    key: 'flood',
    name: '洪水',
  },
  areaName: '大阪市付近',
  riskLevel: 'やや高い',
}

const disasters = [
  {
    key: 'earthquake',
    label: '地震',
    icon: '🏚️',
    level: 4,
    title: '避難指示',
    color: 'orange',
    message: '強い揺れや建物倒壊に注意してください',
  },
  {
    key: 'flood',
    label: '洪水',
    icon: '🌊',
    level: 4,
    title: '避難指示',
    color: 'blue',
    message: '浸水のおそれがある場所から離れてください',
  },
  {
    key: 'fire',
    label: '火災',
    icon: '🔥',
    level: 4,
    title: '避難指示',
    color: 'red',
    message: '煙や炎からすぐに離れてください',
  },
]

function App() {
  const [selectedDisaster, setSelectedDisaster] = useState(disasters[0])
  const [screen, setScreen] = useState('top')

  if (screen === 'location') {
    return (
      <LocationCheck
        riskData={MOCK_LOCATION_RISK}
        onBack={() => setScreen('top')}
        onNext={() => {
          setSelectedDisaster(MOCK_LOCATION_RISK.disaster)
          setScreen('action')
        }}
      />
    )
  }
  
  if (screen === 'action') {
    return (
      <ActionGuide
        disaster={selectedDisaster.key}
        onBack={() => setScreen('top')}
        onNext={() => setScreen('next')}
      />
    )
  }

  if (screen === 'next') {
    return (
      <NextAction
        disaster={selectedDisaster.key}
        onBack={() => setScreen('location')}
        onShelter={() => setScreen('shelter')}
      />
    )
  }

  if (screen === 'shelter') {
    return (
      <ShelterGuide
        disaster={selectedDisaster.key}
        onBack={() => setScreen('next')}
        onTop={(next) => {
          if (next === 'contact') {
            setScreen('contact')
          } else {
            setScreen('top')
          }
        }}
      />
    )
  }

  if (screen === 'check') {
  return (
    <SafetyCheck
      disaster={selectedDisaster.key}
      onBack={() => setScreen('shelter')}
      onTop={(next) => {
        if (next === 'check') {
          setScreen('check')
        } else {
          setScreen('top')
        }
      }}
    />
  )

  if (screen === 'contact') {
  return (
    <FamilyContact
      disaster={selectedDisaster.key}
      onBack={() => setScreen('check')}
      onTop={() => setScreen('top')}
    />
  )
}

}

  return (
    <div className="app">
      <header className="top-header">
        <div className="brand">
          <div className="shield">✥</div>
          <div>
            <h1>防災ナビ</h1>
            <p>いざという時、命を守る行動を。</p>
          </div>
        </div>

        <button className="help-button">
          <span>?</span>
          使い方
        </button>
      </header>

      <main className="main">
        <section className="location-card">
          <div className="pin">📍</div>

          <div>
            <p>現在地（GPS）</p>
            <h2>岡山県真庭市付近</h2>
          </div>

          <button>再取得</button>
        </section>

        <section className={`alert-card ${selectedDisaster.color}`}>
          <div className="alert-left">
            <span>⚠️</span>
            <p>警戒レベル</p>
            <strong>{selectedDisaster.level}</strong>
          </div>

          <div className="alert-right">
            <h2>{selectedDisaster.title}</h2>
            <p className="alert-label">危険な場所から全員避難</p>
            <small>市町村からの避難情報に基づいています</small>
          </div>
        </section>

        <section className="hero-copy">
          <h2>
            その場で、
            <br />
            <span>正しい行動</span>ができますか？
          </h2>

          <p>
            災害時に必要なのは、長い説明ではなく
            <br />
            <strong>「今やること」</strong>
          </p>
        </section>

        <section className="feature-box">
          <h3>このアプリでわかること</h3>

          <div className="feature-grid">
            <div className="feature-card ng">
              <div className="feature-icon">🚫</div>
              <h4>やってはいけないこと</h4>
              <p>危険な行動を回避</p>
            </div>

            <div className="feature-card ok">
              <div className="feature-icon">⭕</div>
              <h4>今すること</h4>
              <p>安全を守る行動</p>
            </div>

            <div className="feature-card safe">
              <div className="feature-icon">📍</div>
              <h4>避難先・安全情報</h4>
              <p>避難場所や注意点</p>
            </div>
          </div>
        </section>

        <section className="disaster-section">
          <h3>選べる災害の種類</h3>

          <div className="disaster-grid">
            {disasters.map((disaster) => (
              <button
                key={disaster.key}
                className={`disaster-button ${disaster.color} ${
                  selectedDisaster.key === disaster.key ? 'active' : ''
                }`}
                onClick={() => setSelectedDisaster(disaster)}
              >
                <span>{disaster.icon}</span>
                {disaster.label}
              </button>
            ))}
          </div>
        </section>

        <section className="selected-guide">
          <p>現在選択中</p>
          <h3>{selectedDisaster.label}の行動ガイド</h3>
          <span>{selectedDisaster.message}</span>
        </section>

        <button className="primary-cta" onClick={() => setScreen('location')}>
          <span>▶</span>
          現在地から確認する
          <small>タップして行動ガイドを見る</small>
        </button>

        <footer className="notice">
          <p>※ 国の避難情報に関するガイドラインに基づき表示しています</p>
          <p>※ 実際の避難情報は自治体・気象庁等の発表を確認してください</p>
        </footer>
      </main>
    </div>
  )
}

export default App