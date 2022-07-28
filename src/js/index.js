import './main';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Splitting from "Splitting";
import { allitems_api } from './plugin/until';

$(function () {
  $("header").appendTo("body");
  //safari 100vh bug for svg ani
  // let vh = window.innerHeight * 0.01;
  // document.documentElement.style.setProperty('--vh', `${vh}px`);

  // GSAP
  gsap.registerPlugin(ScrollTrigger);
  Splitting();

  var screen_size = window.matchMedia('(max-width: 480px)');
  window.addEventListener("resize", start());

  function start() {
    const tl = gsap.timeline();

    if (screen_size.matches) {
      //"mobile"
      tl.to("body", { overflow: "hidden" })
        .to(".svg_bg path", { duration: 1, strokeDashoffset: "0"})
        .to(".slogan2",{ duration: 1, "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, "end-label")
        .to(".slogan1 h2",{ duration: 1.2, color: "#fff", y: -30, ease: "easeOut" },"end-label+=1")
        .to(".slogan1 h2",{ autoAlpha: 0, scale: 5 },"end-label+=2.5")
        .to(".main_ds",{ duration: 0.4, scale: 3, autoAlpha: 0, ease: "easeOut" },"end-label+=2.6")
        // ani step1--slogan animation finished
        
        .to(".wrapper", { duration: 0.1,  ease: "easeOut", opacity: "0.8" }, "end-label+=2.6")
        .to(".logo_bg img",{ opacity: 0.8, scale: 1 },"end-label+=2.7")
        .to(".logo_bg",{ "clip-path": " polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, "end-label+=2.7")
        .to(".svg_bg path", { stroke: "#ffe6e6", duration: 0.1 }, "end-label+=2.8")
        // ani step2-- cirle clip animation and show bg-imgage   finished

        .to(".rehome", { strokeDashoffset: "0", duration: 1.2, ease: "easeIn" })
        // ani step3-- handwriting finished

        .to("body", { overflow: "auto" });

    } else {
      //pc
      tl.to("body", { overflow: "hidden" })
        .to(".svg_bg path", { duration: 1, strokeDashoffset: "0" })
        .to(".slogan2",{ duration: 1, "clip-path": "circle(40% at center)", ease: 'bounce' },"end-label")
        .to(".slogan1 h2", { duration: 1.2, color: "#fff", y: -30, ease: "easeOut" },"end-label+=1")
        .to(".slogan1 h2", { autoAlpha: 0, scale: 5 }, "end-label+=2.5")
        .to(".main_ds",{ duration: 0.4, scale: 3, autoAlpha: 0, ease: "easeOut" },"end-label+=2.6")
        // ani step1--slogan animation finished
        
        .to(".wrapper", { duration: 0.1, ease: "easeOut", opacity: "0.8" }, "end-label+=2.6")
        .to(".logo_bg img", { opacity: 0.8, scale: 1 },"end-label+=2.7")
        .to(".logo_bg", { "clip-path": "circle(175% at 50% 50%)" }, "end-label+=2.7")
        .to(".svg_bg path", { stroke: "#ffe6e6", duration: 0.1 }, "end-label+=2.8")
        // ani step2-- cirle clip animation and show bg-imgage   finished

        .to(".rehome", { strokeDashoffset: "0", duration: 1.2, ease: "easeIn" })
        // ani step3-- handwriting finished
      
        .to(".cursorBack", { duration: 0.2, scale: 1, autoAlpha: 1 })
        .to(".cursorFront", { duration: 0.1, scale: 1, autoAlpha: 1 })
        .to("body", { overflow: "auto" });
    }

  }

  start();

  const pageContainer = document.querySelector("#scroll-zone");
  /* SMOOTH SCROLL */
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    getSpeed: true,
    getDirection: true,
    reloadOnContextChange: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: pageContainer.style.transform ? "transform" : "fixed",
  });

  //header
  const header = document.querySelector("header");
  locoScroll.on("scroll", (instance) => {
    if (instance.direction === "down" && instance.scroll.y > 140) {
      header.classList.add("ds-f");
      header.classList.remove("ds-n");
    } else {
      header.classList.remove("ds-f");
      header.classList.add("ds-n");
    }
  });

  ////////////////////////////////////
  // $(window).on('load', function () {
  // horizon scroll 手機不流暢 所以限定桌機
  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      let horizonWidth =
        document.querySelector(".pin-wrap").offsetWidth - window.innerWidth;
      const images = gsap.utils.toArray(".pin-wrap > .flex_alink3 img");
      const imagesLen = images.length;
      const ani_word = gsap.utils.toArray(".flex_list_descript > h2");
      // markers: true,  標記線
      // ******* horizon scroll
      gsap.to(".pin-wrap", {
        x: -horizonWidth,
        scrollTrigger: {
          scroller: pageContainer, //locomotive-scroll
          scrub: true,
          trigger: "#sectionPin",
          pin: true,
          id: "XXXXX",
          // markers: true,
          start: "top top",
          end: () => "+=" + document.querySelector(".pin-wrap").scrollHeight,
          onUpdate: (self) => {
            // 最接近的整數 Math.ceil
            // if (self.progress >= 0.15 && self.progress <= 0.75) {
            let xindex = Math.ceil(self.progress * 0.9 * imagesLen);
            if (!!xindex) {
              images[xindex - 1].classList.add("active");
              ani_word[xindex - 1].classList.add("active");
            } 
          }
        },
        ease: "none",
      });
    },
  });

  // section words
  gsap.utils.toArray(".textpanel").forEach((section, index) => {
    // console.log(section);
    // console.log(index);
    gsap.to(this, {
      scrollTrigger: {
        trigger: section,
        scroller: pageContainer,
        id: "textpanel ",
        // markers: true,
        start: "top 100%",
        end: "bottom 25%",
        scrub: 0,
        onUpdate: (self) => {
          section.style.setProperty("--progress", self.progress);
        },
      },
    });
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update()); //
  ScrollTrigger.refresh();

  // render collections
  allitems_api().then((res) => {
    const myResponse = res.items;
    // console.log(myResponse)

    loadimages();
    myResponse.sort((ele1, elem2) => Math.random() - Math.random());
    displayProduct(myResponse)
  })

  //webpack 使用 require.context 轉路徑
  function loadimages() {
    const path = require.context('./../images/cloversky', false, /\.jpg$/)
    return path.keys().map(path)
  }

  function displayProduct(data) {
 
    let myResponse = data;
    // console.log(myResponse)
    for (let p = 0; p < 8; p++) {
      $('.newimgs').append(
        `<figure class="grid_list touch-hover">
              <a href="./products.html?item_id=${myResponse[p].id}">
                <img src=assets/images/${myResponse[p].id}_1.jpg alt="${myResponse[p].title}" data-pno=${myResponse[p].id}>
                <figcaption>
                    <p>${myResponse[p].title}</p>
                  
                </figcaption>
              <a>
            </figure>`);
    }
 
  }



  /* mouse  */
  $(window).on('mousemove touchstart',function (e) {
    let frontPosY = `${e.clientY - ($('.cursorFront').height() / 2)}px`;
    let frontPosX = `${e.clientX - ($('.cursorFront').width() / 2)}px`;

    let backPosY = `${e.clientY - ($('.cursorBack').height() / 2)}px`;
    let backPosX = `${e.clientX - ($('.cursorBack').width() / 2)}px`;

    $('.cursorFront').css('transform', `translateY(${frontPosY}) translateX(${frontPosX})`);
    $('.cursorBack').css('transform', `translateY(${backPosY}) translateX(${backPosX})`);
  });

  $("h2").on('mousemove', function (e) {
    $(".cursorFront").addClass("hov");
  });

  $("h2").on('mouseout', function (e) {
    $(".cursorFront").removeClass("hov");
  });


})