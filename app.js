const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode  = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const eraser = document.getElementById("jsErase");
const check = document.getElementById("jsCurColor");
const circles =  document.getElementById("jsCircle");
const square = document.getElementById("jsSquare");
const size  =  document.getElementById("jsSize");

//const mouseCursor = document.querySelector(".cursor");
//mouseCursor.classList.remove("cursor");


/* 그림을 그리기 위해선 캔버스의 픽셀 사이즈를 정해줘야함 */
canvas.width=document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height= document.getElementsByClassName("canvas")[0].offsetHeight;

// 캔버스가 처음 만들어졌을 때 배경색을 하얀색으로 함 
ctx.fillStyle= "white";
ctx.fillRect(0,0,canvas.width , canvas.height);
// lineCap :  라인 끝 모양을 설정해줌 
//ctx.lineCap = "round";
//ctx.lineJoin = "round";

//브러쉬 색상을 처음 시작했을 땐 기본 값으로 설정 
check.style.backgroundColor ="#2c2c2c";
/*  처음 브러쉬의 색상  */
ctx.strokeStyle ="#2c2c2c";
/* 그려질 때 나오는 선의 굵기 */
ctx.lineWidth = 1.0;

// 처음 채울때 사용할 색상을 저장  
ctx.fillStyle = "#2c2c2c";



/* 처음 페이지 들어 왔을 때는 painting = false */
let painting = false;
let filling = false;
let circled = false;
let squared = false;
let r = 20;

/*
function getMousePosition(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    return { X: x, Y: y };
  } */

function stopPainting() {
    painting= false;
}
function startingPainting() {
    painting = true;
}
function onMouseMove(event) {
    /* 설정한 canvas 사이즈 안에서만 그릴 것이기 때문에 x,y 값은 offsetX,Y 값만 가져오면 됨 */
   const x = event.pageX - canvas.offsetLeft;
   const y = event.pageY - canvas.offsetTop; 
   /* if문은 마우스를 클릭하고 있지 않고 그냥 캔버스 위를 움직여도 x,y좌표가 나오지만 화면에 나타나지는 않음  */
   if(!painting) {
       ctx.beginPath();
       ctx.moveTo(x,y);   
   } 
   /*else 일 때는 마우스를 계속 클릭하고 있을 때니깐 자신이 처음 누른 시작 점부터 마우스를 땔 때까지 x,y값을 가져오고 그 것을 채운다  */
   else {
       ctx.lineTo(x,y);
       ctx.stroke();
       
   }
}
/* 마우스를 캔버스 위에다 눌렀을 경우 painting이 true가 되면서 그릴 수 있음  */
function onMouseDown(event) {
    painting = true;

}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    check.style.backgroundColor = color;
    ctx.strokeStyle = color;  
    ctx.fillStyle = color;
   
}

function handleRange(event) {
   const size= event.target.value;
   ctx.lineWidth = size;
   
}

function fillMode(event) {
    if(filling == true) {
        filling = false;
        mode.innerText = "Fill";
        //ctx.canvas.style.cursor = "default";
    }else {
        filling = true;
        mode.innerText = "Paint"
        //ctx.canvas.style.cursor = "pointer";
        
    }

}
function handleCanvasClick(event) {
    if(filling) {
    ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}
//마우스 우 클릭으로 제어할 수 없도록 해주는 함수 
function handleCM(event) {
    event.preventDefault();
}

function saveImage(event) {
    //이미지를 저장할 때 png 형태로 저장 
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    //a 태그의 download 를 만들어서 다운로드 해주고 이름을 paintjs로 저장  
    link.download = "paintjs"
    link.click();

}
// 해당 사각형 안에 있는 정보를 지워줌 
function drawEraser(event) {
    if (ctx != null) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
//circle 버튼을 클릭했을 때 creating 이 true로 바뀌고 텍스트가 create로 바뀜 , 다시 클릭하면 creating 이 false가 되고 텍스트가 paint로 됨 
function createCircle(event) {
    if(circled) {
        circled = false;
        circles.innerText = "circle";
        
    }else {
        // 원하는 반지름 값을 바로 설정할 수 있음 
        //wantradius = prompt("반지름 값을 입력하시오" , "");
        //r = wantradius;
        circled = true;
        circles.innerText = "circled"
    }

}
function printValue() {
    const cv =  r ; 
    document.getElementById("radiusValue").innerHTML = cv;
}

// 원을 원하는 위치에 그려줌 
function handleCreateClick(event) {
    if(circled) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
    
   
    }
}
// size 버튼 클릭으로 캔버스 사이즈를 변경할 수 있다 
function sizeChange(event) {
    newCanvasWidth = prompt("너비 값을 입력하시오" , "");
    newCanvasHeight = prompt("높이 값을 입력하시오" , "");
    const widthsize = newCanvasWidth;
    const heightsize = newCanvasHeight;
    canvas.width = widthsize; 
    canvas.height = heightsize;
    canvas.style.width = widthsize;
    canvas.style.height = heightsize;
}

// 좌,우 방향키로 선 굵기 조절 가능 
function handleLinewidth(event) {
    if(event.keyCode === 37 || event.keyCode === 39) {
        range.focus();
    }
}
// a , s 버튼을 눌러서 원의 크기를 조절 가능 
function circlesizeHandle(event) {
    if(circled && event.keyCode === 65)
        {
            r += 5;            
        }
    else if (circled && event.keyCode === 83 ){
        r -=5 ;
    }
}
function modeSquare(event) {
    if(squared ) {
        squared = false;
        square.innerText = "square";
        
    }else {
        squared = true;
        square.innerText = "squared"
    }

}
function createSquare(event) {
    if(squared == true) {
        const x = event.offsetX;
        const y = event.offsetY;
        ctx.beginPath();
        ctx.strokeRect(x, y, 30, 30);
       
        }
}

/*
function handleCursor(event) {
    if(filling === false) {
        mouseCursor.classList.add("cursor")
    } else {
        mouseCursor.classList.remove("cursor")
    }
    mouseCursor.style.top = event.pageY + "px"
    mouseCursor.style.left = event.pageX + "px"    
}

function hideCursor() {
    mouseCursor.classList.remove("cursor")   
} */

if(canvas) {
    canvas.addEventListener("mousemove" , onMouseMove);
    canvas.addEventListener("mousedown" ,startingPainting);
    canvas.addEventListener("mouseup" , stopPainting);
    canvas.addEventListener("mouseleave" , stopPainting);
    canvas.addEventListener("click" , handleCanvasClick);
    canvas.addEventListener("contextmenu" , handleCM);
    canvas.addEventListener("click" , handleCreateClick);
    canvas.addEventListener("click" , createSquare);
    //canvas.addEventListener("mousemove", handleCursor);
    //canvas.addEventListener("mouseleave", hideCursor); 
}

Array.from(colors).forEach(color => color.addEventListener("click" , handleColorClick));

if(range) {
    range.addEventListener("input" , handleRange);
}

if(mode) {
    mode.addEventListener("click" , fillMode);
}
if(save) {
    save.addEventListener("click" , saveImage);
}
if(eraser) {
    eraser.addEventListener("click" , drawEraser);
}
if(circles) {
    circles.addEventListener("click" , createCircle);
}
if(size) {
    size.addEventListener("click" , sizeChange);
}
if(square) {
    square.addEventListener("click" , modeSquare);
}
/*
canvas.onmousedown = function(event) {
    const x = event.offsetX;
   const y = event.offsetY;
	ctx.arc(x, y, 15, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
} */
window.addEventListener("keydown" , handleLinewidth );


window.addEventListener("keydown" , circlesizeHandle);


