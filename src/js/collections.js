import './main';
import '../css/simplePagination.css'
import './plugin/jquery.simplePagination';
import {  site_map, number_format, allitems_api } from './plugin/until';

$(function () {
    let alldata, filterdata;

    let myUrl = site_map();
    let currentItem = $(".items").find("[href$='" + myUrl.main + "']");
    $(currentItem.parents("li").get().reverse()).each(function () {
        $(".breadcrumb").append($(this).children("a"));
    });

    async function default_load() {
        try {
            let json = await allitems_api()
            alldata = json.items;
            // console.log(json.items)
            display_list();
        } catch (e) {//失敗
            console.log(e);
        }
    }
    default_load();

    function display_list() {
        console.log("id"+myUrl.id)
        if (myUrl.id == '') {
            display_tag(alldata);
            mainPagenation(alldata, '');
        } else {
            // filter by keyword
            query_data();
            //產生tag
            display_tag(filterdata);
            //Pagenation
            !filterdata.length == true ? alert("no data") : mainPagenation(filterdata);
        }
    }

    function query_data() {
        // filter 全文檢索 by myUrl.id
        let results = [];
        console.log(alldata)
        for (let i = 0; i < alldata.length; i++) {
            for (let key in alldata[i]) {
                if (alldata[i][key].indexOf(myUrl.id) != -1) {
                    results.push(alldata[i]);
                }
            }
        }
        // ******* ******* 去除重複by id duplicate 
        filterdata = [...new Map(results.map(item => [item.id, item])).values()]
    }


    // 産生tag:不同分類 item.id
    function display_tag(objs) {

        console.log(objs)
        $(".select-div").empty();
        // 取得class
        const taglist = Object.values(objs).map(items => items.class);
        console.log(taglist)
        //去除重複
        let index = Array.from(new Set(taglist));
        // console.log(index)

        $(".select-div").append('<li data-target=all class="typebutton">ALL</li>')
        for (let i = 0; i < index.length; i++) {
            $(".select-div").append('<li data-target= ' + index[i] + ' class="typebutton">' + index[i] + '</li>')
        }
    }

    //click function data-target 
    $(document).on('click', '.typebutton', function (e) {
        $(this).addClass('active').siblings('li').removeClass('active');
        // filter by target
        selectorfilter($(this).data("target"));
    });

    // ?id=GE240#page-3  
    // tag filter  selectorfilter(table)=> 算頁數mainPagenation()
    function selectorfilter(q_tag) {
        let filterClass;
        let osdata = !!myUrl.id ? filterdata : alldata

        if (q_tag == "all") {
            filterClass = osdata;
        } else {
            // 下拉選單分類
            filterClass = osdata.filter(function (item, index, array) {
                return item.class == q_tag;
            });
        }
        mainPagenation(filterClass)
    }


    // 選擇頁數
    function mainPagenation(data, page) {
        let total = data.length;
        let perpage_item = 8;
        const this_page = $(".paginationss");
        // console.log(this_page)

        //  total page 總頁數 = 總筆數/每頁顯示筆數 perpage_item
        let totalpage = Math.ceil(total / perpage_item);
        let $pages = 0;//tool bar 顯示位子 除非pass page otherwise page 的
        if (page > 0) {
            $pages = page
        }
        $(".paginationss").pagination({
            items: data.length / perpage_item,
            displayedPages: 1,
            currentPage: $pages,
            prevText: "<",
            nextText: ">",
            cssStyle: 'light-theme',
            onPageClick: function (currentPageNumber) {
                showPage(currentPageNumber);
            }
        })


        $(".product_allitem").remove();
        // append per page structure 總頁數
        for (let p = 1; p <= totalpage; p++) {
            $('#product-all').append(`<div class="product_allitem"  id='page-${p}'></div>`);
            for (let x = 0; x < perpage_item; x++) {
                let max_num = p * perpage_item + (x + 1) - perpage_item;
                // let max_num = p * perpage_item - x + perpage_item;
                // p:第幾頁 perpage_item:每頁幾筆  
                // p1  1*6-(1-6)~(6-6)  ==> 1~6
                // p2 max  2*6 - (1-6) ==> 7
                // max:8 len:7
                if ((max_num - data.length) > 0) { break; }

                $("#page-" + p).append(`
                        <div class='search_div'> 
                            <figure class='search_items'><img class='kv_image' src='assets/images/${data[max_num - 1].id}_1.jpg'>
                            </figure>
                            <div>
                                <p class='list_item_name'>${data[max_num - 1].title}</p>
                                <p class='list_item_price'>$${number_format(data[max_num - 1].price)}</p >
                            </div>
                        </div>`)

                $(".search_div").on('click',function () {
                    let index = $(".search_div").index(this);
                    // console.log("index" + index);
                    window.location.href = './products.html?item_id=' + (data[index].id);
                });
            }
        }

        if (!page) {
            showPage(1)
        } else {
            showPage(page)
        }
    }


    function showPage(currentPageNumber) {
        let page = "#page-" + currentPageNumber;
        $('.product_allitem').hide();
        $(page).show();
        $('html, body').animate({
            scrollTop: 0
        }, 200);
    }
})
