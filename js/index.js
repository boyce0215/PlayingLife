$("#login a").click(function(){
  $("#login").modal("hide");
  $("#register").modal("show");
});
$("#register a").click(function(){
  $("#register").modal("hide");
  $("#login").modal("show");
});
$("#logout-button").click(function(){
  window.location.href = '/accounts/logout/';
});
$("button[type=cancel]").click(function(){
  $("#alert").modal("hide");
});