document.addEventListener('DOMContentLoaded', function() {
    // luôn hiển thị 1 trang trong lần đầu load trang
    loadPage(1)
    $('#paging').pagination({
        // call đến api của 1 trang bất kì để lấy giá trị total
        dataSource: '/foods?page=1',
        locator: 'data',
        totalNumberLocator: function(res) {
            return res.total
        },
        pageSize: 2,
        showGoInput: true,
        showGoButton: true,

        // lấy ra vị trí page được active
        afterPageOnClick: function(e, pageNumber) {
            loadPage(pageNumber)
        },
        afterPreviousOnClick: function(e, pageNumber) {
            loadPage(pageNumber)
        },
        afterNextOnClick: function(e, pageNumber) {
            loadPage(pageNumber)
        },
        // nhập số trang trong ô input và nhấn Enter
        afterGoInputOnEnter: function(e, pageNumber) {
            loadPage(pageNumber)
        },
        // click button Go
        afterGoButtonOnClick: function(e, pageNumber) {
            loadPage(pageNumber)
        },
    })
})

function loadPage(page) {
    $.ajax({
        url: '/foods?page=' + page,
        type: 'GET',
    }).then((result) => {
        // trước khi render ra list khác cần ẩn toàn bộ list cũ
        $('#form-des').html('')
        for (let i = 0; i < result.data.length; i++) {
            const element = result.data[i]
            var item = `
                    <ul class='row list-des'>
                        <li class='col-lg-1 list-item-des'><input
                                class='order-check'
                                type='checkbox'
                                name='courseIds[]'
                            /></li>
                        <li class='col-lg-1 list-item-des'>${element.id}</li>
                        <li class='col-lg-2 list-item-des'>
                            <img
                                class='product-img'
                                src=${element.img}
                                alt=''
                            />
                        </li>
                        <li class='col-lg-2 list-item-des'>${element.name}</li>
                        <li class='col-lg-2 list-item-des'>${element.type}</li>
                        <li class='col-lg-2 list-item-des item-total'>${element.price}.000 đ</li>
                        <li class='col-lg-2 list-item-des'>
                            <div class='btn-wrap'>
                                <span class='btn-delete'><ion-icon name="close-outline"></ion-icon></span>
                                <span class='btn-delete'><ion-icon name="create-outline"></ion-icon></span>
                            </div>
                        </li>
                    </ul>
                `
            $('#form-des').append(item)
        }
    })
}