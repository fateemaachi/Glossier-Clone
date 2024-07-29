$(document).ready(function () {
  const cart =JSON.parse(localStorage.getItem('cart')) || []
  const user = JSON.parse(localStorage.getItem('formData')) || {};


  const bagCount = $('.bagCount');
  if(cart.length > 0){
    bagCount.text(cart.length)
  } else {
    bagCount.text(0)
  }

  const loginBtn = $('#login');
  const logoutBtn= $('#logout');
  
  // loginBtn.hide()
  // logoutBtn.hide()
  
  // if(user){
    
  //   loginBtn.show();
  // } else {
    
  //   logoutBtn.show()
  // }
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

// display cart items
  function displayCart (){
    const cartContainer = $('.cartCont');
    cartContainer.empty();
    cart.map(item => {
      cartContainer.append(`<div class="cartCard" data-id=${item.id}>
                  <div class="cartImage">
                    <img src="${item.images[0]}" alt="" />
                  </div>
                  <div class="cartCard_right flex column justify-between">
                    <div class="cartCard_top flex justify-between">
                      <p>${item.title}</p>
                      <p id='fprice'>₦${item.totalPrice ? item.totalPrice : item.price}</p>
                    </div>
                    <div class="cartCard_bottom flex justify-between">
                      <div class="count"><i class="fa-solid fa-minus minus" style="margin-right: 5px;"></i>${item.itemCount}<i class="fa-solid fa-plus add" style="margin-left: 5px;"></i></div>
                      <button class="btn-remove removeBtn">remove</button>
                    </div>
                  </div>
                </div>`)
    })
   }
   displayCart();

   

   $(document).on('click', '.add', function(){
    const id = $(this).closest('.cartCard').data('id');

    const item = cart.find(it => it.id === id);
    


    if(item) {
      item.itemCount++;
      // item.price = item.price.toLocaleString()
      const totalPrice = item.itemCount * parseInt(item.price.split(',').join(''));
      item.totalPrice = totalPrice
      localStorage.setItem('cart', JSON.stringify(cart))
      displayCart()
    }
   })

   $(document).on('click', '.minus', function(){
    const id = $(this).closest('.cartCard').data('id');

    const item = cart.find(it => it.id === id);

    if(item.itemCount === 0){
      return
    } else {
      item.itemCount--;
      const totalPrice = item.itemCount * parseInt(item.price.split(',').join(''))
      item.totalPrice = totalPrice
      localStorage.setItem('cart', JSON.stringify(cart))
      displayCart()
    }
   })

   $(document).on('click', '.removeBtn', function(){
    const id = $(this).closest('.cartCard').data('id');

    const item = cart.find(it => it.id === id);

    if(item) {
      const newCart = cart.filter(item => item.id   !== id )
      localStorage.setItem('cart', JSON.stringify(newCart))
      location.reload()
    }
   })
 
   loginBtn.hide();
   logoutBtn.hide();
   if(user.isLoggedIn){
     logoutBtn.show()
     loginBtn.hide();
   } else {
     loginBtn.show();
     logoutBtn.hide();
   }
 
   $('#logout').click(function () {
     user.isLoggedIn = false;
     localStorage.setItem("formData", JSON.stringify(user));
     localStorage.removeItem('cart')
     alert('logged out')
    })
});
