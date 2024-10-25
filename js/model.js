// Создание сцены
const scene = new THREE.Scene();

// Создание камеры
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Создание рендерера с прозрачным фоном
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0); // Черный цвет с полной прозрачностью

// Получение контейнера для рендерера
const container = document.getElementById("roket");
container.appendChild(renderer.domElement);

// Функция для обновления размера рендерера
function updateRendererSize() {
  const width = container.clientWidth;
  const aspectRatio = camera.aspect;
  const height = width / aspectRatio;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// Инициализация размеров рендерера
updateRendererSize();

// Создание света для освещения модели
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 1); // Мягкий свет
scene.add(ambientLight);

// Загрузка 3D-модели
const loader = new THREE.GLTFLoader();
let model;

loader.load(
  "../assets/rocket/rocket_ship.glb",
  function (gltf) {
    model = gltf.scene;
    scene.add(model);

    model.position.set(1, -150, 1); // Позиция модели
    model.scale.set(1, 1, 1); // Масштаб модели
    camera.position.z = 200; // Позиция камеры

    renderer.render(scene, camera);
  },
  undefined, // можно добавить функцию для отслеживания прогресса
  function (error) {
    console.error("Ошибка загрузки модели:", error);
  }
);

let lastScrollProgress = 0; // Хранение предыдущего прогресса
ScrollTrigger.create({
  trigger: ".main",
  pin: "#roket",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    if (model) {
      // Вычисляем угол вращения от 0 до 2 * Math.PI (0 до 360 градусов)
      const rotationAngle = self.progress * 2 * Math.PI; // Угол от 0 до 2 * PI
      model.rotation.y = rotationAngle; // Устанавливаем угол вращения модели
    }
  },
});

// Адаптивность под размер экрана
window.addEventListener("resize", function () {
  updateRendererSize();
});

// Анимация рендеринга
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// ScrollTrigger.create({
//   trigger: ".second",
//   start: "top bottom",
//   end: "top top",
//   onUpdate: (self) => {
//     if (model) {
//       const rotationAngle = self.progress * 0.3 * Math.PI; // Угол от 0 до 2 * PI

//       console.log(rotationAngle);

//       model.rotation.y = rotationAngle; // Устанавливаем угол вращения модели

//       model.scale.set(1 + self.progress, 1 + self.progress, 1 + self.progress);

//       model.position.set(1 - self.progress * 10, -10 - self.progress * 20, -10);
//     }
//   },
// });
