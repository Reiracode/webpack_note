$(function () {
  //safari 100vh bug
  // let vh = window.innerHeight * 0.01;
  // document.documentElement.style.setProperty('--vh', `${vh}px`);

  const setFillHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  // 画面のサイズ変動があった時に高さを再計算する
  window.addEventListener('resize', setFillHeight);
  // 初期化
  setFillHeight();

  // shopcart amount
  // window.addEventListener('storage', event => {
  //   console.log(event);//storageArea
  //   console.log(event.newValue);
  // })
  

  //==========cart replace k1 20220727備註 上一頁or沒更新prveios page
  //最重要的就是這個部份 購物車異動後，回上一頁時 會更新右上購物車數量
  window.onpageshow = function () {
    let datas = JSON.parse(localStorage.getItem('cart'));
    console.log(datas)
    if (!datas) {
      $('.shopart_amount').css("display", "none")
    } else {
      if (!datas.length) {
        $('.shopart_amount').css("display", "none")
      } else {
        $('.shopart_amount').text(datas.length)
      }
    }
  }
  //==========cart replace k1 20220727備註
  let data = JSON.parse(localStorage.getItem("cart"));
  if (!data) {
    $('.shopart_amount').css("display", "none")
  } else {
    // console.log("上一頁3")
    if (!data.length) {
      $('.shopart_amount').css("display", "none")
    } else {
      $('.shopart_amount').text(data.length)
    }
  }


  // no animate modal searchoverlay open
  $(".modal_open").on('click', function () {
    // console.log("modal_open")
    $(".modal_bg").addClass('active');
    $("body").css("overflow", "hidden");
  })



  $(".menu").on('click', function () {
    // console.log("menu")
    $(".overlay-test").addClass("active");
    $("body").css("overflow", "hidden");
  })

  // overlay close
    $('.modal_close').on('click', function (e) {
      // console.log(e.target.parentNode);
      $(e.target.parentNode).removeClass('active');
      $("body").css("overflow", "auto");
  })

})
