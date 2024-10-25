import * as THREE from './three.module.min.js';

const canvas1 = document.querySelector('.canvas1')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: canvas1});
renderer.setSize(window.innerWidth, window.innerHeight);

// Функция для создания звезд
function createStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

  const starVertices = [];
  for (let i = 0; i < 10000; i++) { // Количество звезд
    const x = (Math.random() - 0.5) * 2000; // Координаты X
    const y = (Math.random() - 0.5) * 2000; // Координаты Y
    const z = -Math.random() * 2000; // Координаты Z
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}

createStars(); // Вызов функции для создания звезд

// Позиция камеры
camera.position.z = 1;

// Анимация движения звезд
function animate() {
  requestAnimationFrame(animate);

  // Добавим вращение сцены, чтобы создать иллюзию движения
  scene.rotation.y += 0.0005;

  renderer.render(scene, camera);
}
animate();

// Обновление размеров рендерера при изменении размеров окна
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

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