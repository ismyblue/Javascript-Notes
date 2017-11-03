//----------CSpirit Class Definition Begin--------//

function CSpirit() {
    this.id = null;     //css id
    this.class = null;  //css class
    this.x_coor = "0px";    //x坐标
    this.y_coor = "0px";    //y坐标
    this.width =  null;
    this.height = null;
    this.preId = null;
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
/*var btng = new CButtonGroup();
btng.init("btng","btn-group","gamediv");
btng.addButton("","","btn1","btn-attack");
btng.addButton("","","btn2","btn-attack");
btng.addButton("","","btn3","btn-attack");
btng.addButton("","","btn4","btn-attack");
btng.show(2,"gamediv","100%","20%");
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

    this.map1top = -100;        //第一张图的top初始位置的值
    this.map2top = 0;        //第二张图的top初始位置的值
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
    this.domEle1 = document.getElementById(this.map1.id);
    this.domEle2 = document.getElementById(this.map2.id);
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

