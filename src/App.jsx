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
import SoundConfirmScreen from './screens/SoundConfirmScreen'

import { useCurrentLocation } from './hooks/useCurrentLocation'
import { judgeRiskByLocation } from './utils/judgeRiskByLocation'

const DEFAULT_LOCATION_RISK = {
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
  const [soundType, setSoundType] = useState(null)
  const [locationRisk, setLocationRisk] = useState(DEFAULT_LOCATION_RISK)

  const {
    location,
    locationStatus,
    locationError,
    getCurrentLocation,
  } = useCurrentLocation()

  const currentDisasterKey =
    selectedDisaster && selectedDisaster.key
      ? selectedDisaster.key
      : 'earthquake'

  const startLocationCheck = () => {
    setIsCheckingLocation(true)

    getCurrentLocation()

    setTimeout(() => {
      const judgedRisk = judgeRiskByLocation(location)

      if (judgedRisk) {
        setLocationRisk({
          disaster: {
            key: judgedRisk.key,
            name: judgedRisk.name,
          },
          areaName: judgedRisk.areaName,
          riskLevel: judgedRisk.riskLevel,
        })
      }

      setIsCheckingLocation(false)
      setScreen('location')
    }, 1800)
  }

  const openSoundConfirm = (type) => {
    setSoundType(type)
    setScreen('sound-confirm')
  }

  if (screen === 'sound-confirm') {
    return (
      <SoundConfirmScreen
        soundType={soundType}
        onBack={() => setScreen('top')}
      />
    )
  }

  if (screen === 'bear') {
    return (
      <BearActionScreen
        onBack={() => setScreen('top')}
        onStartSound={() => openSoundConfirm('bear')}
      />
    )
  }

  if (screen === 'heat') {
    return (
      <HeatRiskScreen
        onBack={() => setScreen('top')}
        onStartSound={() => openSoundConfirm('help')}
      />
    )
  }

  if (screen === 'location') {
    return (
      <LocationCheck
        riskData={locationRisk}
        locationStatus={locationStatus}
        locationError={locationError}
        onBack={() => setScreen('top')}
        onNext={() => {
          setSelectedDisaster(locationRisk.disaster)
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
      isCheckingLocation={isCheckingLocation}
      locationStatus={locationStatus}
      locationError={locationError}
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