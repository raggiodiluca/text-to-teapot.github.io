import * as THREE from "https://cdn.skypack.dev/three@0.132.2";

//create the scene
var scene = new THREE.Scene();

//create the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2.6;
camera.position.y = 0.5;

// Get the container element
var container = document.querySelector('#three-bike1');

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

var bike = new THREE.Object3D();

var frame = new THREE.BoxGeometry( 1, 0.5, 2 );
var frameMaterial = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
var frameMesh = new THREE.Mesh( frame, frameMaterial );
bike.add( frameMesh );

var wheel = new THREE.TorusGeometry( 0.4, 0.2, 16, 32 );
var wheelMaterial = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
var wheelMesh = new THREE.Mesh( wheel, wheelMaterial );
wheelMesh.position.set( 0.5, -0.5, 0 );
bike.add( wheelMesh );

var wheel = new THREE.TorusGeometry( 0.4, 0.2, 16, 32 );
var wheelMaterial = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
var wheelMesh = new THREE.Mesh( wheel, wheelMaterial );
wheelMesh.position.set( -0.5, -0.5, 0 );
bike.add( wheelMesh );

var seat = new THREE.BoxGeometry( 0.8, 0.1, 0.5 );
var seatMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
var seatMesh = new THREE.Mesh( seat, seatMaterial );
seatMesh.position.set( 0, 0.3, 0 );
bike.add( seatMesh );

var handlebar = new THREE.Object3D();

var handlebarTube = new THREE.CylinderGeometry( 0.03, 0.03, 0.4, 32 );
var handlebarTubeMaterial = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
var handlebarTubeMesh = new THREE.Mesh( handlebarTube, handlebarTubeMaterial );
handlebarTubeMesh.position.set( 0, 0.2, 0 );
handlebar.add( handlebarTubeMesh );

var handlebarGrip = new THREE.SphereGeometry( 0.1, 32, 32 );
var handlebarGripMaterial = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
var handlebarGripMesh = new THREE.Mesh( handlebarGrip, handlebarGripMaterial );
handlebarGripMesh.position.set( 0, 0.6, 0 );
handlebar.add( handlebarGripMesh );

handlebar.position.set( 0, 0.5, 0.8 );
bike.add( handlebar );
scene.add( bike );


var container = document.querySelector('#three-bike1');
var textContainer = container.closest('.text-container');
var isActive = textContainer.classList.contains('active');

var animate = function () {
    if (isActive) {
        requestAnimationFrame(animate);
        // Rotate the bike based on the current rotation values
        bike.rotation.y += 0.017;
        bike.rotation.z += 0.017;

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

