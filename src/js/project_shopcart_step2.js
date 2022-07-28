import "./main";
import { allurl, number_format, process_color, getLogin_status, urltype } from './plugin/until';

$(function () {
  process_color();
  //check login status
  if (urltype == "http://localhost") {
    getLogin_status().then((data) => {
      if (data.IsLogin) {
        console.log("login sucess")

        //get recip_ifno
        $.ajax({
          type: 'get',
          url: 'http://localhost:8080/reirasys_api/user_info.php',
          xhrFields: {
            withCredentials: true
          },
          dataType: 'json',
          success: function (data) {
            renderShopcart(data)
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
      renderShopcart(info)

    } else {
      console.log("請先登入");
      window.location.href = "login.html";
    }
  }




  function renderShopcart(data) {
    $.each(data, function (i, val) {
      if (i != "list") {
        var valx = (!val) ? " " : val;
        // console.log(valx)
        $("#customers").append(
          `<tr><td>${valx}</td></tr>`
        )
      }
    })

    var cartdata = JSON.parse(localStorage.getItem("cart"));
    console.log(cartdata)
    $.each(cartdata, function (i, val) {
      $(".tb_shopcart tbody")
        .append(`<tr>
              <td name='fname0' id='fname0'>
                <img src='assets/images/${cartdata[i].item_no}_1.jpg' alt=''>
              </td>
              <td name='fname1' id='fname1'>
                <p>${cartdata[i].name}</p>
                <p>${number_format(cartdata[i].price)}</p>
              </td>
              <td name='fname2' id='fname2'> ${cartdata[i].amount}</td>
              <td name='fname3' id='fname3'>${number_format(cartdata[i].amount * cartdata[i].price)}</td>
            </tr> `)
    })
  }


  //送出訂單
  $("#btn_Show").on("click", function (e) {
    if (urltype == "http://localhost") {
      getLogin_status().then(function (data) {
        if (!data.IsLogin) {
          alert("請先登入");
          window.location.href = "login.html";
        } else {
          console.log(localStorage.getItem("cart"))

          //送出訂單
          $.ajax({
            url: allurl + '/reirasys_api/add_to_shopcart.php',
            type: 'post',
            xhrFields: {
              withCredentials: true
            },
            dataType: 'json',
            data: { data: localStorage.getItem("cart") },
            success: function (data) {
              console.log(data)
              localStorage.removeItem("cart");
              window.location.href = "project_shopcart_step3.html";
            },
          });
        }
      });


    } else {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("cart");
        window.location.href = "project_shopcart_step3.html";

      } else {
        console.log("請先登入");
        window.location.href = "login.html";
      }
    }



  });

});

