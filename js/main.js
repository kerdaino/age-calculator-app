document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('ageForm');
    const inputs = document.querySelectorAll('.input');
    const ageResults = document.querySelectorAll('section h2 span');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Reset age results
      ageResults.forEach(span => {
        span.textContent = '--';
      });
  
      // Validate form inputs
      let isValid = true;
  
      inputs.forEach(input => {
        if (input.value.trim() === '') {
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
      });
  
      const day = parseInt(inputs[0].value, 10);
      const month = parseInt(inputs[1].value, 10);
      const year = parseInt(inputs[2].value, 10);
  
      if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12) {
        isValid = false;
        alert('Invalid day or month.');
      }
  
      const currentDate = new Date();
      const inputDate = new Date(year, month - 1, day); // Note: months are zero-based in JavaScript
  
      if (inputDate > currentDate) {
        isValid = false;
        alert('Date cannot be in the future.');
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
  });
  