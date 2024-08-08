#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(uv, 0.5 + 0.5 * sin(u_time));
    gl_FragColor = vec4(color, 1.0);
}

