import "./main";
import { allurl, number_format, process_color, getLogin_status, urltype } from './plugin/until';

// import '../css/buttons.dataTables.min.css'
// import '../css/query.dataTables.min.css'
// import '../css/responsive.dataTables.min.css'
// import '../css/rowReorder.dataTables.min.css'

// import './plugin/dataTables.responsive.min';
// import './plugin/dataTables.rowReorder.min';
// import './plugin/jquery.dataTables.min';
// import './plugin/dataTables.responsive.min';
// import './plugin/buttons.html5.min'
// import './plugin/buttons.print.min'

// var categoryList = login_status();
// categoryList.then(function (data) {
//   console.log('呼び出し先', data);
//   if (data.success) {
//     console.log("login success sucess")
//   }
// }).fail(function () {
//   console.log('err');
// });


const dataurl = !!(allurl == "http://localhost:8080")
  ? allurl + '/reirasys_api/user_buy_item.php'
  : "https://reiracode.github.io/ajax/user_buy_item.json"


var myResponse;
$.ajax({
  type: "GET",
  // url: allurl + '/reirasys_api/user_buy_item.php',
  // url: "https://reiracode.github.io/ajax/user_buy_item.json",
  url: dataurl,
  dataType: 'json',
  success: function (data) {
    console.log(data)

  }
});



var table = $('#myTable').DataTable({
  dom: 'Bfrtip',
  responsive: true,
  // rowReorder: true,
  "stripeClasses": ['odd-row', 'even-row'],
  'processing': true,
  "ajax": {
    "type": "GET",
    // "url" :  allurl + "/reirasys_api/user_buy_item.php",
    "url": "https://reiracode.github.io/ajax/user_buy_item.json",
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

  // buttons: [
  //     'copy', {
  //         extend: 'csv',
  //         text: 'CSV',
  //         bom : true
  //         }, 
  //     'excel', 'pdf', 'print'
  //     ],

});

table.ajax.reload()

