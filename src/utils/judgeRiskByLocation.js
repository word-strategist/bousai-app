export function judgeRiskByLocation(location) {
  if (!location) return null

  return {
    key: 'flood',
    name: '洪水',
    areaName: '現在地付近',
    riskLevel: 'やや高い',
  }
}