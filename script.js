// Setup Scene, Camera, and Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1e1e2d);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Add Grid Plane
const gridSize = 10;
const geometry = new THREE.PlaneGeometry(gridSize, gridSize, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0x222244, wireframe: true });
const grid = new THREE.Mesh(geometry, material);
grid.rotation.x = -Math.PI / 2;
scene.add(grid);

// Add some random objects
const addRandomShapes = () => {
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
    const shapes = [THREE.BoxGeometry, THREE.ConeGeometry, THREE.SphereGeometry];

    for (let i = 0; i < 20; i++) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const geometry = new shape(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            Math.random() * gridSize - gridSize / 2,
            Math.random() * 2,
            Math.random() * gridSize - gridSize / 2
        );
        scene.add(mesh);
    }
};
addRandomShapes();

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Controls (Orbit)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};
animate();

// Handle resizing
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
