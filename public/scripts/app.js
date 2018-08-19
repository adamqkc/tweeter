/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function () {
  // Loads tweets from server
  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).done(function (tweets) {
      renderTweets(tweets);
    })
  }
  loadTweets();

  // Renders tweet history after every tweet or page load
  function renderTweets(tweets) {
    for (let tweet in tweets) {
      let $tweet = createTweetElement(tweets[tweet]);
      $('#tweet-container').prepend($tweet);
    }
  }
  
  // Create tweet element dynamically and append to index.HTML
  function createTweetElement(tweet) {
    let todaysDate = new Date();
    let tweetDate = new Date(tweet.created_at);
    let tweetAge = Math.floor((todaysDate - tweetDate) / (1000 * 60 * 60 * 24));
    let $tweet = `
      <article id='tweet-article'>
        <header>
          <img src='${escape(tweet.user.avatars.small)}' alt='>
          <span id='user-name'>${escape(tweet.user.name)}</span>
          <span id='user-handle'>${escape(tweet.user.handle)}</span>
        </header>
        
        <p>${escape(tweet.content.text)}</p>

        <footer>
          <span>${escape(tweetAge)} days ago </span>
          <div id='icons'>
            <i class='fas fa-heart'></i>
            <i class='fas fa-share'></i>
            <i class='fas fa-flag'></i>
          </div>
        </footer>
      </article>
    `
    return $tweet
  }

  // Sends POST requets with tweet message after message validation
  $('form').on('submit', function (event) {
    event.preventDefault();
    
    if ($('#text-field').val() === '') {
      displayErrorMessage('Cannot be empty');
    } else if ($('#text-field').val().length > 140) {
      displayErrorMessage('Must be less than 140 characters');
    } else {
      $('#error-message').css('display', 'none');
      let text = $('#text-field').serialize();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: text,
      }).done(function (data) {
        let tweet = createTweetElement(data);
        $('#tweet-container').prepend(tweet);
        $('#text-field').val('');
      })
    };
  });
  
  // Display error message if tweet is invalid
  function displayErrorMessage(message) {
    $('#error-message').text(message).slideUp().css('display', 'block');
  }

  // Compose button - toggle to show composition field
  $('#compose-button').on('click', function (event) {
    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').slideDown('fast');
      $('#text-field').focus();
    } else {
      $('.new-tweet').slideUp('fast');
    }
  });

  // Escapes dangerous scripts
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
});