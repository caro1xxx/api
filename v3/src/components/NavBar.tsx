import styled from "styled-components";
import { Select, Badge, Modal } from "antd";
import { useReactive } from "ahooks";
import Login from "./Mods/Login";
import Register from "./Mods/Register";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { getStorage, parseJwt } from "../utils/tools";
import { byOrder, saveToken } from "../redux/modules/user";
import Order from "./Mods/Order";
import { Link, useLocation } from "react-router-dom";
import Account from "./Mods/Account";

const Wrap = styled.div`
  position: fixed;
  z-index: 10;
  width: calc(100vw);
  background-color: #141414;
  height: 70px;
  .logo {
    font-family: "Bungler";
    font-size: 35px;
  }
  .body {
    width: 1400px;
    .item {
      margin-left: 20px;
    }
    .sign {
      background: #30a350;
      color: black;
      font-size: 14px;
      height: 30px;
      padding: 0px 20px;
      line-height: 30px;
      border-radius: 3px;
      font-family: "HelveticaNeue";
      transition: background 0.5s ease;
    }
    .sign:hover {
      background: #30a35180;
    }
    .way {
      background-color: #0f0f0f;
      padding: 2px 0px;
      padding-left: 10px;
      border-radius: 5px;
    }
    .bars {
      font-family: "HelveticaNeue";
      padding: 0px 5px;
      height: 40px;
      background-color: #0f0f0f;
      border-radius: 5px;
      font-size: 13px;
      > a {
        border-radius: 3px;
        color: #fff;
        padding: 5px 20px;
        text-decoration: none;
      }
    }
  }
`;

type Props = {};

