//----------CSpirit Class Definition Begin--------//

function CSpirit() {
    this.id = null;     //css id
    this.class = null;  //css class
    this.x_coor = "0px";    //x坐标
    this.y_coor = "0px";    //y坐标
    this.width = "100%";
    this.height = "100%";
    this.preId = null;
}

CSpirit.prototype.max_x_coor = 1000;    //最大x坐标
CSpirit.prototype.max_y_coor = 1000;    //最大y坐标


CSpirit.prototype.init = function(sId, sClass, sPreId, sWidth, sHeight){
    this.id = sId;     //css id
    this.class = sClass;  //css class
    if(sWidth != null)
        this.width = sWidth;
    if(sHeight != null)
        this.height = sHeight;
    this.preId = sPreId;
}

CSpirit.prototype.show = function(){
    var div = document.createElement("div");
    div.id = this.id;
    div.className = this.class;
    div.style.width = this.width;
    div.style.height = this.height;
    div.style.left = this.x_coor;
    div.style.top = this.y_coor;
    var pre = document.getElementById(this.preId);
    pre.appendChild(div);
}


CSpirit.prototype.move = function(sX_coor, sY_coor){
    var myself = document.getElementById(this.id);
    this.x_coor = sX_coor;
    this.y_coor = sY_coor;
    myself.style.left = this.x_coor;
    myself.style.top = this.y_coor;
}

CSpirit.prototype.destory = function(){
    var myself = document.getElementById(this.id);
    myself.parentNode.removeChild(myself);
}

//----------CSpirit Class Definition End--------//



//----------CContainer Class Definition Begin--------//
function CContainer(){
    CSpirit.call(this);
    CContainer._defi_CContainer = true;
}
CContainer.prototype = new CSpirit();

//---------- CContainer Definition End--------//

var con = new CContainer();
con.init("gamediv","game-room","main");
con.show();
/**/

//----------CInformation Class Definition Begin--------//
    function CInformation(){
        CSpirit.call(this);
        this.title = null;
        this.content = null;
    }
    CInformation.prototype = new CSpirit();
    CInformation.prototype.setInformation = function(sTitle, sContent){
        this.title = sTitle;
        this.content = sContent;
    }
    CInformation.prototype.showBody = CInformation.prototype.show;
    CInformation.prototype.show = function () {
        this.showBody();
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

/*var s = new CInformation();//CInformation();
s.init("info","information","gamediv");
s.setInformation("title","content");
s.show();*/



//----------CPanel Class Definition Begin--------//
function CPannel(){
    CSpirit.call(this);
    this.infos = new Array()[];
}

CPannel.prototype = new CSpirit();

CPannel.prototype.addInfo = function(sTitle, sContent){
    var len = this.infos.length;
    var info = new CInformation();
    info.init(this.id + len.toString(), "information", this.id);
    info.setInformation(sTitle, sContent);
    this.infos.push(info);
}

CPannel.prototype.showBody = CPannel.prototype.show;

CPannel.prototype.show = function(){
    this.showBody();
    var myself = document.getElementById(this.id);
    for(var i = 0 ;i < this.infos.length;i++){
        this.infos[i].show();
    }
}

//----------CPanel Class Definition End--------//
/*var panel = new CPannel();
panel.init("panel", "panel-info", "gamediv", "80%", "50%");
panel.addInfo("score","1205");
panel.addInfo("blood","18");
panel.show();*/