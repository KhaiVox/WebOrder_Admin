var courseItemCheckbox = document.querySelectorAll('.order-check')
var selectAllOption = document.querySelector('.form-select-option')
var notifyChecked = document.querySelector('.notify-checked')
var btnAction = document.querySelector('.btn-action-check')

courseItemCheckbox.forEach(
    (item) =>
    (item.onchange = function() {
        var isChecked = document.querySelectorAll('input[name="food[]"]:checked').length

        if (isChecked > 0) {
            selectAllOption.removeAttribute('hidden')
            btnAction.removeAttribute('hidden')
            notifyChecked.innerHTML = `Bạn đã chọn <span>${isChecked}</span> mục`
        } else {
            selectAllOption.setAttribute('hidden', 'hidden')
            btnAction.setAttribute('hidden', 'hidden')
            notifyChecked.innerHTML = ''
        }
        // console.log(isChecked)
    }),
)

// Delete Action
var courseId
var btnDeleteCourse = document.getElementById('btn-delete-food')
var deleteForm = document.forms['delete-food-form']

// lấy id của item được nhấn
$('#delete-course-modal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    courseId = button.data('id')
})

// button delete ở form dialog
btnDeleteCourse.onclick = function() {
    // thêm action đường dẫn vào form delete vừa tạo
    deleteForm.action = '/foods/' + courseId + '?_method=DELETE'
    deleteForm.submit()
}

// nếu chưa có món ăn nào sẽ in ra dòng này
if (courseItemCheckbox.length == 0) {
    $('#form-des').html('<div class="notify"> Chưa có sản phẩm nào. <a href="/foods/create">Nhấn để thêm</a></div>')
    const pagination = document.querySelector('#paging')
    pagination.classList.add('hidden')
}