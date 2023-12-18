//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//OrbitControls allow the camera to move around the scene
const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

document.getElementById("container3D").appendChild(renderer.domElement);

//Set which object to render
let objToRender = "Lobbyakhir";

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  'public/models/LobbyAkhir/scene.gltf',
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    object.position.x = 0;
    object.position.z = -50;
    object.position.y = 0;

    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);


//Set how far the camera will be from the 3D model
camera.position.z = 70;
camera.position.y = 30;
camera.position.x = 0;

// Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 0.6); // (color, intensity)
topLight.position.set(300, 300, 300); //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const secondLight = new THREE.DirectionalLight(0xffffff, 0.6); // (color, intensity)
secondLight.position.set(50, 0, 100); // Adjust the position as needed
scene.add(secondLight);

const thirdLight = new THREE.DirectionalLight(0xffffff, 0.6); // (color, intensity)
thirdLight.position.set(-500, 0, 0); // Adjust the position as needed
scene.add(thirdLight);
// This adds controls to the camera, so we can rotate / zoom it with the mouse

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  object.rotation.y += 0.005;
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

//Start the 3D rendering
animate();