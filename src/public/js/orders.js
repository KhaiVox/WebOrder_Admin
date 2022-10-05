// Check All
var courseItemCheckbox = $$('input[name="courseIds[]"]')
var selectAllOption = $('.form-select-option')
var notifyChecked = $('.notify-checked')

courseItemCheckbox.forEach(
    (item) =>
    (item.onchange = function() {
        var isChecked = $$('input[name="courseIds[]"]:checked').length

        if (isChecked > 0) {
            selectAllOption.removeAttribute('hidden')
            notifyChecked.innerHTML = `Bạn đã chọn <span>${isChecked}</span> mục`
        } else {
            selectAllOption.setAttribute('hidden', 'hidden')
            notifyChecked.innerHTML = ''
        }
        console.log(isChecked)
    }),
)

// Button show/hide detail
var boardDetail = $('.order-overview')
var btnShowDetail = $('.btn-show-detail')
var btnHideDetail = $('.btn-hide-detail')

function showDetail() {
    boardDetail.classList.remove('hidden')
    btnShowDetail.classList.add('hidden')
}

function hideDetail() {
    boardDetail.classList.add('hidden')
    btnShowDetail.classList.remove('hidden')
}