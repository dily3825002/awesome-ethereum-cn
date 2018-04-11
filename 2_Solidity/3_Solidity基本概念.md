合约类似面向对象语言中的类，支持继承。

每个合约中可包含状态变量(State Variables)，函数(Functions),函数修饰符（Function Modifiers）,事件（Events）,结构类型(Structs Types)和枚举类型(Enum Types)。

## 状态变量（State Variables）

变量值会永久存储在合约的存储空间

    pragma solidity ^0.4.0;

    // simple store example

    contract simpleStorage{

        uint valueStore; //state variable
    }

详情见类型（Types）章节，关于所有支持的类型和变量相关的可见性（Visibility and Accessors）。

## 函数（Functions）

智能合约中的一个可执行单元。

**示例**

    pragma solidity ^0.4.0;

    contract simpleMath{
        //Simple add function,try a divide action?
        function add(uint x, uint y) returns (uint z){
            z = x + y;
        }
    }

上述示例展示了一个简单的加法函数。

函数调用可以设置为内部（Internal）的和外部（External）的。同时对于其它合同的不同级别的可见性和访问控制(Visibility and Accessors)。具体的情况详见后面类型中关于函数的章节。

## 函数修饰符(Function Modifiers)
函数修饰符用于增强语义。详情见函数修饰符相关章节。

## 事件（Events）

事件是以太坊虚拟机(EVM)日志基础设施提供的一个便利接口。用于获取当前发生的事件。

**示例**

    pragma solidity ^0.4.0;

    contract SimpleAuction {
        event aNewHigherBid(address bidder, uint amount);
        
        function  bid(uint bidValue) external {
            aNewHigherBid(msg.sender, msg.value);
        }
    }

关于事件如何声明和使用，详见后面事件相关章节。

## 结构体类型（Structs Types）

自定义的将几个变量组合在一起形成的类型。详见关于结构体相关章节。

**示例**

    pragma solidity ^0.4.0;

    contract Company {
        //user defined `Employee` struct type
        //group with serveral variables
        struct employee{
            string name;
            uint age;
            uint salary;
        }
        
        //User defined `manager` struct type
        //group with serveral variables
        struct manager{
            employee employ;
            string title;
        }
    }

## 枚举类型

特殊的自定义类型，类型的所有值可枚举的情况。详情见后续相关章节。

**示例**

    pragma solidity ^0.4.0;

    contract Home {
        enum Switch{On,Off}
    }