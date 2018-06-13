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