console.log("Hello!");

// SCRIPT FOR TOURIST-------------------------------------------------------------

(function() {
  var stripe = Stripe('pk_test_uldQfpLT7sjH9MZwQqz4eCNO00rPVteNoO');

  var checkoutButton = document.getElementById('checkout-button-sku_H6XwwxySTzDoHG');
  checkoutButton.addEventListener('click', function () {
    // When the customer clicks on the button, redirect
    // them to Checkout.
    stripe.redirectToCheckout({
      items: [{sku: 'sku_H6XwwxySTzDoHG', quantity: 1}],

      // Do not rely on the redirect to the successUrl for fulfilling
      // purchases, customers may not always reach the success_url after
      // a successful payment.
      // Instead use one of the strategies described in
      // https://stripe.com/docs/payments/checkout/fulfillment
      successUrl: 'http://localhost:3000/tourist',  //add credit processor
      cancelUrl: 'http://localhost:3000/charge?success=false',  //error processor
    })
    .then(function (result) {
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer.
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  });
})();




// SCRIPT FOR LOCAL-------------------------------------------------------------
(function() {
  var stripe = Stripe('pk_test_uldQfpLT7sjH9MZwQqz4eCNO00rPVteNoO');

  var checkoutButton = document.getElementById('checkout-button-sku_H6YumHeoXLGOeh');
  checkoutButton.addEventListener('click', function () {
    // When the customer clicks on the button, redirect
    // them to Checkout.
    stripe.redirectToCheckout({
      items: [{sku: 'sku_H6YumHeoXLGOeh', quantity: 1}],

      // Do not rely on the redirect to the successUrl for fulfilling
      // purchases, customers may not always reach the success_url after
      // a successful payment.
      // Instead use one of the strategies described in
      // https://stripe.com/docs/payments/checkout/fulfillment
      successUrl: 'http://localhost:3000/local',  //add credit processor
      cancelUrl: 'http://localhost:3000/charge?success=false',  //error processor
    })
    .then(function (result) {
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer.
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  });
})();


// SCRIPT FOR JETSETTER-------------------------------------------------------------

(function() {
  var stripe = Stripe('pk_test_uldQfpLT7sjH9MZwQqz4eCNO00rPVteNoO');

  var checkoutButton = document.getElementById('checkout-button-sku_H6Yvd8j6RbvpTU');
  checkoutButton.addEventListener('click', function () {
    // When the customer clicks on the button, redirect
    // them to Checkout.
    stripe.redirectToCheckout({
      items: [{sku: 'sku_H6Yvd8j6RbvpTU', quantity: 1}],

      // Do not rely on the redirect to the successUrl for fulfilling
      // purchases, customers may not always reach the success_url after
      // a successful payment.
      // Instead use one of the strategies described in
      // https://stripe.com/docs/payments/checkout/fulfillment
      successUrl: 'http://localhost:3000/jetsetter',  //add credit processor
      cancelUrl: 'http://localhost:3000/charge?success=false',  //error processor
    })
    .then(function (result) {
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer.
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  });
})();