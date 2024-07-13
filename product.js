$(document).ready(function(){
  // Hover effect
  $('.grid-item').hover(
    function() {
      $(this).find('.front').stop().fadeTo(500, 0);
      $(this).find('.back').stop().fadeTo(500, 1);
      $(this).find('.cb').show()
      $(this).find('.c').hide()
    },
    function() {
      $(this).find('.front').stop().fadeTo(500, 1);
      $(this).find('.back').stop().fadeTo(500, 0);
      $(this).find('.cb').hide()
      $(this).find('.c').show()
    }
  );

  $('#show').click(function(){
    $('.options').toggle()
  });

  $('.y').hover(
    function() {
      $('.x').css('background', '#fff');
    }, function() {
      $('.x').css('background', '#0000cdcf');
    }
  );

  $('.x').hover(
    function() {
      $('.y').css('background', '#fff');
    }, function() {
      $('.y').css('background', '#0000cdcf');
    }
  );

  $('#email').mouseout(function() {
    $(this).css('border-bottom', '0.5px solid red');
    $('#err-msg').show();
  });

  $('#subBtn').click(function(e) {
    e.preventDefault(); // Prevent form submission or button default behavior
    var email = $('#email').val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || !emailRegex.test(email)) {
      $('#err-msg').show();
      $('#email').addClass('error');
    } else {
      $('#err-msg').hide();
      $('#email').removeClass('error');
      
    }
  });

});

// var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
// var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//   return new bootstrap.Tooltip(tooltipTriggerEl)
// });
