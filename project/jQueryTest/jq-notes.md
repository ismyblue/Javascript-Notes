# JQuery

## 选择 
```
$(".class")
$("#myid")
$("input[type='button']")
```
 
## 事件 
```
 $("#myid").click(function(){
 		alert("show message");
 }); 
```
## 效果

### 隐藏/显示 （有用）

```
 $("#myid").show(); 
 $("#myid").hide();
```
 
### 淡入淡出 (有用)
```
 $("#myid").fadeIn(); 
 $("#myid").fadeOut(); 
 $("#myid").fadeToggle(); 
 $("#myid").fadeTo("slow",0.15);
```

### 滑动 （下拉菜单）
```
 $("#myid"). slideDown(speed,callback);
 $("#myid").slideUp(speed,callback);
 $("#myid").slideToggle(speed,callback);
```

### 动画 （有用）
```
  $("button").click(function(){
  var div=$("div");
  div.animate({height:'300px',opacity:'0.4'},"slow");
  div.animate({width:'300px',opacity:'0.8'},"slow");
  div.animate({height:'100px',opacity:'0.4'},"slow");
  div.animate({width:'100px',opacity:'0.8'},"slow");
});
```

### 方法链
  ```
  $("#p1").css("color","red").slideUp(2000).slideDown(2000);
  ```
  
## HTML
### 捕获
```
alert(  $("#test1").text());
alert(  $("#test2").html());
alert(  $("#test3").val());
alert( $("#runoob").attr("href"));
```
### 设置
```
    $("#test1").text("Hello world!");
  $("#test2").html("<b>Hello world!</b>");
  $("#test3").val("RUNOOB");
  $("#runoob").attr("href","http://www.runoob.com/jquery");
```

### 添加元素
```
$("#mydiv").append() - 在被选元素的结尾插入内容
$("#mydiv").prepend() - 在被选元素的开头插入内容
$("#mydiv").after() - 在被选元素之后插入内容
$("#mydiv").before() - 在被选元素之前插入内容
```

### 删除元素
```
  remove() - 删除被选元素（及其子元素）
 empty() - 从被选元素中删除子元素
```

### css类
```
  addClass() - 向被选元素添加一个或多个类
removeClass() - 从被选元素删除一个或多个类
toggleClass() - 对被选元素进行添加/删除类的切换操作
css() - 设置或返回样式属性
```
  
### css()方法
```
返回css属性：  $("p").css("background-color"); 
设置多个 CSS 属性： $("p").css({"background-color":"yellow","font-size":"200%"});
```
  
### jQuery尺寸
```
width()
height()
innerWidth()
innerHeight()
outerWidth()
outerHeight()
```
  
  ![尺寸](http://www.runoob.com/images/img_jquerydim.gif)
  
## 遍历
### 祖先
```
parent() 方法返回被选元素的直接父元素。
parents() 方法返回被选元素的所有祖先元素，它一路向上直到文档的根元素 (<html>)。
parentsUntil() 方法返回介于两个给定元素之间的所有祖先元素。
```

### 后代
```
children() 方法返回被选元素的所有直接子元素。
find() 方法返回被选元素的后代元素，一路向下直到最后一个后代。
 $("div").find("span");
```

### 同胞
```
siblings()
next()
nextAll()
nextUntil()
prev()
prevAll()
prevUntil()
```

### 过滤
```
first(),
last()
q()
filter()
not()
```