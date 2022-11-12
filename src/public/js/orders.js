// Button show/hide detail
var boardDetail = document.querySelector('.order-overview')
var btnShowDetail = document.querySelector('.btn-show-detail')
var btnHideDetail = document.querySelector('.btn-hide-detail')

function showDetail() {
    boardDetail.classList.remove('hidden')
    btnShowDetail.classList.add('hidden')
}

function hideDetail() {
    boardDetail.classList.add('hidden')
    btnShowDetail.classList.remove('hidden')
}

// Display Date
const valueDay = document.querySelectorAll('.day_value')
valueDay.forEach((item) => (item.innerText = item.innerText.slice(0, 24)))

// Display Status Order
let valueCountStateFalse = 0
let valueCountStateTrue = 0
const valueState = document.querySelectorAll('.btn-status')
for (let i of valueState) {
    if (i.innerText == 'true') {
        valueCountStateTrue++
        i.innerText = 'Đã duyệt'
        i.classList.add('btn-status--green')
    } else {
        valueCountStateFalse++
        i.innerText = 'Chưa duyệt'
        i.classList.add('btn-status--red')
    }
}

// Update total state
const countStateFalse = document.querySelector('.overview-des--false')
const countStateTrue = document.querySelector('.overview-des--true')

countStateTrue.innerText = `(${valueCountStateTrue})`
countStateFalse.innerText = `(${valueCountStateFalse})`