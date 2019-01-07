
let Web3 = require('web3');
let web3;


if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    //连接私链，因为没有特殊说明--port，默认私链占用端口为8545,但我搭建的私链端口为5678
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:5678"));
}


web3.eth.defaultAccount = web3.eth.accounts[0];
//合约ABI
var abi = web3.eth.contract([
    {
        "constant": false,
        "inputs": [
            {
                "name": "when_buy_",
                "type": "uint256"
            },
            {
                "name": "param",
                "type": "int256"
            }
        ],
        "name": "buyer_finish_trans",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "get_buyer_trans_count",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "name",
                "type": "string"
            }
        ],
        "name": "get_sellerinfo_by_storename",
        "outputs": [
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "int256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "food_name_",
                "type": "string"
            },
            {
                "name": "detail",
                "type": "string"
            },
            {
                "name": "value_",
                "type": "uint256"
            }
        ],
        "name": "sendfood",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "all_foods_count",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "store_name_",
                "type": "string"
            },
            {
                "name": "food_name_",
                "type": "string"
            }
        ],
        "name": "removefood",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "get_foodinfo_by_index",
        "outputs": [
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "buyer_addr_",
                "type": "address"
            },
            {
                "name": "when_buy_",
                "type": "uint256"
            }
        ],
        "name": "seller_finish_trans",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "get_buyer_trans_by_index",
        "outputs": [
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "get_seller_trans_by_index",
        "outputs": [
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "get_seller_trans_count",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "store_name_",
                "type": "string"
            },
            {
                "name": "food_name_",
                "type": "string"
            },
            {
                "name": "trading_address_",
                "type": "string"
            }
        ],
        "name": "buyfood",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "store_name_",
                "type": "string"
            },
            {
                "name": "store_addr_",
                "type": "string"
            },
            {
                "name": "phone_",
                "type": "string"
            },
            {
                "name": "Permit_",
                "type": "string"
            }
        ],
        "name": "seller_register",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]);

//获得合约对象，之后我们就可以使用mycontract调用函数,参数为合约部署地址
var mycontract = abi.at("0xfb01260a79dbf6b524f5574bee14fafacc6a4689");

$("#login_btn").click(function() {
    if($("#account_num").val() != "0" || $("#account_num").val() != "1" || $("#account_num").val() != "2"
        || $("#account_num").val() != "3" || $("#account_num").val() != "4"){
        alert("Input 0~4");
    }
    else{
        var num = parseInt(("#account_num").val());
        web3.eth.defaultAccount = web3.eth.accounts[num];
        var buye_or_seller = mycontract.is_seller.call();
        if(buye_or_seller == true){
            window.location.href="seller.html";
        }else{
            window.location.href="buyer.html";
        }
        
    }
});


//买家

$("#register_result").click(function(){
    if($("#register_store_name").val() == "" || $("#register_store_location").val()==""
        || $("#register_phone").val() == "" || $("#register_permit").val() == "" ){
        alert("input can not be empty");
    }
    else{
        var register_or = mycontract.seller_register($("#register_store_name").val(), $("#register_store_location").val(),
            $("#register_phone").val(), $("#register_permit").val()).send({from:web3.eth.defaultAccount});
        $("#register_result").text("注册结果:" + register_or);
    }
});

$("#search_all_food_count").click(function(){
    var allfoods = mycontract.all_foods_count.call();
    $("#all_food_count").text("foods:" + allfoods);
});

$("#search_my_trans_count").click(function(){
    var alltrans = mycontract.get_buyer_trans_count.call();
    $("#my_trans_count").text("trans:" + alltrans);
});

