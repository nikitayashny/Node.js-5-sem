function validateCard(cardNumber) {
    console.log(cardNumber); 
    return Math.random() < 0.5; 
  }
  
  function proceedToPayment(orderNumber) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.5) {
          resolve("Payment successful");
        } else {
          reject("Payment failed");
        }
      }, 2000);
    });
  }
  
  function createOrder(cardNumber) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validateCard(cardNumber)) {
          const orderNumber = generateOrderNumber();
          resolve(orderNumber);
        } else {
          reject("Card is not valid");
        }
      }, 5000);
    });
  }
  
  function generateOrderNumber() {
    return "ABC123"; 
  }
//
/*
  createOrder("1234567890123456")
  .then((orderNumber) => {
    console.log(orderNumber); // Выводит номер заказа (например, "ABC123") через 5 секунд
    return proceedToPayment(orderNumber);
  })
  .then((result) => {
    console.log(result); // Выводит "Payment successful" или "Payment failed" через 2 секунды
  })
  .catch((error) => {
    console.error(error); // Выводит "Card is not valid" или другую ошибку
  });
//
*/

  async function handleOrder() {
    try {
      const orderNumber = await createOrder("1234567890123456");
      console.log(orderNumber); // Выводит номер заказа (например, "ABC123") через 5 секунд
  
      const paymentResult = await proceedToPayment(orderNumber);
      console.log(paymentResult); // Выводит "Payment successful" или "Payment failed" через 2 секунды
    } catch (error) {
      console.error(error); // Выводит "Card is not valid" или другую ошибку
    }
  }
  
  handleOrder();