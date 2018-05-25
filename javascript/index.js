Vue.component('signinshow', {
   data:function() {
    var checkUsername = (rule, value, callback) => {
	    if (!value) {
	      return callback(new Error('用户名不能为空'));
	    } else {
	      callback();
	    }
	};
	var validatePass = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请输入密码'));
	    } else {
	      if (this.signInForm.checkPass !== '') {
	        this.$refs.signInForm.validateField('checkPass');
	      }
	      callback();
	    }
	};
	var validatePass2 = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请再次输入密码'));
	    } else if (value !== this.signInForm.pass) {
	      callback(new Error('两次输入密码不一致!'));
	    } else {
	      callback();
	    }
	};
	return {
	    signInForm: {
	      pass: '',
	      username: ''
	    },
	    signIn: {
	      pass: [
	        { validator: validatePass, trigger: 'blur' }
	      ],
	      username: [
	        { validator: checkUsername, trigger: 'blur' }
	      ]
	    }
	};
  },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  
  
  template: `
    <div id="SignInTable">
    	<img id="peo" src="../assets/people.png">
		<div>
			<p id="SignTitle">Sign In For E-Order</p>
		</div>
		<el-form :model="signInForm" status-icon :rules="signIn" ref="signInForm" label-width="100px">
		  <el-form-item label="用户名" prop="username">
		    <el-input v-model.number="signInForm.username" id="inputa"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="pass">
		    <el-input type="password" v-model="signInForm.pass" auto-complete="off" id="inputb"></el-input>
		  </el-form-item>

		  <el-form-item>
		    <el-button type="primary" @click="submitForm('signInForm')" id="signInButton">登陆</el-button>
		    <!-- <el-button @click="resetForm('signInForm')">重置</el-button> -->
		  </el-form-item>
		</el-form>
	</div>
  `
});

Vue.component('signupshow', {
   data:function() {
    var checkUsername = (rule, value, callback) => {
	    if (!value) {
	        return callback(new Error('用户名不能为空'));
	    } else {
	    	var RegUserName = /^[a-zA-Z]+[a-zA-Z0-9_]{5,17}$/;
	    	if (!RegUserName.test(value)) {
	    		return callback(new Error('用户名要以字母开头，由6-18字母和数字组成'));
	    	} else{
	    		callback();
	    	} 
	    }
	};
	var validatePass = (rule, value, callback) => {
	    if (value === '') {
	        callback(new Error('请输入密码'));
	    } else {
	        if (this.signUpForm.checkPass !== '') {
	            this.$refs.signUpForm.validateField('checkPass');
	        }
	        var RegPass = /.{6,18}$/;
	        if (!RegPass.test(value)) {
	      	    callback(new Error('密码长度为6-18位'));
	        } else {
	      	    callback();
	        }
	      
	    }
	};
	var validatePass2 = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请再次输入密码'));
	    } else if (value !== this.signUpForm.pass) {
	      callback(new Error('两次输入密码不一致!'));
	    } else {
	      callback();
	    }
	};
	var checkTel = (rule, value, callback) => {
		if (value === '') {
	      callback(new Error('请输入手机号码'));
	    } else {
	    	var RegTel = /^1[0-9]{10}$/;
	    	if (!RegTel.test(value)) {
	    		callback(new Error('手机号码的格式为以1开头的11位数字'));
	    	} else {
	    		callback();
	    	}
	    }
	};
	var checkAddr  = (rule, value, callback) => {
		if (value === '') {
	      callback(new Error('请输入地址'));
	    } else {
	    	callback();
	    }
	};
	return {
	    signUpForm: {
	      pass: '',
	      checkPass: '',
	      username: '',
	      tel: '',
	      addr: ''
	    },
	    signUp: {
	      pass: [
	        { validator: validatePass, trigger: 'blur' }
	      ],
	      checkPass: [
	        { validator: validatePass2, trigger: 'blur' }
	      ],
	      username: [
	        { validator: checkUsername, trigger: 'blur' }
	      ],
	      tel: [
	        { validator: checkTel, trigger: 'blur' }
	      ],
	      addr: [
	        { validator: checkAddr, trigger: 'blur' }
	      ]
	    }
	};
  },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  
  
  template: `
    <div id="SignUpTable">
		<img id="peo" src="../assets/people.png">
		<div>
			<p id="SignTitle">Sign Up For E-Order</p>
		</div>
		<el-form :model="signUpForm" status-icon :rules="signUp" ref="signUpForm" label-width="100px">
		  <el-form-item label="用户名" prop="username">
		    <el-input v-model="signUpForm.username" id="inputa"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="pass">
		    <el-input type="password" v-model="signUpForm.pass" auto-complete="off" id="inputb"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="checkPass">
		    <el-input type="password" v-model="signUpForm.checkPass" auto-complete="off" id="confirm"></el-input>
		  </el-form-item>
		  <el-form-item label="手机" prop="tel">
		    <el-input v-model.number="signUpForm.tel"auto-complete="off" id="tel"></el-input>
		  </el-form-item>
		  <el-form-item label="地址" prop="addr">
		    <el-input v-model="signUpForm.addr"auto-complete="off" id="addr"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('signUpForm')" id="signUpButton">注册</el-button>
		    <el-button @click="resetForm('signUpForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
  `
});
Vue.component('contactshow',{
	template: `
		<div id="contactView">
			<div>
				<p id="ContactTitle">Contact us</p>
			</div>
			<p id="contactDetail">  如果您想咨询相关信息、解决问题，或者对我们的服务提出一些建议，我们都十分欢迎。您可以通过下面的方式联系我们，谢谢您的合作！</p>
			<i class="el-icon-message"></i>
			<a href="mailto:EOrder_China@163.com?subject=客户咨询">发送邮件</a>
		</div>
	`
});
const Sgnin= { template: '<signinshow></signinshow>' }
const Sgnup = { template: '<signupshow></signupshow>' }
const con = { template: '<contactshow></contactshow>' }
const routes = [
  { path: '/signin', component: Sgnin },
  { path: '/signup', component: Sgnup },
  { path: '/contact', component: con }
]


const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

new Vue({
  el: '#app',
  router
})

