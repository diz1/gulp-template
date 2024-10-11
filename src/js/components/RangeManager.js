export default class RangeManager {
  constructor(inputElement, options = {}) {
    if (
      !(inputElement instanceof HTMLInputElement) ||
      inputElement.type !== 'range'
    ) {
      throw new Error(
        'Invalid input element. It should be an input element of type "range".',
      )
    }
    this.inputElement = inputElement
    this.minValueElement = options.minValueElement
    this.maxValueElement = options.maxValueElement
    this.createTooltip()
    this.updateTooltipPosition()
    this.updateBoundaryValues()
    this.currentCallback = null
    this.attachChangeListener(() => this.updateTooltipPosition())
  }

  setValue(value) {
    const minValue = parseFloat(this.inputElement.min) || 0
    const maxValue = parseFloat(this.inputElement.max) || 100

    if (value < minValue || value > maxValue) {
      throw new Error(`Value should be between ${minValue} and ${maxValue}.`)
    }

    this.inputElement.value = String(value)
    this.updateTooltipPosition()
  }

  getValue() {
    return parseFloat(this.inputElement.value)
  }

  setMin(minValue) {
    this.inputElement.min = String(minValue)
    this.updateBoundaryValues()
    this.updateTooltipPosition()
  }

  getMin() {
    return parseFloat(this.inputElement.min) || 0
  }

  setMax(maxValue) {
    this.inputElement.max = String(maxValue)
    this.updateBoundaryValues()
    this.updateTooltipPosition()
  }

  getMax() {
    return parseFloat(this.inputElement.max) || 100
  }

  setStep(stepValue) {
    this.inputElement.step = String(stepValue)
  }

  getStep() {
    return parseFloat(this.inputElement.step) || 1
  }

  createTooltip() {
    this.tooltip = document.createElement('div')
    this.tooltip.className = 'input-range__tooltip'
    this.tooltip.style.position = 'absolute'
    this.tooltip.style.transform = 'translate(-50%, -100%)'
    this.inputElement.parentElement.appendChild(this.tooltip)
    this.updateTooltipPosition()
  }

  updateTooltipPosition() {
    const rect = this.inputElement.getBoundingClientRect()
    const minValue = this.getMin()
    const maxValue = this.getMax()
    const value = this.getValue()
    const valuePercentage = ((value - minValue) / (maxValue - minValue)) * 100
    const thumbHeight = rect.height // примерно равняется высоте бегунка

    this.tooltip.innerText = `${value}`

    // Позиция относительно родителя, с учётом ширины ползунка и центрирования тултипа
    const offset =
      ((rect.width - thumbHeight) * valuePercentage) / 100 + thumbHeight / 2

    this.tooltip.style.left = `${offset}px`
  }

  attachChangeListener(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback should be a function.')
    }
    if (this.currentCallback) {
      this.removeChangeListener()
    }
    this.inputElement.addEventListener('input', callback)
    this.currentCallback = callback
  }

  removeChangeListener() {
    if (this.currentCallback) {
      this.inputElement.removeEventListener('input', this.currentCallback)
      this.currentCallback = null
    } else {
      // console.log('No change listener to remove.')
    }
  }

  updateBoundaryValues() {
    this.minValueElement.innerText = this.getMin()
    this.maxValueElement.innerText = this.getMax()
  }
}
