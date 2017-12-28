/*倒數器開始*/
var cset, countdown1 = {
  settings: {
    dateStart: new Date('Dec 28, 2017 00:00:00'),/*設定開始日期*/
    dateEnd: new Date('Dec 29, 2017 00:00:00'),/*設定結束日期*/
    elements: document.querySelectorAll(".timer"),/*設定哪一個選擇器*/
    msgBefore: "活動已結束!",/*開始日期前會出現的內容*/
    msgAfter: "活動未開始!",/*結束日期後會出現的內容*/
    msgPattern: '<span> {hours} 小時 {minutes} 分  {seconds} 秒 後預測截止</span>',/*活動期間會出現的內容*/
    patterns: [{
      pattern: '{years}',
      secs: 31536000,
    }, {
      pattern: '{months}',
      secs: 2628000,
    }, {
      pattern: '{weeks}',
      secs: 604800,
    }, {
      pattern: '{days}',
      secs: 86400
    }, {
      pattern: '{hours}',
      secs: 3600
    }, {
      pattern: '{minutes}',
      secs: 60
    }, {
      pattern: '{seconds}',
      secs: 1
    }],
    interval: 1000,
    now: new Date()
  },

  init: function() {
    cset = this.settings;
    this.defineInterval();
    cset.now < cset.dateEnd && cset.now > cset.dateStart ? this.run() : this.outOfInterval();
  },

  run: function() {
    var nowTS = cset.now.valueOf() / 1000,
      tarTS = cset.dateEnd.valueOf() / 1000,
      sec = Math.abs(tarTS - nowTS);

    var timer = setInterval(function() {
      sec--;

      if (sec > 0) {
        countdown1.display(sec);

      } else {
        countdown1.outOfInterval();
        clearInterval(timer);
      }
    }, cset.interval);

    countdown1.display(sec);
  },

  defineInterval: function() {
    for (var i = cset.patterns.length; i > 0; i--) {
      var currentPattern = cset.patterns[i - 1];

      if (cset.msgPattern.indexOf(currentPattern.pattern) !== -1) {
        cset.interval = currentPattern.secs * 1000;
        return;
      }
    }
  },

  display: function(sec) {
    var output = cset.msgPattern;

    for (var i = 0, len = cset.patterns.length; i < len; i++) {
      var currentPattern = cset.patterns[i];

      if (cset.msgPattern.indexOf(currentPattern.pattern) !== -1) {
        var number = Math.floor(sec / currentPattern.secs);
        sec -= number * currentPattern.secs;
        output = output.replace(currentPattern.pattern, number);
      }
    }

    for (var i = 0, len = cset.elements.length; i < len; i++)
      cset.elements[i].innerHTML = output;
  },

  outOfInterval: function() {
    var message = cset.now > cset.dateStart ? cset.msgBefore : cset.msgAfter;
    for (var i = 0, len = cset.elements.length; i < len; i++)
      cset.elements[i].innerHTML = message;
  }
}
countdown1.init();
/*倒數器結束*/

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
$("#forget #goto-sent").click(function(){
  $("#forget").modal("hide");
  $("#sent").modal("show");
});
$("#sent .btn").click(function(){
  $("#sent").modal("hide");
  $("#reset-password").modal("show");
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
      $('#register-email').addClass("has-error");
      $('#register-form span.email-errors').text("這個帳號已經被註冊過囉～");
    }
  });

});
