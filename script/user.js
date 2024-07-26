$(document).ready(function (){
  const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";
  const user = JSON.parse(localStorage.getItem("formData"));

  // display merchant name
  $('#profileName').text(user.first_name);

 //open edit profile details modal
 $('#profilePic').click(function(){
   $('#myModal').show();
   $('#fName').val(user.first_name);
   $('#lName').val(user.last_name);
   $('#email2').val(user.email);
   $('#number').val(user.phone);
 });

 //cancel modal
 $('#cancel').click(function(){
   $('#myModal').hide();
 });

 //opening password modal
 $('#ediT').click(function(){
   $('#myModal2').show();
 });

 //cancel modal2
 $('#cancel2').click(function(){
   $('#myModal2').hide();
 });

 //edit user details
 $('#add').on('click', function(){
  const info = {
        first_name:$('#fName').val().trim(),
        last_name: $('#lName').val().trim(),
        email: $('#email2').val().trim(),
        phone:$('#number').val().trim()
  }
  $.ajax({
    url: `${baseURL}/users/${user.id}`,
    method: 'PUT',
    data: info,
    success: function(data){
      localStorage.setItem('formData', JSON.stringify(data));
      alert('details updated successfully');
      $('#myModal').hide()
    }
  });

 });
 //edit user password
 $('#add2').on('click', function(){
   const pass = {
    old_password: $('#pass').val(),
    new_password: $('#pass2').val()
   }
   $.ajax({
    url: `${baseURL}/users/${user.id}/change-passwd`,
    method: "PUT",
    data: pass,
    success: function(data){
      console.log(data)
      alert('password updated successfully');
      $('#myModal2').hide()
    }
    
   });
 
 });

 //display new details
 function loadDetails () {
  $('#firstName').text(user.first_name);
  $('#lastName').text(user.last_name);
  $('#email').text(user.email);
  $('#phone').text(user.phone);
 }
 loadDetails();
});