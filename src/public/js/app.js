const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Click xóa nội dung trong ô search
var btnDelete = $('.search-delete')
var inputSearch = $('.search-input')

btnDelete.onclick = function() {
    inputSearch.value = ''
}

// Fade
AOS.init()