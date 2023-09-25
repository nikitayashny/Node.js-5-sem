function thirdJob(data) {
    return new Promise((resolve, reject) => {
      if (typeof data !== 'number') {
        reject('error');
      } else if (data % 2 === 1) {
        setTimeout(() => {
          resolve('odd');
        }, 1000);
      } else {
        setTimeout(() => {
          reject('even');
        }, 2000);
      }
    });
  }

  thirdJob(5)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

thirdJob(4)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

  async function handleThirdJob() {
    try {
      const result1 = await thirdJob(5);
      console.log(result1); 
  
      const result2 = await thirdJob(a);
      console.log(result2);
    } catch (error) {
      console.error(error); 
    }
  }
  
  handleThirdJob();