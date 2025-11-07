//**************navbar***************//

const navbars = [
    {
        title: "預購專區",
        link: "#"
    },
    {
        title: "日本一番賞",
        link: "#"
    },
    {
        title: "GK一番賞",
        link: "#"
    },
    {
        title: "儲值專區",
        link: "#"
    },
];
const navbar_img = "logo.png";
const cart_num = "0";
const navbarSection = {
    template: `
    <section id="menu">
        <nav class="navbar  navbar-expand-lg   fixed-top bg-light border-bottom"><!--透明模糊 blur-box -->
            <div class="d-block ms-5"></div>

            <a class="navbar-brand ms-5" href="#">
                <img class="img-fluid mb-3 test" :src="\`/public/img/\${navbar_img}\`" alt="">
            </a>

            <button class="navbar-toggler " style="color:white;background: rgba(0,0,0,0.5); margin-right: 3%;"
                type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg"
                aria-controls="navbarOffcanvasLg" aria-label="Toggle navigation">
                <i class="fa-solid fa-bars"></i>
            </button>
            <div class="offcanvas offcanvas-end " tabindex="-1" id="navbarOffcanvasLg"
                aria-labelledby="navbarOffcanvasLgLabel">
                <div class="offcanvas-header">
                    <h2 class="offcanvas-title" id="offcanvasNavbarLabel">選單</h2>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>

                <div class="row ">

                    <div class="col-lg-6">
                        <ul class="navbar-nav  flex-grow-1 pe-3">

                            <li  v-for="item in navbars" class="nav-item  mx-3">
                                <a class="nav-link2 " :href="item.link" :title="item.title"  rel="noopener noreferrer">
                                    {{item.title}}
                                </a>
                            </li>
                           
                        </ul>
                    </div>

                    
                    <div v-if="isLogin" class="col-lg-6">
                        <ul class="navbar-nav  justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <a class="nav-link2" href="user.html" title="您好" target="" rel="noopener noreferrer">
                                    <i class="fa-regular fa-user"></i>
                                    您好,
                                    <span class="color_1">{{user.name}}</span>
                                </a>
                            </li>
                            <li class="nav-item ms-5 ">
                                <a class="nav-link2" href="coin.html" title="代幣" target="" rel="noopener noreferrer">
                                    <i class="fa-solid fa-coins"></i>
                                    <span class="color_1">{{user.coin}}</span>
                                    代幣
                                </a>

                            </li>
                            <li class="nav-item  ms-5 ">
                                <a class="nav-link2" href="cart.html" title="購物車" target="" rel="noopener noreferrer">
                                    <i class="bi bi-cart"></i>
                                    <div class="text-light  p-1 font-18 text-center cart-pill">{{cart_num}}</div>
                                    購物車
                                </a>
                            </li>
                            <a class="btn btn-danger ms-3 " href="javascript:void(0)" @click="logout">登出</a>
                        </ul>
                    </div>

                    <div v-else class="col-lg-6">
                        <ul class="navbar-nav  justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item   border-end border-dark ">
                                <a class="nav-link2" href="javascript:void(0)" title="會員登入" target="" rel="noopener noreferrer" @click="login">
                                    <i class="fa-regular fa-user"></i>
                                    <span>會員登入</span>
                                </a>
                            </li>

                            <li class="nav-item ms-1 ">
                            <a class="nav-link2" href="register.html" title="註冊" target="" rel="noopener noreferrer">
                                 註冊
                            </a>

                            </li>
                            <li class="nav-item  ms-5 ">
                                <a class="nav-link2" href="cart.html" title="購物車" target="" rel="noopener noreferrer">
                                    <i class="bi bi-cart"></i>
                                    購物車
                                </a>
                            </li>
                         </ul>
                    </div>

                </div>

            </div>
            </div>
        </nav>
    </section>
           
                
            `,


    data() {
        return {
            navbars: navbars,
            navbar_img: navbar_img,
            isLogin: false,
            user: { name: '', coin: '' },
            cart_num: cart_num
        }
    },
    methods: {
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
        },
        setLoginCookie() {
            const day=7;
            document.cookie = "login=1; path=/; max-age="+86400*day; // 1 天
            document.cookie = "username=" + this.user.name + "; path=/; max-age="+86400*day;
            document.cookie = "coin=" + this.user.coin + "; path=/; max-age="+86400*day;
        },
        deleteCookie(name) {
            document.cookie = `${name}=; path=/; max-age=0`;
        },
        login(){
            this.isLogin=true;
            this.user.name="簡*翎";
            this.user.coin=1234;
            this.setLoginCookie();
        },
        logout(){
            this.isLogin = false;
            this.deleteCookie("login");
            this.deleteCookie("username");
        }
    },
    mounted() {
    // ✅ 一進頁面檢查 cookie 決定登入狀態
    const loginStatus = this.getCookie("login");
    const username = this.getCookie("username");

    if (loginStatus === "1") {
      this.isLogin = true;
      this.user.name = username;
    }
  }

}

