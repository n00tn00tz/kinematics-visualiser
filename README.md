# Robot Kinematics Visualiser 

An interactive web-based tool for kinematic analysis and visualisation of robot arms. This project offers workspace analysis, forward/inverse kinematics computations, and real-time visualisation of robot arm configurations.

## Planned Features

- Interactive 2D visualization of robot arm configurations
- Real-time forward kinematics calculations
- DH (Denavit-Hartenberg) parameter support
- Inverse kinematics solver
- Workspace analysis and visualization
- Configuration save/load functionality

## Technology Stack

- React (Vite)
- HTML5 Canvas for visualization
- Mathematics libraries for kinematics calculations

### Prerequisites

- Node.js (version 14 or above)
- npm (at least V6)

### Setup

### How to Install 

```bash
# Clone the repository
git clone https://github.com/YOURUSERNAME/robot-kinematics-visualizer

# Navigate to project directory
cd kinematics-visualiser

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
kinematics-visualiser/
├── src/
│   ├── components/    # React components
│   ├── utils/        # Utility functions
│   └── math/         # Kinematics calculations
├── docs/             # Documentation
├── tests/           # Unit tests
└── examples/        # Example configurations
```

## Current Status

This project is under active development. Current focus:
- Basic 2D visualization implementation
- Forward kinematics calculations
- User interface development

## License

(no details yet)

## Author

[Aurelia B]
- GitHub: [@n00tn00tz]

## Appendix

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
