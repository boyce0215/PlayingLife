$("#login a").click(function(){
  $("#login").modal("hide");
  $("#register").modal("show");
});
$("#register a").click(function(){
  $("#register").modal("hide");
  $("#login").modal("show");
});