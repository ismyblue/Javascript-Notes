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

var infog = new CInformationGroup();
infog.init("infog","information-group","gamediv");
infog.addInformation("score","2048","score-");
infog.addInformation("score","2048","score-nfo");
infog.addInformation("score","2048","score-fo");
infog.addInformation("blood","68","blood");
infog.show(2,"gamediv","100%","10%");
/**/




//------------CButton Class Definition Begin--------------//
function CButton(){
    CSpirit.call(this);
    this.value = null;
    this.functionName = null;
}
CButton.prototype = new CSpirit();
//设置一按钮，按钮名字，按钮的函数名
CButton.prototype.setButton = function(sValue, sFunctionName) {
    this.value = sValue;
    this.functionName = sFunctionName;
}

CButton.prototype.init = function(){

}

//CButton.prototype.showBody = CSpirit.prototype.show;
CButton.prototype.show = function(sPreId, sWidth, sHeight){

}

//------------CButton Class Definition Begin--------------//



/*
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
    this.buttons[len].value = sValue;
    this.buttons[len].functionName = sFunctionName;
}

//更名父类的show函数为showBody
CButtonGroup.prototype.showBody = CSpirit.prototype.show;

//在按钮组显示消息，sNum代表一列显示多少个按钮,不传sWidth和sHeight默认是100%
CButtonGroup.prototype.show = function (iNum) {
    this.showBody(sWidth, sHeight);
    var num = 1;
    if(sNum != null)
        num = iNum;
    var myself = document.getElementById(this.id);
    for(var i = 0;i < this.buttons.length;i++) {
        var div = document.createElement("div");
        if(this.buttons[i].class != null)
            div.className = this.infos[i].class;
        div.style.width = (100/iNum).toString() + "%";
        var label = document.createElement("label");
        label.className = "text-primary";
        label.innerHTML = this.infos[i].title;
        var p = document.createElement("p");
        p.className = "text-danger";
        p.innerHTML = this.infos[i].content;
        div.appendChild(label);
        div.appendChild(p);
        myself.appendChild(div);
    }
}
//------------CButtonGroup Class Definition End--------------//



//----------CPanel Class Definition Begin--------//
function CPannel(){
    CContainer.call(this);
    this.infomationgroup = null;
    this.buttongroup = null;
}

CPannel.prototype = new CContainer();

CPannel.prototype.addInfo = function(sTitle, sContent){
    var len = this.infos.length;
    var info = new CInformation();
    info.init(this.id + len.toString(), "information", this.id);
    info.setInformation(sTitle, sContent);
    this.infos.push(info);
}

CPannel.prototype.showBody = CPannel.prototype.show;

CPannel.prototype.show = function(sWidth, sHeight){
    this.showBody(sWidth, sHeight);
    var myself = document.getElementById(this.id);
    var h = this.infos.length;
    for(var i = 0 ;i < this.infos.length;i++){
        this.infos[i].show(null,(100/h).toString() + "%");
    }
}

//----------CPanel Class Definition End--------//
var panel = new CPannel();
panel.init("panel", "panel-info", "gamediv", "100%", "10%");
panel.addInfo("score","1205");
panel.addInfo("blood","18");
panel.show();*/

