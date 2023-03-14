import * as THREE from "https://cdn.skypack.dev/three@0.132.2";

//create the scene
var scene = new THREE.Scene();

//create the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.y = 0;

// Get the container element
var container = document.querySelector('#three-bike2');

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


//Create the frame.
var frameGeometry = new THREE.CylinderGeometry(0.5, 0.5, 10, 32);
var frameMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var frame = new THREE.Mesh(frameGeometry, frameMaterial);
scene.add(frame);

//Create the front wheel.
var frontWheelGeometry = new THREE.TorusGeometry(1, 0.5, 16, 100);
var frontWheelMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var frontWheel = new THREE.Mesh(frontWheelGeometry, frontWheelMaterial);
frontWheel.position.y = 5;
scene.add(frontWheel);

//Create the rear wheel.
var rearWheelGeometry = new THREE.TorusGeometry(1, 0.5, 16, 100);
var rearWheelMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var rearWheel = new THREE.Mesh(rearWheelGeometry, rearWheelMaterial);
rearWheel.position.y = -5;
scene.add(rearWheel);

//Create the handlebars.
var handlebarsGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
var handlebarsMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
var handlebars = new THREE.Mesh(handlebarsGeometry, handlebarsMaterial);
handlebars.position.y = 5;
handlebars.position.z = 1;
scene.add(handlebars);

//Create the pedals.
var pedalsGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.1);
var pedalsMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var pedals = new THREE.Mesh(pedalsGeometry, pedalsMaterial);
pedals.position.y = -5;
pedals.position.x = 1;
scene.add(pedals);

//----------------------------------


var container = document.querySelector('#three-bike2');
var textContainer = container.closest('.text-container');
var isActive = textContainer.classList.contains('active');

var animate = function () {
    if (isActive) {
        requestAnimationFrame(animate);
        // Rotate the bike based on the current rotation values
        scene.rotation.y += 0.017;
        scene.rotation.z += 0.017;

        renderer.render(scene, camera);
    }
};

if (isActive) {
    animate();
}

var observer = new MutationObserver(function(mutationsList, observer) {
    for (var mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            isActive = textContainer.classList.contains('active');
            if (isActive) {
                animate();
            }
        }
    }
});

observer.observe(textContainer, { attributes: true });

