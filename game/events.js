export default function listenForEvents(setGameState) {
  window.addEventListener('keydown', (event) => {
    keys[event.code] = true;
  });

  window.addEventListener('keyup', (event) => {
    keys[event.code] = false;
  });

  const buttons = document.querySelectorAll('button[data-key]');

  buttons.forEach((btn) => {
    const keyCode = btn.getAttribute('data-key');
    btn.addEventListener('touchstart', () => {
      keys[keyCode] = true;
    });

    btn.addEventListener('touchend', () => {
      keys[keyCode] = false;
    });
  });

  document
    .querySelector('.start-button')
    .addEventListener('click', () => setGameState({ level: 1 }));

  document
    .querySelector('#play-again')
    .addEventListener('click', () => setGameState({ level: 1, score: 0 }));
}

export const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  Space: false,
};
