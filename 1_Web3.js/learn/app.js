// var Web3 = require('web3');

// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider); //如果已经设置了 Provider
// } else {
//     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
// }

// const solc = require('solc')

// var source = "" +
//     "contract test {\n" +
//     "   function multiply(uint a) returns(uint d) {\n" +
//     "       return a * 7;\n" +
//     "   }\n" +
//     "}\n";
// // var compiled = web3.eth.compile.solidity(source);

// const solcOutput = solc.compile({ sources: { main: source } }, 1)

// console.log(solcOutput);

let Web3 = require('web3');
let web3;
const solc = require('solc')

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

let from = web3.eth.accounts[0];
// console.log(from);

//编译合约
let source = "pragma solidity ^0.4.0;contract Calc{  /*区块链存储*/  uint count;  /*执行会写入数据，所以需要`transaction`的方式执行。*/ uint result; function add(uint a, uint b) returns(uint){    count++;  result = a + b;  return result;  }  /*执行不会写入数据，所以允许`call`的方式执行。*/  function getCount() constant returns (uint){    return count;  } function getResult() constant returns (uint){ return result; }}";

// let source = "pragma solidity ^0.4.0; contract Calc {/*区块链存储*/uint count; /*执行会写入数据，所以需要`transaction`的方式执行。*/uint result; /*执行会写入数据，所以需要`transaction`的方式执行。*/function add(uint a, uint b)returns(uint) {count++; result = a + b; return result; }/*执行不会写入数据，所以允许`call`的方式执行。*/function getCount()constant returns (uint) {return count; }} function getResult() constant returns (uint){ return result; }}";


// let calcCompiled = web3.eth.compile.solidity(source);
const calcCompiled = solc.compile({ sources: { main: source } }, 1)

//得到合约对象
let abiDefinition = calcCompiled.contracts['main:Calc'].interface;


//2. 部署合约

//2.1 获取合约的代码，部署时传递的就是合约编译后的二进制码
let deployCode = calcCompiled.contracts['main:Calc'].bytecode;

//2.2 部署者的地址，当前取默认账户的第一个地址。
let deployeAddr = web3.eth.accounts[0];

// console.log(calcContract);


// // creation of contract object
let calcContract = web3.eth.contract(JSON.parse(abiDefinition));

// return;
let gasEstimate = web3.eth.estimateGas({ data: deployCode });
console.log(gasEstimate);
// return;
//2.3 异步方式，部署合约
let myContractReturned = calcContract.new({
    data: deployCode,
    from: deployeAddr,
    gas: gasEstimate
}, function(err, myContract) {
    console.log("+++++");
    if (!err) {
        // 注意：这个回调会触发两次
        //一次是合约的交易哈希属性完成
        //另一次是在某个地址上完成部署

        // 通过判断是否有地址，来确认是第一次调用，还是第二次调用。
        if (!myContract.address) {
            console.log("contract deploy transaction hash: " + myContract.transactionHash) //部署合约的交易哈希值

            // 合约发布成功后，才能调用后续的方法
        } else {
            console.log("contract deploy address: " + myContract.address) // 合约的部署地址

            //使用transaction方式调用，写入到区块链上
            myContract.add.sendTransaction(1, 2, {
                from: deployeAddr
            });

            console.log("after contract deploy, call:" + myContract.getCount.call());
            console.log("result:" + myContract.getResult.call());
        }

        // 函数返回对象`myContractReturned`和回调函数对象`myContract`是 "myContractReturned" === "myContract",
        // 所以最终`myContractReturned`这个对象里面的合约地址属性也会被设置。
        // `myContractReturned`一开始返回的结果是没有设置的。
    } else {
        console.log(err);
    }
});

//注意，异步执行，此时还是没有地址的。
console.log("returned deployed didn't have address now: " + myContractReturned.address);

//使用非回调的方式来拿到返回的地址，但你需要等待一段时间，直到有地址，建议使用上面的回调方式。
/*
setTimeout(function(){
  console.log("returned deployed wait to have address: " + myContractReturned.address);
  console.log(myContractReturned.getCount.call());
}, 20000);
*/

//如果你在其它地方已经部署了合约，你可以使用at来拿到合约对象
//calcContract.at(["0x50023f33f3a58adc2469fc46e67966b01d9105c4"]);