Vue.component('Settings',{
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
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
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var validateOldpass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入旧密码'));
            } else if (value !== hex_md5(this.userdata.password)) {
                callback(new Error('旧密码输入错误!'));
            } else {
                callback();
            }
        };
        return {
            userdata: null,
            loading: true,
            isEditUsername: false,
            isEditAddress: false,
            isEditPhone: false,
            isEditPassword: false,
            username: '',
            phone: '',
            addr: '',
            isFinishEditPassword: false,
            ruleForm2: {
                pass: '',
                checkPass: '',
                oldpass: ''
            },
            rules2: {
              pass: [
                { validator: validatePass, trigger: 'blur' }
              ],
              checkPass: [
                { validator: validatePass2, trigger: 'blur' }
              ],
              oldpass: [
                { validator: validateOldpass, trigger: 'blur' }
              ]
            }
        }
    },
    created() {
        this.fetchData()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'fetchData'
    },
    methods: {
        fetchData () {
            var that=this;
            $.ajax({
                type: "GET",
                url: "http://123.207.7.251:8080/eorder/seller/info",
                xhrFields: {withCredentials: true},
                //url:"https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/info",
                success: function(result) {
                    //console.log(result);
                    if (result.code != 0) {
                        router.push({ path: '/signin' });
                    } else {
                        that.userdata = result.data;
                    
                        that.loading = false;
                    }
                    
                },
                error: function(message) {
                    console.log("error")
                }
            });
          
        },
        editUsername() {
            if (this.username === '') {
                this.isEditUsername = false
                return
            }
            var RegUserName = /^[a-zA-Z]+[a-zA-Z0-9_]{5,17}$/;
            if (!RegUserName.test(this.username)) {
                alert("用户名要以字母开头，由6-18字母和数字组成")
                return
            }
            var temp = this.userdata
            temp.username = this.username
            this.userdata = temp
            this.commitModification()
            this.isEditUsername = false
        },
        editPhone() {
            if (this.phone === '') {
                this.isEditPhone = false
                return
            }
            var RegTel = /^1[0-9]{10}$/;
            if (!RegTel.test(this.phone)) {
                alert('手机号码的格式为以1开头的11位数字')
                return
            }
            var temp = this.userdata
            temp.telephone = this.phone
            this.userdata = temp
            this.commitModification()
            this.isEditPhone = false
        },
        editAddress() {
            if (this.addr === '') {
                this.isEditAddress = false
                return
            }
            var temp = this.userdata
            temp.address = this.addr
            this.userdata = temp
            this.commitModification()
            this.isEditAddress = false
        },
        submitEditting() {
            this.$refs['ruleForm2'].validate((valid) => {
                if (valid) {
                    this.isFinishEditPassword = false
                    var temp = this.userdata
                    temp.password = hex_md5(this.ruleForm2.pass);
                    this.userdata = temp
                    this.commitModification()
                } else {
                    this.$message("密码修改不成功！")
                }
            }); 
            
        },
        commitModification() {
            var that = this;
            $.ajax({
                type: "POST",
                url: "http://123.207.7.251:8080/eorder/seller/update",
                //url:"https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/update",
                contentType: "application/x-www-form-urlencoded",
                xhrFields: {withCredentials: true},
                data: Qs.stringify(this.userdata),
                dataType : 'json',
                success: function(result) {
                    that.$message.success('成功');
                },
                error: function(message) {
                    console.log("error")
                }
            });
        },
        clearContent() {
            this.$refs['ruleForm2'].resetFields();
        }
    },
    template: `
        <div id = "setting">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>商家信息设置</span>
                </div>
                <div v-if="!loading">
                    <div class = "item">
                        <span>用户名:</span>
                        <span v-if="!isEditUsername">{{userdata.username}}</span>
                        <input id="updateCategories" v-model="username" v-if="isEditUsername" placeholder="请输入新的用户名">
                        <i class="el-icon-edit" v-if="!isEditUsername" @click="isEditUsername=true"></i>
                        <el-button type="primary" round v-if="isEditUsername" @click="editUsername">提交</el-button>
                    </div>
                    <div class = "item">
                        <span>手机号码:</span>
                        <span v-if="!isEditPhone">{{userdata.telephone}}</span>
                        <input id="updateCategories" v-model="phone" v-if="isEditPhone" placeholder="请输入新的手机号">
                        <i class="el-icon-edit" v-if="!isEditPhone" @click="isEditPhone=true"></i>
                        <el-button type="primary" round v-if="isEditPhone" @click="editPhone">提交</el-button>
                    </div>
                    <div class = "item">
                        <span>餐厅地址:</span>
                        <span v-if="!isEditAddress">{{userdata.address}}</span>
                        <input id="updateCategories" v-model="addr" v-if="isEditAddress" placeholder="请输入新的地址">
                        <i class="el-icon-edit" v-if="!isEditAddress" @click="isEditAddress=true"></i>
                        <el-button type="primary" round v-if="isEditAddress" @click="editAddress">提交</el-button>

                    </div>
                    <div class = "item">
                        <span>密码:</span>
                        <span v-if="!isEditPassword">******</span>
                        
                        <el-popover
                                placement="right"
                                width="400"
                                transition
                                trigger="click"
                                v-model="isFinishEditPassword"
                                @show="clearContent"
                        >
                            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="旧密码" prop="oldpass">
                                    <el-input type="password" v-model="ruleForm2.oldpass" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="pass">
                                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="checkPass">
                                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button  type="primary" @click="submitEditting()">提交修改</el-button>
                                </el-form-item>
                            </el-form>
                            <el-button
                                size="mini"
                                type="danger"
                                slot="reference">修改密码</el-button>

                        </el-popover>

                    </div>
                </div>
                

            </el-card>
        </div>
    `
});