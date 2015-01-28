## 一、实验说明

### 1. 环境介绍
######本实验代码非常简单，非常适合新手，跟着步骤走，相信大家都能很容易学会

本实验环境采用带桌面的Ubuntu Linux环境，实验中会用到桌面上的程序：

1. gedit：非常好用的编辑器，本课程将使用这个编辑器编写代码

2. Firefox：浏览器，可以用在需要前端界面的课程里，只需要打开环境里写的HTML/JS页面即可

### 2. 环境使用

双击打开gedit编辑器，按照下面的实验说明编写实验所需的代码及文件，然后保存

完成实验后可以点击桌面上方的“实验截图”保存并分享实验结果到微博，向好友展示自己的学习进度。实验楼提供后台系统截图，可以真实有效证明您已经完成了实验。

实验记录页面可以在“我的主页”中查看，其中含有每次实验的截图及笔记，以及每次实验的有效学习时间（指的是在实验桌面内操作的时间，如果没有操作，系统会记录为发呆时间）。这些都是您学习的真实性证明。

本课程中的所有源码可以通过以下方式下载:
```
https://lansky.sinaapp.com/forum/tank.zip
```

## 二、项目介绍

坦克大战相信大家都玩过，那么如何在网页上实现游戏呢？第一步，本次实验就带领大家如何在网页上控制坦克随意行走

这里我们主要使用javascript来控制，代码非常简单，相信任何有一点点编程基础的人都能看懂，能兼容所有浏览器，代码已经封装好，大家可以直接复制粘贴在自己的网页中，也可以把坦克换成其他的，实现不同的功能

