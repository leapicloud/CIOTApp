<template>
        	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">

                    <span class="login100-form-title p-b-48">
						<img src="static/img/mapapp.png"/>
					</span>

					<span class="login100-form-title p-b-26">
						接入设备地图
					</span>

					<div class="wrap-input100 validate-input m-b-26" data-validate="Phone number is required">
						<span class="label-input100">手机号码</span>
						<input class="input100" type="text" name="phone" v-model="phoneNum">

					</div>

					<div class="wrap-input100 validate-input m-b-18" data-validate = "SMS code is required">
						<span class="label-input100">短信验证码</span>
						<input class="input100" type="text" name="code" v-model="smsCode">

            <button @click="sendMsg()" :disabled="!show">
              <span v-show="show">获取短信验证码</span>
              <span v-show="!show">{{count}}s</span>
              </button>
					</div>

          <div v-if="showErr" style="color: red">
            <p>登录失败</p>
          </div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn" @click="login">
								登录
							</button>
						</div>
					</div>


			</div>
		</div>
      <p>Build 2018-08-16 09:14</p>
	</div>
</template>
<script>

const TIME_COUNT = 60;
export default {
    name:'login',
    data: function () {
      return {
        phoneNum: '',
        smsCode: '',
        showErr: false,
        timer:null,
        count:'',
        show:true,
      }
    },
    methods:{
        login(){
          console.log(this.showErr);
            console.log("login: %s - %s", this.phoneNum, this.smsCode);

            let url = this.$env.leapaiUrl + '/appusers/login';
            console.log('url=' + url);
            this.$http.post(url, {
                      mobile: this.phoneNum,
                      verifyCode: this.smsCode,
                      appId: this.$env.appid
                      })
                  .then(response=> {
                      console.log(response);
                      if(response.data){
                        this.showErr = false;
                        this.$router.push('/table-list');
                      }
                      else {
                        console.log(this.showErr);
                        this.showErr = true;
                      }
                    })
                  .catch(error=>{
                          console.log(error);
                          this.showErr = true;
                    });
        },
        sendMsg(){
          if(!this.timer){
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(()=>{
              if(this.count > 0 && this.count <= TIME_COUNT){
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            },1000)
          }

        }
    },
    mounted() {
      console.log(this.$env);
    }
}
</script>
<style>
.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #f2f2f2;
}

.wrap-login100 {
  width: 390px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 77px 55px 33px 55px;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
}

.logo-img {
    width: 40px;
    display: inline-block;
    height: 40px;
    margin-left: 0px;
    margin-right: 10px;
    background: white;
    border-radius: 40px;
    text-align: center;
}

.login100-form-title {
  display: block;
  font-family: Poppins-Bold;
  font-size: 30px;
  color: #333333;
  line-height: 1.2;
  text-align: center;
}
.login100-form-title i {
  font-size: 60px;
}
.p-b-26 {padding-bottom: 26px;}

.wrap-input100 {
  width: 100%;
  position: relative;
  margin-bottom: 37px;
}

.input100 {
  font-family: Poppins-Regular;
  font-size: 15px;
  color: #555555;
  line-height: 1.2;

  display: block;
  width: 100%;
  height: 45px;
  background: transparent;
  padding: 0 5px;
}




</style>
