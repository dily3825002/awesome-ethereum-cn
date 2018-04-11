## 版本申明

    pragma solidity ^0.4.0；

说明：
* 版本要高于0.4才可以编译
* 表示高于0.5的版本则不可编译，第三位的版本号但可以变，留出来用做bug可以修复（如0.4.1的编译器有bug，可在0.4.2修复，现有合约不用改代码）。

## 引用其它源文件

* 全局引入

    import “filename”;

* 自定义命名空间引入

    import * as symbolName from “filename”

* 分别定义引入

    import  {symbol1 as alias, symbol2} from “filename”

* 非es6兼容的简写语法

    import “filename” as symbolName

* 等同于上述

    import * as symbolName from “filename”

* 关于路径

引入文件路径时要注意，非.打头的路径会被认为是绝对路径，所以要引用同目录下的文件使用

    import “./x” as x

也不要使用下述方式，这样会是在一个全局的目录下

    import “x” as x;

为什么会有这个区别，是因为这取决于编译器，如果解析路径，通常来说目录层级结构并不与我们本地的文件一一对应，它非常有可能是通过ipfs,http，或git建立的一个网络上的虚拟目录。

## 编译器解析引用文件机制

各编译器提供了文件前缀映射机制。

1. 可以将一个域名下的文件映射到本地，从而从本地的某个文件中读取
2. 提供对同一实现的不同版本的支持（可能某版本的实现前后不兼容，需要区分）
3. 如果前缀相同，取最长，
4. 有一个”fallback-remapping”机制，空串会映射到“/usr/local/include/solidify”

## solc编译器

命令行编译器，通过下述命令命名空间映射提供支持

    context:prefix=target

上述的context:和=target是可选的。所有context目录下的以prefix开头的会被替换为target。
举例来说，如果你将`github.com/ethereum/dapp-bin`拷到本地的`/usr/local/dapp-bin`，并使用下述方式使用文件

    import “github.com/ethereum/dapp-bin/library/iterable_mapping.sol” as it_mapping;

要编译这个文件，使用下述命令：

    solc github.com/ethereum/dapp-bin=/usr/local/dapp-bin source.sol

另一个更复杂的例子，如果你使用一个更旧版本的dapp-bin，旧版本在/url/local/dapp-bin_old，那么，你可以使用下述命令编译

    solc module1:github.com/ethereum/dapp-bin=/usr/local/dapp-bin  \
            modeule2:github.com/ethereum/dapp-bin=/usr/local/dapp-bin_old \
            source.sol

需要注意的是solc仅仅允许包含实际存在的文件。它必须存在于你重映射后目录里，或其子目录里。如果你想包含直接的绝对路径包含，那么可以将命名空间重映射为=\
备注：如果有多个重映射指向了同一个文件，那么取最长的那个文件。

## browser-solidity编译器:

browser-solidity编译器默认会自动映射到github上，然后会自动从网络上检索文件。例如：你可以通过下述方式引入一个迭代包：

    import “github.com/ethereum/dapp-bin/library/iterable_mapping.sol” as it_mapping

备注：未来可能会支持其它的源码方式

## 代码注释

两种方式,单行（//）,多行使用(/*…*/)

示例

    // this is a single-line comment
    /*
    this is a
    mulit-line comment
    */

## 文档注释

写文档用。三个斜杠///或/** … */，可使用Doxygen语法，以支持生成对文档的说明，参数验证的注解，或者是在用户调用这个函数时，弹出来的确认内容。

示例

    pragma solidity ^0.4.0；
    /** @title Shape calculator.*/
    contract shapeCalculator{
        /**
        *@dev calculate a rectangle's suface and perimeter

        *@param w width of the rectangles

        *@param h height of the rectangles

        *@return s surface of the rectangles

        *@return p perimeter of the rectangles

        */

        function rectangles(uint w, uint h) returns (uint s, uint p){

            s = w * h;

            p = 2 * ( w + h) ;

        }

    }