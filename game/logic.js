function boxCollision(cube, otherBox) {
  const xCollision = cube.right >= otherBox.left && cube.left <= otherBox.right;
  const yCollision =
    cube.bottom + cube.velocity.y <= otherBox.top &&
    cube.top >= otherBox.bottom;
  const zCollision = cube.front >= otherBox.back && cube.back <= otherBox.front;

  return xCollision && yCollision && zCollision;
}

export function cubeCollisionWithAny(cube, otherBoxs = []) {
  for (let box of otherBoxs) {
    if (boxCollision(cube, box)) return true;
  }
  return false;
}

export function getRandomNumberBetween(from, to) {
  return from + Math.random() * (to - from);
}

// export function removeWallsOverlapWithEnemy(number) {
//   return (
//     number -
//     CONSTANTS.dimensions.thicknessOfWalls -
//     CONSTANTS.dimensions.enemyBoxSizes / 2
//   );
// }

export function createConstantsBasedOnLevel(level) {
  level += 2;
  return {
    settings: {
      cameraBehindDistant: 7,
      cameraUpDistant: 1,
    },
    enemy: {
      enemyAcceleration: (0.001 * level) / 2,
      enemyInitialVelocity: 0.005 * level,
      enemyBoxSizes: 1 + level / 6,
      spawnRate: 20 - level,
    },
    cube: {
      velocityX: 0.07 + level / 100,
      velocityZ: (0.3 * level) / 6,
      gravity: (-0.004 * level) / 3,
      cubeDimensionsSizes: 0.5,
      jumpStrength: (0.18 * level) / 6,
    },
    dimensions: {
      groundWidth: 10 + level * 2,
      groundDepth: (50 * level) / 3,
      playAreaHeight: 7 + level * 2,
      thicknessOfWalls: 0.5,
    },
    colors: {
      defaultBoxColor: '#00ff00',
      wallColors: generateColor(level),
    },
  };
}

const generateColor = (num) => {
  num -= 2;
  return `#${num % 10}${(num * 2) % 10}${(num * 3) % 10}`;
};
