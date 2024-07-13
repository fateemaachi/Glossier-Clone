$(document).ready(function(){
  // Hover effect
  $('.grid-item').hover(
    function() {
      $(this).find('.front').stop().fadeTo(500, 0);
      $(this).find('.back').stop().fadeTo(500, 1);
      $('.cb').show()
      $('.c').hide()
    },
    function() {
      $(this).find('.front').stop().fadeTo(500, 1);
      $(this).find('.back').stop().fadeTo(500, 0);
      $('.cb').hide()
      $('.c').show()
    }
  );

  $('#show').click(function(){
    $('.options').show()
  })
});

// var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
// var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//   return new bootstrap.Tooltip(tooltipTriggerEl)
// });
