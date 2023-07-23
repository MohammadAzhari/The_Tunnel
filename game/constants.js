const CONSTANTS = {
  settings: {
    cameraBehindDistant: 7,
    cameraUpDistant: 1,
  },
  enemy: {
    enemyAcceleration: 0.0007,
    enemyInitialVelocity: 0.005,
    enemyBoxSizes: 1,
    spawnRate: 13,
  },
  cube: {
    velocityX: 0.05,
    velocityZ: 0.05,
    gravity: -0.002,
    cubeDimensionsSizes: 0.5,
    jumpStrength: 0.06,
  },
  dimensions: {
    groundWidth: 10,
    groundDepth: 50,
    playAreaHeight: 7,
    thicknessOfWalls: 0.5,
  },
  colors: {
    defaultBoxColor: '#00ff00',
    wallColors: '#111',
  },
};

export default CONSTANTS;
