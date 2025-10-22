
// Weekly schedule setup and animations
const schedule = {
  "Monday": ["Psychology (2:00 - 4:00)"],
  "Tuesday": ["Chemistry (6:00 - 8:00)"],
  "Wednesday": ["Biology (10:00 - 12:00)"],
  "Thursday": ["Physics (14:00 - 16:00)"],
  "Friday": ["Computer Science (18:00 - 20:00)"],
  "Saturday": ["Maths (10:00 - 12:00)", "English Language (12:00 - 14:00)"],
  "Sunday": ["English Literature (10:00 - 12:00)", "Revision Catch-up (12:00 - 14:00)"]
};

function populateWeek(){
  const grid = document.getElementById('weekGrid');
  const tpl = document.getElementById('dayTpl');
  grid.innerHTML = '';
  Object.keys(schedule).forEach((day,idx)=>{
    const node = tpl.content.cloneNode(true);
    const container = node.querySelector('.day');
    container.classList.add('day');
    node.querySelector('.day-name').textContent = day;
    const subs = node.querySelector('.subjects');
    schedule[day].forEach((s,i)=>{
      const div = document.createElement('div');
      div.className = 'subj' + (i===0 && schedule[day].length===1 ? ' pulse' : '');
      div.innerHTML = `<div>${s}</div><div style="font-size:12px;opacity:0.85">2 hours</div>`;
      subs.appendChild(div);
    });
    // slight staggered animation delay
    const delay = 0.08 * idx;
    container.style.animation = `fadeInUp .6s ${delay}s both`;
    grid.appendChild(node);
  });
}

// shooting stars canvas
function shootingStars(){
  const canvas = document.getElementById('shootingStars');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, stars = [];
  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function rand(min,max){return Math.random()*(max-min)+min}
  function addStar(){
    stars.push({
      x: rand(0,w),
      y: rand(0,h/2),
      vx: rand(6,14),
      vy: rand(-1,1),
      len: rand(80,220),
      life: 0,
      maxLife: rand(40,100)
    });
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    // occasionally add
    if(Math.random()<0.02) addStar();
    for(let i=stars.length-1;i>=0;i--){
      const s = stars[i];
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx, s.y + s.vy);
      ctx.strokeStyle = 'rgba(200,140,255,0.9)';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(200,140,255,0.7)';
      ctx.stroke();
      s.x += s.vx;
      s.y += s.vy;
      s.life++;
      if(s.life > s.maxLife) stars.splice(i,1);
    }
    requestAnimationFrame(draw);
  }
  draw();
}

document.addEventListener('DOMContentLoaded', ()=>{
  populateWeek();
  shootingStars();
});
