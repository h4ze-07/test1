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
const loader = new OBJLoader();
let model;

loader.load(
  "../assets/Proton.obj",
  function (obj) {
    model = obj;
    scene.add(model);

    model.position.set(1, -10, -10); // Позиция модели
    model.scale.set(1, 1, 1); // Масштаб модели
    camera.position.z = 5; // Позиция камеры

    renderer.render(scene, camera);
  },
  undefined, // можно добавить функцию для отслеживания прогресса
  function (error) {
    console.error("Ошибка загрузки модели:", error);
  }
);

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
