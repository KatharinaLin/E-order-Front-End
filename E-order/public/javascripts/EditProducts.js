Vue.component('EditProducts',{
    data () {
        return {
            tableData: [],
            length: 0,
            cur_page: 1,
            page_size: 10,
            total: 0,
            url : 'http://123.207.7.251:8080/eorder/seller/product/list',
            ToChangeproductStatus: false,
            idx: 0,
            productIds: null,
            ids: '',
            names: '',
            form: {
                pname: '',
                price: '',
                stock: '',
                desc: '',
                offsale: 0,
                plink: ''
            },
            isEditting: null,
            isAdd: false,
            addform: {
                pname: '',
                price: '',
                stock: '10000',
                desc: '',
                offsale: 0,
                plink: ''
            },
            loading: true
        }
    },
    created() {
        this.getData()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'getData'
    },
    methods: {
        getData() {
            axios.defaults.withCredentials = true;
            axios.get(this.url, {params:{
                page: this.cur_page-1,
                size: this.page_size,
                categoryType: this.$route.params.type
            }}).then((res) => {
                //console.log(res);
                this.tableData = res.data.data;
                this.total = res.data.total;
                this.productids = new Array()
                this.isEditting = new Array()
                for (var i = 0; i < this.tableData.length; i++) {
                    this.productids[i] = this.tableData[i].productId
                    this.isEditting[i] = false
                    this.tableData[i].initialIndex = i
                }
                this.loading = false
            }).catch((error) => {
                console.log(error);
            });
        },
        filterproductStatus(value, row) {
            return row.productStatus === value;
        },
        setIndex(row) {
            console.log("1")
            for (var i = 0; i < this.productids.length; i++) {
                if (this.productids[i] === row.productId) {
                    this.idx = i
                    return
                }
            }

        },
        handleOnsale(index, row) {
            this.setIndex(row)
            this.ToChangeproductStatus = true;
            this.changeproductStatus()
            onSaleurl = 'http://123.207.7.251:8080/eorder/seller/product/onSale'
            // axios.post(onSaleurl, {
            //     productId: row.productId
            // }).then((res) => {
            //     console.log("on sale success")
            // }).catch((error) => {
            //     console.log(error);
            // });
            reqbody = {
                productId: row.productId
            }
            $.ajax({
                type: "POST",
                url: onSaleurl,
                xhrFields: {withCredentials: true},
                //url:"https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/signin",
                contentType: "application/x-www-form-urlencoded",
                data: Qs.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    console.log("on sale success")
                },
                error: function(message) {
                    console.log("error")
                }
            });
        },
        changeproductStatus() {
            if (this.tableData[this.idx].productStatus === 0) {
                this.tableData[this.idx].productStatus = 1;
            } else {
                this.tableData[this.idx].productStatus = 0;
            }
            
            this.ToChangeproductStatus = false;
        },
        handleOffsale(index, row) {
            this.setIndex(row)

            this.ToChangeproductStatus = true;
            this.changeproductStatus()
            offSaleurl = 'http://123.207.7.251:8080/eorder/seller/product/offSale'

            // axios.post(offSaleurl, {params:{
            //     productId: row.productId
            // }}).then((res) => {
            //     console.log(" off sale success")
            // }).catch((error) => {
            //     console.log(error);
            // });
            reqbody = {
                productId: row.productId
            }
            $.ajax({
                type: "POST",
                url: offSaleurl,
                xhrFields: {withCredentials: true},
                //url:"https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/signin",
                contentType: "application/x-www-form-urlencoded",
                data: Qs.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    console.log(" off sale success")
                },
                error: function(message) {
                    console.log("error")
                }
            });
        },
        handleEditProduct(index, row) {

            
            Vue.set(this.isEditting, row.initialIndex, true)
            this.form.pname = row.productName
            this.form.price = row.productPrice
            this.form.stock = row.productStock
            this.form.desc = row.productDescription
            this.form.offsale = Boolean(row.productStatus)
            this.form.plink=row.productIcon
        },
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        handleSizeChange(val) {
            this.page_size = val;
        },
        submitEditting(form,row) {
            Vue.set(this.isEditting, row.initialIndex, false)
            modifiedurl = 'http://123.207.7.251:8080/eorder/seller/product/update'
            var offsales = 1;
            if (!this.form.offsale) offsales = 0
            // axios.post(modifiedurl, {params:{
            //     productId: row.productId,
            //     productName: this.form.pname,
            //  productPrice: this.form.price,
            //  productDescription: this.form.desc,
            //  productIcon: this.form.plink,
            //  productStock: this.form.stock,
            //  productStatus: offsales,
            //  categoryType: this.$route.params.type,
            // }}).then((res) => {
            //     console.log("modify success")
            // }).catch((error) => {
            //     console.log(error);
            // });
            var that = this;
            reqbody = {
                productId: row.productId,
                productName: this.form.pname,
                productPrice: this.form.price,
                productDescription: this.form.desc,
                productIcon: this.form.plink,
                productStock: this.form.stock,
                productStatus: offsales,
                categoryType: this.$route.params.type,
            }
            $.ajax({
                type: "POST",
                url: modifiedurl,
                xhrFields: {withCredentials: true},
                //url:"https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/signin",
                contentType: "application/x-www-form-urlencoded",
                data: Qs.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    //console.log("modify success");
                    that.getData();
                },
                error: function(message) {
                    console.log("error")
                }
            });
            
        },
        submitAddition() {
            this.isAdd=false
            addurl = 'http://123.207.7.251:8080/eorder/seller/product/add'
            var offsales = 1;
            if (!this.form.offsale) offsales = 0
            // axios.post(addurl, {params:{
             //    productName: this.addform.pname,
                // productPrice: this.addform.price,
                // productDescription: this.addform.desc,
                // productIcon: this.addform.plink,
                // productStock: this.addform.stock,
                // productStatus: offsales,
            //  categoryType: this.$route.params.type,
            // }}).then((res) => {
            //     this.getData()
            // }).catch((error) => {
            //     console.log(error);
            // });
            var that=this;
            reqbody = {
                productName: this.addform.pname,
                productPrice: this.addform.price,
                productDescription: this.addform.desc,
                productIcon: this.addform.plink,
                productStock: this.addform.stock,
                productStatus: offsales,
                categoryType: this.$route.params.type
            }
            $.ajax({
                type: "POST",
                url: addurl,
                xhrFields: {withCredentials: true},
                //url:"https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/signin",
                contentType: "application/x-www-form-urlencoded",
                data: Qs.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    that.getData()
                },
                error: function(message) {
                    console.log("error")
                }
            });
            this.addform.pname = ''
            this.addform.price = ''
            this.addform.stock = '10000'
            this.addform.desc = ''
            this.addform.offsale = 0
            this.addform.plink = ''
        }
        

    },
    template: `
        <div class="productlist">
            <div id="crumbs">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item><i class="el-icon-tickets"></i> {{this.$route.params.name + '商品列表'}}</el-breadcrumb-item>
                    </el-breadcrumb>
            </div>
             
            <el-popover
                placement="right"
                width="400"
                transition
                trigger="click"
                v-model="isAdd"
            >
                <el-form ref="form" :model="addform" label-width="80px" >
                    <el-form-item label="菜品名字">
                        <el-input v-model="addform.pname"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品价格">
                        <el-input v-model="addform.price"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品库存">
                        <el-input v-model="addform.stock"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品描述">
                        <el-input type="textarea" v-model="addform.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="商品下架">
                        <el-switch v-model="addform.offsale"></el-switch>
                    </el-form-item>
                    <el-form-item label="图片链接">
                        <el-input v-model="addform.plink"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button  type="primary" @click="submitAddition()">提交修改</el-button>
                    </el-form-item>
                </el-form>
                <el-button
                    size="mini"
                    slot="reference"
                    type="primary">添加商品</el-button>

            </el-popover>
            <el-table
                :data="tableData"
                style="width: 100%"
                v-loading="loading"
            >
                <el-table-column
                    type="expand"
                    prop="productDescription">

                    
                    <template slot-scope="props">
                        <img  v-bind:src="props.row.productIcon" width="80" height="80"/>
                        <el-form label-position="left" inline class="demo-table-expand">
                          {{props.row.productDescription}}
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="productId"
                    label="菜品编号"
                    sortable
                    width="120"
                >
                </el-table-column>
                    <el-table-column
                    prop="productName"
                    label="菜品名字"
                    sortable
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="productPrice"
                    label="菜品价格"
                    sortable
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="productStock"
                    label="菜品库存"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="productStatus"
                    label="菜品状态"
                    width="120"
                    :filters="[{ text: '上架', value: 0 }, { text: '下架', value: 1 }]"
                    :filter-method="filterproductStatus"
                    filter-placement="bottom-end"
                >
                    <template slot-scope="scope">
                        <el-tag type="primary" v-if="scope.row.productStatus === 1" disable-transitions>
                            已下架
                        </el-tag>
                        <el-tag type="success" v-else-if="scope.row.productStatus === 0" disable-transitions>
                            已上架
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="danger"
                          v-if="scope.row.productStatus === 0"
                          @click="handleOffsale(scope.$index, scope.row)">下架菜品</el-button>
                        <el-button
                          size="mini"
                          type="primary"
                          v-if="scope.row.productStatus === 1"
                          @click="handleOnsale(scope.$index, scope.row)">上架菜品</el-button>
                        
                        <el-popover
                            placement="right"
                            width="400"
                            transition
                            trigger="click"
                            v-model="isEditting[scope.row.initialIndex]"
                        >
                            <el-form ref="form" :model="form" label-width="80px" >
                                <el-form-item label="菜品名字">
                                    <el-input v-model="form.pname"></el-input>
                                </el-form-item>
                                <el-form-item label="菜品价格">
                                    <el-input v-model="form.price"></el-input>
                                </el-form-item>
                                <el-form-item label="菜品库存">
                                    <el-input v-model="form.stock"></el-input>
                                </el-form-item>
                                <el-form-item label="菜品描述">
                                    <el-input type="textarea" v-model="form.desc"></el-input>
                                </el-form-item>
                                <el-form-item label="商品下架">
                                    <el-switch v-model="form.offsale"></el-switch>
                                </el-form-item>
                                <el-form-item label="图片链接">
                                    <el-input v-model="form.plink"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button  type="primary" @click="submitEditting('form',scope.row)">提交修改</el-button>
                                </el-form-item>
                                    
                            </el-form>
                            <el-button
                                size="mini"
                                type="primary"
                                slot="reference"
                                @click="handleEditProduct(scope.$index, scope.row)">编辑菜品信息</el-button>

                        </el-popover>
                            
                    </template>
                </el-table-column>
                
            </el-table>
            <div class="pagination">
                <el-pagination 
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    `
});