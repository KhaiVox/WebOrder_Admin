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

// Xóa voucher
document.addEventListener('DOMContentLoaded', function() {
    const deleteBtn = $('.btn-delete-voucher')
    const deleteForm = document.forms['delete-voucher-action']

    // cú pháp thêm sự kiện cho từng nút khi onclick của JQuery
    deleteBtn.click(function(e) {
        // bỏ sự kiện mặc định của thẻ a
        e.preventDefault()

        const voucherId = $(this).data('id')
        deleteForm.action = '/home/vouchers/' + voucherId + '/force?_method=DELETE'
        deleteForm.submit()
    })
})

// Danh sách sản phẩm
let footerItems = document.querySelectorAll('.footer-item-product')
let footerImages = document.querySelectorAll('.footer-item-img')
let footerNames = document.querySelectorAll('.footer-item-name')
let footerPrices = document.querySelectorAll('.footer-item-price')
let listDetails = document.querySelector('.form-des__wrap')
let arr = []
let newArray = []

function handleDelete(buttonDlt) {
    buttonIndex = buttonDlt.getAttribute('data-id') - 1
    arr.splice(buttonIndex, 1)

    // cập nhật lại thông tin sau mỗi thay đổi
    handleAdd()
    changeTotal()
    changeQuantity()
}

function handleAdd() {
    listDetails.innerHTML = ''

    for (let i = 0; i < arr.length; i++) {
        let html = `
                    <ul class='row list-des'>
                        <li class='col-lg-1 list-item-des'>${i + 1}</li>
                        <li class='col-lg-1 list-item-des'>
                            <img
                                class='product-img'
                                src= ${arr[i].imgValue}
                                alt=''
                            />
                        </li>
                        <li class='col-lg-3 list-item-des'>${arr[i].nameValue}</li>
                        <li class='col-lg-2 list-item-des'>
                            <input
                                class='input-quantity'
                                type='number'
                                name='quantity'
                                value='${arr[i].numberValue}'
                                min='1'
                                max='5'
                                data-id='${i + 1}'
                                onchange="updatePrice(this)"
                            />
                        </li>
                        <li class='col-lg-2 list-item-des item-total item-price' data-id='${i + 1}'>${arr[i].priceValue}</li>
                        <li class='col-lg-2 list-item-des item-total'>${arr[i].totalValue}</li>
                        <li class='col-lg-1 list-item-des'>
                            <span data-id='${
                                i + 1
                            }' class='btn-delete' onclick="handleDelete(this)"><ion-icon name='close-outline'></ion-icon></span>
                        </li>
                    </ul>
                `
        let item = document.createElement('div')
        item.classList.add('form-des')
        item.innerHTML = html
        listDetails.append(item)
    }
}

for (let i = 0; i < footerItems.length; i++) {
    footerItems[i].addEventListener('click', function() {
        let imgValue = footerImages[i].src
        let nameValue = footerNames[i].innerText
        let priceValue = footerPrices[i].innerText
        let numberValue = 1
        let totalValue = footerPrices[i].innerText

        arr.push({ imgValue, nameValue, priceValue, numberValue, totalValue })
            // arr.forEach((item) => {
            //     if (newArray.find((ele) => ele.name == item.name)) {
            //         console.log('da co')
            //     } else {
            //         newArray.push(item)
            //         console.log('chua co')
            //     }
            // })

        handleAdd()
        changeTotal()
        changeQuantity()
    })
}

function updatePrice(input) {
    let value = input.value
    let valueIndex = input.getAttribute('data-id') - 1
    let priceItem = document.getElementsByClassName('item-price')[valueIndex].innerText
    let total = parseInt(priceItem) * parseInt(value)
    arr[valueIndex].numberValue = value
    arr[valueIndex].totalValue = total

    handleAdd()
    changeTotal()
    changeQuantity()
}

// cập nhật số lượng của từng sản phẩm
function changeTotal() {
    let count = 0
    var numberTotal = document.querySelector('.number-total')
    for (let i in arr) {
        count += parseInt(arr[i].totalValue)
    }
    numberTotal.innerText = count
}

// cập nhật tiền thừa
function handleCharge() {
    let count = 0
    for (let i in arr) {
        count += parseInt(arr[i].totalValue)
    }
    let numberRefund = document.querySelector('.pill-des-total')
    let numberInput = document.querySelector('.pill-des-input')
    let chargeValue = parseInt(numberInput.value)
    if (chargeValue >= count) {
        numberRefund.innerText = chargeValue - count
    } else {
        alert("Số tiền phải trả tối thiểu " + count + ".000 đ")
    }
}

// cập nhật số lượng tổng ở thanh list heading 
function changeQuantity() {
    let countQtt = 0
    let quantity = document.querySelector('.quantity')
    for (let i in arr) {
        countQtt += parseInt(arr[i].numberValue)
    }
    quantity.innerText = countQtt
}
//
// function loadPage(type) {
//     if (type == 1) {
//         type = "food"
//     }
//     $.ajax({
//         url: '/home/' + type,
//         type: 'GET',
//     }).then((result) => {
//         // console.log($('#footer-list-product'));
//         $('#footer-list-product').html('')
//         for (let i = 0; i < result.products.length; i++) {
//             const element = result.products[i]
//             var item = `<h1>${element.name}</h1>`
//                 // var item = `
//                 //     <div class='footer-item-product'>
//                 //         <img class='footer-item-img' src=<h1>${element.img} alt={{name}} />
//                 //         <h4 class='footer-item-name'>${element.name}</h4>
//                 //         <div class="footer-item-price-wrap" style="display: flex;">
//                 //             <h5 class='footer-item-price'>${element.price}</h5><h5>.000 đ</h5>
//                 //         </div>
//                 //     </div>
//                 //     `
//             $('#footer-list-product').append(item)
//             console.log(result.products[i]);
//         }
//     })
// }

// document.addEventListener('DOMContentLoaded', function() {
//     loadPage(1)
// })