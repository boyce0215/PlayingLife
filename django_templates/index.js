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
$("input").focus(function(){
  $(this).parent().addClass("has-focus");
});
$("input").blur(function(){
  $(this).parent().removeClass("has-focus");
});
$("#logout-button").click(function(){
  window.location.href = '/accounts/logout/';
});
$("button.answer-select[type=cancel]").click(function(event){
  event.preventDefault();
  $("#play-1").modal("hide");
  $("#play-2").modal("hide");
});

$("#play-form-current button.answer-select[type=submit]").click(function(event){
  event.preventDefault();
  var input = $("<input>")
   .attr("type", "hidden")
   .attr("name", "answer_select_current").val(
    $("span#option-answer-current").attr("value"));
  $('#play-form-current').append($(input));
  $("span#select-answer").text($("span#option-answer-current").text());
  $('#play-form-current').submit();
});
$("#play-form-previous button.answer-select[type=submit]").click(function(event){
  event.preventDefault();
  var input = $("<input>")
   .attr("type", "hidden")
   .attr("name", "answer_select_previous").val(
    $("span#option-answer-previous").attr("value"));
  $('#play-form-previous').append($(input));
  $("span#select-answer").text($("span#option-answer-previous").text());
  $('#play-form-previous').submit();
});
$("section#play button.answer-option").click(function(){
  $("span#option-answer-current").text($(this).text());
  $("span#option-answer-current").attr("value", $(this).attr("value"));
});
$("section#result button.answer-option").click(function(){
  $("span#option-answer-previous").text($(this).text());
  $("span#option-answer-previous").attr("value", $(this).attr("value"));
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

$("#sent button[type=submit]").click(function(event){
  event.preventDefault();
  $.post($('#password-reset-form').attr('action'), $('#password-reset-form').serialize())
    .always(function(data){
      $("#sent").modal("hide");
    });
});


// Countdown timer
var BaseCountdown = function () {
  this.settings = {
    dateStart: "",/*設定開始日期*/
    dateEnd: "",/*設定結束日期*/
    msgPattern: '<span> {hours} 小時 {minutes} 分  {seconds} 秒 後預測截止</span>',/*活動期間會出現的內容*/
    patterns: [{
      pattern: '{years}',
      seconds: 31536000,
    }, {
      pattern: '{months}',
      seconds: 2628000,
    }, {
      pattern: '{weeks}',
      seconds: 604800,
    }, {
      pattern: '{days}',
      seconds: 86400
    }, {
      pattern: '{hours}',
      seconds: 3600
    }, {
      pattern: '{minutes}',
      seconds: 60
    }, {
      pattern: '{seconds}',
      seconds: 1
    }],
    interval: 1000,
    now: new Date()
  };
};

BaseCountdown.prototype.run = function() {
  var remainingSeconds = Math.abs(
    (this.settings.now.valueOf() - this.settings.dateEnd.valueOf())/1000);
  var self = this;
  var timer = setInterval(function() {
    --remainingSeconds;
    if (remainingSeconds > 0) {
      self.display(remainingSeconds);
    } else {
      self.outOfInterval();
      clearInterval(timer);
    }
  }, self.settings.interval);
  self.display(remainingSeconds);
};

BaseCountdown.prototype.defineInterval = function() {
  for (var index = this.settings.patterns.length; index > 0; index--) {
    var currentPattern = this.settings.patterns[index - 1];

    if (this.settings.msgPattern.indexOf(currentPattern.pattern) !== -1) {
      this.settings.interval = currentPattern.seconds * 1000;
      return;
    }
  }
};

BaseCountdown.prototype.display = function(seconds) {
  var output = this.settings.msgPattern;
  for (var index = 0; index < this.settings.patterns.length; index++) {
    var currentPattern = this.settings.patterns[index];
    if (this.settings.msgPattern.indexOf(currentPattern.pattern) !== -1) {
      var number = Math.floor(seconds / currentPattern.seconds);
      seconds -= number * currentPattern.seconds;
      output = output.replace(currentPattern.pattern, number);
    }
  }
  for (var index = 0; index < this.settings.timerElement.length; index++) {
    this.settings.timerElement[index].innerHTML = output;
  }
};

BaseCountdown.prototype.outOfInterval = function() {
  this.settings.timeoutElement.css('display', 'inline-block');
  this.settings.optionElement.hide();
};

BaseCountdown.prototype.checkRun = function(timeUrl) {
  var self = this;
  $.get(timeUrl, function(data) {
    self.settings.dateStart = new Date(Date.parse(data.start_date));
    self.settings.dateEnd = new Date(Date.parse(data.end_date));
    self.defineInterval();
    self.settings.now < self.settings.dateEnd && self.settings.now > self.settings.dateStart ? self.run() : self.outOfInterval();
  });
};

var currentCountdown = new BaseCountdown();
currentCountdown.init = function() {
  this.settings.timerElement = $("#current-betting-countdown .timer");
  this.settings.optionElement = $("section#play button.answer-option");
  this.settings.timeoutElement = $("section#play .btn-timeout");
  this.checkRun("current-countdown-time/");
};

var previousCountdown = new BaseCountdown();
previousCountdown.init = function() {
  this.settings.timerElement = $("#previous-betting-countdown .timer");
  this.settings.optionElement = $("section#result button.answer-option");
  this.settings.timeoutElement = $("section#result .btn-timeout");
  this.checkRun("previous-countdown-time/");
};

currentCountdown.init();
previousCountdown.init();
