import { useState } from 'react'

export function useCurrentLocation() {
  const [location, setLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('idle')
  const [locationError, setLocationError] = useState('')

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error')
      setLocationError('この端末では現在地を取得できません')
      return
    }

    setLocationStatus('loading')
    setLocationError('')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        })
        setLocationStatus('success')
      },
      () => {
        setLocationStatus('error')
        setLocationError('現在地の取得が許可されませんでした')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  return {
    location,
    locationStatus,
    locationError,
    getCurrentLocation,
  }
}