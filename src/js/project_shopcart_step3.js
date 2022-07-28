import "./main";
import { urltype, getLogin_status, allurl, number_format, process_color } from './plugin/until';

$(function () {
  if (urltype == "http://localhost") {
    getLogin_status().then((data) => {
      if (data.IsLogin) {
        console.log("login sucess")
        $.ajax({
          type: 'get',
          url: allurl + '/reirasys_api/order_no.php',
          xhrFields: {
            withCredentials: true
          },
          dataType: 'json',
          success: function (data) {
            console.log(data)   //訂購人資料
            console.log(data.list)//明細資料
            renderInfo(data)
            renderShopcart(data.list)
        
          }
        })

      } else {
        console.log("請先登入");
        window.location.href = "login.html";
      }
    })
  } else {
    if (localStorage.getItem("token")) {
      let info = JSON.parse(localStorage.getItem("userinfo"));
      renderInfo(info)
      let cart = JSON.parse(localStorage.getItem("cart"));
      renderShopcart(cart)


    } else {
      console.log("請先登入");
      window.location.href = "login.html";
    }
  }

  process_color();


  function renderInfo(data) {
    console.log("renderInfo")
    console.log(data)
    $.each(data, function (i, val) {
      if (i != "list") {
        var valx = (!val) ? " " : val;
        // console.log(valx)
        // 訂購人資料obj
        $("#customers>tbody")
          .append(
            "<tr><td>" + valx + "</td></tr>"
          )
      }
      // } else {
      // }
    })
  }
  
  function renderShopcart(data) { 
    // 訂購明細
    $.each(data, function (i, val) {
      console.log(i) //key
      console.log(val) //value
      $("#myForm .tb_shopcart  tbody")
        .append(`<tr><td name='fname0' id='fname0'><img src='assets/images/${val.item_no}_1.jpg' alt=''>
                    </td> 
                    <td name='fname1' id='fname1'>
                        <p>${val.name}</p>
                        <p>${number_format(val.price)}</p>
                    </td> 
                    <td name='fname2' id='fname2'>${val.amount}</td> 
                    <td name='fname3' id='fname3'>${number_format(val.amount * val.price)}</td > 
                    </tr> `
        )
    })
  }
});

