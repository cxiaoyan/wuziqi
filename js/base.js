$(function(){
	var canvas=$("#canvas").get(0);
	var canvas1=$("#canvas1").get(0);
	var canvas2=$("#canvas2").get(0);
	var audio1=$(".audio1").get(0);
	var audio2=$(".audio2").get(0);
	var audio3=$(".audio3").get(0);
	var audio4=$(".audio4").get(0);
	var ctx=canvas.getContext("2d");
	var ctx1=canvas1.getContext("2d");
	var ctx2=canvas2.getContext("2d");
	var step=40;
	var sR=4;
	var bR=20;
	var ms=0;
	var t;
	var tt;
	var zhe=$(".zhe");
	var img=$(".img");
	var qizi={};
	var AI=false;
	var gameState="pause";
	var kongbai={};
	
//	javascript中所有写在.后面的都当字符串处理
//	取值，都是[],.只是一个简写。
//toDataURL()
//收集画布中所有的像素，转化为图片，
//浏览器中可用的图片，
//字符串形式存储的图片

//	单击zhe，zhe消失
	img.on("click",function(){
		$(this).removeClass("img-ru");
		$(this).addClass("img-move");
		zhe.fadeOut(1000).delay(100).queue(function(){
			$(".heit").addClass("heit-class");
			$(".shuoming").addClass("donghua").dequeue();
			$(this).dequeue();
		});
		
	})
	$(".xclose2").on("click",function(){
		$(".heit").removeClass("heit-class");
		$(".shuoming").removeClass("donghua")
	})
	
	$(".cancel").on("click",function(){
		zhe.fadeIn(500);
		img.addClass("img-ru");
		
	})
	
	function l(x){
		return (x+0.5)*step+0.5;
	}
	
	function circle(x,y){
		ctx.save();
		ctx.translate(l(x),l(y))
		ctx.beginPath();
		ctx.arc(0,0,sR,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		
	}
	function qipan(){
		ctx.clearRect(0,0,canvas.width,canvas.height)
		ctx.save();
		ctx.beginPath();
		for(var i=0;i<15;i++){
			ctx.moveTo(l(0),l(i));
			ctx.lineTo(l(14),l(i));
			ctx.moveTo(l(i),l(0));
		  	ctx.lineTo(l(i),l(14));
		}
//		ctx.strokeStyle = "#F5270B";
		
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
		
		circle(3,3);
		circle(3,11);
		circle(7,7);
		circle(11,3);
		circle(11,11);
		
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){
				kongbai[m(i,j)]=true;
			}
		}
	}
	function lqizi(x,y,color){
		ctx.save();
		ctx.translate(l(x),l(y));
		ctx.beginPath();
		ctx.arc(0,0,bR,0,Math.PI*2)
		if(color=="black"){
			var g=ctx.createRadialGradient(-6,-6,0,0,0,20);
			g.addColorStop(0.05,"#eee");
			g.addColorStop(1,"#000");
			ctx.fillStyle=g;
		}else if(color=="white"){
			var g=ctx.createRadialGradient(-6,-6,0,0,0,25);
			g.addColorStop(0.1,"#fff");
			g.addColorStop(1,"#ccd");
			ctx.fillStyle=g;
		}
		
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 3;
		ctx.shadowBlur = 4;
		ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
		
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		qizi[x+"_"+y]=color;
		gameState="play";
		delete kongbai[m(x,y)];
	}
	
	function miaozhen(){
			ctx1.clearRect(0,0,300,300);
			ctx1.save();
//			var images=$("#image").get(0);
//				ctx1.drawImage(images,0,0,200,200);
			ctx1.translate(94,111)
			ctx1.rotate(Math.PI/(180*1000)*12*ms)
			ms+=1;
			ctx1.beginPath();
			ctx1.arc(0,0,5,0,Math.PI*2);
			ctx1.moveTo(0,5);
			ctx1.lineTo(0,12);
			ctx1.moveTo(0,-5);
			ctx1.lineTo(0,-35);
			ctx1.closePath();
			ctx1.stroke();
			ctx1.restore();
		}
	miaozhen();
	ms=0;
	function miaozhen2(){
//			
			ctx2.clearRect(0,0,300,300);
			ctx2.save();
//			var images=$("#image").get(0);
//				ctx2.drawImage(images,0,0,200,200);
				ctx2.translate(95,111)
				ctx2.rotate(Math.PI/(180*1000)*12*ms)
				ms+=1;
				ctx2.beginPath();
				ctx2.arc(0,0,5,0,Math.PI*2);
				ctx2.moveTo(0,5);
				ctx2.lineTo(0,12);
				ctx2.moveTo(0,-5);
				ctx2.lineTo(0,-35);
				ctx2.stroke();
				ctx2.closePath();
			ctx2.restore();
		}
	miaozhen2();
	function pan(){
			ctx.save();
			ctx.translate(300,300);
			for(var i=0;i<60;i++){
				ctx.beginPath();
				if(i%5==0){
					ctx.moveTo(0,-120);
				}else{
					ctx.moveTo(0,-135);
				}
				ctx.lineTo(0,-150);
				ctx.moveTo(0,-120);
				ctx.closePath();
				ctx.stroke();
				ctx.rotate(Math.PI/180*6)
			}
			
			ctx.restore();
		}
	qipan();
//	画棋谱
	function qipu(){
		$(".qipu").show();
		ctx.save();
		ctx.font="20px/1 微软雅黑";
		ctx.textBaseline="middle";
		ctx.textAlign="center";
		var i=1;
		for(var k in qizi){
			var arr=k.split("_");
			if(qizi[k]==="white"){
				ctx.fillStyle="black";
			}else if(qizi[k]==="black"){
				ctx.fillStyle="white";
			}
			ctx.fillText(i++,l(parseInt(arr[0])),l(parseInt(arr[1])));
		}
		ctx.restore();
		
		if($(".qipu").find("img").length){
			$(".qipu").find("img").attr("src",canvas.toDataURL());
		}else{
			$("<img>").attr("src",canvas.toDataURL()).appendTo(".qipu");
		}
		
		if($(".qipu").find("a").length){
			$(".qipu").find("a").attr("href",canvas.toDataURL());
		}else{
			$("<a>").attr("href",canvas.toDataURL()).attr("download","qipu.png").appendTo(".qipu");
		}
		
		
	}
	
	
	function m(x,y){
		return x+"_"+y;
	}
	
	var flag=true;
	
	function intel(){
		var max=-Infinity;
		var pos={};
		for(var k in kongbai){
			var x=parseInt(k.split("_")[0]);
			var y=parseInt(k.split("_")[1]);
			var m=panduan(x,y,"black");
			if(m>max){
				max=m;
				pos.x=x;
				pos.y=y;
			}
		}
		var max2=-Infinity;
		var pos2={};
		for(var k in kongbai){
			var x=parseInt(k.split("_")[0]);
			var y=parseInt(k.split("_")[1]);
			var m=panduan(x,y,"white");
			if(m>max2){
				max2=m;
				pos2.x=x;
				pos2.y=y;
			}
		}
		
		if(max>max2){
			return pos;
		}else{
			return pos2;
		}
	}
	
	function handleClick(e){
		if(t||tt){
			clearInterval(t);
			clearInterval(tt);
			ms=0;
		}
		var x=Math.floor(e.offsetX/step);
		var y=Math.floor(e.offsetY/step);
		
		if(qizi[x+"_"+y]){
			return;
		}
		if(AI){
			console.log(1)
			lqizi(x,y,"black");
			if(panduan(x,y,"black")>=5){
				$(canvas).off("click");
				$(".info").addClass("active");
				$("#text").text("黑棋赢");
			};
			var p=intel();
			lqizi(p.x,p.y,"white");
			if(panduan(p.x,p.y,"white")>=5){
				$(canvas).off("click");
				$(".info").addClass("active");
				$("#text").text("白棋赢");
			}
			return false;
		}
		
		if(flag){
			lqizi(x,y,"black");
			audio1.play();
			tt=setInterval(miaozhen2,1);
			if(audio4.played){
				audio4.pause();
			}
			audio3.play();
			if(panduan(x,y,"black")>=5){
				if(audio3.played){
				audio3.pause();
			}
				alert("黑棋获胜");
				$(canvas).off("click");
				$(".info").addClass("active");
				$("#text").text("黑棋赢");
			}
//			 if (check(x,y, 'black') >= 5) {
//              alert('黑棋获胜');
//              $(canvas).off('click');
//          }
		}else{
			lqizi(x,y,"white")
			audio2.play();
			t=setInterval(miaozhen,1);
			if(audio3.played){
				audio3.pause();
			}
			audio4.play();
			if(panduan(x,y,"white")>=5){
				if(audio4.played){
					audio4.pause();
				}
				alert("白棋获胜");
				$(canvas).off("click")
				$(".info").addClass("active");
				$("#text").text("白棋赢");
			}
			
//			if (check(x,y, 'white') >= 5) {
//              alert('白棋获胜');
//              $(canvas).off('click');
//          }
		}
		flag=!flag;
	}

	$(canvas).on("click",handleClick);


	$(".xclose").on("click",function(){
		$(".info").removeClass("active")
	})
	
	$(".look").on("click",function(){
		qipu();
	})
	$(".close").on("click",function(){
		$(".qipu").css("display","none");
		qipan();
		for(var k in qizi){
			var x=parseInt(k.split("_")[0]);
			var y=parseInt(k.split("_")[1]);
			lqizi(x,y,qizi[k]);
		}
	})
	
	function restart(){
		$(".info").removeClass("active");
		qipan();
		$(canvas).on("click",handleClick);
		flag=true;
		qizi={};
		gameState=false;
	}
	
	
	$(".again").on("click",restart);
	
	
	$(".ai").on("click",function(){
		if(gameState==="play"){
			return;
		}
		$(".normal").removeClass("red");
		$(this).addClass("red");
		AI=true;
		console.log(kongbai)
	})
	$("#caidan").hover(function(){
		$(this).find(".big-bg").addClass("height");
	},function(){
		$(this).find(".big-bg").removeClass("height");
	})
	
	$(".normal").on("click",function(){
		if(gameState==="pause"){
			return;
		}
		$(".ai").removeClass("red");
		$(this).addClass("red");
		AI=false;  
	})
	
	
	
//	if(!AI){
//		console.log(1)
//		lqizi(p.x,p.y,"black");
//		if(panduan(p.x,p.y,"black")>=5){
//			$(canvas).off("click");
//			$(".info").addClass("active");
//			$("#text").text("黑棋赢");
//		};
//		var p=intel();
//		lqizi(p.x,p.y,"white");
//		if(panduan(p.x,p.y,"white")>=5){
//			$(canvas).off("click");
//			$(".info").addClass("active");
//			$("#text").text("白棋赢");
//		}
//		return false;
//	}
	
	
	
	function panduan(x,y,color){
		
//		行判断
		var row=1;
		var i=1;
		while(qizi[m(x+i,y)]===color){
			row++;
			i++;
		}
		i=1;
		while(qizi[m(x-i,y)]===color){
			row++;
			i++;
		}
//		列判断
		var col=1;
		var i=1;
		while(qizi[m(x,y+i)]===color){
			col++;
			i++;
		}
		i=1;
		while(qizi[m(x,y-i)]===color){
			col++;
			i++;
		}
//		左斜判断
		var zX=1;
		var i=1;
		while(qizi[m(x+i,y+i)]===color){
			zX++;
			i++;
		}
		i=1;
		while(qizi[m(x-i,y-i)]===color){
			zX++;
			i++;
		}
//		右斜判断
		var yX=1;
		var i=1;
		while(qizi[m(x+i,y-i)]===color){
			yX++;
			i++;
		}
		i=1;
		while(qizi[m(x-i,y+i)]===color){
			yX++;
			i++;
		}
		return Math.max(row,col,zX,yX);
	}
	
	
	
	//检查黑白棋是否胜利
//  function check(x,y, color) {
//      var table = {};
//      var rowNum = 1;
//      var colNum = 1;
//      var leftNum = 1;
//      var rightNum = 1;
//      for (var i in qizi) {
//          if (qizi[i] === color) {
//              table[i] = true;
//          }
//      }
//      ;
//      //判断左右方向
//      var tx = x;
//      var ty = y;
//      while (table[(tx+1)+"_"+ty]) {
//          rowNum++;
//          tx++;
//      }
//      tx = x;
//      ty = y;
//      while (table[(tx-1)+"_"+ty]) {
//          rowNum++;
//          tx--;
//      }
//      //判断上下方向
//      tx = x;
//      ty = y;
//      while (table[tx+"_"+(ty+1)]) {
//          colNum++;
//          ty++;
//      }
//      tx = x;
//      ty = y;
//      while (table[tx+"_"+(ty-1)]) {
//          colNum++;
//          ty--;
//      }
//      //判断左斜线方向
//      tx = x;
//      ty = y;
//      while (table[(tx-1)+"_"+(ty-1)]) {
//          leftNum++;
//          tx--;
//          ty--;
//      }
//      tx = x;
//      ty = y;
//      while (table[(tx-1)+"_"+(ty+1)]) {
//          leftNum++;
//          tx--;
//          ty++;
//      }
//      //判断右斜线方向
//      tx = x;
//      ty = y;
//      while (table[(tx+1)+"_"+(ty-1)]) {
//          rightNum++;
//          tx++;
//          ty--;
//      }
//      tx = x;
//      ty = y;
//      while (table[(tx+1)+"_"+(ty+1)]) {
//          rightNum++;
//          tx++;
//          ty++;
//      }
//
//      return Math.max(rowNum, colNum, leftNum, rightNum);
//  };
    
    
    
})
