"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderManager = void 0;
class ShaderManager {
    constructor(material) {
        this.shaders = [];
        this.currentShaderIndex = 0;
        this.material = material;
    }
    addShader(shader) {
        this.shaders.push(shader);
    }
    nextShader() {
        this.currentShaderIndex = (this.currentShaderIndex + 1) % this.shaders.length;
        this.material.fragmentShader = this.shaders[this.currentShaderIndex];
        this.material.needsUpdate = true;
    }
}
exports.ShaderManager = ShaderManager;
