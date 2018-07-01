Vue.component('Message',{
    data () {
        return {
            ws:null,
            isShow:false
        }
    },
    created() {
        this.fetchConnection()
    },
    watch: {
        '$route': 'leaveClose'
    },
    methods: {
        fetchConnection() {
            if (document.cookie != "") {
                if ("WebSocket" in window)
                {
                    // 打开一个 web socket
                    var tokens = document.cookie.split('=')
                    var url = "ws://123.207.7.251:8080/eorder/webSocket/"+tokens[1]
                    this.ws = new WebSocket(url);
                  
                    that = this
                    this.ws.onopen = function()
                    {
                        // Web Socket 已连接上，使用 send() 方法发送数据
                        that.ws.send("require new order");
                    };
                    var that = this
                    this.ws.onmessage = function (evt) 
                    { 
                        // var received_msg = evt.data;
                        // that.$message(received_msg);
                        const h = that.$createElement;

                        that.$notify({
                          title: '新订单来了',
                          message: h('i', { style: 'color: teal'}, received_msg)
                        });
                    };
                }
                else
                {
                   // 浏览器不支持 WebSocket
                   alert("您的浏览器不支持 WebSocket!");
                }
            }
        },
        leaveClose() {
            var that = this
            if (document.cookie != "") {
                if (that.ws != null) {
                    that.ws.onclose = function() {}
                }
            }
        }
    },
    template: `
        <div v-if="isShow">socket</div>
    `
});