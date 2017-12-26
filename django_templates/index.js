$("#goto-play").click(function(){
  $("html,body").animate({
    scrollTop: 680
  },1000);
});
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
$("button#register-button").click(function(event){
  event.preventDefault();

  var registerEmail = $.grep(
    $('#register-form').serializeArray(),
    function(element){ return element.name === "email"; })[0].value;

  $.get("user?useremail="+registerEmail, function(existedUser) {
    if (existedUser.length === 0) {
      $('<input />').attr('type', 'hidden')
          .attr('name', "register_home")
          .attr('value', "Register_Home")
          .appendTo('#register-form');
      $('#register-form').submit();
    } else {
      $('#register-email-group').addClass("has-error");
      $('#register-form span.email-errors').text("這個帳號已經被註冊過囉～");
    }
  });
});

$("button#login-button").click(function(event){
  event.preventDefault();

  var loginEmail = $.grep(
    $('#login-form').serializeArray(),
    function(element){ return element.name === "email"; })[0].value;
  var loginPassword = $.grep(
    $('#login-form').serializeArray(),
    function(element){ return element.name === "password"; })[0].value;
  $("#login-form input[type='hidden']").remove();

  $.get("user?useremail="+loginEmail, function(existedUser) {
    if (existedUser.length === 0) {
      $('#login-email-group').addClass("has-error");
      $('#login-form span.email-errors').text("這個帳號還沒被註冊過喔～");
    } else {
      $('<input />').attr('type', 'hidden')
          .attr('name', "username")
          .attr('value', existedUser[0].username)
          .appendTo('#login-form');

      $.post('rest-auth/login/', $('#login-form').serialize())
        .fail(function(data){
          $('#login-password-group').addClass("has-error");
          $('#login-form span.password-errors').text("錯誤的密碼，請檢查你的輸入喔～");
        })
        .done(function(data){
          location.reload();
        });
    }
  });
});

$('#login-form #login-email').on('input',function(e){
  $('#login-email-group').removeClass("has-error");
  $('#login-password-group').removeClass("has-error");
  $('#login-form span.email-errors').text("");
  $('#login-form span.password-errors').text("");
});

$('#login-form #login-password').on('input',function(e){
  $('#login-email-group').removeClass("has-error");
  $('#login-password-group').removeClass("has-error");
  $('#login-form span.email-errors').text("");
  $('#login-form span.password-errors').text("");
});

function submitResetPassword() {
  var resetEmail = $.grep(
    $('#password-reset-form').serializeArray(),
    function(element){ return element.name === "email"; })[0].value;

  $.get("user?useremail="+resetEmail, function(existedUser) {
    if (existedUser.length === 0) {
      $('#password-reset-form div.form-group').addClass("has-error");
      $('#password-reset-form span.email-errors').text("這個email沒有註冊過喔～");
    } else {
      $('#password-reset-form span.email-errors').text("請稍候。。。");
      // $("#password-reset-form #email").prop("disabled", true);

      var resetForm = $('#password-reset-form');
      $.post(resetForm.attr('action'), resetForm.serialize())
        .fail(function(data){
          $('#password-reset-form div.form-group').addClass("has-error");
          $('#password-reset-form span.email-errors').text("這個是無效的email喔～");
        })
        .done(function(data){
          $('#sent-reset-email').text(resetEmail);
          $("#forget").modal("hide");
          $("#sent").modal("show");
        });
    }
  });
}


$("#password-reset-form button[type=submit]").click(function(event){
  event.preventDefault();
  submitResetPassword();
});

$('#password-reset-form #email').on('input',function(e){
  $('#password-reset-form div.form-group').removeClass("has-error");
  $('#password-reset-form span.email-errors').text("");
});

$('#password-reset-form #email').keypress(function(e){
  if(e.which == 13) {
    e.preventDefault();
    submitResetPassword();
  }
});

$("#password-reset-form button[type=cancel]").click(function(event){
  event.preventDefault();
  $("#forget").modal("hide");
});