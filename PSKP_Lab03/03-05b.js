function square(number) {
    return new Promise((resolve, reject) => {
      if (typeof number !== 'number') {
        reject('Invalid input');
      } else {
        resolve(number * number);
      }
    });
  }
  
  function cube(number) {
    return new Promise((resolve, reject) => {
      if (typeof number !== 'number') {
        reject('Invalid input');
      } else {
        resolve(number * number * number);
      }
    });
  }
  
  function fourthPower(number) {
    return new Promise((resolve, reject) => {
      if (typeof number !== 'number') {
        reject('Invalid input');
      } else {
        resolve(number * number * number * number);
      }
    });
  }

  const number = 2;

  Promise.all([square(number), cube(number), fourthPower(number)])
    .then(([squareResult, cubeResult, fourthPowerResult]) => {
      console.log(`Square: ${squareResult}`);
      console.log(`Cube: ${cubeResult}`);
      console.log(`Fourth power: ${fourthPowerResult}`);
    })
    .catch((error) => {
      console.error(error);
    });