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

const group = new THREE.Group();

// Создаем куб
const geometryModelCube = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
const geometryModelCircle = new THREE.SphereGeometry(2);

const materialModelWhite = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const materialModelRed = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});

const cube = new THREE.Mesh(geometryModelCube, materialModelWhite);
const sircle = new THREE.Mesh(geometryModelCircle, materialModelRed);

// sircle.rotation.set(Math.PI / 4, Math.PI / 4, Math.PI / 4);

group.add(cube);
group.add(sircle);

sceneModel.add(group);

// Устанавливаем позицию камеры
cameraModel.position.z = 5;

rendererModel.render(sceneModel, cameraModel);

const clock = new THREE.Clock();
let previousTime = 0;

// Анимация;
function animateModel() {
  requestAnimationFrame(animateModel);

  // Задаем вращение куба
  group.children[0].rotation.x += 0.01;
  group.children[0].rotation.y += 0.01;

  group.children[1].rotation.x -= 0.012;
  group.children[1].rotation.y -= 0.012;

  let currentTime = clock.getElapsedTime();
  let delta = currentTime - previousTime;
  previousTime = currentTime;
  let sinDelta = Math.sin(currentTime);

  group.children[1].scale.y = sinDelta * 1;
  group.children[1].scale.z = sinDelta * 1;
  group.children[1].scale.x = sinDelta * 1;

  // Рендер сцены
  rendererModel.render(sceneModel, cameraModel);
}
animateModel();
