const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Estrellas
let stars = [];
for(let i=0; i<100; i++){
    stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4 });
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="white";
    stars.forEach(s => {
        s.x += s.vx; s.y += s.vy;
        if(s.x<0 || s.x>canvas.width) s.vx*=-1;
        if(s.y<0 || s.y>canvas.height) s.vy*=-1;
        ctx.beginPath(); ctx.arc(s.x, s.y, 1.5, 0, Math.PI*2); ctx.fill();
    });
    for(let i=0; i<stars.length; i++){
        for(let j=i+1; j<stars.length; j++){
            let dist = Math.hypot(stars[i].x-stars[j].x, stars[i].y-stars[j].y);
            if(dist<120){
                ctx.strokeStyle=`rgba(255,102,255,${1 - dist/120})`;
                ctx.lineWidth=0.5; ctx.beginPath(); ctx.moveTo(stars[i].x, stars[i].y); ctx.lineTo(stars[j].x, stars[j].y); ctx.stroke();
            }
        }
    }
    requestAnimationFrame(draw);
}
draw();

// Lógica de agrandar imagen
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("imgFull");

document.querySelectorAll('img').forEach(img => {
    if(!img.classList.contains('no-expand')) {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    }
});

function closeModal() {
    modal.style.display = "none";
}

// Cerrar si hace clic fuera de la imagen
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}