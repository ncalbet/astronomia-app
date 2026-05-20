const WORDS_PER_MINUTE = 200

function countWords(text = '') {
  return text.trim().split(/\s+/).filter(Boolean).length
}

// Temps en segons per cada tipus de bloc
function blockSeconds(block) {
  switch (block.type) {
    case 'narrative':
    case 'key-idea':
      return Math.ceil(countWords(block.text) / WORDS_PER_MINUTE * 60)

    case 'expandable':
      // El contingut és optatiu; comptem el label i la meitat del cos
      return Math.ceil(
        (countWords(block.label) + countWords(block.content) * 0.5) / WORDS_PER_MINUTE * 60
      )

    case 'exercise':
      return 60

    case 'scientific-mode':
      return 90

    case 'debate':
      return 60

    case 'prediction':
    case 'reflection':
      return 30

    case 'timeline':
      return 20 * (block.events?.length || 1)

    case 'misconception':
      return Math.ceil(
        (countWords(block.belief) + countWords(block.reality)) / WORDS_PER_MINUTE * 60
      )

    case 'comparison':
      return 30 + 10 * (block.items?.length || 0)

    case 'quote':
    case 'connection':
    case 'image':
      return 20

    default:
      return 20
  }
}

export function estimateReadingMinutes(blocks = []) {
  const totalSeconds = blocks.reduce((acc, b) => acc + blockSeconds(b), 0)
  return Math.max(1, Math.round(totalSeconds / 60))
}
