// Находим элемент cube
const container = document.getElementById("cube");

// Создаем сцену, камеру и рендерер с прозрачным фоном
const sceneModel = new THREE.Scene();
const cameraModel = new THREE.PerspectiveCamera(
  75,
  1, // Соотношение сторон камеры будет обновляться динамически
  0.1,
  1000
);

const rendererModel = new THREE.WebGLRenderer({ alpha: true });
rendererModel.setSize(container.clientWidth, container.clientWidth);
rendererModel.setClearColor(0x000000, 0); // Устанавливаем прозрачный фон
container.appendChild(rendererModel.domElement);

// Функция для обновления размера рендерера
function updateRendererSize() {
  const width = container.clientWidth;
  const height = width; // Высота будет равна ширине для пропорции 1:1

  rendererModel.setSize(width, height);
  cameraModel.aspect = width / height;
  cameraModel.updateProjectionMatrix();
}

// Обновление рендерера при изменении размера окна
window.addEventListener("resize", updateRendererSize);

// Инициализируем размеры рендера
updateRendererSize();

// Создаем куб
const geometryModel = new THREE.BoxGeometry(3, 3, 3, 10, 10, 10);
const materialModel = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const cube = new THREE.Mesh(geometryModel, materialModel);
sceneModel.add(cube);

// Устанавливаем позицию камеры
cameraModel.position.z = 5;

// Анимация
function animateModel() {
  requestAnimationFrame(animateModel);

  // Задаем вращение куба
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Рендер сцены
  rendererModel.render(sceneModel, cameraModel);
}
animateModel();
