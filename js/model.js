// Создание сцены
const scene2 = new THREE.Scene();

// Создание камеры
const camera2 = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Создание рендерера с прозрачным фоном
const renderer2 = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer2.setClearColor(0x000000, 0); // Черный цвет с полной прозрачностью

// Получение контейнера для рендерера
const container = document.getElementById("roket");
container.appendChild(renderer2.domElement);

// Функция для обновления размера рендерера
function updaterenderer2Size() {
  const width = container.clientWidth;
  const aspectRatio = camera2.aspect;
  const height = width / aspectRatio;

  renderer2.setSize(width, height);
  camera2.aspect = width / height;
  camera2.updateProjectionMatrix();
}

// Инициализация размеров рендерера
updaterenderer2Size();

// Создание света для освещения модели
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(1, 1, 1).normalize();
scene2.add(light2);

const ambientlight2 = new THREE.AmbientLight(0x404040, 1); // Мягкий свет
scene2.add(ambientlight2);

// Загрузка 3D-модели
const loader2 = new OBJLoader();
let model;

loader2.load(
  "../assets/Proton.obj",
  function (obj) {
    model = obj;
    scene2.add(model);

    model.position.set(1, -10, -10); // Позиция модели
    model.scale.set(1, 1, 1); // Масштаб модели
    camera2.position.z = 5; // Позиция камеры

    renderer2.render(scene2, camera2);
  },
  undefined, // можно добавить функцию для отслеживания прогресса
  function (error) {
    console.error("Ошибка загрузки модели:", error);
  }
);

// ScrollTrigger для прокрутки и вращения модели
ScrollTrigger.create({
  trigger: ".main",
  pin: "#modelContainer",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    if (model) {
      const rotationAngle = self.progress * 2 * Math.PI;
      model.rotation.y = rotationAngle;
    }
  },
});

// Адаптивность под размер экрана
window.addEventListener("resize", updaterenderer2Size);

// Анимация рендеринга
function animate2() {
  requestAnimationFrame(animate2);
  renderer2.render(scene2, camera2);
}
animate2();
