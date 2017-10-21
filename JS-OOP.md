# Javascript 面对对象编程

![ECMAscript And Javascript 的关系]
(https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike72%2C5%2C5%2C72%2C24/sign=259aae64dcc451dae2fb04b9d7943903/730e0cf3d7ca7bcb3409f115bf096b63f624a89d.jpg)

ECMAScript是一个标准文档，javascript的语法规则就是ECMAScript里面定义的，然后javascript里面用这些语法规则添加了一些内置对象BOM和DOM。

[TOC]

<a href="top"></a>

说明：
先写html再写css,最后写js。js里面定义很多类，类里面函数写操作html，css的代码和相关变量。最后html里面new对象，用面对对象的思想去编程，操作new出来的对象就行了，对象会自己去做变更html，css的内容。

### 0.定义函数的方法
<a href="0"></a>

- **声明式，基本方式**
```
function functionName(arg0, arg1, ... argN) {
  	to do something;
}

--------------------for example:-------------------

function sayHello(sName , sMessage){
	alert("Hello " + name + sMessage);
}
```
[Back to 0capter](#0)

- **Function 类直接创建函数的语法**
**函数也是一个对象，用一个变量去接收函数对象**
```
//注意是大写Function 
var functionName = new Function(arg0,arg1,...,argN,function_Body);

--------------------for example 1:-------------------
var sayHello = new Function(sName, sMessage, "alert(\"Hello\" + sName + sMessage);");

//函数名只是指向函数的变量，可以把函数作为参数传递给另一个函数!
--------------------for example 2:------------------
var sayHello = new Function("sName" , "alert(\"Hello \" + sName);");
var callAnotherFunc = new Function(funcName, sName){
	funcName(sName);
}
callAnotherFunc(sayHello, "Bruce");

```
[Back to 0capter](#0)
[Back to top](#top)

###***开启Js面对对象编程篇章***

### 1. 面对对象术语

#### 对象
ECMA-262 把对象（object）定义为“属性的无序集合，每个属性存放一个原始值、对象或函数”。严格来说，这意味着对象是无特定顺序的值的数组。
尽管 ECMAScript 如此定义对象，但它更通用的定义是基于代码的名词（人、地点或事物）的表示。

#### 类
每个对象都由类定义，可以把类看做对象的配方。类不仅要定义对象的接口（interface）（开发者访问的属性和方法），还要定义对象的内部工作（使属性和方法发挥作用的代码）。编译器和解释程序都根据类的说明构建对象。

#### 实例
程序使用类创建对象时，生成的对象叫作类的实例（instance）。对类生成的对象的个数的唯一限制来自于运行代码的机器的物理内存。每个实例的行为相同，但实例处理一组独立的数据。由类创建对象实例的过程叫做实例化（instantiation）。
在前面的章节我们提到过，ECMAScript 并没有正式的类。相反，ECMA-262 把对象定义描述为对象的配方。这是 ECMAScript 逻辑上的一种折中方案，因为对象定义实际上是对象自身。即使类并不真正存在，我们也把对象定义叫做类，因为大多数开发者对此术语更熟悉，而且从功能上说，两者是等价的。


#### 面向对象语言的要求

一种面向对象语言需要向开发者提供四种基本能力：
>封装、聚集、继承、多态

- **封装** - 把相关的信息（无论数据或方法）存储在对象中的能力
- **聚集** - 把一个对象存储在另一个对象内的能力
- **继承** - 由另一个类（或多个类）得来类的属性和方法的能力
- **多态** - 编写能以多种方法运行的函数或方法的能力

ECMAScript 支持这些要求，因此可被是看做面向对象的。

#### 对象的构成

在ECMAScript中，对象由特性(attribute)构成。
特性可以是原始值，也可以是引用值。
如果特性存放的是函数，他就是对象的方法(method).
否则该特性被看作对象的属性(property).
[Back to top](#top)


### 2. 作用域

#### 公有、私有、受保护的作用域
在传统的面向对象程序设计中，主要关注于公用和私有作用域。
公有作用域下中的对象属性可以从对象外部访问，即开发者创建对象后就可以使用这个对象的公有属性，直接可以使用赋值符号"="更改这些属性。
(访问：var 变量 = 对象.公有属性;        赋值:对象.公有属性 = 值;）

而私有作用域中的属性只能在对象内部使用，即只能由对象本身的函数调用，写在对象本身的函数里面。***并且这些私有属性对于外界来说是看不见的，不存在的。***要访问私有属性，或者更改私有属性，只能通过调用这个对象的函数，这个函数会返回私有属性的值，这样去访问获取值，也不能直接使用"="赋值。
( ***错误：***~~访问：var 变量 = 对象.私有属性;   赋值：对象.私有属性 = 值;~~
***正确：***访问：var 变量 = 对象.返回私有属性的函数();     赋值： 对象.设置私有属性的函数();    )

#### ECMAScript 只有公用作用域！
 ECMAScript 中只存在一种作用域 - ***公用作用域***！ECMAScript 中的所有对象的所有属性和方法都是公用的。因此，定义自己的类和对象时，必须格外小心。记住，所有属性和方法默认都是公用的！ 
 
- **建议性的解决方法**
许多开发者都在网上提出了有效的属性作用域模式，解决了 ECMAScript 的这种问题。
由于缺少私有作用域，开发者确定了一个规约，说明哪些属性和方法应该被看做私有的。这种规约规定在属性前后加下划线：
obj._color_ = "blue";
这段代码中，属性 color 是私有的。注意，下划线并不改变属性是公用属性的事实，它只是告诉其他开发者，应该把该属性看作私有的。
有些开发者还喜欢用单下划线说明私有成员，例如：obj._color。

#### 静态作用域
静态作用域定义的属性和方法任何时候都能从同一位置访问。在 Java 中，类可具有属性和方法，无需实例化该类的对象，即可访问这些属性和方法，例如 java.net.URLEncoder 类，它的函数 encode() 就是静态方法。
通俗来讲就是 静态变量或者静态函数，整个类只有这样一个变量或者函数，这个类的所有实例对象共同拥有这一个变量和函数。

#### ECMAScript 没有静态作用域
严格来说，ECMAScript 并没有静态作用域。不过，它可以给构造函数提供属性和方法。还记得吗，构造函数只是函数。**函数是对象**，对象可以有属性和方法。例如：

```
function sayHello(){
	alert("hello");
}

sayHello.alternate = function(){
	alert("hi");
}
sayHello();			//输出 hello
sayHello.alternate();	//输出 hi
```
函数是也是一个对象是一个对象是一个对象！！！方法alternate()实际上是函数sayHello对象的一个方法。并且是公有方法，而不是静态方法。

#### 关键字this
在 ECMAScript 中，要掌握的最重要的概念之一是关键字 this 的用法，它用在对象的方法中。***关键字 this 总是指向调用该方法的对象***，(this代表本对象，本类)例如：
```
var oCar = new Object;
oCar.color = "red";
	oCar.showColor = function() {
  alert(this.color);
};

oCar.showColor();		//输出 "red"

------------------等价于---------------------
var oCar = new Object;
oCar.color = "red";
oCar.showColor = function() {
	alert(oCar.color);
};

oCar.showColor();		//输出 "red"
```
[Back to top](#top) 

### 3.定义类和对象
>使用域定义对象只是使用预定义对象只是面向对象语言的能力的一部分，它真正强大之处在于能够创建自己专用的类和对象。
ECMAScript 拥有很多创建对象或类的方法。但是ECMScript里面没有创建类的明确定义，一切皆对象。我们也可以通过创建特殊对象来模拟类

#### **工厂方式 **
##### （1）原始方式：对象的属性可以在对象创建后动态定义，所以我们先创建一个Object对象，再动态的给他添加变量和函数。例如
```
        var oCar = new Object;
        oCar.color = "blue";
        oCar.doors = 4;
        oCar.mpg = 25;
        oCar.showColor = function(){
            alert(this.color);
        }
        oCar.showColor();
```
在上面的代码中，创建对象 car。然后给它设置几个属性：它的颜色是蓝色，有四个门，每加仑油可以跑 25 英里。最后一个属性实际上是指向函数的指针，意味着该属性是个方法。执行这段代码后，就可以使用对象 car。
不过这里有一个问题，就是可能需要创建多个 car 的实例，那就又要重写许多重复的代码

##### （2）解决方案:工厂方式
写一个可以返回特定类型的对象的函数，每次需要新对象，就调用这个函数创建一个对象。例如：
```
function createCar(sColor, iDoors, iMpg){
            var oTempCar = new Object;
            oTempCar.color = sColor;
            oTempCar.doors = iDoors;
            oTempCar.mpg = iMpg;
            oTempCar.showColor = function(){
                alert(this.color);
            }
            return oTempCar;
        }

var oCar1 = createCar("blue", 4, 25);
 var oCar2 = createCar("red", 6, 30);
oCar1.showColor();		//blue;
oCar2.showColor();		//red
```
原始方式就是，先new一个Object对象，通过自定义动态添加属性和函数的方法来创建一个独一无二的对象.
而工厂方式就是，写一个返回Object对象的函数createObject(arg0,aeg1...argN)，在函数体里面用原始方法创建一个对象，然后把这个对象返回(return)出去。需要新对象时，调用这个createObject(arg0,arg1,...,argN)，用一个变量来接收返回的对象。


#####  **（3）在工厂函数外定义对象的方法**
>虽然 ECMAScript 越来越正式化，但创建对象的方法却被置之不理，且其规范化至今还遭人反对。一部分是语义上的原因（它看起来不像使用带有构造函数 new 运算符那么正规），一部分是功能上的原因。功能原因在于用这种方式必须创建对象的方法。***前面的例子中，每次调用函数 createCar()，都要创建新函数 showColor()，意味着每个对象都有自己的 showColor() 版本。而事实上，每个对象都共享同一个函数。***
有些开发者在工厂函数外定义对象的方法，然后通过属性指向该方法，从而避免这个问题：

```
function showColor() {
  alert(this.color);
}

function createCar(sColor,iDoors,iMpg) {
  var oTempCar = new Object;
  oTempCar.color = sColor;
  oTempCar.doors = iDoors;
  oTempCar.mpg = iMpg;
  oTempCar.showColor = showColor;
  return oTempCar;
}

var oCar1 = createCar("red",4,23);
var oCar2 = createCar("blue",3,25);

oCar1.showColor();		//输出 "red"
oCar2.showColor();		//输出 "blue"
```
在工厂函数之外定义一个函数，然后在工厂函数内赋予对象这个已经写好的函数的指针。
在函数 createCar() 之前定义了函数 showColor()。在 createCar() 内部，赋予对象一个指向已经存在的 showColor() 函数的指针。
从功能上讲，这样解决了重复创建函数对象的问题；但是从语义上讲，该函数不太像是对象的方法。


#### 构造函数方式
创建构造函数就像创建工厂函数一样容易。第一步选择类名，即构造函数的名字。根据惯例，这个名字的首字母大写，以使它与首字母通常是小写的变量名分开。除了这点不同，构造函数看起来很像工厂函数。

```
        function Car(sColor, iDoors, iMpg){
        //与共厂方式相比这里少一句 var oTempObject = new Object;
            this.color = sColor;
            this.doors = iDoors;
            this.iMpg = iMpg;
            this.showColor = function(){
                alert(this.color);
            }
        //与共厂方式相比这里少一句 return oTempObject;
        }

        var oCar1 = new Car("blue", 4, 25);
        var oCar2 = new Car("red", 6, 30);
        oCar1.showColor();
        oCar2.showColor();
```
首先在构造函数内没有创建对象，而是使用 this 关键字。
**使用 new 运算符构造函数时，在执行第一行代码前先创建一个对象，只有用 this 才能访问该对象。然后可以直接赋予 this 属性，默认情况下是构造函数的返回值（不必明确使用 return 运算符）。**
构造函数方式和工厂方式似乎没有什么区别，因为获得新对象时，其本质上都是用原始方式，创建了一个Object对象，然后再自定义属性和函数，然后再把这个对象返回出去返回出去。只不过用构造函数方式，创建对象是用new关键字，看起来更像是一个类实例化对象的方式。
##### 构造函数的缺点
构造函数的缺点就是：同一个构造函数的对象实例之间无法共享属性或方法。


#### 原型方式
该方式利用了对象的 prototype 属性，可以把它看成创建新对象所依赖的原型。
这里，首先用空构造函数来设置类名。然后所有的属性和方法都被直接赋予 prototype 属性。我们重写了前面的例子，代码如下：

```
        function Car() {
        }

        Car.prototype.color = "blue";
        Car.prototype.doors = 4;
        Car.prototype.mpg = 25;
        Car.prototype.showColor = function() {
            alert(this.color);
        };

        var oCar1 = new Car();
        var oCar2 = new Car();
        oCar1.showColor();	//blue
        oCar2.showColor();	//red
```

首先定义一个空的构造函数，接下来的几行代码，通过给 Car 的 prototype 属性添加属性去定义 Car 对象的属性。
调用 new Car() 时，原型的所有属性都被立即赋予要创建的对象，意味着所有 Car 实例存放的都是指向 showColor() 函数的指针。从语义上讲，所有属性看起来都属于一个对象，因此解决了前面两种方式存在的问题。
此外，使用这种方式，还能用 instanceof 运算符检查给定变量指向的对象的类型。因此，下面的代码将输出 TRUE：
```
        alert(oCar1 instanceof Car);	//输出 "true"
```

##### 原型方式出现的问题
首先，这个构造函数没有参数。使用原型方式，不能通过给构造函数传递参数来初始化属性的值，因为 Car1 和 Car2 的 color 属性都等于 "blue"，doors 属性都等于 4，mpg 属性都等于 25。这意味着必须在对象创建后才能改变属性的默认值，这点很令人讨厌，但还没完。真正的问题出现在属性指向的是对象，而不是函数时。函数共享不会造成问题，但对象却很少被多个实例共享。请思考下面的例子：


