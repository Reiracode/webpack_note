import "./main";
import axios from "axios";
import { allurl, number_format, process_color, formTrim, getLogin_status, urltype  } from './plugin/until';

$(function () {
 
  //check login status
  if (urltype == "http://localhost") {
    getLogin_status().then((data) => {
      if (data.IsLogin) {
        console.log("login sucess")
      } else {
        console.log("請先登入");
        window.location.href = "login.html";
      }
    })
  } else {
    if (localStorage.getItem("token")) {
      
    } else {
      console.log("請先登入");
      window.location.href = "login.html";
    }
  }
    
    
  process_color();

  //select city
  new TwCitySelector({
    el: ".list_selector",
    elCounty: ".recip_city",
    elDistrict: ".recip_state",
    countyValue: '台北市', // 注意此項為關聯參數
    districtValue: '中正區'
  });

  const thisform = $('#form_checkout1 input:required')
  // 方法一:keyup 判斷資料是否符合
  // 針對每一筆，再for all
  //預設就先執行keyup  .keyup(function(){ }).keyup();
  // thisform.keyup(submittf)
  //         .keyup();

  // new RegExp判斷input是否符合型態 (mail,XXXXX)
  function validataType(type, val) {
    let regmm;
    let msg;
    switch (type) {
      case "mobile":
        regmm = '((?=(09))[0-9]{10})$';
        msg = "手機格式不對"
        break;
      case "mail":
        regmm = '[a-zA-Z0-9]+\@gmail.com';
        msg = "mail格式不對"
        break;
      default:
        break;
    }
    const regmob = new RegExp(regmm);
    if (regmob.test(val)) {
      return true;
    } else {
      return msg;
    }
  }

  // 方法二:送出btn 再
  $("#btn_Show").on("click", function (e) {
    e.preventDefault();
    console.log(thisform)
    let vaildsubmit = true;
    thisform.each(function () {
      let type = $(this).attr('type');
      let val = $(this).val();
      let name = $(this).attr('name');
      if (type != 'text') {
        $('input[name=' + name + ']').parent('label').attr('data-content', validataType(type, val));
        if (validataType(type, val) == true) {
          console.log("可送----" + name)
        } else {
          console.log("----不可送----" + name)
          vaildsubmit = "falllls"
        }
      } else {
        console.log(type + ":" + val + ":" + name)
        if (!val.trim()) {
          console.log("----trim不可送----" + name)
          vaildsubmit = "falllls"
        } else {
          console.log("trim可送----" + name)
        }
      }
    })
  
    if (vaildsubmit == true) {

   
      if (urltype == "http://localhost") { 
          getLogin_status().then((data)=> {
            if (data.success == "N") {
              window.location.href = "login.html";
            } else {
              //收件人資料step1: 寫入$_SESSION['recip_ifno'] 
              const checkoutForm = document.querySelector("#form_checkout1");
              const formData = new FormData(checkoutForm);
              axios
                .post(allurl + '/reirasys_api/registered_Checkout1.php', formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }, { withCredentials: true })
                .then((response) => {
                  console.log(response)
                  let res = response.data;
                  if (res.success == true) {
                    window.location.href = "project_shopcart_step2.html";
                  } else {
                    // console.log(res.err);
                    let obj = res.err;
                    for (const property in obj) {
                      console.log(`obj[${property}] = ${obj[property]}`);
                      // error msg in field
                      $(`input[name='${property}']`)
                        .css('background', 'pink')
                        .val($(`input[name='${property}']`).val() + `${obj[property]}`)
                    }
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
      } else {
        
        if (localStorage.getItem("token")) {
          const nameInput = document.getElementById("recip_name").value;
          const streetInput = document.getElementById("recip_street").value;
          const cityInput = document.querySelector(".county").value;
          const stateInput = document.querySelector(".district").value;
          const mobileInput = document.getElementById("recip_mobile").value;
          const mailInput = document.getElementById("recip_mail").value;
          const psInput = document.getElementById("recip_ps").value;
          
          const info = ({
            'recip_name': nameInput,
            'recip_street': streetInput,
            'recip_city': cityInput,
            'recip_state': stateInput,
            'recip_mobile': mobileInput,
            'recip_mail': mailInput,
            'recip_ps': psInput
          })

          localStorage.setItem("userinfo", JSON.stringify(info));
          window.location.href = "project_shopcart_step2.html";

        } else {
          console.log("請先登入");
          window.location.href = "login.html";
        }


      }
    }

  })









  //******  購物明細****** 
  const data = JSON.parse(localStorage.getItem("cart"));
  console.log(data)
  let total = 0;
  $.each(data, function (i, val) {
    total += data[i].amount * data[i].price;
    $(".tb_shopcart tbody")
      .append(`<tr>
    <td name='fname0' id='fname0'>
      <img src='assets/images/${data[i].item_no}_1.jpg' alt=''>
    </td>
    <td name='fname1' id='fname1'>
      <p>${data[i].name}</p>
      <p>${number_format(data[i].price)}</p>
    </td>
    <td name='fname2' id='fname2'> ${data[i].amount}</td>
    <td name='fname3' id='fname3'>${number_format(data[i].amount * data[i].price)}</td>
  </tr> `)
  })
  $("#car_total").text(number_format(total));

});

