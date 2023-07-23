import { Box } from './box';
import * as THREE from 'three';
import { getRandomNumberBetween } from './logic';

export default function createComponents(CONSTANTS) {
  const cube = new Box({
    width: CONSTANTS.cube.cubeDimensionsSizes,
    height: CONSTANTS.cube.cubeDimensionsSizes,
    depth: CONSTANTS.cube.cubeDimensionsSizes,
    color: CONSTANTS.colors.defaultBoxColor,
    gravity: CONSTANTS.cube.gravity,
    velocity: {
      x: 0,
      y: -0.01,
      z: 0,
    },
    position: {
      x: 0,
      y: CONSTANTS.dimensions.playAreaHeight / 2,
      z: 0,
    },
  });
  cube.castShadow = true;

  const ground = Box.create({
    width: CONSTANTS.dimensions.groundWidth,
    height: CONSTANTS.dimensions.thicknessOfWalls,
    depth: CONSTANTS.dimensions.groundDepth,
    color: CONSTANTS.colors.wallColors,
    position: {
      x: 0,
      y: 0,
      z: -CONSTANTS.dimensions.groundDepth / 2,
    },
  });

  const roof = Box.create({
    width: CONSTANTS.dimensions.groundWidth,
    height: CONSTANTS.dimensions.thicknessOfWalls,
    depth: CONSTANTS.dimensions.groundDepth,
    color: CONSTANTS.colors.wallColors,
    position: {
      x: 0,
      y: CONSTANTS.dimensions.playAreaHeight,
      z: -CONSTANTS.dimensions.groundDepth / 2,
    },
  });

  const leftWall = Box.create({
    depth: CONSTANTS.dimensions.groundDepth,
    width: CONSTANTS.dimensions.thicknessOfWalls,
    height:
      CONSTANTS.dimensions.playAreaHeight +
      CONSTANTS.dimensions.thicknessOfWalls,
    color: CONSTANTS.colors.wallColors,
    position: {
      x:
        (CONSTANTS.dimensions.groundWidth +
          CONSTANTS.dimensions.thicknessOfWalls) /
        2,
      y: CONSTANTS.dimensions.playAreaHeight / 2,
      z: -CONSTANTS.dimensions.groundDepth / 2,
    },
  });

  const rightWall = Box.create({
    depth: CONSTANTS.dimensions.groundDepth,
    width: CONSTANTS.dimensions.thicknessOfWalls,
    height:
      CONSTANTS.dimensions.playAreaHeight +
      CONSTANTS.dimensions.thicknessOfWalls,
    color: CONSTANTS.colors.wallColors,
    position: {
      x:
        -(
          CONSTANTS.dimensions.groundWidth +
          CONSTANTS.dimensions.thicknessOfWalls
        ) / 2,
      y: CONSTANTS.dimensions.playAreaHeight / 2,
      z: -CONSTANTS.dimensions.groundDepth / 2,
    },
  });

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.y = 3;
  light.position.z = 1;
  light.castShadow = true;

  const createNewEnemy = () => {
    return Box.create({
      width: CONSTANTS.enemy.enemyBoxSizes,
      height: CONSTANTS.enemy.enemyBoxSizes,
      depth: CONSTANTS.enemy.enemyBoxSizes,
      position: {
        x: getRandomNumberBetween(
          -(CONSTANTS.dimensions.groundWidth / 2),
          CONSTANTS.dimensions.groundWidth / 2
        ),
        y: getRandomNumberBetween(0, CONSTANTS.dimensions.playAreaHeight),
        z: -CONSTANTS.dimensions.groundDepth + -10,
      },
      velocity: {
        x: 0,
        y: 0,
        z: CONSTANTS.enemy.enemyInitialVelocity,
      },
      color: 'red',
      zAcceleration: CONSTANTS.enemy.enemyAcceleration,
    });
  };

  return {
    cube,
    roof,
    ground,
    light,
    leftWall,
    rightWall,
    createNewEnemy,
  };
}
