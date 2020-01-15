$(document).ready(function() {
  let counter = 140;
  let textCount = 0;

  $("textarea").keyup(function() {
    textCount = this.value.length;
    $(".counter").text(counter - textCount);

    if (textCount > 140) {
      $("#counter").addClass("counterRed");
    } else {
      $("#counter").removeClass("counterRed");
    }
  });
});
