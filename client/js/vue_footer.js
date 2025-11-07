
//**************footer***************//
const footer_logo="footer_logo.png";
const footer_items=[
    {
        title:"交易說明",
        link:"#"
    },
    {
        title:"常見問題",
        link:"#"
    },
    {
        title:"聯絡我們",
        link:"#"
    },
    {
        title:"服務條款",
        link:"#"
    },
    {
        title:"隱私權政策",
        link:"#"
    },
]
const footer_items2=["客服電話 0801231234","客服時間 周一至周日 9:00-18:00","統一編號 0000000001","玥球人玩具股份有限公司版權所有@2025"]
const footer={
    template: 
    `
    <section id="contact" class="mt-5 bg-gray">

        <div class="row d-flex justify-content-center">
            <div class="col-10">
                <div class="row ">
                    <div class="col-lg-2">
                        <img class="img-fluid" :src="\`/public/img/\${footer_logo}\`">
                    </div>
                    <div class="col-lg-8 mb-5">
                        <div class="row h-50 d-flex align-items-end font-bold-black ">
                            <div v-for="(item,key) in footer_items" class="col-12 col-lg-2  text-center " :class="key !=0?'border-lg-start':''">
                                <a class="nav-link2" :href=\`\${item.link}\`>{{item.title}}</a> 
                            </div>
                        </div>
                        <div class="row h-50 mt-4 d-flex align-items-end ">
                            <div v-for="item in footer_items2" class="col-lg-4">
                                {{item}}
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-2 d-flex align-items-center justify-content-center ">
                        <a href="#">
                            <div class="position-relative black-cirlce-80">
                                <i class="fa-brands fa-facebook-f display-5 p-center text-light"></i>
                            </div>
                        </a>
                        <a href="#">
                            <div class="position-relative black-cirlce-80 ms-5">
                                <i class="bi bi-instagram display-5 p-center text-light"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </section>
                
     `,
  
            
    data() {
        return {
                footer_logo:footer_logo,
                footer_items:footer_items,
                footer_items2:footer_items2,
            }
        }
        
}

const footer_app = Vue.createApp({})
footer_app.component('footer-section', footer)
footer_app.mount('#footer')