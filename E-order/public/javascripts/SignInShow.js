Vue.component('SignInShow', {
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
                var RegPass = /.{6,18}$/;
                if (!RegPass.test(value)) {
                    callback(new Error('密码长度为6-18位'));
                } else {
                    callback();
                }
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
            var user = this.$refs[formName].model.username;
            var pass = hex_md5(this.$refs[formName].model.pass);
            var that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var reqbody = {
                        username: user,
                        password: pass
                    };
                    $.ajax({
                        type: "POST",
                        url: "http://123.207.7.251:8080/eorder/seller/signin",
                        xhrFields: {withCredentials: true},
                        //url:"https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/signin",
                        contentType: "application/x-www-form-urlencoded",
                        data: Qs.stringify(reqbody),
                        dataType : 'json', 
                        success: function(result) {
                            //console.log(result);
                            if (result.code == 0) {
                                store.commit('UpdateUserId', result.sellerId);
                                router.push({ path: '/manageSetting' });
                            } else {
                                alert(result.msg);
                            }
                        },
                        error: function(message) {
                            console.log("error")
                        }
                    });
                } else {
                    that.$message('提交信息有误请修改后提交');
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
            <img id="peo" src="../images/people.png">
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
              </el-form-item>
            </el-form>
        </div>
    `
});