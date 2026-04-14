export function judgeAction({
  alertLevel,
  disasterType,
  isVulnerable,
  homeRisk,
  canMoveUpstairs,
  outsideTooDangerous,
}) {
  const isHomeHighRisk = homeRisk === 'high'
  const isHomeMediumRisk = homeRisk === 'medium'

  if (alertLevel === 5) {
    if (outsideTooDangerous) {
      return {
        action: '直ちに身の安全を確保',
        subAction: canMoveUpstairs
          ? '外へ出るより、建物の上階やより安全な場所へ移動してください。'
          : '崖・川・浸水箇所から離れた、できるだけ安全な部屋へ移動してください。',
        cta: '安全確保のポイントを見る',
        actionMode: 'indoor-safety',
      }
    }

    return {
      action: '直ちに身の安全を確保',
      subAction: '近くのより安全な建物や上階へ、すぐ移動してください。',
      cta: '今すぐ行動する',
      actionMode: 'emergency-move',
    }
  }

  if (alertLevel === 4) {
    if (isHomeHighRisk && !outsideTooDangerous) {
      return {
        action: '危険な場所から避難',
        subAction: '自宅が危険な可能性があります。指定避難所や安全な場所へ移動してください。',
        cta: '避難先を見る',
        actionMode: 'evacuate',
      }
    }

    if (outsideTooDangerous && canMoveUpstairs) {
      return {
        action: '屋内安全確保',
        subAction: '外へ出ることが危険です。建物の上階や高い場所へ移動してください。',
        cta: '安全な行動を見る',
        actionMode: 'indoor-safety',
      }
    }

    if (isHomeMediumRisk && canMoveUpstairs) {
      return {
        action: '避難または屋内安全確保を判断',
        subAction: '危険が高まっています。外へ出られるなら避難、難しければ上階へ移動してください。',
        cta: '行動を確認する',
        actionMode: 'hybrid',
      }
    }

    return {
      action: '危険な場所から全員避難',
      subAction: '危険な場所にいる人は避難を開始してください。',
      cta: '避難先を見る',
      actionMode: 'evacuate',
    }
  }

  if (alertLevel === 3) {
    if (isVulnerable) {
      return {
        action: '高齢者等は避難',
        subAction: '高齢者・介助が必要な方は、危険な場所から避難を始めてください。',
        cta: '避難準備を確認する',
        actionMode: 'elderly-evacuate',
      }
    }

    if (isHomeHighRisk) {
      return {
        action: '避難の準備を急ぐ',
        subAction: `${disasterType}の危険があります。避難先、家族連絡、持ち出し品を今すぐ確認してください。`,
        cta: '準備を確認する',
        actionMode: 'prepare-fast',
      }
    }

    return {
      action: '避難の準備',
      subAction: '家族連絡、持ち出し品、避難先を確認してください。',
      cta: '準備を確認する',
      actionMode: 'prepare',
    }
  }

  if (alertLevel === 2) {
    return {
      action: '避難行動を確認',
      subAction: '自宅の危険性、避難先、連絡手段を確認してください。',
      cta: '確認する',
      actionMode: 'confirm',
    }
  }

  return {
    action: '心構えを高める',
    subAction: '気象情報や自治体からのお知らせに注意してください。',
    cta: '最新情報を見る',
    actionMode: 'prepare',
  }
}

export function getShelterCards(actionMode) {
  if (actionMode === 'indoor-safety') {
    return [
      {
        title: '建物の上階へ移動',
        description: '浸水や土砂から離れられる、より高い場所へ移動してください。',
      },
      {
        title: '崖・川から離れた部屋へ',
        description: '窓際や危険な方向を避け、できるだけ安全な部屋へ移動してください。',
      },
    ]
  }

  return [
    {
      title: '指定避難所（デモ表示）',
      description: '最寄りの指定避難所へ移動する想定です。',
    },
    {
      title: '近くの安全な建物',
      description: '公民館・学校・親戚宅など、安全を確保できる場所も候補です。',
    },
  ]
}