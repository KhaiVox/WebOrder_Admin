// Slick Slide

$(document).ready(function() {
    $('.footer-list-product').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: `<button type='button' class='slick-prev pull-left'><ion-icon name="chevron-back-circle-outline"></ion-icon></button>`,
        nextArrow: `<button type='button' class='slick-next pull-right'><ion-icon name="chevron-forward-circle-outline"></ion-icon></button>`,
    })
})

// Delete Action
document.addEventListener('DOMContentLoaded', function() {
    var deleteBtn = $('.btn-delete-voucher')
    var deleteForm = document.forms['delete-voucher-action']

    // cú pháp thêm sự kiện cho từng nút khi onclick của JQuery
    deleteBtn.click(function(e) {
        // bỏ sự kiện mặc định của thẻ a
        e.preventDefault()

        var voucherId = $(this).data('id')
        deleteForm.action = '/home/vouchers/' + voucherId + '/force?_method=DELETE'
        deleteForm.submit()
    })
})