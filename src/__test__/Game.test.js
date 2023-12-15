import Game from '../js/Game';

let game;

beforeEach(() => {
  document.body.innerHTML = '<div class="game-container"></div>';
  game = new Game();
});

test('Тест должен генерировать случайную позицию', () => {
  const position = game.generateRandomPosition();
  expect(position.row).toBeGreaterThanOrEqual(1);
  expect(position.row).toBeLessThanOrEqual(4);
  expect(position.col).toBeGreaterThanOrEqual(1);
  expect(position.col).toBeLessThanOrEqual(4);
});

test('Тест должен создать гоблина', () => {
  game.createGoblin();
  const goblin = document.querySelector('.game-goblin');
  expect(goblin).toBeDefined();
  expect(goblin.src).toContain('goblin.png');
});

test('Тест должен обновить позицию гоблина', () => {
  game.createGoblin();
  game.updateGoblinPosition();
  const goblin = document.querySelector('.game-goblin');
  const position = goblin.style.cssText;
  expect(position).toMatch(/grid-column: \d+ \/ span 1; grid-row: \d+ \/ span 1;/);
});

test('Тест должен иницилизировать игру', () => {
  game.initializeGame();
  const goblin = document.querySelector('.game-goblin');
  expect(goblin).toBeDefined();
});

test('Тест должен сгенерировать игровое поле', () => {
  game.generateGameField();
  const cells = document.querySelectorAll('.cell');
  expect(cells.length).toBe(32);
});

test('Тест должен обрабатывать клик по гоблину', () => {
  jest.useFakeTimers();
  game.initializeGame();
  jest.runOnlyPendingTimers();
  const goblin = document.querySelector('.game-goblin');
  const newPosition = `${goblin.dataset.row}/${goblin.dataset.col}`;
  jest.runOnlyPendingTimers();
  expect(`${goblin.dataset.row}/${goblin.dataset.col}`).not.toBe(newPosition);
});

test('Тест должен обновить позицию гоблина при клике', () => {
  game.createGoblin();
  const initialPosition = {
    row: game.gameContainer.querySelector('.game-goblin').dataset.row,
    col: game.gameContainer.querySelector('.game-goblin').dataset.col,
  };
  game.handleGoblinClick();
  const updatedPosition = {
    row: game.gameContainer.querySelector('.game-goblin').dataset.row,
    col: game.gameContainer.querySelector('.game-goblin').dataset.col,
  };
  expect(updatedPosition).not.toEqual(initialPosition);
});
