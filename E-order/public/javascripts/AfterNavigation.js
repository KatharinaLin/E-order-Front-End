Vue.component('AfterNavigation',{
    methods: {
        signOut() {
            $.ajax({
                type: "GET",
                url: "http://123.207.7.251:8080/eorder/seller/signout",
                xhrFields: {withCredentials: true},
                //url:"https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/info",
                success: function(result) {
                    //console.log(result);
                    router.push({ path: '/signin' });
                    
                },
                error: function(message) {
                    console.log("error")
                }
            });
            
        }
    },
    template: `
        <el-row class="tac">
            <el-col>
            <el-menu
              class="el-menus"
              background-color="#4F4F4F"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
              >
              <el-menu-item route="/manageSetting" index="1">
                <i class="el-icon-menu"></i>
                <span slot="title" class="showNav">设置</span>
              </el-menu-item>
              <el-menu-item  route="/manageProduct" index="2">
                <i class="el-icon-edit"></i>
                <span slot="title" class="showNav">菜品管理</span>
              </el-menu-item>
              <el-menu-item route="/manageOrder" index="3">
                <i class="el-icon-edit-outline"></i>
                <span slot="title" class="showNav">订单管理</span>
              </el-menu-item>
              <el-menu-item  @click="signOut" index="4">
                <i class="el-icon-message"></i>
                <span slot="title" class="showNav">退出登陆</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
    `
});