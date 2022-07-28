import "./main";
import axios from "axios";
import { allurl, urltype } from './plugin/until';
//safari 100vh bug
// https://stackoverflow.com/questions/57623548/how-to-configure-session-save-path-inside-php-ini-for-webpack4-based-website
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// ==>使用方式 ，如果session確認已登入，就導向project_shopcart
// getLogin_status().then(function (data) {
//   console.log("getLogin_status:" + data);
//   if (data.userno) {
//     window.location.href = "project_shopcart.html";
//   }
// });

// if (urltype == "http://localhost") {
//   console.log("urltype")
//   getLogin_status().then((data) => {
//       if (data.userno) {
//         window.location.href = "project_shopcart.html";
//       }
//   })
// } else {
//   getLogin_status_api().then((res) => {
//     let user = res.data;
//     if (user.id == '2') {
//       window.location.href = "project_shopcart.html";
//     }  
//   })
// }

$('.toogle_pwd').on('click', function (e) {
  var el = $(this);
  (el.hasClass('fa-unlock-alt'))
    ? el.removeClass('fa-unlock-alt')
      .addClass('fa-eye')
      .next().prop('type', 'text')
    : el.removeClass('fa-eye')
      .addClass('fa-unlock-alt')
      .next().prop('type', 'password');
})


$(".tab-label").each(function (index) {
  $(this).on('click', function (e) {
    triggletab();
    $(this).toggleClass("active");
    $(".tab-inner")
      .eq(index)
      .toggleClass("active");
  });
});

//to remove all tab headers
function triggletab() {
  $(".tab-label").each(function () {
    $(this).removeClass("active");
  });
  // triggle the tab content
  $(".tab-inner").each(function () {
    $(this).removeClass("active");
  });
}

// 註冊
$("#regis_btn").on('click', function (e) {
  console.log(e)
  e.preventDefault();

  // post formdata 建立formData物件
  const fetchForm = document.querySelector("#form_register");
  const formData = new FormData(fetchForm);

  axios
    .post(allurl + '/reirasys_api/reg_api.php', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }, { withCredentials: true })
    .then((res) => {
      const response = res.data;
      console.log(res.data)//{"success":"OK","info":"完成註冊，請於左方登入頁面進行登入"}
      if (response.success == true) {
        window.location.href = "project_shopcart_step1.html";
      }
    })
    .catch((err) => {
      console.log(err);
    });

});


// login
$("button#login_btn").on('click', function (e) {
  e.preventDefault();
  // post formdata 建立formData物件
  const fetchForm = document.querySelector("#form_login");
  const formData = new FormData(fetchForm);
  console.log(formData)

  if (urltype == "http://localhost") {
    axios
      .post('http://localhost:8080/reirasys_api/sys_login_api.php', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      })
      .then((res) => {
        const response = res.data;
        console.log(response)
        if (response.IsLogin == true) {
          window.location.href = "project_shopcart_step1.html";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const emailInput = document.getElementById("userno").value;
    const passwordInput = document.getElementById("password").value;
    axios.post("https://reqres.in/api/login", {
      email: emailInput,
      password: passwordInput
    })
      .then((response) => {
        console.log(response)
        let data = response.data;
        console.log(data.token)
        localStorage.setItem('token', JSON.stringify(data.token));
        console.log(response.status)
        if (response.status == 200){
          window.location.href = "project_shopcart_step1.html";
        }
      
      });
  }

});