//**************banner***************//

const BannerSection = {
    template: `
            <section id="banner" style="margin-top: 110px;">
        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
                <button v-for="(item,key) in banner" type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="\`\${key}\`" :class="{'active':key==0}"
                    aria-current="true" aria-label="Slide 1"></button>
                
            </div>
            <div class="carousel-inner "><!--圓角 border-0 rounded-2-->
                <div v-for="(item,key) in banner" class="carousel-item " :class="{'active':key==0}">
                    <img :src="\`/public/img/\${item}\`" class="d-block w-100" alt="...">
                </div>
               
            </div>
            <button class="banner-btn-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span aria-hidden="true">
                    <div class="circle-blue">
                        <i class="carousel-control-prev-icon p-center" aria-hidden="true"></i>
                    </div>

                </span>
                <span class="visually-hidden">Previous</span>
            </button>

            <button class="banner-btn-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">


                <span aria-hidden="true">
                    <div class="circle-blue ">
                        <i class="carousel-control-next-icon p-center" aria-hidden="true"></i>
                    </div>

                </span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </section>
                
            `,


    data() {
        return {
            banner: banners

        }
    }

}

//**************fixed***************//
const fixeds = [
    {
        img: "btn_charge.png",
        link: "#"
    },
    {
        img: "btn_line.png",
        link: "#"
    },
]
const goTop_img = "btn_gototop.png"
const FixedSection = {
    template:
        `
    <div class="fixed-icon">
        <a v-for="(item,key) in fixeds" :href="\`\${item.link}\`">
            <img :src="\`/public/img/\${item.img}\`" >
        </a>
        
        <a href="javascript:void(0)" onclick="GoTop()">
            <img :src="\`/public/img/\${goTop_img}\`" >
        </a>

    </div>
                
     `,


    data() {
        return {
            fixeds: fixeds,
            goTop_img: goTop_img

        }
    }

}

//**************路徑***************//


//**************carasol***************//


const caraoslSection = {
    template:
        `
   <section id="carasol" class="photo-area mt-4 px-5  container position-relative">
        <h2 class="font-28 font-bold-black align-center">
            <img class="img-fluid me-3" src="/public/img/icon_moon.png" alt="">
            {{caraso_title}}
        </h2>

        <div class="activeys ">
            <div class="container-fluid pb-3 ">
                <img class="img-fluid owl-prev-btn" src="/public/img/Path_1138.png"  onclick="GoPrev()">
                <img class="img-fluid owl-next-btn" src="/public/img/Path_1139.png"  onclick="GoNext()">
                <div class="owl-carousel owl-theme owltActivey mt-5" >
                 
                    <a v-for="item in carasols" :href="item.link" class="a-none" >
                        <div class="card" >
                            <div class="card-head position-relative">
                                    <div v-if="item.tag_title !='' " :class="item.tag_type" class="text-light font-20 font-weight-700 d-flex align-items-center">
                                        <img v-if="item.tag_type =='tag_red' " src="/public/img/icon_draw.png" style="width: 40px; height: 40px;">
                                            {{item.tag_title}}
                                    </div>
                                <img :src="\`/public/img/\${item.img}\`" class="card-img-top w-100 pd-size" alt="...">
                            </div>
                            <div class="card-body" >
                                <div class="card-text font-20 font-bold-black owl-title" style=" height: 60px;" :title="item.title">
                                    {{item.title}}
                                </div>
                                
                            </div>
                            <div class="ms-3">
                                <span class=" price">
                                    {{item.price}}
                                </span>
                                <span v-if="item.ex_price !='' " class="ms-3 mt-3 font-20 text-decoration-line-through text-gray">
                                    {{item.ex_price}}
                                </span>
                                <div class="text-end" style="font-size:30px"><i class="bi bi-cart "></i></div>
                            </div>
                        </div>
                    </a>
                       
                </div>
                <noscript>您的瀏覽器不支援JavaScript功能，若「活動花絮」輪播無法正常使用時，請開啟瀏覽器JavaScript狀態，謝謝！</noscript>
            </div>
        </div>
    </section>
                
     `,


    data() {
        return {
            caraso_title:caraso_title,
            carasols: carasols,


        }
    }

}


