var ShaderManager = /** @class */ (function () {
    function ShaderManager(material) {
        this.shaders = [];
        this.currentShaderIndex = 0;
        this.material = material;
    }
    ShaderManager.prototype.addShader = function (shader) {
        this.shaders.push(shader);
    };
    ShaderManager.prototype.nextShader = function () {
        this.currentShaderIndex = (this.currentShaderIndex + 1) % this.shaders.length;
        this.material.fragmentShader = this.shaders[this.currentShaderIndex];
        this.material.needsUpdate = true;
    };
    return ShaderManager;
}());
export { ShaderManager };
