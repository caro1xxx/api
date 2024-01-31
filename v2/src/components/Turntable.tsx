// @ts-nocheck
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const shiny = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #fff;
  }
  100% {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

const Container = styled.div`
  max-width: 1000px;
  min-width: 400px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  padding: 50px;

  p {
    padding-top: 20px;

    span {
      font-size: 32px;
      font-weight: bold;
      margin: 0 5px;
    }
  }
`;

const LotterySection = styled.section`
  width: 540px;
  margin: 20px auto;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 0px 0px 20px #f52037, 23px 23px 30px 1px #333;
  background: darken(#f52037, 15%);

  @media screen and (max-width: 767px) {
    width: 360px;
    box-shadow: 0px 0px 0px 15px #f52037, 18px 18px 30px 1px #333;
  }

  ul {
    width: 100%;
    height: 540px;

    @media screen and (max-width: 767px) {
      height: 360px;
    }

    li {
      height: 180px;
      width: 33%;
      list-style: none;
      text-align: center;
      position: absolute;
      display: block;
      border: 3px solid darken(#f52037, 15%);
      box-sizing: border-box;
      background: #fff;
      font-size: 24px;
      border-radius: 15px;
      box-shadow: 0px -5px lighten(#f52037, 30%) inset;

      &.shiny {
        animation: ${shiny} 1s linear infinite alternate;
        -webkit-animation: ${shiny} 1s linear infinite alternate;
      }

      @media screen and (max-width: 767px) {
        height: 120px;
        font-size: 16px;
      }

      &.active {
        font-weight: bold;
        background-color: lighten(#ff9a01, 30%);
        box-shadow: 0px -5px #ff9a01 inset;
      }

      &.item-1 {
        top: 0.5%;
        left: 0.5%;
      }

      /* ... (其他 li 的样式) */

      img {
        width: 85px;
        margin: 30px 0 10px;

        @media screen and (max-width: 767px) {
          width: 50px;
          margin: 20px 0 2px;
        }
      }
    }
  }

  .lottery_btn {
    position: absolute;
    width: 33%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    button {
      cursor: pointer;
      position: relative;
      width: 95%;
      height: 150px;
      top: -8px;
      color: darken(#ff9a01, 40%);
      font-size: 60px;
      background-color: #ff9a01;
      border: none;
      border-radius: 5px;
      box-shadow: inset 0px 3px 0px lighten(#ff9a01, 35%), 0px 8px 0px darken(#ff9a01, 10%);

      @media screen and (max-width: 767px) {
        height: 85px;
        font-size: 40px;
        top: -8px;
        box-shadow: inset 0px 3px 0px lighten(#ff9a01, 35%), 0px 6px 0px darken(#ff9a01, 10%);
      }

      &:disabled {
        cursor: default;
        background-color: lighten(#ff9a01, 15%);
      }

      &::before {
        content: "";
        background-color: darken(#ff9a01, 40%);
        width: 97%;
        height: 95%;
        padding: 0px 6px 10px;
        position: absolute;
        bottom: -16px;
        left: -3px;
        border-radius: 5px;
        z-index: -1;

        @media screen and (max-width: 767px) {
          width: 95%;
          bottom: -14px;
        }
      }

      &:active,
      &:disabled {
        margin: 13px auto;
        box-shadow: inset 0px 1px 0px lighten(#ff9a01, 35%), 0px 0px 0px darken(#ff9a01, 10%);
        top: 0px;

        &::before {
          bottom: -8px;

          @media screen and (max-width: 767px) {
            bottom: -6px;
          }
        }
      }
    }
  }
`;

const Footer = styled.footer`
  // 样式
`;

const Turntable = () => {
  const [prizeId, setPrizeId] = useState(-1);

  const prizeList = [
    // 獎品項目
    // ... (你的獎品列表)
  ];

  useEffect(() => {
    // 初始化獎品
    const $el = document.querySelector(".lottery");
    prizeList.forEach((item, index) => {
      $el.querySelectorAll("li")[index].innerHTML = `<img src='${item.img}'><p>${item.name}</p>`;
    });
  }, []);

  const draw = (oMain, callback) => {
    let timer = null;
    let index = oMain.querySelector(".active").index();
    const len = oMain.querySelectorAll("li").length;
    let iSpeed = 300; // 速度
    let iLast = len; // 倒數圈數

    (function run() {
      index++;

      // 跑3個後加速
      if (index > 2) iSpeed = 100;
      // 最後一圈減速
      if (iLast < 2) iSpeed = 300;

      if (index >= len) index = 0;
      oMain.querySelectorAll("li").classList.remove("active");
      oMain.querySelectorAll("li")[index].classList.add("active");

      // 轉動
      timer = setTimeout(run, iSpeed);

      if (prizeId !== -1 && index === prizeId) {
        iLast--;
        if (iLast === 0) {
          clearTimeout(timer);
          callback();
        }
      }
    })();
  };

  const startLottery = () => {
    setTimeout(() => {
      setPrizeId(Math.floor(Math.random() * 8));
    });

    // 禁用按鈕 & 效果移除
    const $el = document.querySelector(".lottery");
    $el.querySelector("button").setAttribute("disabled", true);
    $el.querySelectorAll("li").classList.remove("shiny");

    draw($el, () => {
      setTimeout(() => {
        // 恢復按鈕
        $el.querySelector("button").removeAttribute("disabled");
        $el.querySelectorAll("li").classList.remove("active");
        $el.querySelectorAll("li").classList.add("shiny");
        alert("恭喜獲得：" + prizeList[prizeId].name + "!!");
      });
    });
  };

  return (
    <Container>
      <Header>
        <p>
          <span>幸運大轉盤</span>
        </p>
      </Header>
      <LotterySection className="lottery">
        <ul>
          {/* 獎品項目 */}
          {/* ... */}
        </ul>
        <div className="lottery_btn">
          <button onClick={startLottery}>開始抽獎</button>
        </div>
      </LotterySection>
      <Footer>
        {/* 注意事項 */}
        {/* ... */}
      </Footer>
    </Container>
  );
};

export default Turntable;
