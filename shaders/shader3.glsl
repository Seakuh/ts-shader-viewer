#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_amplitude;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float color = 0.5 + 0.5 * sin(u_time + uv.x * 10.0 + u_amplitude * 5.0);
    gl_FragColor = vec4(vec3(color), 1.0);
}
