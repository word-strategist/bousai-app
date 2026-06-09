export function judgeRiskByLocation(location) {
  if (!location) return null

  const { lat, lng } = location

  // =========================
  // Demo Area: 洪水
  // =========================
  // 現在のGPS確認地点周辺を、洪水リスクのデモ判定にする
  if (
    lat >= 34.7 &&
    lat <= 34.9 &&
    lng >= 136.3 &&
    lng <= 136.5
  ) {
    return {
      key: 'flood',
      name: '洪水',
      areaName: '現在地周辺',
      riskLevel: 'やや高い',
    }
  }

  // =========================
  // Demo Area: 熊
  // =========================
  // 山間部デモ用
  if (
    lat >= 35.0 &&
    lat <= 36.5 &&
    lng >= 136.0 &&
    lng <= 138.0
  ) {
    return {
      key: 'bear',
      name: '熊',
      areaName: '山間部周辺',
      riskLevel: '注意',
    }
  }

  // =========================
  // Demo Area: 暑さ
  // =========================
  // その他の地域は暑さリスクとして扱う
  return {
    key: 'heat',
    name: '暑さ',
    areaName: '現在地周辺',
    riskLevel: '注意',
  }
}