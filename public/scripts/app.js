/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.
  // const tweetData = [{
  //   "user": {
  //     "name": "Newton",
  //     "avatars": {
  //       "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //       "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //     },
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // },
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": {
  //         "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //         "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //       },
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   }
  // ];

  // Loads tweets from server
  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' }).then(function (text_JSON) {
      renderTweets(text_JSON);
    })
  }
  loadTweets();

  // Create tweet element dynamically and append to index.HTML
  function createTweetElement(tweet) {
    let todaysDate = new Date();
    let tweetDate = new Date(tweet.created_at);
    let tweetAge = Math.floor((todaysDate - tweetDate) / (1000 * 60 * 60 * 24));
    let $tweet = `
      <article>
        <header>
          <img src="${tweet.user.avatars.small}" alt="">
          <span id="user-name">${tweet.user.name}</span>
          <span id="user-handle">${tweet.user.handle}</span>
        </header>
        
        <p>${tweet.content.text}</p>
        
        <footer>
          <span>${tweetAge} days ago </span>
        </footer>
      </article>
    `
    return $tweet
  }

  // Renders tweet history after every tweet or page load
  function renderTweets(tweets) {
    for (let tweet in tweets) {
      let $tweet = createTweetElement(tweets[tweet]);
      $('#tweet-container').append($tweet); 
    }
  }

  // Submit tweet after validation 
  $('form').on('submit', function (event) {
    event.preventDefault();

    if ($('#text-field') === '') {
      displayErrorMessage('cannot be empty')
    } else if ($('#text-field') > 140) {
      displayErrorMessage('must be less than 140 characters')
    } else {
      let text = $('#text-field').serialize();
      $.post('/tweets', text).done(function (data) {
        let newTweet = createTweetElement(data);
        console.log(newTweet);
        $('#tweet-container').prepend(newTweet);
        $('#text-field').val('');
      });
    };
  });
  
  function displayErrorMessage(message) {
    $('#error-message').slideUp();
    $('#error-message').text(message).css('display', 'block');
  }

  // Compose button - toggle composition field to display or disappear
  $(function () {
    $("#compose-button").on("click", function (event) {
      if ($(".new-tweet").css("display") === "none") {
        $(".new-tweet").slideDown("fast");
        $("#text-field").focus();
      } else {
        $(".new-tweet").slideUp("fast");
      }
    });
  });
});