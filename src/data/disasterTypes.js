export const DISASTER_TYPES = [
  {
    key: 'flood',
    label: '洪水',
    icon: '💧',
    homeRiskLabel: '浸水のおそれ',
  },
  {
    key: 'landslide',
    label: '土砂',
    icon: '⛰️',
    homeRiskLabel: '土砂災害のおそれ',
  },
  {
    key: 'stormSurge',
    label: '高潮',
    icon: '🌊',
    homeRiskLabel: '高潮のおそれ',
  },
]

export function getDisasterType(key) {
  return DISASTER_TYPES.find((item) => item.key === key) || DISASTER_TYPES[0]
}