import "./main";
import { allurl, number_format, process_color, getLogin_status, urltype } from './plugin/until';
import './plugin/jquery.dataTables.min.js';



const dataurl = !!(allurl == "http://localhost:8080")
  ? allurl + '/reirasys_api/user_buy_item.php'
  : "https://reiracode.github.io/ajax/order.json"

function init() {
  GetAuthorizationHeader();
}
init();


// ------ API認證
function GetAuthorizationHeader() {


  const parameter = {
    grant_type: "client_credentials",
    client_id: "reira.igg-178246c9-c6da-466e",
    client_secret: "9f16dc51-0a6e-492c-9dd6-278b917d0c67"
  };
  let auth_url = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
  const queryString = new URLSearchParams(parameter).toString();
  console.log(queryString);

  
  fetch(auth_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: (queryString)
  })
    //fetch api json
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      tokenCode = data.access_token;
      GetApiResponse();
      GetApiResponse2();
    })

  // axios({
  //   method: 'post',
  //   url: auth_url,
  //   dataType: 'JSON',
  //   data: parameter,
  //   headers: {
  //     'content-type': 'application/x-www-form-urlencoded',
  //   },
  // })
  //   .then((res) => {
  //     console.log(res)
  //     tokenCode = res.data.access_token;

  //     GetApiResponse();
  //     GetApiResponse2();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })







}


// var myResponse;
// $.ajax({
//   type: "GET",
//   // url: allurl + '/reirasys_api/user_buy_item.php',
//   // url: "https://reiracode.github.io/ajax/user_buy_item.json",
//   url: dataurl,
//   dataType: 'json',
//   success: function (data) {
//     console.log(data)

//   }
// });

// TEST

var table = $('#myTable').DataTable({
  dom: 'Bfrtip',
  responsive: true,
  // rowReorder: true,
  "stripeClasses": ['odd-row', 'even-row'],
  'processing': true,
  "ajax": {
    "type": "GET",
    // "url" :  allurl + "/reirasys_api/user_buy_item.php",
    "url": "https://reiracode.github.io/ajax/order.json",
    "dataSrc": function (json) {
    },
    // "data" : function( d ) {
    //     },
    "dataSrc": ""
  },
  "columns": [
    { "data": 'id' },
    { "data": 'name' },
    { "data": 'price' },
    { "data": 'amount' },
    { "data": 'datatime' },
    { "data": 'recip_street' },
    { "data": 'userno' }
  ]

});

table.ajax.reload() 
