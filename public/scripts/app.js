/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = [{
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    }
  ];

    
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
  renderTweets(tweetData);

  // $("form").on("submit", function (event) {
  //   event.preventDefault();
  //   if ($("#textInput").val() === "") {
  //     $("#errorMessage").text("Sorry, you can't submit an empty tweet!").slideDown().css("display", "block");
  //     return false;
  //   }
  //   if ($("#textInput").val().length > 140) {
  //     $("#errorMessage").text("Sorry, you can't submit a tweet that's longer than 140 characters!").slideDown().css("display", "block");
  //     return false;
  //   }
  //   $("#errorMessage").slideUp();
  //   var input = $("#textInput").serialize();

  //   $.post("/tweets", input)
  //     .done(function (data) {
  //       var newTweet = createTweetElement(data);
  //       $("#tweet-container").prepend(newTweet);
  //       $("#textInput").val('');
  //     });
  // });
  

  // Tweet button is disabled by default until user gives input
  // $('#tweet-button').prop('disabled', true);

  // if ($('#text-field').val().length > 0 && $('#text-field').val().length > 140)


  $('form').on('submit', function (event) {
    event.preventDefault();

    if ($('#text-field') === '') {
      alert('Please write something!');
    } else if ($('#text-field') > 140) {
      alert('Too many characters!');
    } else {
      let text = $('#text-field').serialize();
      $.post('/tweets', text).done(function (data) {
        var newTweet = createTweetElement(data);
        $('#tweet-container').prepend(newTweet);
        $('#text-field').val('');
      });
    };
  });
  
});