$(document).ready(function () {
  const baseUrl = "";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  // $.ajax({
  //   url: `${baseUrl}/products/${id}`,
  //   method: "GET",
  //   success: function () {},
  // });
});
