const axios = require('axios').default;
//千分位
function number_format(n) {
  n += "";
  let arr = n.split(".");
  let re = /(\d{1,3})(?=(\d{3})+$)/g;
  return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
}

//去千分位號
function RemoveComma(n) {
  return n.replace(/[,]+/g, "");
}


function process_color() {
  site_map();

  if (myUrl.main.indexOf("step") != -1) {
    let step = myUrl.main.split("_");
    step = step[step.length - 1];

    let now_step = step.substr(4, 1);
    for (let i = now_step - 1; i >= 0; i--) {
      $(".process3 li").eq(i).css({ backgroundColor: "#efc1c1", opacity: "1" });
    }

    if (now_step == "2") {
      $(".process3").attr("data-width", "large");
    } else if (now_step == "3") {
      $(".process3").attr("data-width", "xlarge");
    }
  }
}

//login true or false
const domainName = window.location.href;
const loc = domainName.indexOf(":", 6);
const urltype = domainName.slice(0, loc);
const allurl = domainName.slice(0, loc) + ":8080";
// allurl 可能是 決定serever get 8080


const allitem = !!(urltype == "http://localhost")
  ? allurl + "/reirasys_api/shopitems.php"
  : "https://reiracode.github.io/ajax/allitems.json";
console.log("allitem" + allitem)
//all items
async function allitems_api() {
  return await fetch(`${allitem}`).then((data) => data.json());
}


 

const searchitemurl = !!(urltype == "http://localhost")
  ? allurl + "/reirasys_api/shopitemkey.php"
  : "https://reiracode.github.io/ajax/allitems.json";

async function searchId(id) {
  return await fetch(`${searchitemurl}?id=${id}`).then((data) => data.json());
}

const getAllitems = async () => {
  const response = await fetch(allitem);
  const json = await response.json();
  console.log(json)
  return json;
};


const loginuser = !!(urltype == "http://localhost")
  ? allurl + `/reirasys_api/sys_is_login.php`
  : "https://reqres.in/api/users/2";
// console.log(loginuser)

// function getLogin_status() {
//   return $.ajax({
//     // url: allurl + `/reirasys_api/sys_is_login.php`,
//     url: loginuser,
//     // credentials: 'include',
//     xhrFields: {
//       withCredentials: true
//     },
//     type: "get",
//     dataType: "json",
//     success: function (data) {
//       console.log(data)
//       data.userno;
//     }
//   });
// }

// const loginuser = !!(urltype == "http://localhost")
//   ? allurl + `/reirasys_api/sys_is_login.php`
//   : "https://reqres.in/api/users/2";

function getLogin_status() {
  return axios.get(allurl+`/reirasys_api/sys_is_login.php`, { withCredentials: true })
    .then(response => {
      return response.data;
    })
}

function getLogin_status_api() {
  return axios.get('https://reqres.in/api/users/2')
    .then(response => {
      // console.log(response.data)
      return response.data;
    })
}

let myUrl = new Object();
function site_map() {
  let url = location.href;
  let urlstring, querykey;
  if (url.indexOf("/") != -1) {
    let ary = url.split("/");
    urlstring = ary[ary.length - 1].split("?");
  }
  if (urlstring.length > 1) {
    if (urlstring[urlstring.length - 1].indexOf("=") != -1) {
      querykey = urlstring[urlstring.length - 1].split("=");
      myUrl.id = querykey[1];
      console.log("id:" + querykey[1]);
    }
  } else {
    myUrl.id = "";
  }
  myUrl.main = urlstring[0];
  return myUrl;

}


 

//form input all trim
function formTrim(formValueall) {
  let formValues = formValueall;
  data = {};
  formValues.forEach(function (el) {
    data[el.name] = el.value.replace(/ /g, "");
  });
  // console.log(data)
  return data;
}

module.exports = {
  number_format,
  RemoveComma,
  searchitemurl, domainName, allurl, urltype,
  searchId, allitems_api,
  myUrl, site_map, process_color,
  getAllitems,
  getLogin_status, getLogin_status_api,
  // getTestfetch,  
  formTrim
}

