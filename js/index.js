$(window).scroll(function(event){
  if($(this).scrollTop()>0){
    $(".navbar").removeClass("navbar-top");
  }else{
    $(".navbar").addClass("navbar-top");
  }
  
  if($(this).scrollTop()>200){
    $("#backToTop").stop().fadeTo('fast',1);
  }else{
    $("#backToTop").stop().fadeOut('fast');
  }
});

if($(window).width()<768){
  $(".skill-bar .content").collapse('show');
}else{
  $(".skill-bar .content").collapse('hide');
  $(".skill-bar").mouseover(function(){
    $(this).find(".content").collapse('show');
  });
  $(".skill-bar").mouseout(function(){
    $(this).find(".content").collapse('hide');
  });
}


$("#backToTop").click(function(){
  $("html,body").animate({
    scrollTop:0
  },1000);
});
$("#login a").click(function(){
  $("#login").modal("hide");
  $("#register").modal("show");
});
$("#register a").click(function(){
  $("#register").modal("hide");
  $("#login").modal("show");
});
window.onload = function(){
  $('.work-items').isotope({
    massonry:{
      columnWidth: 0
    },
    itemSelector:'.work-item'
  });
  $(".navbar-nav a").on("click",function (event){
    if(this.hash != ""){ //如果網頁的＃值不是空的時
      event.preventDefault();
      var hash = this.hash;
      $("html,body").animate({ //.animate({styles},speed,easing,callback)
        scrollTop:$(hash).offset().top},//移動到#hash的座標的top值
        900,
        function(){window.location.hash = hash;
      });
    }
  });
};
// $(".skill-bar").mouseover(function(){
//   $(this).find(".content").collapse('show');
// });
// $(".skill-bar").mouseout(function(){
//   $(this).find(".content").collapse('hide');
// });
$('.filter-menu li').on('click', function() {
  var filterValue = $( this ).attr('data-filter');
  $('.work-items').isotope({ filter: filterValue });
  $(this).toggleClass('active');
  $(this).siblings(".active").removeClass('active');
});