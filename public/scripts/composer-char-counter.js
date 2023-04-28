$(document).ready(function() {

  $('#tweet-text').on('input', function() {
    const inputLength = $(this).val().length;
    const counterElement = $(this).siblings('.tweet-button-counter').find('.tweet-counter');
    const counterValue = 140 - inputLength;

    counterElement.text(counterValue);

    // console.log('Characters left:', counterValue);
    if (counterValue < 0) {
      counterElement.addClass('negative');
      // console.log('Negative value:', counterValue);
    } else {
      counterElement.removeClass('negative');
    }

  });

});


