//todo: x in top left corner then move bottom right gets no index
const areArrsEqual = (arr1, arr2) => {
  let result = true;
  arr1.forEach((v, i) => {
    if (v !== arr2[i]) result = false;
  });

  return result;
};

const getRandomOption = (options) => {
  const randIndex = Math.floor(Math.random() * options.length);
  return options[randIndex];
};

const getRandomAvailableBlock = (game) => {
  console.log(`%cRandoming`, "color: red; font-size: 20px;");
  const emptyIndexes = game.reduce((acc, letter, index) => {
    if (!letter) acc.push(index);
    return acc;
  }, []);
  return getRandomOption(emptyIndexes);
};

const mapToBinary = (game, currentLetter) =>
  game.map((letter) => (letter === currentLetter ? "a" : letter ? "b" : ""));

const findNeededBlock = (binary) => {
  if (binary[4] === "b") {
    if (binary[0] === "b" && !binary[8]) return 8;
    if (binary[1] === "b" && !binary[7]) return 7;
    if (binary[2] === "b" && !binary[6]) return 6;
    if (binary[3] === "b" && !binary[5]) return 5;
    if (binary[5] === "b" && !binary[3]) return 3;
    if (binary[6] === "b" && !binary[2]) return 2;
    if (binary[7] === "b" && !binary[1]) return 1;
    if (binary[8] === "b" && !binary[0]) return 0;
  }
  if (binary[0] === "b") {
    if (binary[1] === "b" && !binary[2]) return 2;
    if (binary[2] === "b" && !binary[1]) return 1;
    if (binary[3] === "b" && !binary[6]) return 6;
    if (binary[6] === "b" && !binary[3]) return 3;
  }
  if (binary[2] === "b") {
    if (binary[1] === "b" && !binary[0]) return 0;
    if (binary[0] === "b" && !binary[1]) return 1;
    if (binary[5] === "b" && !binary[8]) return 8;
    if (binary[8] === "b" && !binary[5]) return 5;
  }
  if (binary[6] === "b") {
    if (binary[3] === "b" && !binary[0]) return 0;
    if (binary[0] === "b" && !binary[3]) return 3;
    if (binary[7] === "b" && !binary[8]) return 8;
    if (binary[8] === "b" && !binary[7]) return 7;
  }
  if (binary[8] === "b") {
    if (binary[5] === "b" && !binary[2]) return 2;
    if (binary[2] === "b" && !binary[5]) return 5;
    if (binary[7] === "b" && !binary[6]) return 6;
    if (binary[6] === "b" && !binary[7]) return 7;
  }
  return null;
};

const findThroatPunch = (binary) => {
  if (binary[4] === "a") {
    if (binary[0] === "a" && !binary[8]) return 8;
    if (binary[1] === "a" && !binary[7]) return 7;
    if (binary[2] === "a" && !binary[6]) return 6;
    if (binary[3] === "a" && !binary[5]) return 5;
    if (binary[5] === "a" && !binary[3]) return 3;
    if (binary[6] === "a" && !binary[2]) return 2;
    if (binary[7] === "a" && !binary[1]) return 1;
    if (binary[8] === "a" && !binary[0]) return 0;
  }
  if (binary[0] === "a") {
    if (binary[1] === "a" && !binary[2]) return 2;
    if (binary[2] === "a" && !binary[1]) return 1;
    if (binary[3] === "a" && !binary[6]) return 6;
    if (binary[6] === "a" && !binary[3]) return 3;
  }
  if (binary[2] === "a") {
    if (binary[1] === "a" && !binary[0]) return 0;
    if (binary[0] === "a" && !binary[1]) return 1;
    if (binary[5] === "a" && !binary[8]) return 8;
    if (binary[8] === "a" && !binary[5]) return 5;
  }
  if (binary[6] === "a") {
    if (binary[3] === "a" && !binary[0]) return 0;
    if (binary[0] === "a" && !binary[3]) return 3;
    if (binary[7] === "a" && !binary[8]) return 8;
    if (binary[8] === "a" && !binary[7]) return 7;
  }
  if (binary[8] === "a") {
    if (binary[5] === "a" && !binary[2]) return 2;
    if (binary[2] === "a" && !binary[5]) return 5;
    if (binary[7] === "a" && !binary[6]) return 6;
    if (binary[6] === "a" && !binary[7]) return 7;
  }
  return null;
};

