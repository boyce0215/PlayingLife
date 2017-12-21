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
$("button.answer-select[type=cancel]").click(function(event){
  event.preventDefault();
  $("#alert").modal("hide");
});
$("button.answer-select[type=submit]").click(function(event){
  event.preventDefault();
  var input = $("<input>")
   .attr("type", "hidden")
   .attr("name", "answer_select").val($("span#option-answer").attr("value"));
  $('#play-form').append($(input));
  $("span#select-answer").text($("span#option-answer").text());
  $('#play-form').submit();
});
$("button.answer-option").click(function(){
  $("span#option-answer").text($(this).text());
  $("span#option-answer").attr("value", $(this).attr("value"));
});
