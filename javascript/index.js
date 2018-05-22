new Vue({
  el: '#app',
  data: function() {
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
	      // checkPass: '',
	      username: ''
	    },
	    signIn: {
	      pass: [
	        { validator: validatePass, trigger: 'blur' }
	      ],
	      // checkPass: [
	      //   { validator: validatePass2, trigger: 'blur' }
	      // ],
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
    }
})
