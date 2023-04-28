/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  // function to protect against XSS

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // retrieve tweets section from DOM

  const $tweetSection = $('#tweets-container');

  // Dynamically render tweets; includes escape function

  const createTweetElement = (tweet) => {
    const $tweetElement = $(`
    <article class="tweet-container"> 
    <header class="tweet-header">
      <div class="avatar-name">
        <img src=${escape(tweet['user'].avatars)}"><div>${escape(tweet['user'].name)}</div>
      </div>
      <div class="handle">
        <p>${escape(tweet['user'].handle)}</p>
      </div>
    </header>
    <p class="tweet-body">${escape(tweet['content'].text)}</p>
    <footer class="tweet-footer">
      <div class="days-ago">${escape(timeago.format(tweet.created_at))}</div>
      <div class="emojis">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
    `);

    return $tweetElement;
  };

  // Rending tweets and adding the newest ones to the top of the array

  const renderTweets = (arrOfTweets) => {

    for (const tweet of arrOfTweets) {
      const $tweetElement = createTweetElement(tweet);
      $tweetSection.prepend($tweetElement);
    }
  };


  // Fetch tweets

  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).then((tweets) => {
      renderTweets(tweets);
    });
  };
  loadTweets();

  // Event handler to detect when new tweet is being typed

  const $form = $('#new-tweet');

  $form.on('submit', (event) => {
    event.preventDefault();
    const data = $form.serialize();
    const tweetText = $('#tweet-text').val(); //gives us the value of the text input

    if (!tweetText) {

      return $('#error-container').html('⚠ Cat got your tongue? Type something to tweet! ⚠').slideDown();

    } else if (data.length > 140) {

      return $('#error-container').html('⚠ Say less, bestie ⚠').slideDown();
    }

    // POST route to add newest tweets to top of list without refreshing page

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: data
    }).then(() => {
      $('#tweet-text').val(''); // clears the textarea after a post
      $('.tweet-counter').text('140');
      loadTweets();
      $('#error-container').slideUp(); //to hide error message after a new post
    });
  });

});

