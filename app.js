const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode  = document.getElementById("jsMode");
const save = document.getElementById("jsSave");


/* 그림을 그리기 위해선 캔버스의 픽셀 사이즈를 정해줘야함 */
canvas.width=700;
canvas.height= 700;
// 캔버스가 처음 만들어졌을 때 배경색을 하얀색으로 함 
ctx.fillStyle= "white";
ctx.fillRect(0,0,canvas.width , canvas.height);
// lineCap :  라인 끝 모양을 설정해줌 
ctx.lineCap = "round";
ctx.lineJoin = "round";


/*  처음 브러쉬의 색상  */
ctx.strokeStyle ="#2c2c2c";
/* 그려질 때 나오는 선의 굵기 */
ctx.lineWidth = 5.0;
ctx.arc(100, 35, 25, 0, 2 * Math.PI);
// 처음 채울때 사용할 색상을 저장  
ctx.fillStyle = "#2c2c2c";



/* 처음 페이지 들어 왔을 때는 painting = false */
let painting = false;
let filling = false;

function stopPainting() {
    painting= false;
}
function startingPainting() {
    painting = true;
}
function onMouseMove(event) {
    /* 설정한 canvas 사이즈 안에서만 그릴 것이기 때문에 x,y 값은 offsetX,Y 값만 가져오면 됨 */
   const x = event.offsetX;
   const y = event.offsetY;
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
        mode.innerText = "Fill"
    }else {
        filling = true;
        mode.innerText = "Paint"
        
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

if(canvas) {
    canvas.addEventListener("mousemove" , onMouseMove);
    canvas.addEventListener("mousedown" ,startingPainting);
    canvas.addEventListener("mouseup" , stopPainting);
    canvas.addEventListener("mouseleave" , stopPainting);
    canvas.addEventListener("click" , handleCanvasClick);
    canvas.addEventListener("contextmenu" , handleCM);
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