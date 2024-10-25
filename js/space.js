const canvas1 = document.querySelector('.canvas1');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas1, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Создание звездного материала и геометрии
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
const starVertices = [];

const radius = 2000; // Радиус, увеличенный для глубокого звездного пространства
const starCount = 1500;

// Генерация звезд с рандомными координатами вокруг камеры
for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * radius;
    const y = (Math.random() - 0.5) * radius;
    const z = -Math.random() * radius; // Всегда за камерой

    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Позиция камеры
camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);

    const positions = starGeometry.attributes.position.array;

    // Обновление позиции звезд для эффекта полета
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += 2; // Смещаем звезду ближе к камере быстрее

        // Перемещаем звезду дальше, если она близко к камере
        if (positions[i + 2] > camera.position.z) {
            positions[i + 2] = -radius;
            positions[i] = (Math.random() - 0.5) * radius; // Перераспределяем по x
            positions[i + 1] = (Math.random() - 0.5) * radius; // Перераспределяем по y
        }
    }

    starGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();

// animation
gsap.set('.canvas1', {opacity: 0})
gsap.set('.hero', {opacity: 0})
gsap.set('.hero__text', {opacity: 0, y: 80})
gsap.set('.hero__title', {opacity: 0, y: -80})

const tl = gsap.timeline();

tl.to('.canvas1', {opacity: 1, duration: 0.7})
    .to('.hero', {opacity: 1, duration: 0.4})
    .to('.hero__title', {opacity: 1, y: 0, duration: 0.7})
    .to('.hero__text', {opacity: 1, y: 0, duration: 0.5})