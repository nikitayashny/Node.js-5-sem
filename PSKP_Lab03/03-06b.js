function square(number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof number !== 'number') {
          reject('Invalid input');
        } else {
          resolve(number * number);
        }
      }, 2000);
    });
  }
  
  function cube(number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof number !== 'number') {
          reject('Invalid input');
        } else {
          resolve(number * number * number);
        }
      }, 3000);
    });
  }
  
  function fourthPower(number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof number !== 'number') {
          reject('Invalid input');
        } else {
          resolve(number * number * number * number);
        }
      }, 4000);
    });
  }

  const number = 'a';

  Promise.race([square(number), cube(number), fourthPower(number)]) // результат самого быстрого, если ошибка выводит ошибку
    .then((result) => {
      console.log(`Result: ${result}`);
    })
    .catch((error) => {
      console.error(error);
    }); 


    Promise.any([square(number), cube(number), fourthPower(number)])    // первый промис, если ошибка выводит массив ошибок
      .then((result) => {
        console.log(`Result: ${result}`);
      })
      .catch((error) => {
        console.error(error);
      });