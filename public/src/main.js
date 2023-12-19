import * as THREE from "three";
import { LoadGLTFByPath } from "./Helpers/ModelHelper.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

let renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadows = true;
renderer.shadowType = 1;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = 0;
renderer.toneMappingExposure = 1;
renderer.useLegacyLights = false;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();

let cameraList = [];
let camera;

LoadGLTFByPath(scene)
  .then(() => {
    retrieveListOfCameras(scene);
  })
  .catch((error) => {
    console.error("Error loading GLTF scene:", error);
  });

function retrieveListOfCameras(scene) {
  scene.traverse(function (object) {
    if (object.isCamera) {
      cameraList.push(object);
    }
  });

  camera = cameraList[0];

  updateCameraAspect(camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;

  document.addEventListener("mousedown", (event) => {
    if (event.button === 1) {
      controls.enabled = false;
    }
  });

  document.addEventListener("mouseup", (event) => {
    if (event.button === 1) {
      controls.enabled = true;
    }
  });

  document.addEventListener("mousemove", (event) => {
    console.log("Shift Key Pressed:", event.shiftKey);
    console.log("Movement X:", event.movementX);
    console.log("Movement Y:", event.movementY);
    console.log("Mouse moved");

    if (event.buttons === 4) {
      const movementX = event.movementX || event.mozMovementX || 0;
      const movementY = event.movementY || event.mozMovementY || 0;

      // Check if the shift key is pressed
      if (event.shiftKey) {
        // Lock camera movement on the X-axis
        camera.position.x = Math.max(
          -10,
          Math.min(10, camera.position.x - movementX * 0.01)
        );
      } else {
        // Regular camera movement
        camera.position.x -= movementX * 0.01;
        camera.position.y += movementY * 0.01;
      }
    }
  });

  animate();
}

function updateCameraAspect(camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
