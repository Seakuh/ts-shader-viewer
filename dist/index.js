import * as THREE from 'three';
import shader1 from '../shaders/shader1.glsl';
import shader2 from '../shaders/shader2.glsl';
import { ShaderManager } from './shaderManager';
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera.position.z = 1;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var geometry = new THREE.PlaneGeometry(2, 2);
var material = new THREE.ShaderMaterial({
    uniforms: {
        u_time: { value: 1.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    fragmentShader: shader1
});
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);
var shaderManager = new ShaderManager(material);
shaderManager.addShader(shader1);
shaderManager.addShader(shader2);
function animate() {
    requestAnimationFrame(animate);
    material.uniforms.u_time.value += 0.05;
    renderer.render(scene, camera);
}
animate();
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
});
window.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        shaderManager.nextShader();
    }
});