const playStrategic = (game, currentLetter) => {
  const binary = mapToBinary(game, currentLetter);

  const neededBlock = findNeededBlock(binary);
  const availableJugularHit = findThroatPunch(binary);

  if (availableJugularHit !== null) return availableJugularHit;
  if (neededBlock !== null) return neededBlock;
  return getRandomAvailableBlock(game);
};

const playXTurn1 = () => getRandomOption([0, 2, 6, 8]);

const playOTurn1 = (game) => {
  // o turn 1a
  if (!game[4]) return 4;
  // o turn 1b
  return getRandomOption([0, 2, 6, 8]);
};

const playXTurn2 = (game) => {
  // x turn 2a
  if (areArrsEqual(game, ["x", "o", "", "", "", "", "", "", ""])) {
    return 6;
  }
  if (areArrsEqual(game, ["x", "", "", "o", "", "", "", "", ""])) {
    return 2;
  }
  if (areArrsEqual(game, ["", "o", "x", "", "", "", "", "", ""])) {
    return 8;
  }
  if (areArrsEqual(game, ["", "", "x", "", "", "o", "", "", ""])) {
    return 0;
  }
  if (areArrsEqual(game, ["", "", "", "o", "", "", "x", "", ""])) {
    return 8;
  }
  if (areArrsEqual(game, ["", "", "", "", "", "", "x", "o", ""])) {
    return 0;
  }
  if (areArrsEqual(game, ["", "", "", "", "", "o", "", "", "x"])) {
    return 6;
  }
  // x turn 2b
  if (areArrsEqual(game, ["x", "", "", "", "", "", "o", "", ""])) {
    return 2;
  }
  if (areArrsEqual(game, ["x", "", "o", "", "", "", "", "", ""])) {
    return 6;
  }
  if (areArrsEqual(game, ["o", "", "x", "", "", "", "", "", ""])) {
    return 8;
  }
  if (areArrsEqual(game, ["", "", "x", "", "", "", "", "", "o"])) {
    return 0;
  }
  if (areArrsEqual(game, ["", "", "", "", "", "", "x", "", "o"])) {
    return 0;
  }
  if (areArrsEqual(game, ["o", "", "", "", "", "", "x", "", ""])) {
    return 8;
  }
  if (areArrsEqual(game, ["", "", "", "", "", "", "o", "", "x"])) {
    return 2;
  }
  if (areArrsEqual(game, ["", "", "o", "", "", "", "", "", "x"])) {
    return 6;
  }
  // x turn 2c
  if (areArrsEqual(game, ["x", "", "", "", "", "", "", "o", ""])) {
    return 6;
  }
  if (areArrsEqual(game, ["x", "", "", "", "", "o", "", "", ""])) {
    return 2;
  }
  if (areArrsEqual(game, ["", "", "x", "o", "", "", "", "", ""])) {
    return 8;
  }
  if (areArrsEqual(game, ["", "", "x", "", "", "", "", "o", ""])) {
    return 0;
  }
  if (areArrsEqual(game, ["", "", "", "", "", "o", "x", "", ""])) {
    return 8;
  }
  if (areArrsEqual(game, ["", "o", "", "", "", "", "x", "", ""])) {
    return 0;
  }
  if (areArrsEqual(game, ["", "", "", "o", "", "", "", "", "x"])) {
    return 6;
  }
  if (areArrsEqual(game, ["", "o", "", "", "", "", "", "", "x"])) {
    return 2;
  }
  // x turn 2d
  if (areArrsEqual(game, ["x", "", "", "", "", "", "", "", "o"])) {
    return getRandomOption([2, 6]);
  }
  if (areArrsEqual(game, ["", "", "x", "", "", "", "o", "", ""])) {
    return getRandomOption([0, 8]);
  }
  if (areArrsEqual(game, ["", "", "o", "", "", "", "x", "", ""])) {
    return getRandomOption([0, 8]);
  }
  if (areArrsEqual(game, ["o", "", "", "", "", "", "", "", "x"])) {
    return getRandomOption([2, 6]);
  }
  // x turn 2e
  if (areArrsEqual(game, ["x", "", "", "", "o", "", "", "", ""])) {
    return 8;
  }
  if (areArrsEqual(game, ["", "", "x", "", "o", "", "", "", ""])) {
    return 6;
  }
  if (areArrsEqual(game, ["", "", "", "", "o", "", "x", "", ""])) {
    return 2;
  }
  if (areArrsEqual(game, ["", "", "", "", "o", "", "", "", "x"])) {
    return 0;
  }

  return playStrategic(game, "x");
};

