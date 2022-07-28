import "./main";
import axios from "axios";
import { allurl, urltype, number_format, getLogin_status } from './plugin/until';

$(function () {
  $("#btn_logout").on('click', function () {
    axios.get(allurl + `/reirasys_api/logout.php`, { withCredentials: true })
      .then(response => {
        // console.log(response.data)
        window.location.href = "project_cloversky_member.html";
      })
  });

  //safari 100vh bug
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  setCart();

  $.each(cart, function (i) {
    $(".tb_shopcart tbody").append(`<tr><td id='fname0'>
                <a href='./products.html?item_id=${cart[i].item_no}'>
                    <img src='assets/images/${cart[i].item_no}_1.jpg' alt=''>
                </a>             
            </td> 
            <td id='fname1'>
                <a href='./products.html?item_id=${cart[i].item_no}'>
                    <p>${cart[i].name}</p>
                    <p>${number_format(cart[i].price)}</p>
                </a> 
            </td>
            <td id='fname2'  > 
                <div class='price_col'> 
                    <button class='add_minus_btn shop_cart_btn minus_cal'><span>-</span></button> 
                    <input type='num' class='carlist_amount' min='1' value='${cart[i].amount}' disabled='disabled'> 
                    <button class='add_minus_btn shop_cart_btn add_cal'><span>+</span></button> 
                </div>
            </td>                                    
            <td id='fname3'>${number_format(cart[i].amount * cart[i].price)}</td> 
            <td id='fname4'><button class='btn_remove'><i class='fas fa-times'></i></button></td>
        </tr>`)
  });

  function setCart() {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    let s_price = 0, total = 0;
    for (let $i = 0; $i < cart.length; $i++) {
      s_price = cart[$i]["price"] * cart[$i]["amount"];
      total += s_price;
    }
    $("#car_total").text(number_format(total));


    //==========cart replace k1 20220727備註 上一頁or沒更新
    let data1 = JSON.parse(localStorage.getItem("cart"));
    
    if (!data1) {
      $('.shopart_amount').css("display", "none")
    } else {
      if (!data1.length) {  
        $('.shopart_amount').css("display", "none")
      } else {
        $('.shopart_amount').text(data1.length)
      }
    }
    //==========cart replace k1 20220727備註 上一頁or沒更新
  }

  // 變更數量
  $('.carlist_amount').on('input', function (e) {
      e.preventDefault();
      let e_content = $(this).val();
      let row_index = $(this).closest("tr").index();
      let new_price = number_format(e_content * cart[row_index].price)
      $(this).parent().next().text(new_price);
    
      let amount_old = JSON.parse(localStorage.getItem("cart"))
      amount_old[row_index].amount = e_content;
      localStorage.setItem("cart", JSON.stringify(amount_old));

      setCart();
  })

  // 移除
  $(".btn_remove").on('click',function (e) {
    e.preventDefault();

    // 取得刪除的row index
    let row_index = $(this).closest("tr").index();
    let old = JSON.parse(localStorage.getItem("cart"))
    old.splice(row_index, 1);
 
    localStorage.setItem("cart", JSON.stringify(old));
    setCart();

    $(this).closest('tr').remove();
  })

  // 變更數量加減 金額
  $(".add_minus_btn").on('click',function (e) {
    e.preventDefault();
    let row_index = $(this).closest("tr").index();

    let $a = $(".carlist_amount");
    let new_amt = parseInt($a.eq(row_index).val());
    // console.log(new_amt)

    let $a_btn = $(".minus_cal");

    if ($(this).hasClass("add_cal")) {
      $a.eq(row_index).val(new_amt + 1);
    } else {
      if (new_amt > 1) {
        $a_btn.eq(row_index).attr("disabled", false);
        $a.eq(row_index).val(new_amt - 1);
      } 
    }

    let new_price = number_format(cart[row_index].price * $(".carlist_amount:eq(" + row_index + ")").val());
    // console.log("new_price" + new_price)
    $(this).closest("td").next().text(new_price)

    // 寫入local storage
    let amount_old = JSON.parse(localStorage.getItem("cart"))
    amount_old[row_index].amount = $a.eq(row_index).val();;
    localStorage.setItem("cart", JSON.stringify(amount_old));

    setCart();

  })

  // JSON.parse 將 JSON 字串轉換為物件。 if 沒登入data:n,data.IsLogin:undefined
  // JSON.stringify 將陣列轉換為 JSON 字串

  // --- 清除購物車 ---
  $("#btn_Clearall").on("click", function () {
    // console.log("clearall")

    $(this).closest("tr").remove();
    cart = [];
    localStorage.removeItem("cart");

    $(".tb_shopcart tbody").empty();
    setCart();
  });


  $("#btn_checkout").on("click", function (e) {
    if (urltype == "http://localhost") {
      getLogin_status().then((data) => {
        console.log(data)
        if (data.IsLogin) { 
          console.log("login  sucess")
          window.location.href = "project_shopcart_step1.html";
        } else {
          console.log("請先登入");
          window.location.href = "login.html";
        }
      })
    } else {
      if (localStorage.getItem("token")) { 
        window.location.href = "project_shopcart_step1.html";
      } else {
        console.log("請先登入");
        window.location.href = "login.html";
      }


    }
  });

 
});
