import "./main";
import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { searchId, site_map, number_format } from './plugin/until';

$(function () {
  var search_idno = (location.search).substring(9, 25);
  let myUrl = site_map();

  // breadcrumb
  let currentItem = $(".items").find("[href$='" + myUrl.main + "']");
  $(currentItem.parents("li").get().reverse()).each(function () {
    $(".breadcrumb").append($(this).children("a"));
  });
  $(currentItem).attr("href", "")

  $(window).on('resize', function () {
    if (window.matchMedia('(max-width: 767px)').matches) {
      console.log("767")
      // renderpage();
    }
  });



  // product no
  let search_id = (location.search).substring(9, 25);
  let myResponse;
  // console.log(allurl)
  searchId(search_id).then((res) => {
    if (res.items) {
      // json
        myResponse = res.items;
        myResponse = myResponse.find(function (item, index, array) {
          return item.id == search_id;
        })
    } else {
      //backend server
      myResponse = res;
    }
    renderpage();
  })


  function renderMinimg(search_item) {
    let mainContent = '';
    mainContent = `<img src='assets/images/${search_item.id}_1.jpg' alt="">
      <img src='assets/images/${search_item.id}_1.jpg' alt="" class="active">`;

    $(".prod_detail_pc>figure").append(mainContent);

    let htmlContent = ''
    for (let x = 1; x <= search_item.imgno; x++) {
      htmlContent += `
                        <figure class='protail_img'>
                        <img src='assets/images/${search_item.id}_${x}.jpg'>
                        </figure>`
    }
    $(".mini_pic").append(htmlContent)
  }

  function renderpage() {
    let search_item = [];
    if (myResponse) {
      // console.log(myResponse)
      search_item = myResponse;
      // TITLE
      $(".product_title").text(search_item.title);
      $(".card-text").text("$" + number_format(search_item.price))
      //加入shopping CAR
      $(".add_car").attr("data-price", search_item.price);
      $(".add_car").attr("data-id", search_item.id);

      // mobile swiper
      if (window.matchMedia('(max-width: 767px)').matches) {
        let htmls = ""
        for (let x = 1; x <= search_item.imgno; x++) {
          htmls += `<div class='swiper-slide'>
          <img src="assets/images/${search_item.id}_${x}.jpg"></div>`
        }
        
        const swiper = new Swiper(".mySwiper", {
          // modules: [Navigation, Pagination],
          pagination: {
            el: ".swiper-pagination",
          },
        });

        //  swiper.removeAllSlides();
        swiper.appendSlide(htmls);
        // swiper.appendSlide('<div class="swiper-slide">Slide 10"</div>')
        swiper.autoplay.start();

      } else {
        //大
        // $(".prod_detail_pc>figure img")
        //   .attr("src", "assets/images/" + search_item.id + "_1.jpg")
        renderMinimg(search_item)

        $(".mini_pic .protail_img:first-child").addClass('active');

        //click 商品小圖置換父層大圖
        $(".protail_img").on('click', function () {
          console.log($(this))
          //小図
          $(this).addClass('active').siblings("figure") //find sibling h3 elements
            .removeClass("active");

          let index = $(".protail_img").index(this);
          console.log(index)
          let place_img = $(this).find("img").attr("src");

          $(".list_img1 img:nth-child(2)").removeClass('active')
            .delay(100)
            .queue(function () {
              // this means acitve first
              $(this).parent().children().eq(0).attr("src", place_img);
              $(this).attr("src", place_img).addClass('active').dequeue();
            });
          return false;
        });

      }



      // let windowwidth = window.matchMedia("(max-width: 767px)")
      // console.log(windowwidth.matches)
      // if (windowwidth.matches) { // If media query matches
      //     for (x = 1; x <= search_item.imgno; x++) {
      //         $(".swiper-wrapper")
      //             .append("<div class='swiper-slide'><div class='slide-inner'> " +
      //                 "<img src=./images/cloversky/" + search_item.id + "_" + x + ".jpg alt=swpier" + x + ">" +
      //                 "</div></div>")
      //     }
      // } else {
      //     console.log(windowwidth.matches)
      //     renderMinimg(search_item)
      //     $(".mini_pic .protail_img:first-child").addClass('active');
      // }


      // tab click
      // $("#menu").on(click, function (e) {
        $("#menu").on('click', function (e) {
        if (e.target.tagName === 'P') {
          console.log($(e.target));
          $(e.target).addClass("active")
            .siblings("p") //find sibling h3 elements
            .removeClass("active"); // an++

          let pro_tile = $(e.target).attr("data-active");
          // console.log(pro_tile)
          $('#' + pro_tile).addClass("active")
            .siblings("div") //find sibling h3 elements
            .removeClass("active"); //
        }
      });

      $("#prod_data_size").append
        (`<li><span>Class</span><span>${search_item.class}</span></li>
                        <li><span>Size</span><span>${search_item.size}</span></li> 
                        <li><span>Color</span><span>${search_item.color}</span></li> 
                        <li><span>Material</span><span>${search_item.material}</span></li>`)

      $("#prod_data_detail").append
        (`<li><span>Descript</span><span>${search_item.descript}</span></li>`)
    }
  }

  $(".add_minus_btn").on('click',function () {
    let new_amt = parseInt($(".amount").val())
    // console.log("new_amt" + new_amt)
    $(".minus_cal").attr("disabled", false);

    if ($(this).hasClass("add_cal")) {
      $(".amount").val(new_amt + 1)
    } else {
      if (new_amt > 1) {
        $(".minus_cal").attr("disabled", false);
        $(".amount").val(new_amt - 1)
      } else {
        // $(".minus_cal").attr("disabled", "true");
      }
    }
  })


  // 加入購物車
  $(".add_car").on('click',function () {
    // 加入購物車
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    let product = $(this).closest(".card-body");
    let newItem = {
      name: $(".product_title").text(),
      price: $(".add_car").attr('data-price'),
      amount: product.find(".amount").val(),
      item_no: $(this).data("id")
    };
    // console.log(cart)
    // 如果沒   0==>1 有效果      空的==>1 沒效果
    if (newItem.amount == "" || newItem.amount == 0) {
      alert("請選擇數量");
      $(".amount").on(focus());
    } else {
      let this_new = newItem.name;
      console.log("this_new" + this_new)
      let data = JSON.parse(localStorage.getItem("cart"));
      // console.log(data)//null 現在的購物車0
      //判斷是否購物車中已有相同品項
      let result2 = $.map(data, function (item, index) {
        return item.name
      }).indexOf(this_new);
      if (result2 >= 0) {
        //已有相同品項
        alert("已訂購 請修改購物車")
        window.location.href = "project_shopcart.html";
      } else {
        //沒有的話就加入購物車
        // console.log(newItem)
        cart.push(newItem);
        localStorage.setItem("cart", JSON.stringify(cart));

        //==========cart replace k1 20220727備註
        // window.dispatchEvent(event);

        let data1 = JSON.parse(localStorage.getItem("cart"));
        $('.shopart_amount').css("display", "block")
        $('.shopart_amount')
          .text(data1.length)
          .addClass("cart-run");
        //==========cart replace k1 20220727備註

        // k1 localstorage setitem
        // window.localStorage.setItem('k1', JSON.stringify(cart));
        // window.dispatchEvent(event);

        // let data1 = JSON.parse(localStorage.getItem("k1"));
        // $('.shopart_amount').css("display", "block")
        // $('.shopart_amount')
        //   .text(data1.length)
        //   .addClass("cart-run");
        
        
        
        
        
      }
    }

  });


  // k1 localstorage  K1有效嗎
  const event = new Event('Storage', {
    key: "key",
    oldValue: "oldValue",
    newValue: "newValue",
    url: "url",
    storageArea: localStorage
  });
 
  // window.dispatchEvent(event);

 


})