//**************IndexPd 首頁***************//
//所有類別都顯示//

const IndexPdSection = {
    template:
        `
        <section id="pd" class="mt-5 container">

        <div v-for="items in pds" class="row">
            <h2 class="font-28 font-bold-black d-flex align-items-center mt-5">
                <img class="img-fluid me-3" src="/public/img/icon_moon.png" alt="">
                    {{items.pd_type}}
            </h2>
            <div  v-for="item in items.pd"  class="col-lg-3 mt-5">
                <a href="" class="a-none ">
                    <div class="card h-100 ">
                        <div class="card-head position-relative ">
                            
                                <div v-if="item.tag_title != ''" :class="item.tag_type" class="text-light font-20 font-weight-700 d-flex align-items-center">
                                    <img v-if="item.tag_type =='tag_red' " src="/public/img/icon_draw.png" style="width: 40px; height: 40px;">
                                    {{item.tag_title}}
                                </div>
                            
                            <img :src="\`/public/img/\${item.img}\`" class="card-img-top w-100 pd-size" alt="...">

                        </div>
                        <div class="card-body ">
                            <div class="card-text font-20 font-bold-black ">
                                {{item.title}}
                            </div>
                            
                        </div>
                        <div class="card-bottom mb-3 ms-2">
                            <span class="mt-3 price">$11,760</span>
                            <span class="ms-3 mt-3 font-20 text-decoration-line-through text-gray">$15,400</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>

    </section>
                
     `,

    data() {
        return {
            pds: pds,
        }
    }

}

//**************pd 無分類***************//
//所有類別都顯示//
const pdSection = {
    template:
        `
        <section id="pd" class="mt-5 container">

        <div class="row">
            <h2 class="font-28 font-bold-black d-flex align-items-center mt-5">
                <img class="img-fluid me-3" src="/public/img/icon_moon.png" alt="">
                    {{title}}
            </h2>
            <div  v-for="item in pds"  class="col-lg-3 mt-5">
                <a href="" class="a-none ">
                    <div class="card h-100 ">
                        <div class="card-head position-relative ">
                            
                                <div v-if="item.tag_title != ''" :class="item.tag_type" class="text-light font-20 font-weight-700 d-flex align-items-center">
                                    <img v-if="item.tag_type =='tag_red' " src="/public/img/icon_draw.png" style="width: 40px; height: 40px;">
                                    {{item.tag_title}}
                                </div>
                            
                            <img :src="\`/public/img/\${item.img}\`" class="card-img-top w-100 pd-size" alt="...">

                        </div>
                        <div class="card-body ">
                            <div class="card-text font-20 font-bold-black ">
                                {{item.title}}
                            </div>
                            
                        </div>
                        <div class="card-bottom mb-3 ms-2">
                            <span class="mt-3 price">$11,760</span>
                            <span class="ms-3 mt-3 font-20 text-decoration-line-through text-gray">$15,400</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>

    </section>
                
     `,

    data() {
        return {
            title:title,
            pds: pds,
        }
    }

}


const app = Vue.createApp({})
app.component('navbar-section', navbarSection)
app.component('banner-section', BannerSection)
app.component('fixed-section', FixedSection)
app.component('carasol-section', caraoslSection)
app.component('index-pd-section', IndexPdSection)
app.component('pd-section', pdSection)
app.mount('#common')