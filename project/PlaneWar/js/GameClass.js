//----------CContainer Class Definition Begin--------//

function CContainer(){
    this.id = null;         //容器 的id
    this.class = null;      //容器的 class
    this.width = null;      //容器的宽度
    this.height = null;     //容器的高度
    this.x_coor = "0px";    //容器的x坐标
    this.y_coor = "0px";    //容器的y坐标
    this.skin = null;       //容器背景图片的url
    this.preId = null;
}

//初始化容器 param : 宽度， 高度， id， class，url，父元素id
CContainer.prototype.init = function(sWidth, sHeight, sId, sClass, sSkin, sPreId){
    this.width = sWidth;
    this.height = sHeight;
    this.id = sId;
    this.class = sClass;
    this.skin = sSkin;
    this.preId = sPreId;
}

//显示容器
CContainer.prototype.show = function(){
    var pre = document.getElementById(this.preId);
    var div = document.createElement("div");
    div.id = this.id;
    div.className = this.class;
    div.style.width = this.width;
    div.style.height = this.height;
    div.style.background = this.skin;
    div.style.left = this.x_coor;
    div.style.top = this.y_coor;
    div.style.backgroundImage = this.skin;
    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundSize = "100% 100%";
    pre.appendChild(div);
}

//销毁容器
CContainer.prototype.destory = function(){
    var myself = document.getElementById(this.id);
    myself.parentNode.removeChild(myself);
}


var con = new CContainer();
con.init("100%","100%","gamediv","","url(\"src/images/gamebg_1.jpg\")","main");
con.show()/**/

//---------- CContainer Definition End--------//




//----------CInforPannel Class Definition Begin--------//

function CInfoPannel(){
    CContainer.call(this);
    this.informations = new Array();
}

CInfoPannel.prototype = new CContainer();

CInfoPannel.prototype.addInfo = function(sTitle,sContent){
    var len = this.informations.length;
    this.informations[len] = new Array();
    this.informations[len][0] = sTitle;
    this.informations[len][1] = sContent;
}


CInfoPannel.prototype.updateInfo = function(sTitle,updateContent){
    var len = this.informations.length;
    for(var i = 0;i < this.informations.length;i++){
        if(this.informations[i][0] == sTitle){
            this.informations[i][1] = updateContent;
            return ;
        }
    }
}

CInfoPannel.prototype.showInfos = function(){
    var pre = document.getElementById(this.id);
    var infoTable = document.createElement("table");
    table.className = "table";
    for(var i = 0;this.informations.length;i++){
        var tr = document.createElement("tr");
        tr.className = "info";
        for(var j = 0;j < this.informations[i].length;j++){
            var td = document.createElement("td");

        }
        infoTable.appendChild(tr);
    }
}

var cp = new CInforPannel();





//----------CPannel Class Definition Begin--------//
















//----------CSpirit Class Definition Begin--------//

function CSpirit(){
    this.id = null;     //css id
    this.class = null;  //css class
    this.skin = null;   //css skin
    this.x_coor = 0;    //x坐标
    this.y_coor = 0;    //y坐标
    this.speed = 0;     //移动速度
}

CSpirit.prototype.max_x_coor = 1000;    //最大x坐标
CSpirit.prototype.max_y_coor = 1000;    //最大y坐标

CSpirit.prototype.init = function(skin,x_coor,y_coor){
    this.skin = skin;
    this.x_coor = x_coor;
    this.y_coor = y_coor;
}


CSpirit.prototype.show = function(){

}

//----------CSpirit Class Definition End--------//