const playOTurn2 = (game) => {
  if (areArrsEqual(game, ["x", "", "", "", "o", "", "", "", "x"])) {
    return getRandomOption([1, 3, 5, 7]);
  }
  if (areArrsEqual(game, ["", "", "x", "", "o", "", "x", "", ""])) {
    return getRandomOption([1, 3, 5, 7]);
  }
  return playStrategic(game, "o");
};

const playXTurn3 = (game) => {
  // x turn 3a
  // x3a.1
  if (areArrsEqual(game, ["x", "o", "", "o", "", "", "x", "", ""])) {
    return 8;
  }
  // x3a.2
  if (areArrsEqual(game, ["x", "o", "x", "o", "", "", "", "", ""])) {
    return 8;
  }
  // x3a.3
  if (areArrsEqual(game, ["", "o", "x", "", "", "o", "", "", "x"])) {
    return 6;
  }
  // x3a.4
  if (areArrsEqual(game, ["x", "o", "x", "", "", "o", "", "", ""])) {
    return 6;
  }
  // x3a.5
  if (areArrsEqual(game, ["", "", "", "o", "", "", "x", "o", "x"])) {
    return 2;
  }
  // x3a.6
  if (areArrsEqual(game, ["x", "", "", "o", "", "", "x", "o", ""])) {
    return 2;
  }
  // x3a.7
  if (areArrsEqual(game, ["", "", "", "", "", "o", "x", "o", "x"])) {
    return 0;
  }
  // x3a.8
  if (areArrsEqual(game, ["", "", "x", "", "", "o", "", "o", "x"])) {
    return 0;
  }
  // x turn 3b
  // x3b.1
  if (areArrsEqual(game, ["x", "o", "x", "", "", "", "o", "", ""])) {
    return 8;
  }
  // x3b.2
  if (areArrsEqual(game, ["x", "", "o", "o", "", "", "x", "", ""])) {
    return 8;
  }
  // x3b.3
  if (areArrsEqual(game, ["o", "", "x", "", "", "o", "", "", "x"])) {
    return 6;
  }
  // x3b.4
  if (areArrsEqual(game, ["x", "o", "x", "", "", "", "", "", "o"])) {
    return 6;
  }
  // x3b.5
  if (areArrsEqual(game, ["x", "", "", "o", "", "", "x", "", "o"])) {
    return 2;
  }
  // x3b.6
  if (areArrsEqual(game, ["o", "", "", "", "", "", "x", "o", "x"])) {
    return 2;
  }
  // x3b.7
  if (areArrsEqual(game, ["", "", "x", "", "", "o", "o", "", "x"])) {
    return 0;
  }
  // x3b.8
  if (areArrsEqual(game, ["", "", "o", "", "", "", "x", "o", "x"])) {
    return 0;
  }
  // see 3a.8
  // x turn 3c
  // see 3a.6
  // see 3a.4
  if (areArrsEqual(game, ["", "", "x", "o", "", "o", "", "", "x"])) {
    return 6;
  }
  if (areArrsEqual(game, ["x", "o", "x", "", "", "", "", "o", ""])) {
    return 8;
  }
  // see 3a.7
  // see 3a.1
  // see 3a.5
  // see 3a.3
  return playStrategic(game, "x");
};

