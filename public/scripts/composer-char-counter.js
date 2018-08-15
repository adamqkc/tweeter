$(document).ready(function () {
  $('.new-tweet form textarea').on('input', function() {
    let text = $('.new-tweet form textarea').val();
    let charRemaining = 140 - text.length;
    let counter = $(this).siblings('.counter');
    
    counter.html(charRemaining);

    if (charRemaining < 0) {
      counter.addClass('invalid');
    } else {
      counter.removeClass('invalid');
    }
  });
});