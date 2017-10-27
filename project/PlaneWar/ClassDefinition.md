# Plane War Class

- CDirector 导演类
- CContainer 容器类
    -  CPannel 面板类
- CSpirit 精灵类
    - CButton 按钮类
    - CGameMap 地图类
    - CBuleet 子弹类
    - Cplane 飞机类


## CDirector  导演类
导演类最高权限，导演一场游戏，拥有这场游戏的操作权
```
room：CContainer			//游戏房间
map:CGameMap			//游戏地图
infoPannel:CPannel//通知面板
mainPannel:CPannel	//控制面板
hero:Cplane				//英雄飞机
enemys[]:Cpalne			//敌人飞机

init():void				//初始化，布置现场
createHero(int,int):void//创建英雄飞机 param:bloodVloume, speed
createEnemy(int,int,int):void	//创建敌人飞机 param:amount, bloodVloume, speed
startGame():void			//开始游戏
stopGame():void				//暂停游戏
endGame():void			//结束游戏
showInfo():void			//显示通知信息
```

## CContainer 容器类
容器类
```
id:String				//id
class:String			//css类
width:int				//宽度
height:int				//高度
x_coor:int				//x坐标
y_coor:int				//y坐标
skin:String				//背景图片的url
preId:String			//父元素的id

init(String, String ,String, String, String, String):void	//初始化容器param,宽度， 高度， id， class，url，父元素id
show():void			//显示
destory():void			//销毁
```


### CPannel 面板类 extends CContainer 
面板类
```
CPannel:面板类 extends CContainer
informations[]:String	//通知信息
buttons[]:CButton		//按钮

showInfos():void		//显示消息
showButtons():void	//显示按钮
```

## CSpirit 精灵类
精灵类
```
id:String		//身份标号
class:String		//css类
skin:String		//皮肤
x_coor:int		//x坐标
y_coor:int		//y坐标
speed:int		//移动速度

max_x_coor:static int	//最大x坐标
max_y_coor:static int	//最大y坐标

init(String,int,int,int):void	//初始化：param: skin,x-coor,y-coor,speed
show():void						//显示
move(String):void				//移动： param: ["up","down","left","right"]
destory():void					//毁灭
```

### CButton 按钮类 extends CSpirit
按钮类
```
CButton：按钮类 extends CSpirit
value:String		//按钮名称

function:String		//执行函数的名字
```

### CGameMap 地图类 extends CSpirit
游戏地图类
```
width:int		//宽度
height:int		//高度
```


### CBuleet 子弹类 extends CSpirit
子弹类
```
CBuleet:子弹类 extends Cspirit
damage:int		//伤害值

setDamage(int):void	//设置伤害值
```


### CPlane:飞机类 extends Cspirit
飞机类
```
bloodVloume:int //血量
bullet:Cbullet	//子弹
direction:String//飞机和子弹方向
score:int		//得分

fireBullet():void				//发射子弹
addScore(int):void				//加分：param：score
destory():void					//飞机毁灭
```