$("#search_my_foods_index").click(function(){
    if($("#food_index").val() == ""){
        alert("input can not be empty");
    }
    else{
        var info = mycontract.get_foodinfo_by_index(parseInt($("#food_index").val()).call();
        $("#store_name1").text("店名："+info[0]);
        $("#food_name1").text("食物名："+info[1]);
        $("#food_detail").text("食物介绍"+info[2]);
        $("#food_value1").text("食物价格"+info[3]);
        $("#seller_addre1").text("卖家账户"+info[4]);
    }
});

$("#search_my_trans_count").click(function(){
    if($("#trans_index").val() == ""){
        alert("input can not be empty");
    }
    else{
        var info = mycontract.get_transinfo_by_index(parseInt($("#trans_index").val()).call();
        $("#store_name2").text("店名："+info[0]);
        $("#food_name2").text("食物名："+info[1]);
        $("#food_value2").text("食物价格"+info[2]);
        $("#when_by2").text("购买时间"+info[3]);
        $("#trading_addr2").text("送货地址"+info[4]);
    }
});

$("#search_my_trans_count").click(function(){
    if($("#search_store_name").val() == ""){
        alert("input can not be empty");
    }
    else{
        var info = mycontract.getinfobyseller($("#search_store_name").val().call();
        $("#store_name3").text("店名："+info[0]);
        $("#store_location").text("店地址："+info[1]);
        $("#store_phone").text("电话号码"+info[2]);
        $("#seller_addr").text("店家账号"+info[3]);
        $("#store_score").text("信誉值"+info[4]);
    }
});

$("#finish").click(function(){
    if($("#finish_trans_when_by").val() == "" || $("#finish_trans_score").val() == ""){
        alert("input can not be empty");
    }
    else{
        var result = mycontract.buyer_finish_trans(parseInt($("#finish_trans_when_by").val()),
            parseInt($("#finish_trans_score").val())).send({from:web3.eth.defaultAccount});
        $("#finish_result").text("结果：" + result);
    }
});


$("#buy").click(function(){
    if($("#store_name4").val() == "" || $("#food_name4").val() == "" || $("#trans_location").val() == ""){
        alert("input can not be empty");
    }
    else{
        var result = mycontract.buyfood($("#store_name4".val(), $("#food_name4").val(), $("#trans_location").val())
            .send({from:web3.eth.defaultAccount});
        $("#buy_result").text("结果：" + result);
    }
});








//卖家

$("#search_all_food_count_").click(function(){
    var allfoods = mycontract.all_foods_count.call();
    $("#all_food_count_").text("foods:" + allfoods);
});

$("#search_my_trans_count_").click(function(){
    var alltrans = mycontract.get_buyer_trans_count.call();
    $("#my_trans_count_").text("trans:" + alltrans);
});

$("#search_food_index_").click(function(){
    if($("#food_index_").val() == ""){
        alert("input can not be empty");
    }
    else{
        var info = mycontract.get_foodinfo_by_index(parseInt($("#food_index").val()).call();
        $("#store_name1_").text("店名："+info[0]);
        $("#food_name1_").text("食物名："+info[1]);
        $("#food_detail_").text("食物介绍"+info[2]);
        $("#food_value1_").text("食物价格"+info[3]);
        $("#seller_addre1_").text("卖家账户"+info[4]);
    }
});

$("#search_my_trans_index_").click(function(){
    if($("#trans_index").val() == ""){
        alert("input can not be empty");
    }
    else{
        var info = mycontract.get_transinfo_by_index(parseInt($("#trans_index").val()).call();
        $("#store_name2").text("店名："+info[0]);
        $("#food_name2").text("食物名："+info[1]);
        $("#food_value2").text("食物价格"+info[2]);
        $("#when_by2").text("购买时间"+info[3]);
        $("#trading_addr2").text("送货地址"+info[4]);
    }
});

$("#search_store_name_").click(function(){
    if($("#search_store_name").val() == ""){
        alert("input can not be empty");
    }
    else{
        var info = mycontract.getinfobyseller($("#search_store_name").val().call();
        $("#store_name3").text("店名："+info[0]);
        $("#store_location").text("店地址："+info[1]);
        $("#store_phone").text("电话号码"+info[2]);
        $("#seller_addr").text("店家账号"+info[3]);
        $("#store_score").text("信誉值"+info[4]);
    }
});

$("#finish_").click(function(){
    if($("#finish_trans_when_by_").val() == "" || $("#finish_trans_score").val() == ""){
        alert("input can not be empty");
    }
    else{
        var result = mycontract.buyer_finish_trans(parseInt($("#finish_trans_when_by_").val()),
            parseInt($("#finish_trans_score_").val())).send({from:web3.eth.defaultAccount});
        $("#finish_result_").text("结果：" + result);
    }
});


$("#buy_").click(function(){
    if($("#store_name4_").val() == "" || $("#food_name4_").val() == "" || $("#trans_location_").val() == ""){
        alert("input can not be empty");
    }
    else{
        var result = mycontract.buyfood($("#store_name4_".val(), $("#food_name4_").val(), $("#trans_location_").val())
            .send({from:web3.eth.defaultAccount});
        $("#buy_result_").text("结果：" + result);
    }
});


$("#send_as_seller").click(function(){
    if($("#food_name_as_seller").val() == "" || $("#food_detail_as_seller").val() == "" ||
        $("#food_value_as_seller").val() == ""){
        alert("input can not be empty");
    }
    else{
        var result = mycontract.sendfood($("#food_name_as_seller").val(), $("#food_detail_as_seller").val(),
            parseInt($("#food_value_as_seller").val())).send({from:web3.eth.defaultAccount});
        $("#send_result_as_seller").text("结果："+result);
    }
});


$("#remove_as_seller").click(function(){
    if($("#store_name_as_seller2").val() == "" || $("#food_name_as_seller2").val() == ""){
        alert("input can not be empty");
    }
    else{
        var result = mycontract.sendfood($("#store_name_as_seller2").val(), $("#food_name_as_seller2").val()).send({from:web3.eth.defaultAccount});
        $("#remove_result_as_seller").text("结果："+result);
    }
});

$("#search_my_trans_count_as_seller").click(function(){
    var trans = mycontract.get_seller_trans().call();
    $("#my_trans_count_as_seller").text("my trans:" + trans);
});

$("#search_my_trans_count_as_seller").click(function(){
    if($("#trans_index_as_seller").val() == "" ){
        alert("input can not be empty");
    }
    else{
        var info = mycontract.get_seller_trans_by_index(parseInt($("#trans_index_as_seller").val())).send({from:web3.eth.defaultAccount});
        $("#buyer_addre_as_seller").text("买家账号"+ info[0]);
        $("#food_name2_as_seller").text("食物名"+ info[1]);
        $("#food_value2_as_seller").text("食物价格"+ info[2]);
        $("#when_by2_as_seller").text("购买时间"+ info[3]);
        $("#trading_addr2_seller").text("送货地址"+ info[4]);
    }
});

$("#finish_as_seller").click(function(){
    if($("#buyer_addr2_by_seller").val == "" || $("#when_by_as_seller").val == ""){
        alert("input can not be empty");
    }
    else{
        var result = mycontract.seller_finish_trans($("#buyer_addr2_by_seller").val, parseInt($("#when_by_as_seller").val)).send({from:web3.eth.defaultAccount});
        $("#finish_result_as_seller").text("结果："+ result);
    }
});










