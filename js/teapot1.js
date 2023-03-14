import * as THREE from "https://cdn.skypack.dev/three@0.132.2";

//create the scene
var scene = new THREE.Scene();

//create the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3.5;

// Get the container element
var container = document.querySelector('#three-teapot1');

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

//_____________________________________________


//create the teapot
var teapot = new THREE.Object3D();

//create the main body
var mainBody = new THREE.Object3D();

//create the lid
var lid = new THREE.Object3D();

//create the spout
var spout = new THREE.Object3D();

//create the handle
var handle = new THREE.Object3D();

//create the main body
var mainBodyGeometry = new THREE.SphereGeometry(1, 32, 32);
var mainBodyMaterial = new THREE.MeshBasicMaterial({ color: 0xc7f200 });
var mainBodyMesh = new THREE.Mesh(mainBodyGeometry, mainBodyMaterial);
mainBody.add(mainBodyMesh);

//create the lid
var lidGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.1, 32);
var lidMaterial = new THREE.MeshBasicMaterial({ color: 0xc7f200 });
var lidMesh = new THREE.Mesh(lidGeometry, lidMaterial);
lidMesh.position.y = 1.05;
lid.add(lidMesh);

//create the spout
var spoutGeometry = new THREE.CylinderGeometry(0.05, 0.4, 0.5, 32);
var spoutMaterial = new THREE.MeshBasicMaterial({ color: 0xc7f200 });
var spoutMesh = new THREE.Mesh(spoutGeometry, spoutMaterial);
spoutMesh.position.x = -1.2;
spoutMesh.position.y = 0.5;
spout.add(spoutMesh);

//create the handle
var handleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 32);
var handleMaterial = new THREE.MeshBasicMaterial({ color: 0xc7f200 });
var handleMesh = new THREE.Mesh(handleGeometry, handleMaterial);
handleMesh.position.x = 1.2;
handleMesh.position.y = 0.75;
handle.add(handleMesh);

//add the main body, lid, spout, and handle to the teapot
teapot.add(mainBody);
teapot.add(lid);
teapot.add(spout);
teapot.add(handle);

//add the teapot to the scene
scene.add(teapot);

//_____________________________________________


var container = document.querySelector('#three-teapot1');
var textContainer = container.closest('.text-container');
var isActive = textContainer.classList.contains('active');

var animate = function () {
    if (isActive) {
        requestAnimationFrame(animate);
        // Rotate the bike based on the current rotation values
        teapot.rotation.z += 0.017;
        teapot.rotation.y += 0.017;

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

