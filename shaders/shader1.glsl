#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_amplitude;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Verwende die Amplitude, um die Farbe zu beeinflussen
    float color = 0.5 + 0.5 * cos(u_time + uv.x * 10.0 + u_amplitude * 20.0);
    vec3 finalColor = vec3(color * uv.x, color * uv.y, color);

    gl_FragColor = vec4(finalColor, 1.0);
}
