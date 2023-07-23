import * as THREE from 'three';
import createComponents from './game/components';

import listenForEvents, { keys } from './game/events';
import {
  createConstantsBasedOnLevel,
  cubeCollisionWithAny,
} from './game/logic';
import { isMobile, storage } from './utils';

const homePageContainer = document.getElementById('home-page');
const gameOverPage = document.getElementById('game-over');

const gameState = {
  level: 0,
  score: 0,
};
const setGameState = (newState) => {
  for (let key in newState) gameState[key] = newState[key];

  startGame();
};

listenForEvents(setGameState);

function startGame() {
  const CONSTANTS = createConstantsBasedOnLevel(gameState.level);
  const {
    scene,
    camera,
    renderer,
    cube,
    ground,
    roof,
    leftWall,
    rightWall,
    createNewEnemy,
  } = createHtmlElements(CONSTANTS);

  const enemies = [];

  let frames = 0;
  let spawnRate = CONSTANTS.enemy.spawnRate;

  function animate() {
    const animationId = requestAnimationFrame(animate);
    renderer.render(scene, camera);

    gameState.score += 1;
    document.querySelector('#score-number').innerHTML = gameState.score;
    document.querySelector('#highest-score').innerHTML =
      storage.getHighestScore();

    camera.position.set(
      cube.position.x,
      cube.position.y + CONSTANTS.settings.cameraUpDistant,
      cube.position.z + CONSTANTS.settings.cameraBehindDistant
    );

    // movement code
    cube.velocity.x = 0;
    cube.velocity.z = 0;
    if (keys.ArrowLeft) cube.velocity.x = -CONSTANTS.cube.velocityX;
    else if (keys.ArrowRight) cube.velocity.x = CONSTANTS.cube.velocityX;
    if (keys.Space) cube.velocity.y = CONSTANTS.cube.jumpStrength;
    cube.velocity.z = -CONSTANTS.cube.velocityZ;

    cube.update();
    enemies.forEach((enemy) => {
      enemy.update();
      if (
        cubeCollisionWithAny(cube, [
          ground,
          roof,
          ground,
          leftWall,
          rightWall,
          enemy,
        ])
      ) {
        gameOver();
        cancelAnimationFrame(animationId);
      }
    });

    if (gameState.level === 0 && frames > 2) {
      homePageContainer.style.display = 'flex';
      cancelAnimationFrame(animationId);
    }

    if (Math.abs(cube.position.z) > CONSTANTS.dimensions.groundDepth) {
      cancelAnimationFrame(animationId);
      goToNextLevel();
    }

    if (frames % spawnRate === 0) {
      const enemy = createNewEnemy();
      scene.add(enemy);
      enemies.push(enemy);
    }
    frames++;
  }
  animate();
}

function gameOver() {
  gameOverPage.style.display = 'flex';
  const highestScore = storage.getHighestScore();
  if (gameState.score > highestScore) {
    storage.setHighestScore(gameState.score);
    document.querySelector('.is-highest-score').style.display = 'block';
  }
  document.querySelector('#final-score').innerHTML = gameState.score;
}

function createHtmlElements(CONSTANTS) {
  // remove any previous canvas;
  const canvas = document.getElementsByTagName('canvas')[0];
  if (canvas) document.body.removeChild(canvas);

  // update level
  document.querySelector('#level-number').innerHTML = gameState.level;

  // scene

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  homePageContainer.style.display = 'none';
  gameOverPage.style.display = 'none';
  document.querySelector('.is-highest-score').style.display = 'none';

  if (!isMobile()) {
    document.querySelector('.mobile-btns-container').style.display = 'none';
  }

  const { cube, ground, roof, light, leftWall, rightWall, createNewEnemy } =
    createComponents(CONSTANTS);
  scene.add(cube);
  scene.add(ground);
  scene.add(roof);
  scene.add(light);
  scene.add(leftWall);
  scene.add(rightWall);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  return {
    scene,
    camera,
    renderer,
    cube,
    ground,
    roof,
    light,
    leftWall,
    rightWall,
    createNewEnemy,
  };
}

function goToNextLevel() {
  setGameState({ level: gameState.level + 1 });
}

startGame();
