const getRandomIntInclusive = (min, max) =>
  Math.floor(Math.random() * ((Math.floor(max) - Math.ceil(min)) + 1)) + Math.ceil(min);

export default (count, from, to) => {
  const array = [];
  for (let i = 0; i < count; i += 1) {
    array.push({ y: getRandomIntInclusive(from, to), x: i });
  }

  return array;
};
