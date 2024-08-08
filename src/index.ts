import * as THREE from 'three';
import shader1 from '../shaders/shader1.glsl';

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
    uniforms: {
        u_time: { value: 1.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_amplitude: { value: 0.0 }  // Die Amplitude vom Mikrofon
    },
    fragmentShader: shader1
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Audio Setup
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(stream => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function updateAmplitude() {
            analyser.getByteTimeDomainData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                sum += (dataArray[i] - 128) * (dataArray[i] - 128);
            }
            const amplitude = Math.sqrt(sum / dataArray.length) / 128.0;
            material.uniforms.u_amplitude.value = amplitude;

            requestAnimationFrame(updateAmplitude);
        }

        updateAmplitude();
    })
    .catch(error => console.error('Error accessing microphone: ', error));

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.u_time.value += 0.05;
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
});