const playXTurn4 = (game) => {
  /*        x turn 4a       */
  // x4a.1
  if (areArrsEqual(game, ["x", "o", "", "o", "o", "", "x", "", "x"])) {
    return 7;
  }
  // x4a.2
  if (areArrsEqual(game, ["x", "o", "", "o", "", "", "x", "o", "x"])) {
    return 5;
  }
  // x4a.3
  if (areArrsEqual(game, ["x", "o", "x", "o", "o", "", "", "", "x"])) {
    return 5;
  }
  // x4a.4
  if (areArrsEqual(game, ["x", "o", "x", "o", "", "o", "", "", "x"])) {
    return 4;
  }
  // x4a.5
  if (areArrsEqual(game, ["", "o", "x", "", "o", "o", "x", "", "x"])) {
    return 7;
  }
  // x4a.6
  if (areArrsEqual(game, ["", "o", "x", "", "", "o", "x", "o", "x"])) {
    return 4;
  }
  // x4a.7
  if (areArrsEqual(game, ["x", "o", "x", "", "o", "o", "x", "", ""])) {
    return 3;
  }
  // x4a.8
  if (areArrsEqual(game, ["x", "o", "x", "o", "", "o", "x", "", ""])) {
    return 4;
  }
  // x4a.9
  if (areArrsEqual(game, ["", "", "x", "o", "o", "", "x", "o", "x"])) {
    return 5;
  }
  // x4a.10
  if (areArrsEqual(game, ["", "", "x", "o", "", "o", "x", "o", "x"])) {
    return 4;
  }
  // x4a.11
  if (areArrsEqual(game, ["x", "", "x", "o", "o", "", "x", "o", ""])) {
    return 1;
  }
  // x4a.12
  if (areArrsEqual(game, ["x", "o", "x", "o", "", "", "x", "o", ""])) {
    return 4;
  }
  // x4a.13
  if (areArrsEqual(game, ["x", "", "", "", "o", "o", "x", "o", "x"])) {
    return 3;
  }
  // x4a.14
  if (areArrsEqual(game, ["x", "", "", "o", "", "o", "x", "o", "x"])) {
    return 4;
  }
  // x4a.15
  if (areArrsEqual(game, ["x", "", "x", "", "o", "o", "", "o", "x"])) {
    return 1;
  }
  // x4a.16
  if (areArrsEqual(game, ["x", "o", "x", "", "", "o", "", "o", "x"])) {
    return 4;
  }
  /*        x turn 4b       */
  // x4b.1
  if (areArrsEqual(game, ["x", "o", "x", "", "o", "", "o", "", "x"])) {
    return 5;
  }
  // x4b.2
  if (areArrsEqual(game, ["x", "o", "x", "", "", "o", "o", "", "x"])) {
    return 4;
  }
  // x4b.3
  if (areArrsEqual(game, ["x", "", "o", "o", "o", "", "x", "", "x"])) {
    return 7;
  }
  // x4b.4
  if (areArrsEqual(game, ["x", "", "o", "o", "", "", "x", "o", "x"])) {
    return 4;
  }
  // x4b.5
  if (areArrsEqual(game, ["o", "", "x", "", "o", "o", "x", "", "x"])) {
    return 7;
  }
  // x4b.6
  if (areArrsEqual(game, ["o", "", "x", "", "", "o", "x", "o", "x"])) {
    return 4;
  }
  // x4b.7
  if (areArrsEqual(game, ["x", "o", "x", "", "o", "", "x", "", "o"])) {
    return 3;
  }
  // x4b.8
  if (areArrsEqual(game, ["x", "o", "x", "o", "", "", "x", "", "o"])) {
    return 4;
  }
  // x4b.9
  if (areArrsEqual(game, ["x", "", "x", "o", "o", "", "x", "", "o"])) {
    return 1;
  }
  // x4b.10 same as 4b.8
  // x4b.11
  if (areArrsEqual(game, ["o", "", "x", "", "o", "", "x", "o", "x"])) {
    return 5;
  }
  // x4b.12 same as 4b.6
  // x4b.13
  if (areArrsEqual(game, ["x", "", "x", "", "o", "o", "o", "", "x"])) {
    return 1;
  }
  // x4b.14 same as 4b.2
  // x4b.15
  if (areArrsEqual(game, ["x", "", "o", "", "o", "", "x", "o", "x"])) {
    return 3;
  }
  // x4b.16 same as 4b.4

  /*        x turn 4c         */
  // see 4a.11
  // see 4a.12
  // see 4a.7
  // see 4a.8
  if (areArrsEqual(game, ["", "", "x", "o", "o", "o", "x", "", "x"])) {
    return 7;
  }
  // see 4a.10
  if (areArrsEqual(game, ["x", "o", "x", "", "o", "", "", "o", "x"])) {
    return 5;
  }
  // see 4a.16
  // see 4a.13
  // see 4a.14
  // see 4a.1
  // see 4a.2
  if (areArrsEqual(game, ["", "", "x", "o", "", "", "x", "o", "x"])) {
    return 2;
  }
  // see 4a.9
  // see 4a.10
  // see 4a.5
  // see 4a.6

  /*        x turn 4e       */
  // see 4b.3
  // see 4b.15
  // see 4b.1
  // see 4b.13
  // see 4b.5
  // see 4b.11
  // see 4b.9
  // see 4b.7

  return playStrategic(game, "x");
};

export const getIndexFromAi = (game) => {
  const length = game.filter(Boolean).length;
  if (length === 0) return playXTurn1();
  if (length === 1) return playOTurn1(game);
  if (length === 2) return playXTurn2(game);
  if (length === 3) return playOTurn2(game, "o");
  if (length === 4) return playXTurn3(game);
  if (length === 5) return playStrategic(game, "o");
  if (length === 6) return playXTurn4(game);
  if (length === 7) return playStrategic(game, "o");
  if (length === 8) return playStrategic(game, "x");
};
