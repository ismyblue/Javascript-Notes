//----------CSpirit Class Definition Begin--------//

function CSpirit() {
    this.id = null;     //css id
    this.class = null;  //css class
    this.x_coor = "0px";    //x坐标
    this.y_coor = "0px";    //y坐标
    this.width =  null;
    this.height = "100%";
    this.preId = "100%";
}

CSpirit.prototype.max_x_coor = 1000;    //最大x坐标
CSpirit.prototype.max_y_coor = 1000;    //最大y坐标

//初始化，设置id,class,父容器id,初始宽度，初始高度
CSpirit.prototype.init = function(sId, sClass, sPreId, sWidth, sHeight){
    if(sId != null)
        this.id = sId;     //css id
    if(sClass != null)
        this.class = sClass;  //css class
    if(sPreId != null)
        this.preId = sPreId;
    if(sWidth != null)
        this.width = sWidth;
    if(sHeight != null)
        this.height = sHeight;
}

//在父容器内显示精灵元素，可以传参数给定显示宽度高度
CSpirit.prototype.show = function(sPreId, sWidth, sHeight){
    if(sPreId != null)
        this.preId = sPreId;
    if(sWidth != null)
        this.width = sWidth;
    if(sHeight != null)
        this.height = sHeight;
    var div = document.createElement("div");
    div.id = this.id;
    div.className = this.class;
    if(this.width != null)
        div.style.width = this.width;
    if(this.height != null)
        div.style.height = this.height;
    div.style.left = this.x_coor;
    div.style.top = this.y_coor;
    var pre = document.getElementById(this.preId);
    pre.appendChild(div);
}

//移动精灵位置，传入参数，x和y的坐标，坐标原点在左上角
CSpirit.prototype.move = function(sX_coor, sY_coor){
    var myself = document.getElementById(this.id);
    this.x_coor = sX_coor;
    this.y_coor = sY_coor;
    myself.style.left = this.x_coor;
    myself.style.top = this.y_coor;
}

//在dom销毁此元素
CSpirit.prototype.destory = function(){
    var myself = document.getElementById(this.id);
    myself.parentNode.removeChild(myself);
}

//----------CSpirit Class Definition End--------//



//----------CContainer Class Definition Begin--------//容器类
function CContainer(){
    CSpirit.call(this);

}
CContainer.prototype = new CSpirit();

//---------- CContainer Definition End--------//

var con = new CContainer();
con.init("gamediv","game-room","main");
con.show();
/**/


//----------CInformation Class Definition Begin--------//消息类
function CInformation(){
    CSpirit.call(this);
    this.title = null;
    this.content = null;
    this.width = "100%";
    this.height = "100%";
    this.class = "information";
}
CInformation.prototype = new CSpirit();
//设置消息，为这一条消息设置标题和内容
CInformation.prototype.setInformation = function(sTitle, sContent){

    this.title = sTitle;
    this.content = sContent;
}

CInformation.prototype.showBody = CSpirit.prototype.show;

//显示一条消息，在preid的容器内显示宽为sWidth,sHeight的消息默认显示100%
CInformation.prototype.show = function(sPreId, sWidth, sHeight){
    this.showBody(sPreId, sWidth, sHeight);
    var myself = document.getElementById(this.id);
    var label = document.createElement("label");
    label.className = "text-primary";
    label.innerHTML = this.title;
    var p = document.createElement("p");
    p.className = "text-danger";
    p.innerHTML = this.content;
    myself.appendChild(label);
    myself.appendChild(p);
}
//----------CInformation Class Definition End--------//


//----------CInformationGroup Class Definition Begin--------//消息组类
function CInformationGroup(){
    CContainer.call(this);
    this.infos = new Array();
}

CInformationGroup.prototype = new CContainer();

//在消息组内增加一条消息，消息标题，内容，id,class,高度和宽度
CInformationGroup.prototype.addInformation = function(sTitle, sContent,sId, sClass, sWidth, sHeight){
    var len = this.infos.length;
    this.infos[len] = new CInformation();
    this.infos[len].init(sId, sClass, this.id, sWidth, sHeight);
    this.infos[len].setInformation(sTitle,sContent);

}

//更名父类的show函数为showBody
CInformationGroup.prototype.showBody = CContainer.prototype.show;

