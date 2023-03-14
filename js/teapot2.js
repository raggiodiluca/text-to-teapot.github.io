import * as THREE from "https://cdn.skypack.dev/three@0.132.2";

//create the scene
var scene = new THREE.Scene();

//create the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1.2;
camera.position.y = 0.2;

// Get the container element
var container = document.querySelector('#three-teapot2');

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

// Define the 16 vertices of the teapot body
const vertices = [
    [-0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, -0.5],
    [-0.5, 0.0, -0.5],
    [-0.4, 0.3, 0.4],
    [0.4, 0.3, 0.4],
    [0.4, 0.3, -0.4],
    [-0.4, 0.3, -0.4],
    [-0.3, 0.5, 0.3],
    [0.3, 0.5, 0.3],
    [0.3, 0.5, -0.3],
    [-0.3, 0.5, -0.3],
    [-0.2, 0.6, 0.2],
    [0.2, 0.6, 0.2],
    [0.2, 0.6, -0.2],
    [-0.2, 0.6, -0.2]
  ];
  
  // Define the faces of the teapot body using the vertices
  const faces = [
    [0, 4, 7],
    [0, 7, 3],
    [4, 5, 6],
    [4, 6, 7],
    [5, 1, 2],
    [5, 2, 6],
    [1, 0, 3],
    [1, 3, 2],
    [3, 7, 6],
    [3, 6, 2],
    [1, 5, 4],
    [1, 4, 0],
    [8, 9, 13],
    [9, 10, 14],
    [10, 11, 15],
    [8, 12, 11],
    [8, 13, 12],
    [11, 10, 15],
    [12, 13, 14],
    [12, 14, 15],
    [8, 11, 15],
    [8, 15, 14],
    [8, 14, 9],
    [9, 14, 10]
  ];
  // Create the teapot geometry using the vertices and faces
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(vertices.length * 3);
  vertices.forEach((vertex, index) => {
    positions[index * 3] = vertex[0];
    positions[index * 3 + 1] = vertex[1];
    positions[index * 3 + 2] = vertex[2];
  });
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const indices = new Uint16Array(faces.flat());
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  
  // Calculate vertex normals for smooth shading
  geometry.computeVertexNormals();
  
  // Create a mesh with the teapot geometry and a basic material
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  const teapot = new THREE.Mesh(geometry, material);
  
  // Add the teapot to the scene
  scene.add(teapot);

//_____________________________________________


var container = document.querySelector('#three-teapot2');
var textContainer = container.closest('.text-container');
var isActive = textContainer.classList.contains('active');

var animate = function () {
    if (isActive) {
        requestAnimationFrame(animate);
        // Rotate the bike based on the current rotation values
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

