$(document).ready(function() {

  const tweetText = document.getElementById('tweet-text');

  $('#tweet-text').on('input', function() {
    let inputLength = $(this).val().length;
    let counterElement = $(this).siblings('.tweet-button-counter').find('.tweet-counter');
    let counterValue = 140 - inputLength;

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


