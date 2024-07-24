$(document).ready(function () {
  const user = JSON.parse(localStorage.getItem('formData')) || {}
  const baseUrl = "http://ecommerce.reworkstaging.name.ng/v2";
  const merchant_id = "669e578c6996967a7dcd7a85";
  const slickItems = [];
  $.ajax({
    url: `${baseUrl}/products?merchant_id=${merchant_id}`,
    method: "GET",
    success: function (prod) {
      prod.data.map((item, index) => {
        if (index < 8) {
          slickItems.push(item)
        }
      });
      // displayProducts(slickItems);
    },
  });
 
  function  displayProducts(slickItems) {
    const display = $('#gridWrapper')
    display.empty();
    slickItems.map((item) => {
      display.append(`<div class="grid-item">
          <div class="img-wrapper mr">
            <img
              class="front"
              src="${item.images[0]}"
              alt="img"
            />
            <img
              class="back"
              src="${item.images[1]}"
              alt="img2"
            />
          </div>
          <div class="new">
            <p>NEW</p>
          </div>
          <div class="cont-info">
            <p>${item.title}</p>
            <p class="c">Summer Capsule Collection</p>
            <h6>&#${item.price}</h6>
          </div>
          <button class="fbtn4 mr mt"><a href="#">Add to bag</a></button>
        </div>`)
    })
  }
  // displayProducts()
 
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
    window.location.href = "product.html?id=1";
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


