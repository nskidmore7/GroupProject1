$(".carousel.carousel-slider").carousel({
    fullWidth: true,
    duration: 100,
  });
  setInterval(function () {
    $(".carousel").carousel("next");
  }, 8000);
  
  //   $('.carousel').carousel({
  //     padding: 200
  // });
  // autoplay();
  // function autoplay() {
  //     $('.carousel').carousel('next');
  //     setTimeout(autoplay, 4500);
  // }
  