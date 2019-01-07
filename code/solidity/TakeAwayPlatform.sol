pragma solidity ^0.4.25;
contract TakeawayPlatform{
    
    
    //商家类
    struct seller{
        address seller_addr;
        string store_name;
        string store_addr;
        string phone;
        string Permit;//许可，后期调用相关部门API，确认合法
        int256 score;
    }
    
    
    //食品类
    struct food{
        string store_name;
        string food_name;
        string food_detail;
        uint value;
        address seller_addr;
    }
    
    
    //交易类 
    struct trans{
        address buyer_addr;
        address seller_addr;
        string store_name;
        string food_name;
        uint value;
        uint when_buy;
        string trading_address;
    }
    
    //seller's infomation
    seller[] all_sellers;
    food[] all_foods;
    trans[] all_trans;
    
    
    
    
    
   // 用户注册成卖家
    function seller_register(string store_name_,string store_addr_,string phone_,string Permit_)public returns(bool){
        for(uint i = 0; i < all_sellers.length; i++){
            if(msg.sender == all_sellers[i].seller_addr){ //have registered
                return false;
            }
        }
        all_sellers.push(seller({seller_addr:msg.sender,
            store_name:store_name_,store_addr:store_addr_,
            phone:phone_,Permit:Permit_,score:0}));
        return true;
    }
    
    
    function is_seller(address addr)public view returns(bool){
        for(uint i = 0; i < all_sellers.length; i++){
            if(msg.sender == all_sellers[i].seller_addr){ 
                return true;
            }
        }
        return false;
    }

    //卖家发送食品信息
    function sendfood(string food_name_, string detail, uint value_)public returns(bool){
        uint num = 0;
        for(uint i = 0; i < all_sellers.length; i++){
            if(msg.sender == all_sellers[i].seller_addr){ 
                num = i+1;
                break;
            }
        }
        if(num == 0){
            return false;
        }
        all_foods.push(food({store_name:all_sellers[num-1].store_name,
            food_name:food_name_,food_detail:detail,value:value_,
            seller_addr:all_sellers[num-1].seller_addr}));
        return true;
    }
    

    //卖家删除自己的商品信息
    function removefood(string store_name_, string food_name_)public returns(bool){
        for(uint i = 0; i < all_foods.length; i++){
            if(equal_string(store_name_,all_foods[i].store_name)
                && equal_string(food_name_,all_foods[i].food_name)
                && msg.sender == all_foods[i].seller_addr){
                    delete_food_by_index(i);
                    return true;
                }
        }
        return false;
    }
    
    
    //用户购买，根据名称获得商品类，然后创建交易类加进去
    //同时买方发送支付交易给卖方，以支付的时间为时间戳
    function buyfood(string store_name_, string food_name_,
        string trading_address_)public payable returns(bool){
            
        uint num = 0;
        for(uint i = 0; i < all_foods.length; i++){
            if(equal_string(store_name_,all_foods[i].store_name)
                && equal_string(food_name_,all_foods[i].food_name)){
                    num = i+1;
                    break;
            }
        }
        if(num == 0){
            return false;
        }
        
        all_foods[num-1].seller_addr.transfer(all_foods[num-1].value);
        all_trans.push(trans(msg.sender,all_foods[num-1].seller_addr,store_name_,food_name_,
            all_foods[num-1].value,now,trading_address_));
        
        
        return true;
    }
    
    
    
    //由用户完成交易并评分，判断当前时间是否已经超过5400s 1.5h。超过才可以评论
    //判断第二个参数，如果为1，证明交易正常，卖方信誉值+1，如果为0，表示对此单交易不满，-5.
    //如果为-1，证明卖家收了钱不发货，-10
    //完成后将该交易删除
    function buyer_finish_trans(uint when_buy_, int param)public returns(bool){
        for(uint i = 0; i < all_trans.length; i++){
            if(all_trans[i].buyer_addr == msg.sender 
                && all_trans[i].when_buy == when_buy_){
                    if(now > when_buy_ + 5400){
                        change_seller_score(all_trans[i].seller_addr, param);
                        delete_trans_by_index(i);
                        return true;
                    }
                break;
            }
        }
        return false;
    }
    
    //卖家完成交易
    //如果10800s之后，买方未进行finish，则卖家可以选择自己进行完成，
    //完成可以获得信誉值+1，证明该交易正常进行
    //完成后将交易删除
    function seller_finish_trans(address buyer_addr_, uint when_buy_)public returns(bool){
        for(uint i = 0; i < all_trans.length; i++){
            if(all_trans[i].seller_addr == msg.sender
                && all_trans[i].buyer_addr == buyer_addr_ 
                && all_trans[i].when_buy == when_buy_){
                    if(now > when_buy_ + 10800){
                        change_seller_score(all_trans[i].seller_addr, 1);
                        delete_trans_by_index(i);
                        return true;
                    }
                    break;
                }
        }
        return false;
    }
    
    
    
    
    
    
    
    
    //修改卖家信誉值
    function change_seller_score(address seller_addr_, int param)internal returns(bool){
        for(uint i = 0; i < all_sellers.length; i++){
            if(all_sellers[i].seller_addr == seller_addr_){
                if(param == -1){
                    all_sellers[i].score -= 10;
                }
                else if(param == 0){
                    all_sellers[i].score -= 5;
                }
                else{
                    all_sellers[i].score += 1;
                }
            }
        }
    }
    
    
    
    




    //判断两个string是否相同
    function equal_string(string a, string b) internal pure returns (bool) {
        if (bytes(a).length != bytes(b).length) {
            return false;
        }
        for (uint i = 0; i < bytes(a).length; i ++) {
            if(bytes(a)[i] != bytes(b)[i]) {
                return false;
            }
        }
        return true;
    }
    

    //删除下标为index的食物，只能由发布者删除
    function delete_food_by_index(uint index)internal {
        uint len = all_foods.length;
        if (index >= len) return;
        for (uint i = index; i<len-1; i++) {
          all_foods[i] = all_foods[i+1];
        }
     
        //solodity特有的特意特有的删除delete
        delete all_foods[len-1];
        all_foods.length--;
    }
    

    //删除下标为index的交易，只能相关卖家或买家删除
    function delete_trans_by_index(uint index) internal{
        uint len = all_trans.length;
        if (index >= len) return;
        for (uint i = index; i<len-1; i++) {
          all_trans[i] = all_trans[i+1];
        }
        delete all_trans[len-1];
        all_trans.length--;
    }
    
    
    //因为solidity不能返回数组以及对象，所以只能一个一个返回
    
    //查询食品函数
    
    //查询所有食品，如何人都可以查询
    //getallfoods()
    
    function all_foods_count() public view returns(uint){
        return all_foods.length;
    }
    
    function get_foodinfo_by_index(uint index)public view 
        returns(string, string, string, uint, address){
            if(index > all_foods.length - 1){
                return;
            }
        return (all_foods[index].store_name, all_foods[index].food_name,
            all_foods[index].food_detail, all_foods[index].value, 
            all_foods[index].seller_addr);
    }
    
    
    
    //根据店名查询该店信息，比如信誉值
    //getinfobyseller(store_name)
    function get_sellerinfo_by_storename(string name)public view
        returns(string, string, string, address, int256){
        for(uint i = 0; i < all_sellers.length; i++){
            if(equal_string(all_sellers[i].store_name, name)){
                return (all_sellers[i].store_name, all_sellers[i].store_addr, 
                all_sellers[i].phone, all_sellers[i].seller_addr, all_sellers[i].score);
            }
        }
        return;
    }
    
    //用户根据自己地址获取自己的交易
    //get_buyer_trans()
    
    //buyer获取自己的交易数
    function get_buyer_trans_count()public view returns(uint){
        uint num = 0;
        for(uint i = 0; i < all_trans.length; i++){
            if(msg.sender == all_trans[i].buyer_addr){
                num ++;
            }
        }
        return num;
    }
    //buyer根据下标查询自己的交易信息,begin 0
    function get_buyer_trans_by_index(uint index)public view
    returns(string, string, uint, uint, string){
        if(index > get_buyer_trans_count()-1){
            return;
        }
        uint num = 0;
        for(uint i = 0; i < all_trans.length; i++){
            if(msg.sender == all_trans[i].buyer_addr){
                if(index == num){
                    return (all_trans[i].store_name, all_trans[i].food_name,
                    all_trans[i].value, all_trans[i].when_buy, all_trans[i].trading_address);
                }
                num++;
            }
        }
    }
    
    
    //卖方根据自己地址获取自己需要送的食物，只能卖方查询
   // get_seller_trans()
   
    //seller获取自己的交易数
    function get_seller_trans_count()public view returns(uint){
        uint num = 0;
        for(uint i = 0; i < all_trans.length; i++){
            if(msg.sender == all_trans[i].seller_addr){
                num ++;
            }
        }
        return num;
    }
    
    //seller根据下标查询自己的交易信息,begin 0
    function get_seller_trans_by_index(uint index)public view
    returns(address, string, uint, uint, string){
        if(index > get_seller_trans_count()-1){
            return;
        }
        uint num = 0;
        for(uint i = 0; i < all_trans.length; i++){
            if(msg.sender == all_trans[i].seller_addr){
                if(index == num){
                    return (all_trans[i].buyer_addr, all_trans[i].food_name,
                    all_trans[i].value, all_trans[i].when_buy, all_trans[i].trading_address);
                }
                num++;
            }
        }
    }
    
}