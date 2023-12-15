export default class Game {
  constructor() {
    this.gameContainer = document.querySelector('.game-container');
    this.initializeGame();
  }

  // Генерация игрового поля 4x4 с отрисовкой границ
  generateGameField() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        this.gameContainer.appendChild(cell);
      }
    }
  }

  // Генерация случайной позиции гоблина
  generateRandomPosition() {
    const row = Math.floor(Math.random() * 4) + 1;
    const col = Math.floor(Math.random() * 4) + 1;
    return { row, col };
  }

  // Создание гоблина и помещение его на поле
  createGoblin() {
    const goblin = document.createElement('img');
    goblin.src = './img/goblin.png';
    goblin.alt = 'Goblin';
    goblin.classList.add('game-goblin');
    const randomPosition = this.generateRandomPosition();
    goblin.dataset.row = randomPosition.row;
    goblin.dataset.col = randomPosition.col;
    this.gameContainer.appendChild(goblin);
  }

  // Обработчик клика по гоблину
  handleGoblinClick() {
    const goblin = document.querySelector('.game-goblin');
    const randomPosition = this.generateRandomPosition();
    goblin.dataset.row = randomPosition.row;
    goblin.dataset.col = randomPosition.col;
    this.updateGoblinPosition();
  }

  // Функция обновления позиции гоблина в DOM
  updateGoblinPosition() {
    const goblin = document.querySelector('.game-goblin');
    const { row } = goblin.dataset;
    const { col } = goblin.dataset;
    const newPosition = `grid-column: ${col} / span 1; grid-row: ${row} / span 1;`;
    goblin.style.cssText = newPosition;
  }

  // Инициализация игры
  initializeGame() {
    this.generateGameField();
    this.createGoblin();
    this.handleGoblinClick();
    setInterval(() => this.handleGoblinClick(), 1000);
  }
}
