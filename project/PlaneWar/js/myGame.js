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
    if(document.getElementById(this.id) != null) {
        var myself = document.getElementById(this.id);
        myself.parentNode.removeChild(myself);
    }
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
        myself.style.top = this.y_coor;401
}

//在dom销毁此元素
CSpirit.prototype.destory = function(){
    //alert("destoory");
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
/*var con = new CContainer();
con.init("gamediv","game-room","main");
con.show();
*/
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

//在消息组内修改一条消息，消息标题，内容，id,class,高度和宽度
CInformationGroup.prototype.updateInformation = function(sTitle, sContent,sId, sClass, sWidth, sHeight){
    var len = this.infos.length;
    for(var i = 0;i < len;i++){
        if(this.infos[i].title == sTitle)
            this.infos[i].content = sContent;
    }
    var infog = document.getElementById(this.id);
    infog.parentNode.removeChild(infog);
    this.show(this.iNum, this.sPreId, this.sWidth, this.sHeight);
}

CInformationGroup.prototype.getContent = function(sTitle){
    var len = this.infos.length;
    for(var i = 0;i < len;i++){
        if(this.infos[i].title == sTitle)
            return this.infos[i].content;
    }
    return null;
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

    for(var i = 0;i < this.infos.length;i++) {
        this.infos[i].show(this.id, nowWidth, nowHeight);
    }

    this.iNum = iNum;
    this.sPreId = sPreId;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
}

//更新消息，重新显示
/*CInformationGroup.prototype.reShow = function () {
    var infogroup = document.getElementById(this.id);
    var infos = infogroup.childNodes;
    for(var i = 0 ;i < infos.length;i++){
        if(infos[i].className == "information"){
            var title = infos[i].firstElementChild;
            var content = infos[i].lastElementChild;
            if(title.textContent == this.)
        }
    }
}*/
//----------CInformationGroup Class Definition End--------//

/*var infog = new CInformationGroup();
infog.init("infog","information-group","gamediv");
infog.addInformation("score","2048","score");
infog.addInformation("blood","100","blood");
//infog.updateInformation("blood","80","blood");
infog.show(2,"gamediv","100%","5%");
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
	if(this.functionName != null)    
		input.setAttribute("onclick",this.functionName);	
	if(this.value != null)
		input.value = this.value;		
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

/*var btng = new CButtonGroup();
btng.init("btng","btn-group","gamediv");
btng.addButton("","","btn1","btn-attack");
btng.addButton("","","btn2","btn-attack");
btng.show(2,"gamediv","100%","10%");
btng.move("0%","60%");
*/


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
/*
var mp = new CGameMap();
mp.init("bgmap","game-map","gamediv");
mp.setMap("bgmap-1","bgmap-2","game-map-map1","game-map-map2");
mp.show(null,"100%","100%");
mp.actionStart(10);
*/
//mp.actionEnd();




//---------------CFly Class Definition Begin--------------//

function CFly(){
    CSpirit.call(this);
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
            flyEle.style.top = (parseInt(flyEle.style.top) + stepLength).toString() + "px";
            break;
        case "left":
            flyEle.style.left = (parseInt(flyEle.style.left) - stepLength).toString() + "px";
            break;
        case "right":
            flyEle.style.left = (parseInt(flyEle.style.left) + stepLength).toString() + "px";
            break;
        default :break;
    }
}


//飞行器开始运动 //dir,运动方向//每iTime移动一步，连续不断的运动
CFly.prototype.actionStart = function(sDir, iTime){
    var flyId = this.id;
    var stepLength = this.stepLength;

    switch (sDir){
        case "left": this.timeLeftName = window.setInterval(
            function () {
                flyMove(flyId, sDir, stepLength);
            }
            ,iTime);
            break;
        case "up": this.timeUpName = window.setInterval(
            function () {
                flyMove(flyId, sDir, stepLength);
            }
            ,iTime);
            break;
        case "right": this.timeRightName = window.setInterval(
            function () {
                flyMove(flyId, sDir, stepLength);
            }
            ,iTime);
            break;
        case "down": this.timeDownName = window.setInterval(
            function () {
                flyMove(flyId, sDir, stepLength);
            }
            ,iTime);
            break;
        default : break;
    }
}

