Vue.component('OrderList',{

   data() {
      return {
        tableData: [],
        criteria: {
          orderId: "",
          deskId: "",
          orderDate: "",
          payStatus: "",
          orderStatus: ""
        },
        searchCriteria: {
          orderId: "",
          deskId: "",
          orderDate: "",
          payStatus: "",
          orderStatus: ""
        },
        typeData: [
          {value: 1, label:'全部'},
          {value: 2, label: '账户名'},
          {value: 3, label: '机构名称'},
          {value: 4, label: '手机号码'},
          {value: 5, label: '联系人'}],
        orderNum: 0,
        length: 0,
        cur_page: 1,
        page_size: 10,
        url : 'http://123.207.7.251:8080/eorder/seller/order/list',
        ToChangepayStatus: false,
        idx: -1,
        Todelete: false,
        Tofinish: false,
        orderStatusFilter: [{ text: '进行中', value: 0 }, { text: '已完结', value: 1 }, { text: '已取消', value: 2 }, { text: '全部', value: "" }],
        payStatusFilter: [{ text: '已支付', value: 1 }, { text: '未支付', value: 0 }, { text: '全部', value: "" }]
      }
    },
    created() {
        this.getData();
    },
    methods: {
        Format(dd, fmt) { //author: meizz 
            if(dd === "") return dd;
            var date = new Date(dd);
            var o = {
                "M+": date.getMonth() + 1, //月份 
                "d+": date.getDate(), //日 
                "h+": date.getHours(), //小时 
                "m+": date.getMinutes(), //分 
                "s+": date.getSeconds(), //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        getDetail(i) {
             axios.get("http://123.207.7.251:8080/eorder/seller/order/detail", {params:{
                orderId: this.tableData[i].orderId
            }}).then((res) => {
                //console.log(res);
                Vue.set(this.tableData[i],'orderDetailList',res.data.data.orderDetailVOList);
                //console.log(this.tableData[i]);
            }).catch((error) => {
                console.log(error);
            });
        },
        getData() {
            axios.defaults.withCredentials = true;
            //console.log(this.searchCriteria.orderDate);
            axios.get(this.url, {params:{
                orderId: this.searchCriteria.orderId,
                deskId: this.searchCriteria.deskId,
                orderStatus: this.searchCriteria.orderStatus,
                payStatus: this.searchCriteria.payStatus,
                orderDate: this.searchCriteria.orderDate,
                page: this.cur_page-1,
                size: this.page_size
            }}).then((res) => {
                //console.log(res);
                this.tableData = res.data.data;
                this.orderNum = res.data.total;
                for (var i = 0; i < this.tableData.length; i++) {
                    Vue.set(this.tableData[i],'index',i);
                    d = this.Format(this.tableData[i].createTime*1000,"yyyy-MM-dd");
                    Vue.set(this.tableData[i],'date',d);
                    this.getDetail(i);
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        // showDetail(index, row){
        //     axios.get("http://123.207.7.251:8080/eorder/seller/order/detail", {params:{
        //         orderId: row.orderId
        //     }}).then((res) => {
        //         this.tableData[index] = Object.assign({}, res.data.data);
        //         //this.$set(this.tableData[i],'orderDetailList',res.data.data.orderDetailList)
        //     }).catch((error) => {
        //         console.log(error);
        //     });
        //     console.log(row);
        // },
        filterpayStatus(value, row) {
            return row.payStatus === value;
        },
        filterorderStatus(value, row) {
            return row.orderStatus === value;
        },
        handlePay(index, row) {
            this.idx = row.index;
            this.ToChangepayStatus = true;
        },
        changepayStatus() {
            var that = this;
            reqbody = {
                orderId: this.tableData[this.idx].orderId
            }
            $.ajax({
                type: "POST",
                url: "http://123.207.7.251:8080/eorder/seller/order/pay",
                xhrFields: {withCredentials: true},
                //url:"https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/pay",
                contentType: "application/x-www-form-urlencoded",
                data: Qs.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    that.tableData[that.idx].payStatus = 1;
                    that.ToChangepayStatus = false;
                },
                error: function(message) {
                    console.log("error")
                }
            });
        },
        handleDelete(index, row) {
            this.idx = row.index;
            this.Todelete = true;
        },
        deleteOrder() {
            // axios.post("http://123.207.7.251:8080/eorder/seller/order/cancel",
            //     {
            //         orderId: this.tableData[this.idx].orderId
            //     }
            // ).then((res) => {
            //     //console.log(res);
            //     // this.tableData.splice(this.idx, 1);
                // this.tableData[this.idx].orderStatus = 2;
                // this.$message.success('成功');
                // this.Todelete = false;
            // }).catch((error) => {
            //     console.log(error);
            // });
            var that = this;
            reqbody = {
                orderId: this.tableData[this.idx].orderId
            }
            $.ajax({
                type: "POST",
                url: "http://123.207.7.251:8080/eorder/seller/order/cancel",
                xhrFields: {withCredentials: true},
                //url:"https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/signin",
                contentType: "application/x-www-form-urlencoded",
                data: Qs.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    that.tableData[that.idx].orderStatus = 2;
                    that.$message.success('成功');
                    that.Todelete = false;
                },
                error: function(message) {
                    console.log("error")
                }
            });
        },
        handleFinish(index, row) {
            this.idx = row.index;
            this.Tofinish = true;
        },
        finishOrder() {
            // axios.post("http://123.207.7.251:8080/eorder/seller/order/finish",
            //     {
            //         orderId: this.tableData[this.idx].orderId
            //     }
            // ).then((res) => {
            //     this.tableData[this.idx].orderStatus = 1;
            //     this.Tofinish = false;
            // }).catch((error) => {
            //     console.log(error);
            // });
            var that = this;
            reqbody = {
                orderId: this.tableData[this.idx].orderId
            }
            $.ajax({
                type: "POST",
                url: "http://123.207.7.251:8080/eorder/seller/order/finish",
                xhrFields: {withCredentials: true},
                //url:"https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/signin",
                contentType: "application/x-www-form-urlencoded",
                data: Qs.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    that.tableData[that.idx].orderStatus = 1;
                    that.Tofinish = false;
                },
                error: function(message) {
                    console.log("error")
                }
            });
        },
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        handleSizeChange(val) {
            this.page_size = val;
            this.getData();
        },
     //    tableRowClassName({row, rowIndex}) {
        //     if (row.payStatus === 0) {
        //       return 'warning-row';
        //     } else{
        //       return 'success-row';
        //     }
        //     return '';
        // }
        Search() {
            this.cur_page = 1;
            this.searchCriteria = this.criteria;
            if (this.criteria.orderDate === null) {
                this.searchCriteria.orderDate = "";
            }
            this.getData();
        },
        reSetSearch() {
            this.criteria = {
              orderId: '',
              deskId: '',
              orderDate: '',
              payStatus: '',
              orderStatus: ''
            }
        },
        handleFilterChange(filters) {
            console.log(filters);
        }
    },


    template:`
    <div class="orderList">
        <div id="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-tickets"></i> 订单列表</el-breadcrumb-item>
                </el-breadcrumb>
        </div>
        <div id="search-box">
          订单号:
          <el-input
            placeholder="请输入订单号"
            v-model="criteria.orderId">
          </el-input>
          桌号：
          <el-input
            placeholder="请输入桌号"
            v-model="criteria.deskId">
          </el-input>
          日期：
          <el-date-picker
              v-model="criteria.orderDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
          </el-date-picker>
          支付状态：
          <el-select v-model="criteria.payStatus" placeholder="请选择支付状态">
            <el-option
              v-for="item in payStatusFilter"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
          订单状态：
          <el-select v-model="criteria.orderStatus" placeholder="请选择订单状态">
            <el-option
              v-for="item in orderStatusFilter"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button
              size="small"
              type="primary"
              @click="Search">搜索</el-button>
          <el-button
              size="mini"
              @click="reSetSearch">重置</el-button>
        </div>
        <el-table
        :data="tableData"
        @filter-change="handleFilterChange"
        style="width: 100%">
        <el-table-column
          type="expand">
         <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item v-for="(item,index) in props.row.orderDetailList" :key="index">
                <span>{{ item.productName }}   * {{ item.productQuantity }} = {{item.productPrice}}</span>
              </el-form-item>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column
          prop="orderId"
          label="订单号"
          sortable
          width="120"
         >
        </el-table-column>
          <el-table-column
          prop="deskId"
          label="桌号"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderAmount"
          label="总金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="payStatus"
          label="支付状态"
          width="100"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              type="primary"
              v-if="scope.row.payStatus === 1"
              disable-transitions>已支付</el-tag>
            <el-tag
              type="success"
              v-else-if="scope.row.payStatus === 0"
              disable-transitions>未支付</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="订单状态"
          width="100"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              type="info"
              v-if="scope.row.orderStatus === 1"
              disable-transitions>已完结</el-tag>
            <el-tag
              type="danger"
              v-else-if="scope.row.orderStatus === 2"
              disable-transitions>已取消</el-tag>
            <el-tag
              type="success"
              v-else-if="scope.row.orderStatus === 0"
              disable-transitions>进行中</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.row.payStatus === 1 || scope.row.orderStatus === 2"
              @click="handlePay(scope.$index, scope.row)">已支付</el-button>
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.orderStatus === 0"
              @click="handleDelete(scope.$index, scope.row)">取消订单</el-button>
            <el-button
              size="mini"
              type="info"
              v-else
              disabled
              @click="handleDelete(scope.$index, scope.row)">取消订单</el-button>
            <el-button
              size="mini"
              type="success"
              round
              v-if="scope.row.orderStatus === 0"
              @click="handleFinish(scope.$index, scope.row)">完成</el-button>
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
                :total="orderNum">
            </el-pagination>
        </div>
              <!-- 支付提示框 -->
            <el-dialog title="提示" :visible.sync="ToChangepayStatus" width="300px" center>
                <div class="del-dialog-cnt">修改支付状态后不可更改，是否确定订单已支付？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="ToChangepayStatus = false">取 消</el-button>
                    <el-button type="primary" @click="changepayStatus">确 定</el-button>
                </span>
            </el-dialog>
             <!-- 取消提示框 -->
            <el-dialog title="提示" :visible.sync="Todelete" width="300px" center>
                <div class="del-dialog-cnt">取消订单后不可更改，是否确定取消订单？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="Todelete = false">取 消</el-button>
                    <el-button type="primary" @click="deleteOrder">确 定</el-button>
                </span>
            </el-dialog>
              <!-- 完成提示框 -->
            <el-dialog title="提示" :visible.sync="Tofinish" width="300px" center>
                <div class="del-dialog-cnt">确认订单完成后不可更改，是否确定完成订单？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="Tofinish = false">取 消</el-button>
                    <el-button type="primary" @click="finishOrder">确 定</el-button>
                </span>
            </el-dialog>
    </div>
    `
});