//显示消息组，sNum代表一列显示多少条消息,不传sWidth和sHeight默认消息组是100%
//一条消息包含titile和content，消息组有多条消息
CInformationGroup.prototype.show = function (iNum, sPreId, sWidth, sHeight) {
    this.showBody(sPreId, sWidth, sHeight);
    var nowWidth = "100%";
    var nowHeight = "100%";
    var num = 1;
    if(iNum != null)
        num = iNum;
    nowWidth =  (parseInt(nowWidth)/num).toString() + "%";
    var cols = this.infos.length/num;
    if(cols > parseInt(cols))
        cols = parseInt(cols) + 1;
    else
        cols = parseInt(cols);
    nowHeight = (parseInt(nowHeight)/cols).toString() + "%";
    var myself = document.getElementById(this.id);
    for(var i = 0;i < this.infos.length;i++) {
        this.infos[i].show(this.id, nowWidth, nowHeight);
    }
}
//----------CInformationGroup Class Definition End--------//

/*var infog = new CInformationGroup();
infog.init("infog","information-group","gamediv");
infog.addInformation("score","2048","score-");
infog.addInformation("score","2048","score-nfo");
infog.addInformation("score","2048","score-fo");
infog.addInformation("blood","68","blood");
infog.show(2,"gamediv","100%","10%");
*/




//------------CButton Class Definition Begin--------------//
function CButton(){
    CSpirit.call(this);
    this.value = null;
    this.functionName = null;
    this.width = "100%";
    this.height = "100%";
    this.class = "btn btn-primary";
}
CButton.prototype = new CSpirit();
//设置消息，为这一条消息设置标题和内容
CButton.prototype.setButton = function(sValue, sFunctionName){
    this.value = sValue;
    this.functionName = sFunctionName;
}


//显示一个button，在preid的容器内显示宽为sWidth,sHeight的消息默认显示100%
CButton.prototype.show = function(sPreId, sWidth, sHeight) {
    if (sPreId != null)
        this.preId = sPreId;
    if(sWidth != null)
        this.width = sWidth;
    if(sHeight != null)
        this.height = sHeight;
    var pre = document.getElementById(this.preId);
    var input = document.createElement("input");
    input.id = this.id;
    input.type = "button";
    if (this.class != null)
        input.className = this.class ;
    if(this.width != null)
        input.style.width = this.width;
    if(this.height != null)
        input.style.height = this.height;
    input.value = this.value;
    input.onclick = this.functionName;
    pre.appendChild(input);
}

//------------CButton Class Definition Begin--------------//

/*var bu = new CButton();
bu.init("btn-test","btn-attack","gamediv");
bu.setButton("","alert");
bu.show("gamediv","50%","8%");
bu.move("25%","80%");
*/


//------------CButtonGroup Class Definition Begin--------------//
//按钮组类
function CButtonGroup(){
    CSpirit.call(this);
    this.buttons = new Array();
}
CButtonGroup.prototype = new CSpirit();

//在消息组内增加一条消息，消息标题，内容，id,class,高度和宽度
CButtonGroup.prototype.addButton = function(sValue, sFunctionName, sId, sClass, sWidth, sHeight){
    var len = this.buttons.length;
    this.buttons[len] = new CButton();
    this.buttons[len].init(sId, sClass, this.id, sWidth, sHeight);
    this.buttons[len].setButton(sValue, sFunctionName);
}

//更名父类的show函数为showBody
CButtonGroup.prototype.showBody = CSpirit.prototype.show;

//在按钮组显示按钮，sNum代表一列显示多少个按钮,不传sWidth和sHeight默认是100%
CButtonGroup.prototype.show = function (iNum, sPreId, sWidth, sHeight) {
    this.showBody(sPreId, sWidth, sHeight);
    var nowWidth = "100%";
    var nowHeight = "100%";
    var num = 1;
    if(iNum != null)
        num = iNum;
    nowWidth =  (parseInt(nowWidth)/num).toString() + "%";
    var cols = this.buttons.length/num;
    if(cols > parseInt(cols))
        cols = parseInt(cols) + 1;
    else
        cols = parseInt(cols);
    nowHeight = (parseInt(nowHeight)/cols).toString() + "%";
    var myself = document.getElementById(this.id);
    for(var i = 0;i < this.buttons.length;i++) {
        this.buttons[i].show(this.id, nowWidth, nowHeight);
    }
}
//------------CButtonGroup Class Definition End--------------//

var btng = new CButtonGroup();
btng.init("btng","btn-group","gamediv");
btng.addButton("","","btn1","btn-attack");
btng.addButton("","","btn2","btn-attack");
btng.addButton("","","btn3","btn-attack");
btng.addButton("","","btn4","btn-attack");
btng.show(2,"gamediv","100%","20%");
btng.move("0%","60%");
/**/


//---------------CGameMap Class Definition Begin--------------//

