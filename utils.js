class StorageManager {
  highestScore = 'highest-score';

  getHighestScore() {
    let score = localStorage.getItem(this.highestScore);
    return score ?? 0;
  }

  setHighestScore(score) {
    localStorage.setItem(this.highestScore, score);
  }
}

export const storage = new StorageManager();

export function isMobile() {
  const userAgent = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}
