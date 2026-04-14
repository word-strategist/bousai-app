export const ALERT_LEVELS = {
  1: {
    level: 1,
    label: '警戒レベル1',
    shortLabel: 'レベル1',
    title: '心構えを高める',
    actionType: 'prepare',
    description: '最新情報に注意し、災害への心構えを高めてください。',
  },
  2: {
    level: 2,
    label: '警戒レベル2',
    shortLabel: 'レベル2',
    title: '避難行動を確認',
    actionType: 'confirm',
    description: '避難先や連絡手段、持ち出し品を確認してください。',
  },
  3: {
    level: 3,
    label: '警戒レベル3',
    shortLabel: 'レベル3',
    title: '高齢者等は避難',
    actionType: 'elderly-evacuate',
    description: '高齢者や介助が必要な方は避難を開始してください。',
  },
  4: {
    level: 4,
    label: '警戒レベル4',
    shortLabel: 'レベル4',
    title: '危険な場所から全員避難',
    actionType: 'evacuate',
    description: '危険な場所にいる人は全員避難してください。',
  },
  5: {
    level: 5,
    label: '警戒レベル5',
    shortLabel: 'レベル5',
    title: '直ちに身の安全を確保',
    actionType: 'emergency-safety',
    description: 'すでに災害が発生または切迫している可能性があります。',
  },
}

export const ALERT_LEVEL_OPTIONS = Object.values(ALERT_LEVELS)