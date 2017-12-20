$("#login #goto-register").click(function(){
  $("#login").modal("hide");
  $("#register").modal("show");
});
$("#login #goto-forget").click(function(){
  $("#login").modal("hide");
  $("#forget").modal("show");
});
$("#register #goto-login").click(function(){
  $("#register").modal("hide");
  $("#login").modal("show");
});
$("#forget #goto-sent").click(function(){
	$("#forget").modal("hide");
	$("#sent").modal("show");
});
$("#logout-button").click(function(){
  window.location.href = '/accounts/logout/';
});
$("button[type=cancel]").click(function(){
  $("#alert").modal("hide");
});