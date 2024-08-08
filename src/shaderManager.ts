import * as THREE from 'three';

export class ShaderManager {
    private shaders: string[] = [];
    private currentShaderIndex = 0;
    private material: THREE.ShaderMaterial;

    constructor(material: THREE.ShaderMaterial) {
        this.material = material;
    }

    addShader(shader: string) {
        this.shaders.push(shader);
    }

    nextShader() {
        this.currentShaderIndex = (this.currentShaderIndex + 1) % this.shaders.length;
        this.material.fragmentShader = this.shaders[this.currentShaderIndex];
        this.material.needsUpdate = true;
    }
}

