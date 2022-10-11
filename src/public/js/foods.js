document.addEventListener('DOMContentLoaded', function() {
    var pag = $('#paging')
    pag.pagination({
            dataSource: [1, 2, 3, 4, 5, 6, 7],
            pageSize: 3,
            showGoInput: true,
            showGoButton: true,
        })
        // function load() {
        //     pag.pagination()
        // }
        // )
})