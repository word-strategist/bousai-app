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
import CompletionScreen from './screens/CompletionScreen'

import BearActionScreen from './screens/BearActionScreen'
import HeatRiskScreen from './screens/HeatRiskScreen'
import EarthquakeActionScreen from './screens/EarthquakeActionScreen'
import FloodActionScreen from './screens/FloodActionScreen'
import FireActionScreen from './screens/FireActionScreen'

const MOCK_LOCATION_RISK = {
  disaster: {
    key: 'fire',
    name: '火災',
  },
  areaName: '大阪市付近',
  riskLevel: '高い',
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
  const [isCheckingLocation, setIsCheckingLocation] = useState(false)

  const currentDisasterKey =
    selectedDisaster && selectedDisaster.key
      ? selectedDisaster.key
      : 'earthquake'

  const startLocationCheck = () => {
    setIsCheckingLocation(true)

    setTimeout(() => {
      setIsCheckingLocation(false)
      setScreen('location')
    }, 1800)
  }

  if (screen === 'bear') {
    return (
      <BearActionScreen
        onBack={() => setScreen('top')}
      />
    )
  }

  if (screen === 'heat') {
    return (
      <HeatRiskScreen
        onBack={() => setScreen('top')}
      />
    )
  }

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
    if (currentDisasterKey === 'earthquake') {
      return (
        <EarthquakeActionScreen
          onBack={() => setScreen('top')}
          onNext={() => setScreen('shelter')}
        />
      )
    }

    if (currentDisasterKey === 'flood') {
      return (
        <FloodActionScreen
          onBack={() => setScreen('top')}
          onNext={() => setScreen('shelter')}
        />
      )
    }

    if (currentDisasterKey === 'fire') {
      return (
        <FireActionScreen
          onBack={() => setScreen('top')}
          onNext={() => setScreen('shelter')}
        />
      )
    }

    return (
      <ActionGuide
        disaster={currentDisasterKey}
        onBack={() => setScreen('top')}
        onNext={() => setScreen('next')}
      />
    )
  }

  if (screen === 'next') {
    return (
      <NextAction
        disaster={currentDisasterKey}
        onBack={() => setScreen('location')}
        onShelter={() => setScreen('shelter')}
      />
    )
  }

  if (screen === 'shelter') {
    return (
      <ShelterGuide
        disaster={currentDisasterKey}
        onBack={() => setScreen('next')}
        onNext={() => setScreen('check')}
      />
    )
  }

  if (screen === 'check') {
    return (
      <SafetyCheck
        disaster={currentDisasterKey}
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
        disaster={currentDisasterKey}
        onBack={() => setScreen('check')}
        onTop={() => setScreen('top')}
        onNext={() => setScreen('completion')}
      />
    )
  }

  if (screen === 'completion') {
    return (
      <CompletionScreen
        onTop={() => setScreen('top')}
      />
    )
  }

  return (
    <HomeScreen
      onStartLocationCheck={startLocationCheck}

      onSelectDisaster={(disaster) => {
        if (disaster.key === 'bear') {
          setScreen('bear')
          return
        }

        if (disaster.key === 'heat') {
          setScreen('heat')
          return
        }

        setSelectedDisaster(disaster)
        setScreen('action')
      }}

      onStartSafetyCheck={() => setScreen('check')}

      onStartShelterGuide={() => setScreen('shelter')}

      onStartFamilyContact={() => setScreen('contact')}
    />
  )
}

export default App