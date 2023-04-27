/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// {/* 
//  const $avatarName = $('<div>');
//   $avatarName.text('<img src="https://i.imgur.com/73hZDYK.png"><div>Newton</div>');
//   $avatarName.addClass('avatar-name');

//   const $handle = $('<div>');
//     $handle.text('@SirIsaac');
//     $handle.addClass('handle');

//   const $tweetBody = $('<p>');
//     $tweetBody.text('If I have seen further it is by standing on the shoulders of giants');
//     $tweetBody.addClass('tweet-body');

//   const $daysAgo = $('<div>');
//     $daysAgo.text('10 days ago');
//     $daysAgo.addClass('days-ago'); */}

$(document).ready(() => {

  // function to protect against XSS

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // retrieve tweets section from DOM

  const $tweetSection = $('#tweets-container');

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

  const renderTweets = (arrOfTweets) => {

    for (const tweet of arrOfTweets) {
      const $tweetElement = createTweetElement(tweet);
      $tweetSection.prepend($tweetElement);
    }
  };

  // renderTweets();

  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).then((tweets) => {
      renderTweets(tweets)
    });
  };
  loadTweets();

  const $form = $('#new-tweet');

  $form.on('submit', (event) => {
    event.preventDefault();
    const data = $form.serialize();
    const tweetText = $('#tweet-text').val(); //gives us the value of the text input

    if (!tweetText) {

      return alert('You must type something to tweet it!');

    } else if (data.length > 140) {

      return alert('You have typed too many characters. Max length is 140 characters');
    }

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: data
    }).then(() => {
      $('#tweet-text').val(''); // clears the textarea after a post
      loadTweets();
    });
  });

});

