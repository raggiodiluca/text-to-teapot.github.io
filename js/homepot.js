import * as THREE from "https://cdn.skypack.dev/three@0.132.2";

//create the scene
var scene = new THREE.Scene();

//create the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2.1;
camera.position.y = 0;
camera.position.x = -.2;


// Get the container element
var container = document.querySelector('.text-container[data-text="homepage"]');

// Set up the renderer
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// Set the background color of the scene
renderer.setClearColor(0xffffff); // set to black

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
var mainBodyMaterial = new THREE.MeshPhongMaterial({
    color: 0xD2F4D3
});
var mainBodyMesh = new THREE.Mesh(mainBodyGeometry, mainBodyMaterial);
mainBody.add(mainBodyMesh);

//create the lid
var lidGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.1, 32);
var lidMaterial = new THREE.MeshPhongMaterial({
    color: 0xD2F4D3
});
var lidMesh = new THREE.Mesh(lidGeometry, lidMaterial);
lidMesh.position.y = 1.05;
lid.add(lidMesh);

//create the spout
var spoutGeometry = new THREE.CylinderGeometry(0.05, 0.4, 0.5, 32);
var spoutMaterial = new THREE.MeshPhongMaterial({
    color: 0xD2F4D3
});
var spoutMesh = new THREE.Mesh(spoutGeometry, spoutMaterial);
spoutMesh.position.x = -1.2;
spoutMesh.position.y = 0.5;
spout.add(spoutMesh);

//create the handle
var handleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 32);
var handleMaterial = new THREE.MeshPhongMaterial({
    color: 0xD2F4D3
});
var handleMesh = new THREE.Mesh(handleGeometry, handleMaterial);
handleMesh.position.x = 1.2;
handleMesh.position.y = 0.75;
handle.add(handleMesh);

//add a light to the scene
var light = new THREE.PointLight(0xa8c3a8, 1, 10);
light.position.set(0, 0, 5);
scene.add(light);

//add a directional light to the scene
var dirLight = new THREE.DirectionalLight(0x7e927e, 1);
dirLight.position.set(0, 1, -1);
scene.add(dirLight);

//set the ambient light in the scene
var ambientLight = new THREE.AmbientLight(0x7e927e);
scene.add(ambientLight);

//add the main body, lid, spout, and handle to the teapot
teapot.add(mainBody);
teapot.add(lid);
teapot.add(spout);
teapot.add(handle);

//add the teapot to the scene
scene.add(teapot);

//Render the scene.
var animate = function () {

    if (container.classList.contains('active')) {
        requestAnimationFrame(animate);
        // Rotate the scene by a small amount on each frame.
        teapot.rotation.y += 0.017;
        teapot.rotation.z += 0.017;
        renderer.render(scene, camera);
    }
};
animate();

// Listen for changes to the container element's classList
var observer = new MutationObserver(function(mutationsList, observer) {
    for (var mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (container.classList.contains('active')) {
          // If the container has the active class, restart the render loop
          animate();
        }
      }
    }
  });
  
  observer.observe(container, { attributes: true });

// // Set up pointer event listeners
// var isPointerDown = false;
// var pointerX = 0;
// var pointerY = 0;

// renderer.domElement.addEventListener('pointerdown', function(event) {
//   isPointerDown = true;
//   pointerX = event.clientX;
//   pointerY = event.clientY;
// });

// renderer.domElement.addEventListener('pointermove', function(event) {
//   if (isPointerDown) {
//     var deltaX = event.clientX - pointerX;
//     var deltaY = event.clientY - pointerY;
//     scene.rotation.y += deltaX * 0.01;
//     camera.rotation.x += deltaY * 0.01;
//     pointerX = event.clientX;
//     pointerY = event.clientY;
//   }
// });

// renderer.domElement.addEventListener('pointerup', function(event) {
//   isPointerDown = false;
// });

// Set up pointer event listeners
var isPointerDown = false;
var pointerX = 0;
var pointerY = 0;

renderer.domElement.addEventListener('pointerdown', function (event) {
    isPointerDown = true;
    pointerX = event.clientX;
    pointerY = event.clientY;
});

renderer.domElement.addEventListener('pointermove', function (event) {
    if (isPointerDown) {
        var deltaX = event.clientX - pointerX;
        var deltaY = event.clientY - pointerY;
        teapot.rotation.x += deltaX * 0.001;
        teapot.rotation.z -= deltaY * 0.001;
        pointerX = event.clientX;
    }
});

renderer.domElement.addEventListener('pointerup', function (event) {
    isPointerDown = false;
});