![](http://..................../2048/5.png)

大家看了截图，是不是马上就想动手完成它，下面我们就来开始。

## 三、项目实战

### 1. 页面布局

首先我们创建一个tank.html页面：

####tank.html
```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>tank</title>
	<link rel="stylesheet" type="text/css" href="tank.css">
	<script type="text/javascript" src="tank.js"></script>
</head>
<body>
	<div id="border"><!-- 坦克移动的范围，只能在这个DIV里面移动 -->
		<div id="tank"><!-- 画坦克的DIV -->
			<div id="tank-head"></div>
			<div id="tank-bar"></div>
		</div>
	</div>
</body>
</html>
```
编写完后保存文件，文件名为 tank.html 然后点击确定就可以，路径不用改，使用默认的路径。保存完后双击桌面的 主文件夹 就可以看到文件

###2. 编写样式

然后我们再创建一个 tank.css 文件，给坦克设置样式，新建一个文件，文件名为 tank.css

####tank.css
```
*{
    padding: 0;
	margin: 0;
	border: 0;
}
#border{
    position: absolute;
	width: 100%;
	height: 100%;
	background-color: #bbb;
	overflow: hidden;
}
#tank{
    position: absolute;
	width: 60px;
	height: 60px;
	border-radius: 20px;
	background-color: #ddd;
	border-left: 3px solid #888;
	border-right: 3px solid #888;
}
#tank #tank-head{
	position: absolute;
    width: 30px;
	height: 30px;
	border-radius: 15px;
	background-color: #ddd;
	top: -40px;
	left: 15px;
}
#tank #tank-bar{
	position: absolute;
	width: 15px;
	height: 20px;
	background-color: #ddd;
	top: -20px;
	left: 23px;
}
```
编写完后保存文件，文件名为 tank.css 然后点击确定就可以，路径不用改，使用默认的路径。保存完后双击桌面的 主文件夹 就可以看到文件

### 3. 让坦克动起来

最后一步了！再坚持一下就成功了。

编写控制代码，让坦克听从我们的命令。新建 tank.js 文件

####tank.js
```
//首先我们在页面加载完后获取坦克移动的范围，就是id='border' 的DIV的宽度和高度
window.onload=function()
{
	width = document.getElementById('border').offsetWidth;
	height = document.getElementById('border').offsetHeight;
}
var width;
var height;
var y=50;//坦克的坐标，以左上角为计算原点，水平方向为X轴，垂直方向为Y轴
var x=50;//初始化坐标

//然后我们处理按键事件，在按键被按下的时候移动坦克，按键放开的时候停止移动

document.onkeydown=keydown;
document.onkeyup=keyup;

//我们再分别编写函数，处理按键
function keydown(e)//e是火狐下的隐藏对象，相当于IE下的event
{
	var ev=e || window.event;//兼容火狐和IE,
	//使用 || 运算符的好处是，当e可用时，ev=e,既火狐浏览器下，
	//非火狐浏览器时e为undefined，ev=window.event，既IE和webkit浏览器
    
	if(ev.keyCode==37 || ev.keyCode==65)//方向键左和A被按下，下同
	{
		deal_left("set");//向左移动
	}
	else if(ev.keyCode==38 || ev.keyCode==87)
	{
		deal_up("set");
	}
	else if(ev.keyCode==39 || ev.keyCode==68)
	{
		deal_right("set");
	}
	else if(ev.keyCode==40 || ev.keyCode==83)
	{
		deal_down("set");
	}
}
function keyup(e)
{
	var ev=e || window.event;
	if(ev.keyCode==37 || ev.keyCode==65)
	{
		deal_left("clr");//参数表示动作，set表示移动，clr表示停止移动
	}
	else if(ev.keyCode==38 || ev.keyCode==87)
	{
		deal_up("clr");
	}
    else if(ev.keyCode==39 || ev.keyCode==68)
	{
		deal_right("clr");
	}
	else if(ev.keyCode==40 || ev.keyCode==83)
	{
		deal_down("clr");
	}
}
//上面的ev.keyCode获取的是按键的键码，用ascii码表示，不知道ascii的可以百度下

//然后我们再分别编写处理各方向的函数
var f_left;
var f_right;
var f_up;
var f_down;
var left_flag=0;//保存该方向是否进行移动，0表示停止，1表示正在移动
var right_flag=0;
var up_flag=0;
var down_flag=0;
var rotate=0;//保存坦克的前进方向

function deal_left(type)
{
	if(type=="set")
	{
		if(left_flag!=1)
		{
			f_left = setInterval(left_move,10);
		}
		left_flag=1;
	}else{
		clearInterval(f_left);
		left_flag=0;
	}
}
function deal_right(type)
{
	if(type=="set")
	{
		if(right_flag!=1)
		{
			f_right = setInterval(right_move,10);
		}
		right_flag=1;
	}else{
		clearInterval(f_right);
		right_flag=0;
	}
}
function deal_up(type)
{
	if(type=="set")
	{
		if(up_flag!=1)
		{
			f_up = setInterval(up_move,10);
		}
		up_flag=1;
	}else{
		clearInterval(f_up);
		up_flag=0;
	}
}
function deal_down(type)
{
	if(type=="set")
	{
		if(down_flag!=1)
		{
			f_down = setInterval(down_move,10);
		}
		down_flag=1;
	}else{
		clearInterval(f_down);
		down_flag=0;
	}
}
//最后一个函数了！终于快完成了。编写真正的移动函数
function left_move()
{
	if((x-48)>50)
		x-=2;
	document.getElementById("tank").style.top=y-50+"px";
	document.getElementById("tank").style.left=x-50+"px";
	rotate=-90;
	document.getElementById("tank").style.WebkitTransform="rotate(-90deg)";
    //css3的属性，旋转，参数-90deg表示逆时钟旋转90度
	document.getElementById("tank").style.MozTransform="rotate(-90deg)";
    //Moz是浏览器内核前缀，兼容Moz内核的浏览器
}
function right_move()
{
	if((x-52)<width-100)
		x+=2;
	document.getElementById("tank").style.top=y-50+"px";
	document.getElementById("tank").style.left=x-50+"px";
	rotate=90;
	document.getElementById("tank").style.WebkitTransform="rotate(90deg)";
	document.getElementById("tank").style.MozTransform="rotate(90deg)";
}
function up_move()
{
	if((y-52)>50)
		y-=2;
	document.getElementById("tank").style.top=y-50+"px";
	document.getElementById("tank").style.left=x-50+"px";
	rotate=0;
	document.getElementById("tank").style.WebkitTransform="rotate(0deg)";
	document.getElementById("tank").style.MozTransform="rotate(0deg)";
}
function down_move()
{
	if((y-48)<height-100)
		y+=2;
	document.getElementById("tank").style.top=y-50+"px";
	document.getElementById("tank").style.left=x-50+"px";
	rotate=180;
	document.getElementById("tank").style.WebkitTransform="rotate(180deg)";
	document.getElementById("tank").style.MozTransform="rotate(180deg)";
}
```

###到此我们的坦克就完成了！确认保存所有的文件在同一个目录，且代码没有错误
######tank.html
######tank.css
######tank.js
####双击桌面上的主文件夹，打开后找到tank.html，按右键打开方式为火狐，用火狐浏览器打开就能看到效果了
####四个控制键和WASD都可以控制坦克移动

###稍后我还会用这份代码做一个最简单的网页播放PPT

## 四、代码分析总结

###1. 流程分析：

1.首先我们在页面加载完后获取了坦克移动的范围，既div的宽度和高度，我们在tank.css设置该DIV的样式

```
#border{
    position: absolute;
	width: 100%;
	height: 100%;
	background-color: #bbb;
	overflow: hidden;
}
```
宽度和高度都是100%，既浏览器的宽度和高度，document.getElementById('border').offsetWidth 获取它的宽度和高度，注意获取的是像素的值，为整数。
position设置定位方式为绝对定位，所以默认就是整个浏览器的宽度和高度。你可以根据自己的需求调整DIV的大小和定位。

2.然后设置坦克的样式

```
#tank{//坦克的主体
	position: absolute;
	width: 60px;
	height: 60px;
    border-radius: 20px;//设置圆角
	background-color: #ddd;
	border-left: 3px solid #888;//给左边框设置一个颜色，作为履带
	border-right: 3px solid #888;//给右边框设置颜色，作为右边的履带
}
#tank #tank-head{//坦克的炮头
	position: absolute;
	width: 30px;
	height: 30px;
	border-radius: 15px;//这里圆角半径为宽度的一半，可以实现圆的效果
	background-color: #ddd;
	top: -40px;
	left: 15px;
}
#tank #tank-bar{//坦克的炮身
	position: absolute;
	width: 15px;
	height: 20px;
	background-color: #ddd;
	top: -20px;
	left: 23px;
}
```
这里我们的坦克是用css画出来的，有兴趣的同学可以自己做一个精美的坦克图片代替，这样就更真实了。当然如果你有足够的耐心和时间，你也可以把坦克零件拆分的更细，
然后分别用图片代替，这样就可以做出很精细的坦克了。当然，最好里面的元素是绝对定位，这样当你改变零件的位置时，其他零件才不至于变动。到这里，我们的布局和样式
就差不多了，剩下的就是编写控制代码让坦克动起来了。

3.用js控制坦克

为了让大家对js更熟悉，我先给大家看一张流程图，让大家对流程更清楚


要实现按键控制坦克，只要在按键按下的时候改变坦克的定位就可以了，所以首先我们给按键设置监听，这样我们就知道按键何时被按下并且要做什么事。
```
document.onkeydown=keydown;
document.onkeyup=keyup;
```
这两句就是事件绑定，当按键按下的时候告诉浏览器要执行keydown()这个函数，注意不要带上（），这是js的特性，所有东西都是对象，函数也是对象，所以可以像变量一样传递赋值给其他变量，只要把
函数名赋值就代表把整个函数赋值。同样，当按键释放的时候执行keyup()这个函数。

4.获取哪个按键被按下

接下来我们就要在函数里面先判断哪个按键被按下，然后使坦克向什么方向移动。var ev=e || window.event; e是隐藏变量，function keydown(e) 当执行这个函数时，
js在后台会为e对象赋值，所以我们可以用e来获取键码。这里使用了一个技巧，如果是火狐浏览器，则e对象是存在的，所以把e赋给ev，如果是其他浏览器，则e是undefined
，既未定义，所以把event赋给ev。这样做的好处是，不管是什么浏览器，我们都可以使用同一个ev来获取键码，实现了浏览器兼容。

获取了键码以后，就调用相应的deal_left("set");函数。参数set表示使坦克移动，clr表示使坦克停止，为什么要这么用，后面会讲到。下面来看一下这个函数定义
```
function deal_left(type)
{
	if(type=="set")
	{
		if(left_flag!=1)
		{
			f_left = setInterval(left_move,10);
		}
		left_flag=1;
	}else{
		clearInterval(f_left);
		left_flag=0;
	}
}
```
我用left_flag变量表示坦克是否在移动，如果参数是set，则再判断flag变量，如果不是1，就表示坦克未移动，所以执行

f_left = setInterval(left_move,10);

setInterval()这个函数是系统函数，作用是每隔一定时间执行一次第一个参数的语句，这里的作用就是每隔10毫秒执行一次left_move()函数。然后把flag设为1，坦克正在移动。如果是
clr,则调用clearInterval()函数，这个函数是和setInterval()对应的。参数是setInterval函数返回的变量，表示停止执行函数。下次再调用该函数，flag为1，所以不会
再执行setInterval函数了。前面说过，之所以这么用，是因为如果一直调用，那么就会使left_move函数加上多层定时执行，那么坦克就会越来越快，好像有加速度一样。

5.最后一个left_move()函数比较简单，这里就不详细讲解了。再说明几点，如果一直按下按键，那么是js会一直调用keydown()这个函数，所以需要使用一个参数来表示是移动还是停止，
按键按下时，只在第一次调用函数时使用setInterval()函数，然后它就会一直移动，然后按键释放的时候清除定时。这里我是用setInterval实现移动，通过第三方函数调用。
所以这里函数调用函数，有点由此一举。你也可以在按键按下的时候直接调用left_move()，这样可以少写很多代码，但是这样有一个缺点，就是当你一直按下按键时，坦克第一次移动
会卡顿一下，然后才一直平滑移动，这点时间对于游戏来说，是致命的。用第三方函数调用就可以避免这个延时，精度高，几乎没有延时。这点希望大家仔细思考一下。