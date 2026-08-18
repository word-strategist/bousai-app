import HomeScreen from './screens/HomeScreen'
import { useEffect, useState } from 'react'
import liff from '@line/liff'
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
import AdminInfoScreen from './screens/AdminInfoScreen'
import SuppliesScreen from './screens/SuppliesScreen'

import { useCurrentLocation } from './hooks/useCurrentLocation'
import { judgeRiskByLocation } from './utils/judgeRiskByLocation'

const LIFF_ID = '2010583885-uy5idWcR'

// =========================
// Demo Setting
// 地震フロー確認後に false へ戻す
// =========================
const EARTHQUAKE_DEMO_ENABLED = true

const DEFAULT_LOCATION_RISK = {
  disaster: {
    key: 'earthquake',
    name: '地震',
  },
  areaName: '現在地周辺',
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

        // =========================
  // 画面遷移時のスクロール位置
  // =========================
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [screen])

  useEffect(() => {
    liff
      .init({ liffId: LIFF_ID })
      .then(() => {
        console.log('LIFF initialized', {
          isInClient: liff.isInClient(),
          isLoggedIn: liff.isLoggedIn(),
        })
      })
      .catch((error) => {
        console.warn('LIFF initialization failed', error)
      })
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [screen])

  useEffect(() => {
  if (!location) return

  // =========================
  // Earthquake Demo
  // =========================
  if (EARTHQUAKE_DEMO_ENABLED) {
    setLocationRisk({
      disaster: {
        key: 'earthquake',
        name: '地震',
      },
      areaName: '現在地周辺',
      riskLevel: '高い',
    })

    return
  }

  // =========================
  // Location Risk Judgment
  // =========================
  const judgedRisk = judgeRiskByLocation(location)

  if (!judgedRisk) return

  setLocationRisk({
    disaster: {
      key: judgedRisk.key,
      name: judgedRisk.name,
    },
    areaName: judgedRisk.areaName,
    riskLevel: judgedRisk.riskLevel,
  })
}, [location])

  const startLocationCheck = () => {
    setIsCheckingLocation(true)

    getCurrentLocation()

    setTimeout(() => {
      setIsCheckingLocation(false)
      setScreen('location')
    }, 1800)
  }

  const openSoundConfirm = (type) => {
    setSoundType(type)
    setScreen('sound-confirm')
  }

  if (screen === 'admin-info') {
    return (
      <AdminInfoScreen
        onBack={() => setScreen('emergency')}
      />
    )
  }

  if (screen === 'supplies') {
    return (
      <SuppliesScreen
        onBack={() => setScreen('emergency')}
      />
    )
  }

  if (screen === 'sound-confirm') {
    return (
      <SoundConfirmScreen
        soundType={soundType}
        onBack={() => setScreen('emergency')}
      />
    )
  }

  if (screen === 'bear') {
    return (
      <BearActionScreen
        onBack={() => setScreen('emergency')}
      />
    )
  }

  if (screen === 'heat') {
    return (
      <HeatRiskScreen
        onBack={() => setScreen('emergency')}
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
        location={location}
        onBack={() => setScreen('top')}
        onNext={(riskKey) => {
          if (riskKey === 'bear') {
            setScreen('bear')
            return
          }

          if (riskKey === 'heat') {
            setScreen('heat')
            return
          }

          if (riskKey === 'earthquake') {
            setSelectedDisaster(disasters[0])
            setScreen('action')
          }
        }}
      />
    )
  }

  if (screen === 'emergency') {
    return (
      <EmergencyModeScreen
        onBack={() => setScreen('home')}
        onComplete={() => setScreen('action')}
      />
    )
  }

  if (screen === 'action') {
    if (currentDisasterKey === 'earthquake') {
      return (
        <EarthquakeActionScreen
          onBack={() => setScreen('emergency')}
          onNext={() => setScreen('check')}
        />
      )
    }

    if (currentDisasterKey === 'flood') {
      return (
        <FloodActionScreen
          onBack={() => setScreen('emergency')}
          onNext={() => setScreen('check')}
        />
      )
    }

    if (currentDisasterKey === 'fire') {
      return (
        <FireActionScreen
          onBack={() => setScreen('emergency')}
          onNext={() => setScreen('check')}
        />
      )
    }

    return (
      <ActionGuide
        disaster={currentDisasterKey}
        onBack={() => setScreen('emergency')}
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
        location={location}
        onBack={() => setScreen('next')}
        onNext={() => setScreen('check')}
      />
    )
  }

  if (screen === 'check') {
    return (
      <SafetyCheck
        disaster={currentDisasterKey}
        onBack={() => {
          if (currentDisasterKey === 'earthquake') {
            setScreen('action')
            return
          }

          setScreen('shelter')
        }}
        onTop={(next) => {
          if (next === 'completion') {
            setScreen('completion')
            return
          }

          if (next === 'contact') {
            setScreen('contact')
            return
          }

          setScreen('top')
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
      onStartEarthquakeDemo={() => {
      setSelectedDisaster(disasters[0])
      setScreen('emergency')
      }}
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
      onStartAdminInfo={() => setScreen('admin-info')}
      onStartSupplies={() => setScreen('supplies')}
    />
  )
}

export default App