function CGameMap(){
    CSpirit.call(this);
    this.map1 = new CSpirit();
    this.map2 = new CSpirit();
    this.map1.width = "100%";
    this.map1.height = "100%";
    this.map2.width = "100%";
    this.map2.height = "100%";
    this.timeName = null;       //定时器

    this.stepLength = 0.05;     //游戏地图map的移动步长;

}

CGameMap.prototype = new CSpirit();

CGameMap.prototype.setMap = function(sId1, sId2, sClass1, sClass2){
    this.map1.init(sId1,sClass1,this.id);
    this.map2.init(sId2,sClass2,this.id);
}

CGameMap.prototype.showBody = CSpirit.prototype.show;

//显示地图
CGameMap.prototype.show = function(sPreId, sWidth, sHeight){
    this.showBody(sPreId, sWidth, sHeight);
    this.map1.show();
    this.map2.show();
    this.map1.move("0%","-100%");
}

CGameMap.prototype.moveBody = CSpirit.prototype.move;


//游戏地图的两张基准地图开始交替移动到屏幕中间 stepLength步长
var mapMove = function (map1Id, map2Id, stepLength){
    var domEle1 = document.getElementById(map1Id);
    var domEle2 = document.getElementById(map2Id);
    var map1top = parseFloat(domEle1.style.top);
    var map2top = parseFloat(domEle2.style.top);

    if(map1top >= 100){
        map1top = -100;
    }
    if(map2top >= 100){
        map2top = -100;
    }
    map1top += stepLength;
    map2top += stepLength;

    domEle1.style.top = map1top.toString() + "%";
    domEle2.style.top = map2top.toString() + "%";
}


//地图开始运动
CGameMap.prototype.actionStart = function(iTime){
    var map1Id = this.map1.id;
    var map2Id = this.map2.id;
    var stepLength = this.stepLength;

    this.timeName = window.setInterval(
        function () {
            mapMove(map1Id, map2Id, stepLength);
        }
        ,iTime);
}

//地图停止运动
CGameMap.prototype.actionEnd = function(){
    clearInterval(this.timeName);
}

//---------------CGameMap Class Definition End--------------//
var mp = new CGameMap();
mp.init("bgmap","game-map","gamediv");
mp.setMap("bgmap-1","bgmap-2","game-map-map1","game-map-map2");
mp.show(null,"100%","100%");
mp.actionStart(10);
//mp.actionEnd();




//---------------CFly Class Definition Begin--------------//

function CFly(){
    CSpirit.call(this);
    this.timeName = null;       //定时器
    this.stepLength = 1;     //飞行器的移动步长;
}

CFly.prototype = new CSpirit();


//飞行器飞行一步 map1Id飞行器id  dir:方向  stepLength步长 像素单位px
var flyMove = function (sFlyId, sDir, stepLength){
    var flyEle = document.getElementById(sFlyId);
    switch (sDir){
        case "up":
            flyEle.style.top = (parseInt(flyEle.style.top) - stepLength).toString() + "px";
            break;
        case "down":
            flyEle.style.top = (parseFloat(flyEle.style.top) + stepLength).toString() + "px";
            break;
        case "left":
            flyEle.style.left = (parseFloat(flyEle.style.left) - stepLength).toString() + "px";
            break;
        case "right":
            flyEle.style.left = (parseFloat(flyEle.style.left) + stepLength).toString() + "px";
            break;
        default :break;
    }
}


//飞行器开始运动 //dir,运动方向//每iTime移动一步，连续不断的运动
CFly.prototype.actionStart = function(sDir, iTime){
    var flyId = this.id;
    var stepLength = this.stepLength;
    var stop = this.timeName;
    this.timeName = window.setInterval(
        function () {
            flyMove(flyId, sDir, stepLength);

        }
        ,iTime);
}

//飞行器停止运动
CFly.prototype.actionEnd = function(){
    clearInterval(this.timeName);
}

//----------CFly Class Definition End---------------------//

/*
var fly = new CFly();
fly.init("flyid","fly","gamediv","80px","70px");
fly.show();
fly.move("100px","100px");
fly.actionStart("down",5);

window.setInterval("if(parseInt(document.getElementById(fly.id).style.top) >= 500 )fly.actionEnd();", 1);
*/

//-------------CBuleet Class Definition Begin-------------------//

function CBuleet(iDamage){
    CFly.call(this);
    this.stepLength = 2;     //子弹的移动步长;px

    this.damage = iDamage;       //子弹伤害值
}

CBuleet.prototype = new CFly();

//-------------CBuleet Class Definition End-------------------//



//-------------CPlane Class Definition Begin-------------------//

