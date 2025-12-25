/* COUNTDOWN */
const tetDate = new Date(2026, 1, 17, 0, 0, 0).getTime();

const d = document.getElementById("days");
const h = document.getElementById("hours");
const m = document.getElementById("minutes");
const s = document.getElementById("seconds");

function smooth(el, v) {
    const c = Number(el.textContent);
    if (c === v) return;
    let n = c;
    const step = (v - c) / 6;
    const t = setInterval(() => {
        n += step;
        if (Math.abs(v - n) < 1) {
            el.textContent = v;
            clearInterval(t);
        } else {
            el.textContent = Math.round(n);
        }
    }, 30);
}

function tick() {
    const now = Date.now();
    const diff = tetDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML =
            "<h2>🎉 CHÚC MỪNG NĂM MỚI 🎉</h2>";
        return;
    }

    smooth(d, Math.floor(diff / 86400000));
    smooth(h, Math.floor((diff % 86400000) / 3600000));
    smooth(m, Math.floor((diff % 3600000) / 60000));
    smooth(s, Math.floor((diff % 60000) / 1000));
}

tick();
setInterval(tick, 1000);

/* AMBIENT LIGHT */
const canvas = document.getElementById("ambient");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
window.onresize = resize;

const lights = [];

function addLight() {
    lights.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 60,
        r: Math.random() * 140 + 80,
        speed: Math.random() * 0.12 + 0.05,
        a: Math.random() * 0.05 + 0.02
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lights.forEach((l, i) => {
        l.y -= l.speed;
        ctx.beginPath();
        ctx.arc(l.x, l.y, l.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,200,122,${l.a})`;
        ctx.fill();
        if (l.y + l.r < 0) lights.splice(i, 1);
    });
    requestAnimationFrame(draw);
}

setInterval(addLight, 3000);
draw();
