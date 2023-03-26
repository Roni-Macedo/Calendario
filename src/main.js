const calendarDays = document.querySelector('.calendar-days')
const calendarMonth = document.querySelector('.calendar-month h1')
const buttonNextPrev = document.querySelectorAll('.calendar-icon-btn span')
const display = document.querySelector('.display')

const modal = document.querySelector('.modal')
const modalEvent = document.querySelector('.modal-event')

const modalClose = document.querySelector('.modal-close')
const modalCloseEvent = document.querySelector('.modal-close-event')

const modalInput = document.querySelector('.modal-input')
const textEvent = document.querySelector('.text-event')

const buttonCreate = document.querySelector('.button-create')
const buttonDelete = document.querySelector('.button-delete')

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

let events = localStorage.getItem('events')
  ? JSON.parse(localStorage.getItem('events'))
  : []

function renderCalendar() {
  // recebendo primeiro dia do mês
  let firstDayofMonth = new Date(year, month, 1).getDay(),
    // recebendo última data do mês
    lastDateofMonth = new Date(year, month + 1, 0).getDate(),
    // recebendo último dia do mês
    lastDayofMonth = new Date(year, month, lastDateofMonth).getDay(),
    // obtendo a última data do mês anterior
    lastDateofLastMonth = new Date(year, month, 0).getDate()
  let tagDiv = ''

  // Dias do mes anterior
  for (let i = firstDayofMonth; i > 0; i--) {
    tagDiv += `<div id="inative">${lastDateofLastMonth - i + 1}</div>`
  }

  // Dias do mes atual
  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? 'active'
        : ''
    tagDiv += `
    <div id="${isToday}">
      <p class="day">${i}</p>
    </div>
    `
  }

  // Dias do prox. mes
  for (let i = 1; i < 7 - lastDayofMonth; i++) {
    tagDiv += `<div id="inative">${i}</div>`
  }
  calendarMonth.textContent = `${months[month]} ${year}`
  calendarDays.innerHTML = tagDiv

  loadEvent()
  displayDateHors()
  setInterval(displayDateHors, 60000)
}

function displayDateHors() {
  let weekDay = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })
  let hours = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
  display.textContent = weekDay + ' ' + hours
}

function loadEvent() {
  const calendarDay = document.querySelectorAll('.day')
  calendarDay.forEach(evt => {
    for (const key in events) {
      let eventDay =
        events[key].date === evt.textContent &&
        months[month] === events[key].month
      if (eventDay) {
        const dayEvt = document.createElement('p')
        dayEvt.textContent = events[key].title
        dayEvt.classList.add('event')
        evt.parentNode.appendChild(dayEvt)
        evt.classList.add(events[key].class)
      }
    }
  })
}

function saveEvent(key, value, evt) {
  if (modalInput.value) {
    events.push({
      date: key,
      month: months[month],
      title: value,
      class: 'day-event'
    })
    localStorage.setItem('events', JSON.stringify(events))

    const dayEvt = document.createElement('p')
    dayEvt.classList.add('event')
    dayEvt.textContent = value
    evt.target.parentNode.appendChild(dayEvt)
    evt.target.classList.add('day-event')
  }
}

function deleteEvent(click) {
  events = events.filter(event => event.date !== click)
  localStorage.setItem('events', JSON.stringify(events))
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
  for (const key in events) {
    if (evt.target.textContent === events[key].date) {
      textEvent.textContent = events[key].title
    }
  }

  if (!evt.target.classList.contains('day-event')) {
    modal.showModal()

    buttonCreate.onclick = () => {
      saveEvent(evt.target.textContent, modalInput.value, evt)
      evt.target.classList.add('day-event')
      modalInput.value = ''
      modal.close()
    }
  }
  if (evt.target.classList.contains('day-event')) {
    modalEvent.showModal()
    buttonDelete.onclick = () => {
      deleteEvent(evt.target.textContent)
      renderCalendar()
      modalEvent.close()
    }
  }
})
modalCloseEvent.onclick = () => modalEvent.close()
modalClose.onclick = () => modal.close()
renderCalendar()
