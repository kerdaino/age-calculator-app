document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('ageForm');
  const inputs = document.querySelectorAll('.input');
  const ageResults = document.querySelectorAll('section h2 span');
  const header = document.querySelector('header');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Reset age results and clear error styles
    ageResults.forEach(span => {
      span.textContent = '--';
    });

    inputs.forEach(input => {
      input.classList.remove('error');
      const errorMessage = input.parentElement.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
    });
    
    // Remove the 'error' class from the header
    header.classList.remove('error-header');


    // Validate form inputs
    let isValid = true;

    inputs.forEach(input => {
      if (input.value.trim() === '') {
        input.classList.add('error');
        showErrorMessage(input, 'This field is required.');
        isValid = false;
      } else {
        input.classList.remove('error');
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) {
          errorMessage.remove();
        }
      }
    });

    const day = parseInt(inputs[0].value, 10);
    const month = parseInt(inputs[1].value, 10);
    const year = parseInt(inputs[2].value, 10);

    if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12) {
      isValid = false;

      // Add class to input elements with NaN values
      inputs.forEach((input, index) => {
        if (isNaN(parseInt(input.value, 10))) {
          input.classList.add('error');
        }
      });

      // Add class to input elements for specific condition
      if (isNaN(day) || day < 1 || day > 31) {
        inputs[0].classList.add('error');
      }
      if (isNaN(month) || month < 1 || month > 12) {
        inputs[1].classList.add('error');
      }
      if (isNaN(year) || year < 1000 || year > 2023) {
        inputs[2].classList.add('error');
      }

      // Add the 'error-header' class to the header
      header.classList.add('error-header');
    }

    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day); // Note: months are zero-based in JavaScript

    if (inputDate > currentDate) {
      isValid = false;
      if (isNaN(day) || day < 1 || day > 31) {
        inputs[0].classList.add('error');
        showErrorMessage(inputs[0], 'Must be a valid day.');
      }
      if (isNaN(month) || month < 1 || month > 12) {
        inputs[1].classList.add('error');
        showErrorMessage(inputs[1], 'Must be a valid month.');
      }
      if (isNaN(year) || year < 1000 || year > 2023) {
        inputs[2].classList.add('error');
        showErrorMessage(inputs[2], 'Must be in the Past.');
      }

      // Add the 'error' class to the header
      header.classList.add('error-header');
    }

    if (isValid) {
      // Calculate age
      const ageInMilliseconds = currentDate - inputDate;
      const ageDate = new Date(ageInMilliseconds);
      const years = ageDate.getUTCFullYear() - 1970;
      const months = ageDate.getUTCMonth();
      const days = ageDate.getUTCDate() - 1;

      // Display age results
      ageResults[0].textContent = years;
      ageResults[1].textContent = months;
      ageResults[2].textContent = days;
    }
  });

  function showErrorMessage(input, message) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');
    input.parentElement.appendChild(errorMessage);
  }
});