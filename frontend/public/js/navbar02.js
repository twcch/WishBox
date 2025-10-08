$(document).ready(function () {
    $(".dropdown").each(function (index, element) {
      var $this_menu = $(element);
      $this_menu.find('.dropdown-menu a').last().focusout(function () {
        $this_menu.removeClass('show');
        $this_menu.find('.dropdown-menu').removeClass('show');
      });
    });
  });

  /*透明->下拉->出現顏色*/
  var lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (lastScrollTop < 10) {
      
      $("#menu").removeClass("nav_down_bg");

    } else {
      $("#menu").addClass("nav_down_bg");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 重置滚动位置
  }, false);


  var count = 0;
  $(".hamburger").click(function () {
    //漢堡點開變黑色，關閉變白色
    count += 1;
    if (count % 2 != 0) {
      $('.hamburger span').css('background-color', '#000000');
    } else {
      $('.hamburger span').css('background-color', '#ffffff');
    }

  })

  function openSearch() {
    document.getElementById("myOverlay").style.display = "block";
  }

  function closeSearch() {
    document.getElementById("myOverlay").style.display = "none";
  }