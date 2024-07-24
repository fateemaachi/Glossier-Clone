$(document).ready(function () {
  const cart =JSON.parse(localStorage.getItem('cart')) || []
  const user = JSON.parse(localStorage.getItem('formData')) || {}
  $("#fragrance").hover(function () {
    $(this).addClass("activeNav");
    $(".fragrance").css("display", "grid");
  });
  $(".fragrance").mouseleave(function () {
    $(this).hide();
    $("#fragrance").removeClass("activeNav");
  });
  $("#bag").click(function () {
    $(".cartModal").show();
  });
  $("#close").click(function () {
    $(".cartModal").hide();
  });
  $(".logoContainer").hover(function () {
    $(".hideText").show().addClass("logoTextUp");
  });
  $(".logoContainer").mouseleave(function () {
    $(".hideText").removeClass("logoTextUp").hide();
  });


  function displayCart (){
    const cartContainer = $('.cartCont');
    cartContainer.empty();
    cart.map(item => {
      cartContainer.append(`<div class="cartCard">
                  <div class="cartImage">
                    <img src="${item.images[0]}" alt="" />
                  </div>
                  <div class="cartCard_right flex column justify-between">
                    <div class="cartCard_top flex justify-between">
                      <p>${item.title}</p>
                      <p>₦${item.price}</p>
                    </div>
                    <div class="cartCard_bottom flex justify-between">
                      <div class="count">${item.quantity}</div>
                      <button class="btn-remove">remove</button>
                    </div>
                  </div>
                </div>`)
    })
   }
   displayCart();
   const loginBtn = $('#login');
   const logoutBtn= $('#logout');
   if(user){
     loginBtn.hide();
     logoutBtn.show();
   }

   $('logout').click(function () {
    localStorage.removeItem('user')
    window.reload();
   })
 
  
});
