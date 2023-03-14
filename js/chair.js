import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { STLLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/STLLoader.js";

// Create the scene
var scene = new THREE.Scene();

// Create the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 130;
// camera.position.y = 0;

// Get the container element
var container = document.querySelector('#three-chair');

// Set up the renderer
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Set the background color of the scene
scene.background = new THREE.Color(0xffffff);

// Append the renderer canvas to the container element
container.appendChild(renderer.domElement);

// Adjust the camera aspect ratio based on the container size
camera.aspect = container.clientWidth / container.clientHeight;
camera.updateProjectionMatrix();

// Handle window resize events and adjust the renderer and camera accordingly
window.addEventListener('resize', function () {
  renderer.setSize(container.clientWidth, container.clientHeight);
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
});
//----------------------------------

const loader = new STLLoader();
loader.load('./stl/chair2.stl', function (geometry) {
    // Create a material for the chair
    const material = new THREE.MeshBasicMaterial({
        color: 0xAC7209
    });
    // Create a mesh with the loaded geometry and material
    const chair = new THREE.Mesh(geometry, material);
    // Add the chair to the scene
    scene.add(chair);
});

//----------------------------------


var container = document.querySelector('#three-chair');
var textContainer = container.closest('.text-container');
var isActive = textContainer.classList.contains('active');

var animate = function () {
    if (isActive) {
        requestAnimationFrame(animate);
        // Rotate the bike based on the current rotation values
        scene.rotation.y += 0.017;

        renderer.render(scene, camera);
    }
};

if (isActive) {
    animate();
}

var observer = new MutationObserver(function (mutationsList, observer) {
    for (var mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            isActive = textContainer.classList.contains('active');
            if (isActive) {
                animate();
            }
        }
    }
});

observer.observe(textContainer, {
    attributes: true
});