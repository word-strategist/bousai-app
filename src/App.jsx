import HomeScreen from './screens/HomeScreen'
import { useState } from 'react'
import './App.css'
import ActionGuide from './components/ActionGuide'
import NextAction from './components/NextAction'
import ShelterGuide from './components/ShelterGuide'
import SafetyCheck from './components/SafetyCheck'
import FamilyContact from './components/FamilyContact'
import LocationCheck from './components/LocationCheck'
import EmergencyModeScreen from './screens/EmergencyModeScreen'

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

  if (screen === 'emergency') {
    return (
      <EmergencyModeScreen
        onComplete={() => setScreen('action')}
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
        onNext={() => setScreen('check')}
      />
    )
  }

  if (screen === 'check') {
    return (
      <SafetyCheck
        disaster={selectedDisaster.key}
        onBack={() => setScreen('shelter')}
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

  if (screen === 'contact') {
    return (
      <FamilyContact
        disaster={selectedDisaster.key}
        onBack={() => setScreen('check')}
        onTop={() => setScreen('top')}
      />
    )
  }

  return (
    <HomeScreen
      selectedDisaster={selectedDisaster}
      disasters={disasters}
      onSelectDisaster={setSelectedDisaster}
      onStartLocationCheck={() => setScreen('emergency')}
    />
  )
}

export default App