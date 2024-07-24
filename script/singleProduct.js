$(document).ready(function () {
  const baseUrl = "http://ecommerce.reworkstaging.name.ng/v2";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const user = JSON.parse(localStorage.getItem('formData')) || {};
  let product = {};
  let reviews = []
  const cart =JSON.parse(localStorage.getItem('cart')) || []

  if(user) {
    $('#reviewParent').show().css('display', 'flex')
  } else {
    $('#reviewParent').hide()
  }

  $.ajax({
    url: `${baseUrl}/products/${id}`,
    method: "GET",
    success: function (response) {
      displayProduct(response)
      product = response
    },
  });

 function displayProduct(data) {
  const display =$('.productDescriptionContainer');
  display.empty();
  display.append(` <div class="productDescription">
        <h2 class="heading">${data.title}</h2>
        <div class="flex align-center">
          <p>Summer Capsule Collection</p>
          <div
            class="flex align-center"
            style="font-size: 10px; margin-left: 20px"
          >
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i>
            <p style="margin-left: 10px">(1)</p>
          </div>
        </div>
        <div class="btnContainer" data-id=${data.id}>
          <span class="tag">New</span>
          <button class="butn btn-sec addToBag">Add to bag #${data.price}</button>
        </div>
        <div class="description">
          <p>
            ${data.descp}
          </p>
        </div>
      </div>
      <div class="productImageContainer grid">
        <img src="${data.images[0]}" alt="" />
        <img src="${data.images[1]}" alt="" />
      </div>`)
  
 }
 $(document).on('click', '.addToBag', function(){
  const itemExists = cart.find(item => item.id === product.id);
  if(itemExists){
    itemExists.itemCount++;
    localStorage.setItem('cart', JSON.stringify(cart))
  } else {const newProduct = {...product, itemCount: 1};
  cart.push(newProduct);
  localStorage.setItem('cart', JSON.stringify(cart))}
  
 })

 $(document).on('click','.reviewBtn', function (){
  const review = $('#review').val().trim();
    $.ajax({
      url: `${baseUrl}/reviews`,
      method: "POST",
      data: {
        product_id: product.id,
        user_id: user.id,
        text: review
      },
      success:function(response){
        console.log(response);
      }
    })

   
 })
  function getProductReviews(){
    $.ajax({
      url: `${baseUrl}/reviews?product_id=${id}`,
      method: "GET",
      success: function(response){
        reviews = response
        displayReviews(response)
        console.log(response)
      }
    })
  }
  getProductReviews()

  function formatDate(date){
    var date = new Date(date);

        var day = date.getDate();
        var month = date.getMonth() + 1; // Months are zero-based
        var year = date.getFullYear();

        // Add leading zeros to day and month if necessary
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        return formattedDate = month + '/' + day + '/' + year;
  }
  function displayReviews(data){
    
    const review = $('.reviews')
    review.empty()
    data.map(item => {

    review.append(` <div>
          <div class="flex column">
            <p>${formatDate(item.created_at)}</p>
            <p>${item.user.first_name}.${item.user.last_name}</p>
          </div>
        </div>
        <div>
          <div class="flex column">
            <div
              class="flex align-center"
              style="font-size: 10px; margin-bottom: 10px"
            >
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
              ><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
              ><i class="fa-solid fa-star"></i>
            </div>
            <p>
              ${item.text}
            </p>
           
          </div>
        </div>
        <div class="flex rateContainer">
          <div class="rate flex align-center">
            <i class="fa-solid fa-arrow-up"></i>7
          </div>
          <div class="rate flex align-center">
            <i class="fa-solid fa-arrow-down"></i>2
          </div>
        </div>`)
    })
  }

});