//飞行器停止运动
CFly.prototype.actionEnd = function(){
    clearInterval(this.timeLeftName);
    clearInterval(this.timeUpName);
    clearInterval(this.timeRightName);
    clearInterval(this.timeDownName);
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
CPlane.prototype.showBody = CFly.prototype.show;
CPlane.prototype.show = function(sPreId, sWidth, sHeight){
    this.showBody(sPreId, sWidth, sHeight);
    document.getElementById(this.id).setAttribute("blood",this.bloodVloume);
}

CPlane.prototype.bulletAllNumber = 0;

//创建子弹，子弹类型class，子弹个数，iDamage伤害值，飞机宽度，飞机的style.top位置和style.left
var createBullet = function (sDirection, sBulletType, iBulletNumer, iDamage, sPlaneWidth, sPlaneHeight, sPlaneTop, sPlaneleft) {
    var bullets = new Array(iBulletNumer);
    for(var i = 0 ;i < iBulletNumer;i++)
        bullets[i] = new CBuleet(iDamage);


    for(var i = 0 ; i < iBulletNumer;i++){
        bullets[i].init(CPlane.prototype.bulletAllNumber.toString(),sBulletType,"bullets-box","20px","30px");
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




//---------CDirector Class Definition Begin--------------//
function CDirector(){
    CSpirit.call(this);
    this.gameRoom = null;
    this.infomationGroup = null;
    this.buttonGroup = null;
    this.gameMap = null;
    this.heroPlane = new CPlane();
}

CDirector.prototype = new CSpirit();

//创建游戏房间
CDirector.prototype.createGameRoom = function(sRoomId, sClass, sPreId){
    this.gameRoom = new CContainer();
    this.gameRoom.init(sRoomId,sClass,sPreId);
    this.gameRoom.show();

}

//创建地图
CDirector.prototype.createGameMap = function(sId, sClass, sPreId){
    this.gameMap = new CGameMap();
    this.gameMap.init(sId, sClass, sPreId);
    this.gameMap.setMap("bgmap-1","bgmap-2","game-map-map1","game-map-map2");
    this.gameMap.show(null,"100%","100%");
    this.gameMap.actionStart(10);
}

//创建通知面板
CDirector.prototype.createInformationGroup = function (sId, sClass, sPreId) {
    this.infomationGroup = new CInformationGroup();
    this.infomationGroup.init(sId, sClass, sPreId);
}

//创建按钮面板
CDirector.prototype.createButtonGroup = function (sId, sClass, sPreId) {
    this.buttonGroup = new CButtonGroup();
    this.buttonGroup.init(sId, sClass, sPreId);
}

//创建一架英雄飞机
CDirector.prototype.createHeroPlane = function (sId, sClass, sPreId, sWidth, sHeight, sBulletType, sDir) {
	this.heroPlane.init(sId, sClass, sPreId, sWidth, sHeight);
    //this.heroPlane.init("plane","hero-plane","hero-plane-box","75px","50px");
    this.heroPlane.bulletNumber = 2;
    this.heroPlane.bulletType = sBulletType;//"hreo-bullet";
    this.heroPlane.direction = sDir;//"up";
    this.heroPlane.show();
    this.heroPlane.move("150px","500px");
    this.heroPlane.fire(200);
}

//创建一架敌人飞机
CDirector.prototype.createEnemyPlane = function (sId, sClass, sPreId, sWidth, sHeight, sBulletType, sDir, sX_coor, sY_coor) {
    var enemyPlane = new CPlane();
    enemyPlane.init(sId,sClass,"enemy-plane-box","60px","60px");
    enemyPlane.bulletNumber = 1;
    enemyPlane.bulletType = sBulletType;
    enemyPlane.direction = sDir;
    enemyPlane.show();
    enemyPlane.move(sX_coor,sY_coor);
    enemyPlane.actionStart(sDir,10);
    enemyPlane.fire(1000);
}


var timeCreateEnemyPlane;
CDirector.prototype.enemyPlaneId = 0;
//随机创建敌机
CDirector.prototype.randomCreateEnemyPlane = function(){

    var createEnemyPlane = this.createEnemyPlane;
    timeCreateEnemyPlane = window.setInterval(
        function(){
            var sX_coor = Math.random()*300;
            CDirector.prototype.enemyPlaneId++;

            var num = parseInt(Math.random()*10+1);
            var enemyPlaneClass = "enemy-plane" + num;
            var enemyBulletClass = "enemy-bullet" + num;
            createEnemyPlane("enemyPlane" + CDirector.prototype.enemyPlaneId,enemyPlaneClass ,
                "enemy-plane-box","40px","40px",enemyBulletClass,"down",parseInt(sX_coor,10) + "px", "-80px");
        },1000
    );
}

//---------CDirector Class Definition End--------------//




var director = new CDirector();
director.createGameRoom("gameRoom","game-room","main");

director.createButtonGroup("buttonGroup","btn-group","gameRoom");
director.buttonGroup.addButton("","startGame()","startButton","btn-attack");
director.buttonGroup.show(1,"gameRoom","60%","10%");
director.buttonGroup.move("20%","60%");


//所有子弹移动
window.setInterval(
    function(){
        var bulles_box = document.getElementById("bullets-box");
        var all_bulles = bulles_box.childNodes;
        for(var i = 0;i < all_bulles.length;i++){
            if(all_bulles[i].nodeName == "DIV" && all_bulles[i].className == "hreo-bullet"){
                all_bulles[i].style.top = parseInt(all_bulles[i].style.top) - 20 + "px";
            }
            else if(all_bulles[i].nodeName == "DIV" && all_bulles[i].className.indexOf("enemy-bullet") >= 0){
                all_bulles[i].style.top = parseInt(all_bulles[i].style.top) + 10 + "px";
            }
        }
    }
    ,50);

//超界元素清除 和 hero 不可以出界
window.setInterval(
    function(){
        var bulles_box = document.getElementById("bullets-box");
        var all_bulles = bulles_box.childNodes;
        for(var i = 0;i < all_bulles.length;i++){
            if(all_bulles[i].nodeName == "DIV"){
                if(parseInt(all_bulles[i].style.top) < 0 || parseInt(all_bulles[i].style.top) > 600)
                    bulles_box.removeChild(all_bulles[i]);
            }
        }

        var enemy_plane_box = document.getElementById("enemy-plane-box");
        var all_enemyPlanes = enemy_plane_box.childNodes;
        for(var i = 0;i < all_enemyPlanes.length;i++){
            if(all_enemyPlanes[i].nodeName == "DIV"){
                if(parseInt(all_enemyPlanes[i].style.top) > 600) {
                    //alert(all_enemyPlanes[i].id);
                    enemy_plane_box.removeChild(all_enemyPlanes[i]);
                }
            }
        }

        var hero_plane_box = document.getElementById("hero-plane-box");
        var all_heroPlanes = hero_plane_box.childNodes;
        for(var i = 0;i < all_heroPlanes.length;i++){
            if(all_heroPlanes[i].nodeName == "DIV"){
                if(parseInt(all_heroPlanes[i].style.top) < 0)
                    clearInterval(director.heroPlane.timeUpName);
                if(parseInt(all_heroPlanes[i].style.top) > 560)
                    clearInterval(director.heroPlane.timeDownName);
                if(parseInt(all_heroPlanes[i].style.left) < 0)
                    clearInterval(director.heroPlane.timeLeftName);
                if(parseInt(all_heroPlanes[i].style.left) > 260)
                    clearInterval(director.heroPlane.timeRightName);
            }
        }
    }
    ,100);


var flagUp = false;//防止一直响应
var flagDown = false;//防止一直响应
var flagLeft = false;//防止一直响应
var flagRight = false;//防止一直响应



//控制飞机移动
function controlHeroPlane(e)
{
   var e = e||event;
   var currKey = e.keyCode||e.which||e.charCode;
       switch (currKey)
       {
           case 37:
               if(flagLeft == true)
                   break;
               director.heroPlane.actionStart("left",5);
               flagLeft = true;
               break;
           case 38:
               if(flagUp == true)
                   break;
               director.heroPlane.actionStart("up",5);
               flagUp = true;
               break;
           case 39:
               if(flagRight == true)
                   break;
               director.heroPlane.actionStart("right",5);
               flagRight = true;
               break;
           case 40:
               if(flagDown == true)
                   break;
               director.heroPlane.actionStart("down",5);
               flagDown = true;
               break;
           default :
               break;
       }
   //timeFlag = true;
}

//停止飞机移动
function stopControlHeroPlane(){
    director.heroPlane.actionEnd();
    flagUp = false;//防止一直响应
    flagDown = false;//防止一直响应
    flagLeft = false;//防止一直响应
    flagRight = false;//防止一直响应
}


//开始游戏，创建英雄和英雄飞机和敌机
function startGame(){
    director.createGameMap("gameMap","game-map","gameRoom");
    director.createInformationGroup("informationGroup","information-group","gameRoom");
    director.infomationGroup.addInformation("Score:","0","inforScore");
    director.infomationGroup.addInformation("Blood:","100","inforBlood");
    director.infomationGroup.show(2, "gameRoom", "100%", "5%");

    director.createHeroPlane("heroplane","hero-plane","hero-plane-box","75px","60px","hreo-bullet","up");
    director.randomCreateEnemyPlane();
    director.buttonGroup.destory();
    document.onkeydown = controlHeroPlane;
    document.onkeyup = stopControlHeroPlane;
    document.getElementById("music-box").innerHTML =
        "<audio src=\"src/audio/bgm.mp3\" id=\"audio\" hidden=\"true\" autoplay=\"true\" loop=\"true\"></audio>";


    window.setInterval("detectionPlaneAndBullet()",10);
}


//爆炸效果 爆炸坐标点
function  boom(sX_coor, sY_coor) {
    var boompng = new CSpirit();
    boompng.init("boomId","boom1","gameRoom","60px","60px");
    boompng.show();
    boompng.move(sX_coor,sY_coor);
    var className , num = 1;
    var t = window.setInterval(
        function(){
            className = "boom" + num++;
            document.getElementById("boomId").className = className;
        }
        ,50);

    window.setTimeout(function (){
        clearInterval(t);//imeBoom[timeBoomIndex]);
        boompng.destory();
    },600);
}



//********************************************************************************



//检测碰撞
function detectionPlaneAndBullet() {

    //获得所有英雄
    var heroPlane_box = document.getElementById("hero-plane-box");
    var heroPlanes = new Array();
    for(var i = 0;i <  heroPlane_box.childNodes.length;i++) {
       if(heroPlane_box.childNodes[i].nodeName == "DIV")
            heroPlanes.push(heroPlane_box.childNodes[i]);
    }

    //获得所有敌机
    var enemyPlane_box = document.getElementById("enemy-plane-box");
    var enemyPlanes = new Array();
    for(var i = 0;i <  enemyPlane_box.childNodes.length;i++) {
        if(enemyPlane_box.childNodes[i].nodeName == "DIV")
            enemyPlanes.push(enemyPlane_box.childNodes[i]);
    }

    //获得所有子弹
    var bullet_box = document.getElementById("bullets-box");
    var bullets = bullet_box.childNodes;
    var heroBullets = new Array(), enemyBullets = new Array();
    for(var i = 0;i < bullets.length;i++){
        if(bullets[i].nodeName == "DIV" && bullets[i].className == "hreo-bullet"){
            heroBullets.push(bullets[i]);}
        else if(bullets[i].nodeName == "DIV" && bullets[i].className.substring != "hreo-bullet"){//("hreo-bullet")>0)
            enemyBullets.push(bullets[i]);}
    }

    //是否碰撞
    function isPengZhuang(id1, id2){
        var ele1 = document.getElementById(id1);
        var ele2 = document.getElementById(id2);

        var x1 = parseInt(ele1.style.left) + parseInt(ele1.style.width)/2;
        var y1 = parseInt(ele1.style.top) + parseInt(ele1.style.height)/2;
        var x2 = parseInt(ele2.style.left) + parseInt(ele2.style.width)/2;
        var y2 = parseInt(ele2.style.top) + parseInt(ele2.style.height)/2;

        if( Math.abs(x1 - x2) < (parseInt(ele1.style.width) + parseInt(ele2.style.width))/2 -15
            && Math.abs(y1 - y2) < (parseInt(ele1.style.height) + parseInt(ele2.style.height))/2 - 15){
            return true;
        }
              //alert("false");
        return false;
    }

    //检测heroBullet和enemy的碰撞
    for(var i = 0 ;i < enemyPlanes.length;i++){
        for(var j= 0 ;j < heroBullets.length;j++){
            if(isPengZhuang(enemyPlanes[i].id, heroBullets[j].id)){
                    //alert(parseInt(enemyPlanes[i].getAttribute("blood")));
                if(parseInt(enemyPlanes[i].getAttribute("blood")) <= 0) {
                    var x1 = parseInt(enemyPlanes[i].style.left);
                    var y1 = parseInt(enemyPlanes[i].style.top);
                    boom(x1 + "px", y1 + "px");
                    director.infomationGroup.updateInformation("Score:", (parseInt(director.infomationGroup.getContent("Score:")) + 10).toString());

                    enemyPlanes[i].parentNode.removeChild(enemyPlanes[i]);
                    enemyPlanes.splice(i, 1);
                }
                else{
                    enemyPlanes[i].setAttribute("blood",(parseInt(enemyPlanes[i].getAttribute("blood")) - 20).toString());
                }
                heroBullets[i].parentNode.removeChild(heroBullets[i]);
                heroBullets.splice(i, 1);
            }
        }
    }

    //检测enemyBullet和hero的碰撞
    for(var i = 0 ;i < heroPlanes.length;i++){
        for(var j= 0 ;j < enemyBullets.length;j++){
            if(isPengZhuang(heroPlanes[i].id, enemyBullets[j].id)){

                //alert(parseInt(enemyPlanes[i].getAttribute("blood")));
                if(parseInt(heroPlanes[i].getAttribute("blood")) <= 0) {
                    var x1 = parseInt(heroPlanes[i].style.left);
                    var y1 = parseInt(heroPlanes[i].style.top);
                    boom(x1 + "px", y1 + "px");

                    heroPlanes[i].parentNode.removeChild(heroPlanes[i]);
                    heroPlanes.splice(i, 1);
                }
                else{
                    director.infomationGroup.updateInformation("Blood:", (parseInt(director.infomationGroup.getContent("Blood:")) - 20).toString());
                    document.getElementById("hero-plane-boom-box").style.zIndex = "11";
                    window.setTimeout(function(){document.getElementById("hero-plane-boom-box").style.zIndex = "0";},200);
                    //alert("sdaf");
                    heroPlanes[i].setAttribute("blood",(parseInt(heroPlanes[i].getAttribute("blood")) - 20).toString());
                }
                enemyBullets[i].parentNode.removeChild(enemyBullets[i]);
                enemyBullets.splice(i, 1);
            }
        }
    }

    //检测enemy和hero的碰撞
    for(var i = 0 ;i < heroPlanes.length;i++){
        for(var j= 0 ;j < enemyPlanes.length;j++){
            if(isPengZhuang(heroPlanes[i].id, enemyPlanes[j].id)){

                //alert(parseInt(enemyPlanes[i].getAttribute("blood")));
                if(parseInt(heroPlanes[i].getAttribute("blood")) <= 0) {
                    var x1 = parseInt(heroPlanes[i].style.left);
                    var y1 = parseInt(heroPlanes[i].style.top);
                    boom(x1 + "px", y1 + "px");

                    heroPlanes[i].parentNode.removeChild(heroPlanes[i]);
                    heroPlanes.splice(i, 1);
                }
                else{
                    director.infomationGroup.updateInformation("Blood:", (parseInt(director.infomationGroup.getContent("Blood:")) - 20).toString());
                    document.getElementById("hero-plane-boom-box").style.zIndex = "11";
                    window.setTimeout(function(){document.getElementById("hero-plane-boom-box").style.zIndex = "0";},200);
                    //alert("sdaf");
                    heroPlanes[i].setAttribute("blood",(parseInt(heroPlanes[i].getAttribute("blood")) - 20).toString());
                }
                var x2 = parseInt(enemyPlanes[i].style.left);
                var y2 = parseInt(enemyPlanes[i].style.top);
                boom(x2 + "px", y2 + "px");
                enemyPlanes[i].parentNode.removeChild(enemyPlanes[i]);
                enemyPlanes.splice(i, 1);
            }
        }
    }
}

//*******************************************************************************


document.onkeydown = function(e){ var e = e || window.event; if(e.keyCode == 13) startGame();}


