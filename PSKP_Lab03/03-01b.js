function firstJob() {
    return new Promise((resolve, reject) => {   
      setTimeout(() => {
        resolve("Hello World");
      }, 2000);
    });
  }

firstJob()
  .then((result) => {
  console.log(result);
})
  .catch((error) => {
  console.error(error);
});

async function handleJob() {
  try {
    const result = await firstJob();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
  
handleJob();

// Promise - объект JS, представляющий асинхронную операцию
// имеет 3 состояния (ожидание, выполнено, отклонено)