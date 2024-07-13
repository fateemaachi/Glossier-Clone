$(document).ready(function(){
  // The input event triggers whenever the user types or modifies the input field content.
  $('#fName, #lName, #email2, #password').on('click', function() {
    $(this).css('border-bottom', '0.5px solid black');
  });

  //Added blur event handlers to the input fields to call validateInput function when the user clicks out of an input field after typing.
  $('#fName, #lName, #email2, #password').on('blur', function() {
    validateInput($(this));
  });

  // switch to login page
  $('.fbtn3b').click(function(){
    window.location.href = 'login.html'
  });

  // number checkbox visibility and validation
  $('#tick3').click(function(){
    if ($('#tick3').is(':checked')) {
      $('#cbMsg').show();
      $('.number').show();
    } else {
      $('#cbMsg').hide();
      $('.number').hide();
    }

    // Function to validate phone number on blur event
    $('#number').blur(function() {
      validatePhoneNumber();
    });
  });

  // Function to validate phone number input
  function validatePhoneNumber() {
    let phoneNumber = $('#number').val().trim();
    const phoneRegex = /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{3,}[-.\s]?\d{4,}$/;
    // Regex for 10-digit number

    // Remove any non-numeric characters from input
    phoneNumber = phoneNumber.replace(/\D/g, '');

    if (phoneRegex.test(phoneNumber)) {
      $('#number').css('border-bottom', '0.5px solid #ccc');
      $('#errNum').hide();
    } else {
      $('#number').css('border-bottom', '0.5px solid red');
      $('#errNum').show();
    }
  }

  // The submit event handler for #regForm remains intact, performing the form validation and submission logic
  $('#regForm').on('submit', function(event){
    event.preventDefault();

    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let formData = {
        firstName: $('#fName').val(),
        lastName: $('#lName').val(),
        email: $('#email2').val(),
        password: $('#password').val(),
    };

    // Validation for first name
    if (formData.firstName === '') {
        valid = false;
        $('#errfName').show();
        $('#fName').css('border-bottom', '0.5px solid red');
    }

    // Validation for last name
    if (formData.lastName === '') {
        valid = false;
        $('#errlName').show();
        $('#lName').css('border-bottom', '0.5px solid red');
    }

    // Validation for email
    if (formData.email === '' || !emailRegex.test(formData.email)) {
        valid = false;
        $('#errEmail').show();
        $('#email2').css('border-bottom', '0.5px solid red');
    }

     // Validation for password
    if (formData.password === '') {
      valid = false;
      $('#errPass').show();
      $('#password').css('border-bottom', '0.5px solid red');
    } else if (formData.password < 8) {
      valid = false;
      $('#errPass2').show();
      $('#password').css('border-bottom', '0.5px solid red');
    }

    //validation for checkbox
    if (!$('#tick').prop('checked')) {
      valid = false;
      $('#cbErr').css('display', 'block');
    } 

    if(valid){
      localStorage.setItem('formData', JSON.stringify(formData));
      alert('Registration successful');
      window.location.href = 'login.html';
    }
    $('#fName').val('');
    $('#lName').val('');
    $('#email2').val('');
    $('#password').val('');

  });

   // Handle click event on the checkbox
   $('#tick').click(function() {
    if ($(this).prop('checked')) {
      $('#cbErr').hide(); // Hide error message when checkbox is checked
    }
  });

  // validateInput function checks the input field value and shows the corresponding error message (errorField) and applies red border if the field is empty.
    function validateInput(inputField) {
      let errorField;
      switch (inputField.attr('id')) {
        case 'fName':
            errorField = $('#errfName');
            break;
        case 'lName':
            errorField = $('#errlName');
            break;
        case 'email2':
            errorField = $('#errEmail');
            break;
        case 'password':
            errorField = $('#errPass');
            break;
      }

      if (inputField.val() === '') {
          errorField.show();
          inputField.css('border-bottom', '0.5px solid red');
      } else {
          errorField.hide();
          inputField.css('border-bottom', 'none');
      }
  }
  
});