function CPlane(){
    CFly.call(this);
    this.stepLength = 1;     //飞机的移动步长;px

    this.bloodVloume = 100; //飞机血量
    this.direction = null;  //飞机和子弹方向
    this.bulletType = null; //子弹类型
    this.bulletNumber = 1;  //每次发射子弹数量
    this.score = 0;         //飞机得分
    this.damage = 50;       //飞机的总伤害值
    //this.bulletAllNumber = 0;    //总共发射的数量
}

CPlane.prototype = new CFly();

CPlane.prototype.bulletAllNumber = 0;

//创建子弹，子弹类型class，子弹个数，iDamage伤害值，飞机宽度，飞机的style.top位置和style.left
var createBullet = function (sDirection, sBulletType, iBulletNumer, iDamage, sPlaneWidth, sPlaneHeight, sPlaneTop, sPlaneleft) {
    var bullets = new Array(iBulletNumer);
    for(var i = 0 ;i < iBulletNumer;i++)
        bullets[i] = new CBuleet(iDamage);


    for(var i = 0 ; i < iBulletNumer;i++){
        bullets[i].init(CPlane.prototype.bulletAllNumber.toString(),sBulletType,"bullets-box","20px","40px");
        CPlane.prototype.bulletAllNumber++;
        bullets[i].show();
        if(sDirection == "up") {
            bullets[i].move(parseInt(sPlaneleft) + i * parseInt(sPlaneWidth) / iBulletNumer + parseInt(sPlaneWidth) / iBulletNumer / 2 - 10 + "px", parseInt(sPlaneTop) - 40 + "px");
        }
        else if(sDirection == "down") {
            bullets[i].move(parseInt(sPlaneleft) + i * parseInt(sPlaneWidth) / iBulletNumer + parseInt(sPlaneWidth) / iBulletNumer / 2 - 10 + "px", parseInt(sPlaneTop) + parseInt(sPlaneHeight) + "px");
        }
    }
}

//发射子弹 iTime//发射子弹的时间间隔
CPlane.prototype.fire = function (iTime) {

    var sBulletType = this.bulletType;
    var sDirection = this.direction;
    var iBulletNumer = this.bulletNumber;
    var iDamage = this.damage;
    var sPlaneWidth = this.width;
    var sPlaneHeight = this.height;
    var sId = this.id;

    window.setInterval(
      function (){
            var sPlaneTop = document.getElementById(sId).style.top;
            var sPlaneleft = document.getElementById(sId).style.left;
            createBullet(sDirection, sBulletType, iBulletNumer, iDamage, sPlaneWidth,sPlaneHeight, sPlaneTop, sPlaneleft);
        }
        ,iTime);
}

//-------------CPlane Class Definition End-------------------//

var plane = new CPlane();
plane.init("plane","hero-plane","hero-plane-box","75px","50px");
plane.bulletNumber = 2;
plane.bulletType = "hreo-bullet";
plane.direction = "up";
plane.show();
plane.move("200px","500px");
plane.fire(200);


var enemy = new CPlane();
enemy.init("enemy","enemy-plane","enemy-plane-box","60px","60px");
enemy.bulletNumber = 1;
enemy.bulletType = "enemy-bullet";
enemy.direction = "down";
enemy.show();
enemy.move("100px","100px");
enemy.fire(1000);

plane.move("150px","550px");

//---------control bullets---------//

//所有子弹移动
window.setInterval(
    function(){
        var bulles_box = document.getElementById("bullets-box");
        var all_bulles = bulles_box.childNodes;
        for(var i = 0;i < all_bulles.length;i++){
            if(all_bulles[i].nodeName == "DIV" && all_bulles[i].className == "hreo-bullet"){
                all_bulles[i].style.top = parseInt(all_bulles[i].style.top) - 10 + "px";
            }
            else if(all_bulles[i].nodeName == "DIV" && all_bulles[i].className == "enemy-bullet"){
                all_bulles[i].style.top = parseInt(all_bulles[i].style.top) + 10 + "px";
            }
        }
    }
    ,50);

//超界子弹清除
window.setInterval(
    function(){
        var bulles_box = document.getElementById("bullets-box");
        var all_bulles = bulles_box.childNodes;
        for(var i = 0;i < all_bulles.length;i++){
            if(all_bulles[i].nodeName == "DIV"){
                if(parseInt(all_bulles[i].style.top) < 0 || parseInt(all_bulles[i].style.top) > 600)
                    bulles_box.removeChild(all_bulles[i]);
                /*if(parseInt(all_bulles[i].y_coor) < 100)
                    bulles_box.removeChild(all_bulles[i]);*/
            }
        }
    }
    ,100);


//---------clear bullets---------//
