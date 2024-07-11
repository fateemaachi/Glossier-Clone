$(document).ready(function(){
  // $('.fcont-grid3').slick({
  //   infinite: true,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   arrows: true
  // });

  $('.grid-item').hover(
    function() {
      $(this).find('.front').stop().fadeTo(500, 0);
      $(this).find('.back').stop().fadeTo(500, 1);
    },
    function() {
      $(this).find('.front').stop().fadeTo(500, 1);
      $(this).find('.back').stop().fadeTo(500, 0);
    }
  );
  
    
  

  
  
});