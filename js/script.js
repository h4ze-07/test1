// import * as THREE from './three.module.min.js';

// const canvas1 = document.querySelector('.canvas1');

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer({ canvas: canvas1, alpha: true });
// renderer.setSize(window.innerWidth, window.innerHeight);

// // Создание звездного материала и геометрии
// const starGeometry = new THREE.BufferGeometry();
// const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
// const starVertices = [];

// const radius = 2000; // Радиус сферы звезд
// const starCount = 1000;

// // Генерация звезд в случайных координатах вокруг камеры
// for (let i = 0; i < starCount; i++) {
//     const x = (Math.random() - 0.5) * radius;
//     const y = (Math.random() - 0.5) * radius;
//     const z = -Math.random() * radius;

//     starVertices.push(x, y, z);
// }

// starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
// const stars = new THREE.Points(starGeometry, starMaterial);
// scene.add(stars);

// // Позиция камеры
// camera.position.z = 1;

// function animate() {
//     requestAnimationFrame(animate);

//     // Получаем позиции звезд из буфера
//     const positions = starGeometry.attributes.position.array;

//     // Обновляем каждую звезду
//     for (let i = 0; i < positions.length; i += 3) {
//         positions[i + 2] += 0.1; // Смещаем звезду ближе к камере

//         // Перемещаем звезду на дальний план, если она близко к камере
//         if (positions[i + 2] > camera.position.z) {
//             positions[i + 2] = -radius;
//         }
//     }

//     // Помечаем атрибут позиции как обновленный
//     starGeometry.attributes.position.needsUpdate = true;

//     renderer.render(scene, camera);
// }

// // animate();

// // Обновление размеров рендерера при изменении размеров окна
// window.addEventListener('resize', () => {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// });
