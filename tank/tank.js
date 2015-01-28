	window.onload=function()
	{
		width = document.getElementById('border').offsetWidth;
		height = document.getElementById('border').offsetHeight;
	}
	var width;
	var height;

	var y=50;
	var x=50;

	var f_left;
	var f_right;
	var f_up;
	var f_down;
	var left_flag=0;
	var right_flag=0;
	var up_flag=0;
	var down_flag=0;
	var rotate=0;
	document.onkeydown=keydown;
	document.onkeyup=keyup;
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
	function left_move()
	{
		if((x-48)>50)
			x-=2;
		document.getElementById("tank").style.top=y-50+"px";
		document.getElementById("tank").style.left=x-50+"px";
		rotate=-90;
		document.getElementById("tank").style.WebkitTransform="rotate(-90deg)";//css3的属性，旋转，参数-90deg表示逆时钟旋转90度
		document.getElementById("tank").style.MozTransform="rotate(-90deg)";//Moz是浏览器内核前缀，兼容Moz内核的浏览器
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
	function keydown(e)//e是火狐下的隐藏对象，相当于IE下的event
	{
		var ev=e || window.event;//兼容火狐和IE,
		//使用 || 运算符的好处是，当e可用时，ev=e,既火狐浏览器下，
		//非火狐浏览器时e为undefined，ev=window.event，既IE和webkit浏览器
		if(ev.keyCode==37 || ev.keyCode==65)
		{
			deal_left("set");
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
			deal_left("clr");
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