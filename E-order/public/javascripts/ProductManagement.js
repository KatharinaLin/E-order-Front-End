Vue.component('ProductList',{
    data () {
        return {
            types:null,
            seenView:true,
            seenDelete:false,
            showText:"编辑",
            categoryId:null,
            categoryType:null,
            inputs: '',
            seenAdd:false,
            isEditting:null,
            updates:'',
            loading: true
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
            var reqbody = {
                //  'username':store.state.userId
                // 'userId':"123456"
            };
            var that=this;
            $.ajax({
                type: "GET",
                 url: "http://123.207.7.251:8080/eorder/seller/category/list",
                //url:"https://private-5e210-ordermeal.apiary-mock.com/eorder/seller/category/list",
                //contentType: "application/json",
                //data: JSON.stringify(reqbody),
                //dataType : 'json', 
                xhrFields: {withCredentials: true},
                success: function(result) {
                    that.types = new Array()
                    that.categoryId = new Array()
                    that.isEditting = new Array()
                    that.categoryType = new Array()
                    for (var i = 0; i < result.data.length; i++) {
                        that.types[i] = result.data[i].categoryName
                        that.categoryId[i] = result.data[i].categoryId
                        that.categoryType[i] = result.data[i].categoryType
                        that.isEditting[i] = false
                    }
                    that.seenAdd = true
                    that.loading = false
                },
                error: function(message) {
                    console.log("error")
                }
            });
          
        },
        EditCategory() {
            if (this.seenView) {
                this.seenView = false
                this.seenDelete = true
                this.showText = "完成"
            } else {
                this.seenView = true
                this.seenDelete = false
                this.showText = "编辑"
            }
        },
        DeleteCategory(index) {
            var reqbody = {
                // 'username':store.state.userId,
                //'userId':"123456",
                'categoryId':this.categoryId[index]
            };
            var that=this;
            that.types.splice(index, 1)
            $.ajax({
                type: "POST",
                url: "http://123.207.7.251:8080/eorder/seller/category/delete",
                //url:"https://private-f835d-ordermeal.apiary-mock.com//eorder/seller/category/delete",
                contentType: "application/x-www-form-urlencoded",
                xhrFields: {withCredentials: true},
                data: Qs.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    console.log("success")
                },
                error: function(message) {
                    console.log("error")
                }
            });
        },
        AddCategory() {
            var ctype = 0;
            if (this.categoryId.length > 0) {
                ctype = this.categoryId[this.categoryId.length-1]+1
            } else {
                ctype = 0;
            }
            var reqbody = {
                // 'username':store.state.userId,
                //'username':"123456",
                'categoryName':this.inputs,
                'categoryType': ctype
            };
            //console.log(reqbody);
            var that=this;
            that.types[that.types.length] = that.inputs
            that.categoryType[that.categoryType.length] = ctype
            that.inputs = ''
            $.ajax({
                type: "POST",
                url: "http://123.207.7.251:8080/eorder/seller/category/add",
                //url:"https://private-f835d-ordermeal.apiary-mock.com//eorder/seller/category/add",
                contentType: "application/x-www-form-urlencoded",
                xhrFields: {withCredentials: true},
                data: Qs.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    that.categoryId[that.categoryId.length] = result.data.categoryId;
                },
                error: function(message) {
                    console.log("error")
                }
            });
        },
        GetDetail(index) {
            router.push({ name: 'editProducts', params: {type : this.categoryType[index], name :  this.types[index] }})
        },
        updateCategory(index) {
            for (var i = 0; i < this.isEditting.length; i++) {
                if (this.isEditting[i] === true)
                    return
            }
            Vue.set(this.isEditting,index,true)
        },
        commitUpdateCategory(index) {
            var reqbody = {
                
                // 'username':store.state.userId,
                //"userId": "123456",
                "categoryId": this.categoryId[index],
                "categoryName": this.updates,
                "categoryType": index
                
            }
            var that=this;
            Vue.set(that.types,index,that.updates)
            Vue.set(that.isEditting,index,false)
            that.updates = ''
            $.ajax({
                type: "POST",
                url: "http://123.207.7.251:8080/eorder/seller/category/update",
                //url:"https://private-f835d-ordermeal.apiary-mock.com//eorder/seller/category/add",
                contentType: "application/x-www-form-urlencoded",
                data: Qs.stringify(reqbody),
                xhrFields: {withCredentials: true},
                dataType : 'json', 
                success: function(result) {
                    console.log("修改类目成功")
                },
                error: function(message) {
                    console.log("error")
                }
            });
        }

    },
    template: `
        <div id = "mealList">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>菜品种类</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="EditCategory">{{showText}}</el-button>
                </div>
                
                <div v-for="(value, index) in types" class="text_item" v-loading="loading">
                    <el-button type="warning" icon="el-icon-star-off" circle v-if="seenView" @click="GetDetail(index)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle v-if="seenDelete" @click="DeleteCategory(index)"></el-button>
                    
                    <span v-if="!isEditting[index]">{{value}}</span>
                    <input id="updateCategories" v-model="updates" placeholder="修改类目" v-if="isEditting[index]">
                    <i class="el-icon-edit" v-if="seenView&&!isEditting[index]" @click="updateCategory(index)"></i>
                    <el-button type="primary" round v-if="isEditting[index]" @click="commitUpdateCategory(index)">提交</el-button>
                </div>
                <el-button type="primary" icon="el-icon-edit" circle v-if="seenAdd"></el-button>
                <input id="addCategories" v-model="inputs" placeholder="请输入新类目" v-if="seenAdd">
                <el-button type="primary" round v-if="seenAdd" @click="AddCategory">提交</el-button>

            </el-card>
        </div>
    `
});