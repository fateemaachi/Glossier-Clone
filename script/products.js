$(document).ready(function () {
  const baseUrl = "http://ecommerce.reworkstaging.name.ng/v2";
  const merchant_id = "669e578c6996967a7dcd7a85";
  let products = [];
  let liked = false;
  const user = JSON.parse(localStorage.getItem('formData')) || {};


  $.ajax({
    url: `${baseUrl}/products?merchant_id=${merchant_id}`,
    method: "GET",
    success: function (response) {
      products = response.data
      displayProducts(response.data);
    },
  });
 
  function  displayProducts(data) {
  
    const display = $(".fcont-grid3");
    
   
    display.empty();
    data.map((item) => {
       const likedIcon = item.has_like? `<i class="fa-solid fa-heart" style="color: red;
       margin-right: 20px;"></i>`: `<i class="fa-regular fa-heart" style="margin-right: 20px;"></i>`
      display.append(`<div  class="grid-item" data-id=${item.id}>
          <a href='product.html?id=${item.id}' class="img-wrapper mr">
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
          </a>
          <div class="new flex justify-btw">
            <p>NEW</p>
          </div>
          <div class="cont-info">
          <div class="flex justify-btw ">
              <p>${item.title}</p>
            <p class="liked" id="likes">${likedIcon}</p>
          </div>
            <p class="c">Summer Capsule Collection</p>
            <h6>&#8358;${item.price}</h6>
          </div>
          <button class="fbtn4 mr mt">Add to bag</button>
        </div>`)
    })
  }
  $(document).on('click', '.liked', function(){
    const productID = $(this).closest(".grid-item").data('id')
    $.ajax({ 
      url: `${baseUrl}/likes`,
      method: "POST",
      data:{product_id: productID,
           user_id: user.id},
      success: function(response){
        console.log(response)
        displayProducts(products)
      }
    })

  })

  $(document).on('click', '.liked', function(){
    const productID = $(this).closest(".grid-item").data('id')
    const prodExists = products.find(item => item.id === productID);

    if(prodExists) {
      if(prodExists.has_like){
        $.ajax({ 
          url: `${baseUrl}/likes`,
          method: "DELETE",
          data:{product_id: productID,
               user_id: user.id},
          success: function(){
            displayProducts(products)
          }
        })
      } else {
        $.ajax({ 
          url: `${baseUrl}/likes`,
          method: "POST",
          data:{product_id: productID,
               user_id: user.id},
          success: function(){
            displayProducts(products)
          }
        })
      }
    }
   

  })


  
  $(".grid-item").hover(
    function () {
      $(this).find(".front").stop().fadeTo(500, 0);
      $(this).find(".back").stop().fadeTo(500, 1);
      $(this).find(".cb").show();
      $(this).find(".c").hide();
    },
    function () {
      $(this).find(".front").stop().fadeTo(500, 1);
      $(this).find(".back").stop().fadeTo(500, 0);
      $(this).find(".cb").hide();
      $(this).find(".c").show();
    }
  );
  $('.grid-item').click(function(){
    location.href = "product.html"
  })
  $('#show').click(function(){
    $('.options').toggle()
  });

  $(".y").hover(
    function () {
      $(".x").css("background", "#fff");
    },
    function () {
      $(".x").css("background", "#0000cdcf");
    }
  );

  $(".x").hover(
    function () {
      $(".y").css("background", "#fff");
    },
    function () {
      $(".y").css("background", "#0000cdcf");
    }
  );

  $("#email").mouseout(function () {
    $(this).css("border-bottom", "0.5px solid red");
    $("#err-msg").show();
  });

  $("#subBtn").click(function (e) {
    e.preventDefault(); // Prevent form submission or button default behavior
    var email = $("#email").val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
