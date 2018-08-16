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

  function createTweetElement(tweet) {
    let $tweet = `
      <article>
        <header>
          <img src="${tweet.user.avatars.small}" alt="">
          <span id="user-name">${tweet.user.name}</span>
          <span id="user-handle">${tweet.user.handle}</span>
        </header>
        
        <p>${tweet.content.text}</p>
        
        <footer>
          <span>${tweet.created_at}</span>
        </footer>
      </article>
    `
    return $tweet
  }

  function renderTweets(tweets) {
    for (let tweet in tweets) {
      let $tweet = createTweetElement(tweets[tweet]);
      $('#tweet-container').append($tweet); 
    }
  }

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' }).then(function (text_JSON) {
      renderTweets(text_JSON);
    })
  }
  loadTweets();

  
  $('form').on('submit', function (event) {
    event.preventDefault();

    if ($('#text-field') === '') {
      alert('Please write something!');
    } else if ($('#text-field') > 140) {
      alert('Too many characters!');
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
});