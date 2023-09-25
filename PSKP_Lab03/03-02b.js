function secondJob() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Ошибка");
      }, 3000);
    });
  }

  secondJob()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

  async function handleSecondJob() {
    try {
      await secondJob();
    } catch (error) {
      console.error(error);
    }
  }
  
  handleSecondJob();