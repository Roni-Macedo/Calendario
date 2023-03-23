const calendarDays = document.querySelector('.calendar-days')
const calendarMonth = document.querySelector('.month')
const calendarYear = document.querySelector('.year')
const buttonNextPrev = document.querySelectorAll('.calendar-icon-btn span')
const display = document.querySelector('.display')
const modal = document.querySelector('.modal')
const newEvt = document.querySelector('.new-evt')
const currentEvt = document.querySelector('.current-evt')
const modalClose = document.querySelector('.modal-close')
const buttonCreate = document.querySelector('.button-create')
const buttonDelete = document.querySelector('.button-delete')
const modalInput = document.querySelector('.modal-input')
const textEvt = document.querySelector('.text-evt')

let date = new Date()
let year = date.getFullYear()
let month = date.getMonth()

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]


function renderCalendar() {
  // recebendo primeiro dia do mês
  let firstDayofMonth = new Date(year, month, 1).getDay(),
    // recebendo última data do mês
    lastDateofMonth = new Date(year, month + 1, 0).getDate(),
    // recebendo último dia do mês
    lastDayofMonth = new Date(year, month, lastDateofMonth).getDay(),
    // obtendo a última data do mês anterior
    lastDateofLastMonth = new Date(year, month, 0).getDate()

  let divTag = ''

  // Dias do mes anterior
  for (let i = firstDayofMonth; i > 0; i--) {
    divTag += `
      <div id="inative">${lastDateofLastMonth - i + 1}</div>
    `
  }

  // Dias do mes atual
  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? 'active'
        : ''
    divTag += `<div class="day" id="${isToday}">${i}</div>`
  }

  // Dias do prox. mes
  for (let i = 1; i < 7 - lastDayofMonth; i++) {
    divTag += `<div id="inative">${i}</div>`
  }
  calendarMonth.textContent = `${months[month]}`
  calendarYear.textContent = `${year}`
  calendarDays.innerHTML = divTag
  // loadEvent()
  // displayDateHors()
  // setInterval(displayDateHors, 60000)
}
renderCalendar()

function modalOpen(value) {
  if (! value.target.classList.contains('event')) {
    modal.showModal()
    currentEvt.style.display = 'none'
    buttonDelete.style.display = 'none'
    textEvt.style.display = 'none'
    newEvt.style.display = 'block'
    modalInput.style.display = 'block'
    buttonCreate.style.display = 'block'
  }
  if (value.target.classList.contains('event')) {
    modal.showModal()
    newEvt.style.display = 'none'
    modalInput.style.display = 'none'
    buttonCreate.style.display = 'none'
    currentEvt.style.display = 'block'
    textEvt.style.display = 'block'
    buttonDelete.style.display = 'block'
  }
}
// Evento button prev e next mês
buttonNextPrev.forEach(button => {
  button.addEventListener('click', () => {
    month = button.id === 'prev' ? month - 1 : month + 1
    if (month < 0 || month > 11) {
      date = new Date(year, month)
      year = date.getFullYear()
      month = date.getMonth()
    } else {
      date = new Date()
    }
    renderCalendar()
  })
})

calendarDays.addEventListener('click', evt => {
  modalOpen(evt)
  buttonCreate.onclick = () => {
    evt.target.classList.add('event')
    modal.close()
  }
})
modalClose.onclick = () => modal.close()
