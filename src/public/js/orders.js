// Check All
// var courseItemCheckbox = document.querySelectorAll('input[name="courseIds[]"]')
// var selectAllOption = document.querySelector('.form-select-option')
// var notifyChecked = document.querySelector('.notify-checked')

// courseItemCheckbox.forEach(
//     (item) =>
//     (item.onchange = function() {
//         var isChecked = document.querySelectorAll('input[name="courseIds[]"]:checked').length

//         if (isChecked > 0) {
//             selectAllOption.removeAttribute('hidden')
//             notifyChecked.innerHTML = `Bạn đã chọn <span>${isChecked}</span> mục`
//         } else {
//             selectAllOption.setAttribute('hidden', 'hidden')
//             notifyChecked.innerHTML = ''
//         }
//         console.log(isChecked)
//     }),
// )

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