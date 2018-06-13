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
      	
      	var user = this.$refs[formName].model.username;
      	var pass = this.$refs[formName].model.pass;
      	var tel = this.$refs[formName].model.tel;
      	var addr = this.$refs[formName].model.addr;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	var reqbody = {
			    'username':user,
			    'password':pass,
			    'telephone':tel,
			    'address':addr
			};
          	$.ajax({
                type: "POST",
                url: "https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/signup",
                contentType: "application/json",
                data: JSON.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    router.push({ path: '/signin' })
                },
                error: function(message) {
                    console.log("error")
                }
            });
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