const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = canvas.getElementsByClassName("jsColor");

/* 그림을 그리기 위해선 캔버스의 픽셀 사이즈를 정해줘야함 */
canvas.width=700;
canvas.height= 700;
/*  처음 브러쉬의 색상  */
ctx.strokeStlye ="#2c2c2c";
/* 그려질 때 나오는 선의 굵기 */
ctx.lineWidth = 2.5;

/* 처음 페이지 들어 왔을 때는 painting = false */
let painting = false;

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
function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStlye = color;
    
}

if(canvas) {
    canvas.addEventListener("mousemove" , onMouseMove);
    canvas.addEventListener("mousedown" ,startingPainting);
    canvas.addEventListener("mouseup" , stopPainting);
    canvas.addEventListener("mouseleave" , stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click" , changeColor))
