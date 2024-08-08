#define cplx vec2

const float PI = 3.1415926535897932384626433832795;
const float E  = 2.7182818284590452353602874713527;
const cplx c_1 = cplx(1.,0.);
const cplx c_i = cplx(0.,1.);

cplx c_mul(cplx z, cplx w) {
	return cplx(z.x*w.x-z.y*w.y, z.x*w.y+z.y*w.x);
}
cplx c_div(cplx z, cplx w) {
    float d = w.x*w.x + w.y*w.y;
    return cplx(z.x*w.x+z.y*w.y, z.y*w.x-z.x*w.y) / d;
}
cplx c_pow(cplx z, cplx w) {
    float ln_r = log(length(z));
    float theta = atan(z.y,z.x);
    float rho = exp(w.x*ln_r-w.y*theta);
    float phi = w.y*ln_r + w.x*theta;
    return cplx(rho*cos(phi), rho*sin(phi));
}
cplx c_exp(cplx z) {
    return exp(z.x) * cplx(cos(z.y),sin(z.y));
}
cplx c_log(cplx z) {
    return cplx(log(length(z)), atan(z.y,z.x));
}
cplx c_tanh(cplx z) {
	cplx u = c_exp(2.0*z);
	return c_div(u-c_1, u+c_1);
}
cplx c_atanh(cplx z) {
	return 0.5*(c_log(c_1+z)-c_log(c_1-z));
}

vec3 hsv2rgb(vec3 hsv) {
    vec4 k = vec4(1., 2./3., 1./3., 3.);
    vec3 p = abs(fract(hsv.xxx + k.xyz)*6. - k.www);
    return hsv.z*mix(k.xxx, clamp(p-k.xxx, 0., 1.), hsv.y);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    float ar = iResolution.x/iResolution.y;
    float nc = (cos(iTime)+1.)/2.;
    float ns = (sin(iTime)+1.)/2.;
    
    cplx p = fragCoord/iResolution.xy;
    cplx z = cplx((2.*p.x-1.)*ar, -2.*p.y+1.);
    cplx m = 2.5*nc*ns*cplx(nc,ns);
    cplx w0 = c_div(c_tanh(c_div(m,c_atanh(z))),
                        c_atanh(c_mul(m,c_atanh(z))));
    cplx w = c_pow(w0,w0);
    
    vec3 hsv = vec3(mod(length(w),nc),
                    mod(atan(w.y,w.x),ns),
                    .5*nc/length(w));
    
    fragColor = vec4(hsv2rgb(hsv)*vec3(ns,nc,ns),1.);
}