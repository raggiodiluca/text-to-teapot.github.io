import * as THREE from "https://cdn.skypack.dev/three@0.132.2";

//create the scene
var scene = new THREE.Scene();

//create the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2.2;
camera.position.y = 0.3;

// Get the container element
var container = document.querySelector('#three-face');

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

// Create the geometry
var geometry = new THREE.BufferGeometry();

var vertices = new Float32Array( [
    0, 0, 0,
    0, 1, 0,
    1, 1, 0,
    1, 0, 0,
] );

var indices = new Uint16Array( [
    0, 1, 2,
    0, 2, 3,
] );

geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );

var material = new THREE.MeshBasicMaterial({color: 0xF5E4E2});
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);


var container = document.querySelector('#three-face');
var textContainer = container.closest('.text-container');
var isActive = textContainer.classList.contains('active');

var animate = function () {
    if (isActive) {
        requestAnimationFrame(animate);
        // Rotate the bike based on the current rotation values
        mesh.rotation.y += 0.03;

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

