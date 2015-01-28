<?php
header('content="text/html;charset=utf-8"');
$lrc_file_name = $_GET['name'];
$method = $_GET['method'];

if($method == "get_lyric_data"){				//获取指定歌词名的歌词内容
	if($lrc_file_name == "")
	{
		echo "{";
		echo "\"state\":\"wrong\",";
		echo "\"message\":\"no lrc filename\"";
		echo "}";
	} else{
		$path="mp3/".$lrc_file_name;
		$path=iconv("utf-8", "gb2312", $path);
		if( file_exists($path) )
		{
			$file = fopen($path, "r");
			$lrc_data="";
			while (!(feof($file)))
			{
				$text=fgets($file);
				$text=preg_replace("/\n/","", $text);
				$lrc_data=$lrc_data.$text.",";
			}
			fclose($file);
			echo "{";
			echo "\"state\":\"success\",";
			echo "\"message\":\"all have done\",";
			echo "\"lrc\":\"".$lrc_data."\"";
			echo "}";
		}else{
			echo "{";
			echo "\"state\":\"success\",";
			echo "\"message\":\"can not open file\",";
			echo "\"lrc\":\"          暂时没有歌词 稍后我会添加 sorry\"";
			echo "}";
		}
	}
}else if($method == "get_music_list"){		//获取所有歌曲列表
	$dir="./mp3";
	//PHP遍历文件夹下所有文件 
	$handle=opendir($dir.".");
	//定义用于存储文件名的数组
	$list = array();
	while (false !== ($file = readdir($handle)))
	{
		if ($file != "." && $file != ".." && substr($file,-3) == "mp3" ){
			$list[] = $file; //输出文件名
		}
	}
	closedir($handle);
	echo "{";
	echo "\"state\":\"success\",";
	echo "\"music_list\":[";
	$list_length = count($list);
	for ($i=0; $i < $list_length; $i++) { 
		echo "\"".iconv("gb2312", "utf-8", $list[$i])."\"";
		if($i != ($list_length-1) )
			echo ",";
	}
	echo "]";
	echo "}";
}else{												//给的method参数不符
	echo "{";
	echo "\"state\":\"wrong\",";
	echo "\"message\":\"no such method\"";
	echo "}";
}

?>