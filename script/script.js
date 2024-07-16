$(document).ready(function () {
  $(".fcont-grid3").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Hover effect
  $(".grid-item").hover(
    function () {
      $(this).find(".front").stop().fadeTo(500, 0);
      $(this).find(".back").stop().fadeTo(500, 1);
    },
    function () {
      $(this).find(".front").stop().fadeTo(500, 1);
      $(this).find(".back").stop().fadeTo(500, 0);
    }
  );
  $(".grid-item").click(function () {
    location.href = "product.html";
  });

  $("#email").mouseout(function () {
    $(this).css("border-bottom", "0.5px solid red");
    $("#err-msg").show();
  });

  $("#subBtn").click(function (event) {
    event.preventDefault(); // Prevent form submission or button default behavior
    const email = $("#email").val();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || !emailRegex.test(email)) {
      $("#err-msg").show();
      $("#email").addClass("error");
    } else {
      $("#err-msg").hide();
      $("#email").removeClass("error");
    }
  });
});

// var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
// var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//   return new bootstrap.Tooltip(tooltipTriggerEl)
// });
