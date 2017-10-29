//----------CSpirit Class Definition Begin--------//
function CSpirit(){
    this.id = null;     //css id
    this.class = null;  //css class
    this.skin = null;   //css skin
    this.x_coor = "0px";    //x坐标
    this.y_coor = "0px";    //y坐标
    this.width = null;
    this.height = null;
    this.preId = null;
    if((typeof CSpirit._defi_CSpirit) == "undefined"){

        CSpirit.prototype.max_x_coor = 1000;    //最大x坐标
        CSpirit.prototype.max_y_coor = 1000;    //最大y坐标

        CSpirit.prototype.init = function(sId, sClass, sSkin, sWidth, sHeight, sPreId){
            this.id = sId;     //css id
            this.class = sClass;  //css class
            this.skin = sSkin;   //css skin
            this.width = sWidth;
            this.height = sHeight;
            this.preId = sPreId;
        };

        CSpirit.prototype.show = function(){
            var div = document.createElement("div");
            div.id = this.id;
            div.className = this.class;
            div.style.width = this.width;
            div.style.height = this.width;
            div.style.left = this.x_coor;
            div.style.top = this.y_coor;
            div.style.backgroundImage = "url(\"" + this.skin + "\")";
            var pre = document.getElementById(this.preId);
            pre.appendChild(div);
        };


        CSpirit.prototype.move = function(sX_coor, sY_coor){
            var myself = document.getElementById(this.id);
            this.x_coor = sX_coor;
            this.y_coor = sY_coor;
            myself.style.left = this.x_coor;
            myself.style.top = this.y_coor;
        };

        CSpirit.prototype.destory = function(){
            var myself = document.getElementById(this.id);
            myself.parentNode.removeChild(myself);
        };
        CSpirit._defi_CSpirit = true;
    }
}
//----------CSpirit Class Definition End--------//



//----------CContainer Class Definition Begin--------//
function CContainer(){
   CSpirit.call(this);
   if((typeof CContainer._defi_CContainer) == "undefined"){
       CContainer._defi_CContainer = true;
   }
}
CContainer.prototype = new CSpirit();

//---------- CContainer Definition End--------//

var con = new CContainer();
con.init("gamediv","","src/images/gamebg_1.jpg","100%","100%","main");
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

}


//----------CInformation Class Definition End--------//

var s = new CSpirit();//CInformation();
s.init("info","information","src/images/gamebg_2.jpg","30%","10%","gamediv");
s.show();/**/




