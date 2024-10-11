import RangeManager from '@/components/RangeManager'

document.addEventListener('DOMContentLoaded', () => {
  // Находим элемент input[type="range"] в документе
  const rangeInput = document.querySelector('.input-range__input')
  if (!rangeInput) return
  const minElement = document.querySelector(
    '.range-boundary.range-boundary--min',
  )
  const maxElement = document.querySelector(
    '.range-boundary.range-boundary--max',
  )
  // Создаем экземпляр класса InputRangeManager
  const manager = new RangeManager(rangeInput, {
    minValueElement: minElement,
    maxValueElement: maxElement,
  })
  manager.setMin(0) // Установить минимальное значение 0
  // console.log(manager.getMin()) // Вывод минимального значения
  manager.setMax(100000) // Установить максимальное значение 100000
  // console.log(manager.getMax()) // Вывод максимального значения
  // Пример использования методов класса
  manager.setStep(1000) // Установить шаг 1000
  // console.log(manager.getStep()) // Вывод шага
  manager.setValue(35000) // Установить значение 35000
  // console.log(manager.getValue()) // Вывод текущего значения

  // Показать текущие значения
  // console.log(`Current value: ${manager.getValue()}`)
  // console.log(`Min value: ${manager.getMin()}`)
  // console.log(`Max value: ${manager.getMax()}`)
  // console.log(`Step value: ${manager.getStep()}`)
})