const NavBar = (props: Props) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const order = useAppSelector((state) => state.user.orderNo) as string;
  const state = useReactive({
    showLogin: false,
    showRegister: false,
    showAccount: false,
    wechat: {
      qr: "",
      showWechatQr: false,
    },
  });

  useEffect(() => {
    if (getStorage("token")) {
      dispatch(saveToken(getStorage("token")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrap className="center">
      <div className="body center">
        <div className="logo">ZOOMCLOUD</div>
        <div style={{ flex: 1 }}></div>
        <div className="bars center">
          <Link
            to="/"
            style={{
              backgroundColor: location.pathname === "/" ? "#69a25e" : "#0f0f0f",
              color: location.pathname === "/" ? "#0f0f0f" : "#7c7c7c",
            }}
          >
            首页
          </Link>
          <Link
            to="/"
            onClick={() => (state.showAccount = true)}
            style={{
              backgroundColor: location.pathname === "/account" ? "#69a25e" : "#0f0f0f",
              color: location.pathname === "/account" ? "#0f0f0f" : "#7c7c7c",
            }}
          >
            账号提取
          </Link>
          <Link
            to="/dashboard"
            style={{
              backgroundColor: location.pathname === "/dashboard" ? "#69a25e" : "#0f0f0f",
              color: location.pathname === "/dashboard" ? "#0f0f0f" : "#7c7c7c",
            }}
          >
            仪表盘
          </Link>
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="item way center">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="13022"
            width="20"
            height="20"
          >
            <path
              d="M689.230769 812.110769c-0.787692 0-0.787692 0 0 0-13.390769 0-25.206154-8.664615-29.144615-20.48L598.646154 630.153846l-83.495385-37.809231c-8.664615-3.938462-14.966154-11.027692-17.329231-20.48l-25.993846-94.523077L370.215385 523.815385l-19.692308 63.015384c-3.938462 12.603077-14.966154 21.267692-27.569231 22.055385l-194.56 14.178461c-15.753846 1.575385-29.932308-9.452308-33.083077-25.206153-5.513846-28.356923-8.664615-57.501538-8.664615-86.646154 0-55.138462 10.24-108.701538 30.72-159.113846 4.726154-12.603077 17.329231-20.48 30.72-19.692308l172.504615 9.452308 144.147693-78.769231c3.150769-1.575385 6.301538-2.363077 9.452307-3.150769l76.406154-14.966154 14.178462-120.516923c0.787692-8.664615 5.513846-16.541538 12.603077-22.055385 7.089231-5.513846 16.541538-7.089231 25.206153-5.513846 98.461538 21.267692 185.895385 77.193846 247.335385 156.750769 8.664615 11.027692 8.664615 25.993846 0.787692 37.021539l-49.624615 70.104615 52.775385 89.009231c5.513846 8.664615 5.513846 19.692308 1.575384 28.356923l-137.846154 315.076923c-4.726154 11.027692-16.541538 18.904615-28.356923 18.904615zM553.747692 541.144615l81.92 37.021539c7.876923 3.150769 13.390769 9.452308 16.541539 17.329231l38.596923 101.612307 100.824615-230.006154-55.138461-92.16c-6.301538-11.027692-5.513846-24.418462 1.575384-33.870769l47.261539-66.953846C741.218462 223.704615 685.292308 186.683077 622.276923 166.990769l-12.603077 107.126154c-1.575385 13.390769-11.815385 24.418462-25.206154 26.781539l-93.735384 18.904615-147.298462 82.707692c-5.513846 3.150769-11.027692 3.938462-17.329231 3.938462l-158.326153-8.664616C155.963077 434.018462 149.661538 472.615385 149.661538 512c0 15.753846 0.787692 30.72 3.15077 46.473846l144.147692-10.24 17.329231-55.926154c2.363077-8.664615 8.664615-15.753846 17.329231-19.692307l148.086153-66.953847c8.664615-3.938462 18.116923-3.938462 26.781539 0s14.178462 11.027692 17.329231 20.48l29.932307 115.003077z m-233.156923 37.021539z"
              fill="#ffffff"
              p-id="13023"
            ></path>
            <path
              d="M479.704615 290.658462l98.461539-19.692308 17.329231-143.36c-26.781538-5.513846-55.138462-8.664615-83.495385-8.664616-165.415385 0-307.2 102.4-365.489231 246.547693l181.956923 10.24 151.236923-85.070769z"
              fill="#ffffff"
              p-id="13024"
            ></path>
            <path
              d="M328.467692 406.449231h-1.575384l-181.956923-10.24c-10.24-0.787692-19.692308-6.301538-25.206154-14.966154s-6.301538-18.904615-2.363077-28.356923C182.744615 191.409231 337.92 86.646154 512 86.646154c29.932308 0 60.652308 3.150769 90.584615 9.452308 15.753846 3.150769 26.781538 18.116923 24.418462 34.658461l-17.329231 143.36c-1.575385 13.390769-11.815385 24.418462-25.206154 26.781539l-93.735384 18.904615-147.298462 82.707692c-4.726154 2.363077-9.452308 3.938462-14.966154 3.938462z m-133.12-70.892308l126.03077 7.089231L464.738462 263.089231c3.150769-1.575385 6.301538-2.363077 9.452307-3.150769l76.406154-14.966154 11.027692-91.372308c-17.329231-3.150769-33.083077-3.938462-49.624615-3.938462-133.12 0-253.636923 71.68-316.652308 185.895385z"
              fill="#ffffff"
              p-id="13025"
            ></path>
            <path
              d="M512 905.846154c217.403077 0 393.846154-176.443077 393.846154-393.846154 0-89.796923-29.932308-173.292308-81.132308-239.458462l-60.652308 86.646154 63.015385 106.338462-137.846154 315.076923-66.166154-173.292308L527.753846 563.987692l-35.446154-129.96923-148.086154 66.953846-23.630769 76.406154L126.030769 591.556923C163.052308 771.150769 322.166154 905.846154 512 905.846154z"
              fill="#ffffff"
              p-id="13026"
            ></path>
            <path
              d="M512 937.353846c-200.861538 0-375.729231-142.572308-416.689231-338.707692-1.575385-8.664615 0-18.116923 5.513846-25.206154 5.513846-7.089231 14.178462-11.815385 22.843077-12.603077l172.504616-12.603077 17.32923-55.926154c2.363077-8.664615 8.664615-15.753846 17.329231-19.692307l148.086154-66.953847c8.664615-3.938462 18.116923-3.938462 26.781539 0s14.178462 11.027692 17.32923 20.48l31.507693 115.79077 81.92 37.021538c7.876923 3.150769 13.390769 9.452308 16.541538 17.329231l38.596923 101.612308 100.824616-230.006154-55.138462-92.16c-6.301538-11.027692-5.513846-24.418462 1.575385-33.870769l60.652307-86.646154c5.513846-7.876923 14.966154-13.390769 25.206154-13.39077h0.787692c9.452308 0 18.904615 4.726154 25.206154 12.603077 55.926154 74.043077 86.646154 163.052308 86.646154 257.575385 0 234.732308-190.621538 425.353846-425.353846 425.353846zM166.203077 620.701538C212.676923 769.575385 352.886154 874.338462 512 874.338462c200.073846 0 362.338462-162.264615 362.338462-362.338462 0-65.378462-17.329231-128.393846-50.412308-184.32l-22.843077 33.083077 52.775385 89.009231c5.513846 8.664615 5.513846 19.692308 1.575384 28.356923l-137.846154 315.076923c-5.513846 11.815385-17.329231 18.904615-29.932307 18.904615-12.603077 0-24.418462-8.664615-28.356923-20.48L597.858462 630.153846l-83.495385-37.809231c-8.664615-3.938462-14.966154-11.027692-17.329231-20.48l-25.993846-94.523077L370.215385 523.815385l-19.692308 63.015384c-3.938462 12.603077-14.966154 21.267692-27.569231 22.055385l-156.750769 11.815384z"
              fill="#ffffff"
              p-id="13027"
            ></path>
          </svg>
          <Select
            suffixIcon={
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="11662"
                width="10"
                height="10"
              >
                <path
                  d="M722.773333 381.44a64 64 0 0 1 90.453334 90.453333l-252.970667 253.013334a68.266667 68.266667 0 0 1-96.512 0l-253.013333-253.013334a64 64 0 0 1 90.538666-90.453333L512 592.128l210.773333-210.773333z"
                  fill="#ffffff"
                  p-id="11663"
                ></path>
              </svg>
            }
            defaultValue="我要出国"
            style={{ width: 100 }}
            variant={"borderless"}
            options={[
              { value: "out", label: "我要出国" },
              { value: "in", label: "我要回国" },
            ]}
          />
        </div>
        {token ? (
          <div className="item usenone center">
            {parseJwt(token).username}
            <svg
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{ marginLeft: "10px" }}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2336"
              width="25"
              height="25"
            >
              <path
                d="M463.121779 125.44199c0-33.995255 29.188786-61.538565 65.182558-61.538565 35.999912 0 65.172325 27.54331 65.172325 61.538565l0 342.323553c0 33.985022-29.172413 61.533448-65.172325 61.533448-35.994796 0-65.182558-27.548426-65.182558-61.533448L463.121779 125.44199 463.121779 125.44199zM512.005117 960.095551c-224.976938 0-407.359778-172.21527-407.359778-384.640334 0-163.541727 108.297518-302.880215 260.71079-358.520443L365.356129 353.862353c-78.180594 46.232974-130.354883 128.068817-130.354883 221.592864 0 144.455019 124.027781 261.551948 277.004895 261.551948 152.98837 0 276.999778-117.096928 276.999778-261.551948 0-79.858816-38.009685-151.2334-97.760534-199.215204L691.245384 230.454696c134.977157 62.657039 228.110301 193.397708 228.110301 345.011778C919.364895 787.880281 736.982054 960.095551 512.005117 960.095551L512.005117 960.095551zM512.005117 960.095551"
                fill="#d81e06"
                p-id="2337"
              ></path>
            </svg>
          </div>
        ) : (
          <div className="item sign usenone" onClick={() => (state.showLogin = true)}>
            开始使用
          </div>
        )}
        <div className="item">
          <Badge color={"green"} dot={true}>
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="15864"
              width="25"
              height="25"
            >
              <path
                d="M469.333333 217.6V170.666667h85.333334v46.933333c136.533333 21.333333 243.2 132.266667 256 273.066667V768H213.333333v-277.333333c12.8-140.8 119.466667-256 256-273.066667zM298.666667 682.666667h426.666666v-170.666667c0-119.466667-93.866667-213.333333-213.333333-213.333333s-213.333333 93.866667-213.333333 213.333333v170.666667z m85.333333 128h256v85.333333H384v-85.333333z"
                fill="#ffffff"
                p-id="15865"
              ></path>
            </svg>
          </Badge>
        </div>
        <div className="item">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10590"
            width="20"
            height="20"
          >
            <path
              d="M938.666667 981.333333c-17.066667 0-29.866667-8.533333-38.4-25.6l-59.733334-119.466666h-277.333333l-59.733333 119.466666c-8.533333 21.333333-34.133333 29.866667-55.466667 17.066667-25.6-8.533333-34.133333-34.133333-21.333333-51.2l72.533333-140.8 145.066667-290.133333c12.8-21.333333 34.133333-38.4 59.733333-38.4s46.933333 12.8 59.733333 38.4l145.066667 290.133333 72.533333 140.8c8.533333 21.333333 0 46.933333-17.066666 55.466667-12.8 4.266667-17.066667 4.266667-25.6 4.266666z m-332.8-226.133333h192l-98.133334-192-93.866666 192zM85.333333 844.8c-17.066667 0-29.866667-8.533333-38.4-25.6-8.533333-21.333333 0-46.933333 21.333334-55.466667 93.866667-46.933333 179.2-110.933333 247.466666-187.733333-46.933333-64-85.333333-128-110.933333-192-8.533333-21.333333 4.266667-46.933333 25.6-55.466667 21.333333-8.533333 46.933333 4.266667 55.466667 25.6 21.333333 51.2 46.933333 102.4 81.066666 149.333334 59.733333-85.333333 102.4-179.2 128-281.6H85.333333c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666667h243.2V85.333333c0-25.6 17.066667-42.666667 42.666667-42.666666s42.666667 17.066667 42.666667 42.666666v51.2h238.933333c25.6 0 42.666667 17.066667 42.666667 42.666667s-17.066667 42.666667-42.666667 42.666667h-68.266667c-25.6 128-85.333333 247.466667-162.133333 349.866666l25.6 25.6c17.066667 17.066667 17.066667 42.666667 0 59.733334-17.066667 17.066667-42.666667 17.066667-59.733333 0l-17.066667-17.066667c-72.533333 81.066667-162.133333 149.333333-264.533333 200.533333-8.533333 0-17.066667 4.266667-21.333334 4.266667z"
              fill="#ffffff"
              p-id="10591"
            ></path>
          </svg>
        </div>
        <div className="item">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9484"
            width="25"
            height="25"
          >
            <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#DE2910" p-id="9485"></path>
            <path
              d="M486.4 515.291429a114.834286 114.834286 0 0 1-26.331429-159.268572 2.56 2.56 0 0 1 4.205715 2.925714 109.714286 109.714286 0 0 0 22.857143 150.857143 61.257143 61.257143 0 0 1-16.274286-41.691428 57.965714 57.965714 0 0 1 32.182857-54.857143 87.954286 87.954286 0 0 0 53.76-73.142857 76.8 76.8 0 0 0-10.788571-38.948572q-1.828571-3.108571-4.022858-6.034285a54.857143 54.857143 0 0 1 26.514286-76.434286h-5.851428c-101.485714 0-170.422857 73.142857-170.422858 157.988571a149.028571 149.028571 0 0 0 94.171429 138.605715z m-18.285714-182.857143v-18.285715l14.262857 11.154286 17.188571-5.485714-6.217143 17.005714 10.605715 14.628572h-18.285715l-10.788571 14.628571-5.12-18.285714-17.188571-5.668572z"
              fill="#FFFFFF"
              p-id="9486"
            ></path>
            <path
              d="M327.862857 572.16a149.028571 149.028571 0 0 0 162.011429-47.36 114.834286 114.834286 0 0 1-160.182857-21.211429 2.56 2.56 0 0 1 4.022857-3.108571 109.714286 109.714286 0 0 0 148.297143 23.588571 61.257143 61.257143 0 0 1-43.154286 2.011429 57.965714 57.965714 0 0 1-41.691429-47.36 87.954286 87.954286 0 0 0-53.211428-73.142857 76.8 76.8 0 0 0-40.045715-2.011429l-6.948571 1.828572a54.857143 54.857143 0 0 1-64.548571-48.822857l-2.011429 5.485714c-31.817143 95.634286 16.091429 183.588571 97.462857 210.102857z m-21.028571-101.12v-18.285714l14.262857 11.154285 17.188571-5.485714-6.217143 17.005714 10.605715 14.628572h-18.285715l-10.788571 14.628571-5.12-18.285714-17.188571-5.668571z"
              fill="#FFFFFF"
              p-id="9487"
            ></path>
            <path
              d="M484.754286 628.297143a113.554286 113.554286 0 0 1-54.857143 42.971428 2.56 2.56 0 0 1 0-4.937142 109.714286 109.714286 0 0 0 68.571428-132.571429 61.257143 61.257143 0 0 1-11.52 40.594286 57.965714 57.965714 0 0 1-57.965714 24.868571 87.954286 87.954286 0 0 0-86.674286 27.794286 76.8 76.8 0 0 0-14.262857 36.571428v7.314286a54.857143 54.857143 0 0 1-66.377143 46.262857l4.571429 3.474286c82.102857 59.611429 180.48 41.508571 230.765714-27.611429a149.028571 149.028571 0 0 0 4.571429-169.325714 114.468571 114.468571 0 0 1-16.822857 104.594286z m-77.714286 56.868571l-10.788571 14.628572-5.12-18.285715-17.188572-5.668571 14.994286-10.24v-18.285714l14.262857 11.154285 17.188571-5.485714-6.217142 17.005714 10.605714 14.628572z"
              fill="#FFFFFF"
              p-id="9488"
            ></path>
            <path
              d="M502.308571 517.302857a114.834286 114.834286 0 0 1 117.028572 111.36 2.56 2.56 0 0 1-2.56 2.56 2.56 2.56 0 0 1-2.56-2.56 109.714286 109.714286 0 0 0-104.777143-106.24 61.257143 61.257143 0 0 1 36.571429 23.588572 57.965714 57.965714 0 0 1 5.851428 62.902857 87.954286 87.954286 0 0 0 0 91.428571 76.8 76.8 0 0 0 31.268572 25.234286l6.765714 2.56a54.857143 54.857143 0 0 1 23.588571 77.531428l4.754286-3.291428c82.102857-59.611429 95.268571-158.902857 45.165714-228.022857a149.028571 149.028571 0 0 0-161.097143-57.051429z m116.662858 151.04l-10.788572 14.628572-5.12-18.285715-17.188571-5.668571 14.994285-10.24v-18.285714l14.262858 11.154285 17.188571-5.485714-6.217143 17.005714 10.605714 14.628572z"
              fill="#FFFFFF"
              p-id="9489"
            ></path>
            <path
              d="M802.011429 490.971429c-31.451429-96.548571-121.6-139.702857-202.971429-113.371429a149.028571 149.028571 0 0 0-103.131429 132.937143 114.834286 114.834286 0 0 1 141.714286-76.068572 2.56 2.56 0 1 1-1.462857 4.937143 109.714286 109.714286 0 0 0-134.217143 68.937143 61.257143 61.257143 0 0 1 34.377143-27.977143 57.965714 57.965714 0 0 1 61.622857 13.897143 87.954286 87.954286 0 0 0 86.491429 28.525714 76.8 76.8 0 0 0 33.645714-21.942857l4.571429-5.668571a54.857143 54.857143 0 0 1 81.005714 1.645714c-1.645714-2.194286-1.645714-4.022857-1.645714-5.851428z m-134.034286-29.622858l-10.788572 14.628572-5.12-18.285714-17.188571-5.668572 14.994286-10.24v-18.285714l14.262857 11.154286 17.188571-5.485715-6.217143 17.005715 10.605715 14.628571z"
              fill="#FFFFFF"
              p-id="9490"
            ></path>
          </svg>
        </div>
      </div>
      <Modal
        open={state.showLogin}
        title={<></>}
        onCancel={() => {
          state.showLogin = false;
        }}
        closeIcon={null}
        maskClosable={true}
        footer={[]}
        centered
        width={"350px"}
        destroyOnClose={true}
        modalRender={(modal) => (
          <Login
            login={() => {
              state.showLogin = false;
              state.showRegister = true;
            }}
            close={() => {
              state.showLogin = false;
            }}
          />
        )}
      />
      <Modal
        open={state.showRegister}
        title={<></>}
        onCancel={() => {
          state.showRegister = false;
        }}
        closeIcon={null}
        maskClosable={true}
        footer={[]}
        centered
        width={"350px"}
        destroyOnClose={true}
        modalRender={(modal) => (
          <Register
            login={() => {
              state.showLogin = true;
              state.showRegister = false;
            }}
            close={() => {
              state.showLogin = false;
            }}
          />
        )}
      />
      <Modal
        open={order !== ""}
        title={<></>}
        onCancel={() => {
          dispatch(byOrder(""));
        }}
        closeIcon={null}
        maskClosable={true}
        footer={[]}
        centered
        width={"350px"}
        destroyOnClose={true}
        modalRender={(modal) => <Order order={order} />}
      />
      <Modal
        open={state.showAccount}
        title={<></>}
        onCancel={() => {
          state.showAccount = false;
        }}
        closeIcon={null}
        maskClosable={true}
        footer={[]}
        centered
        width={"350px"}
        destroyOnClose={true}
        modalRender={(modal) => <Account />}
      />
    </Wrap>
  );
};

export default NavBar;
