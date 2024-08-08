# Shader Viewer with Audio Interaction

This project is a web application built with TypeScript and Three.js that allows users to view and interact with GLSL shaders. The application captures audio input from the user's microphone and uses the amplitude of the sound to dynamically modify shader parameters, creating a visually reactive experience.

## Features

- **Shader Switching:** Users can switch between different shaders using the spacebar.
- **Audio-Reactive Shaders:** The shaders respond to real-time audio input, creating dynamic visual effects based on the microphone's sound input.


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/shader-viewer.git
   cd shader-viewer

### Run

   ```bash
   npm run start


## Usage
Shader Switching: Press the Spacebar to cycle through the different shaders.
Audio Input: Make sure your microphone is connected and enabled. The shaders will react to the amplitude of the sound captured by your microphone.

## Development
Adding New Shaders: Place your GLSL shader files in the shaders/ directory and import them in src/index.ts. You can add them to the ShaderManager to include them in the shader switcher.
Customizing Shaders: Modify the GLSL files to create your own custom visual effects. The shader uniforms, such as u_time and u_amplitude, are available for real-time manipulation.

## Contributing
Contributions are welcome! If you have ideas for improvements or new features, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Three.js - The WebGL library used for rendering the shaders.
Web Audio API - Used for capturing and analyzing the audio input.