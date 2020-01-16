$(document).ready(function() {
  const createTweetElement = function(tweetData) {
    let html = $(`<article class="tweet">
          <header>
            <img src="${tweetData.user.avatars}" alt="avatar" />
            <span>${tweetData.user.name}</span>
            <span class="handle">${tweetData.user.handle}</span>
          </header>

          <main>
            <span>${tweetData.content.text}</span>
          </main>

          <footer>
            <span class="posted-date">${tweetData.created_at}</span>
            <span class="social-flags">
              <a href="#"><i class="fas fa-flag"></i></a>
              <a href="#"><i class="fas fa-retweet"></i></a>
              <a href="#"><i class="fas fa-heart"></i></a>
            </span>
          </footer>
        </article>`);

    return html;
  };

  const renderTweets = function(tweets) {
    tweets.forEach(e => {
      let $tweet = createTweetElement(e);
      $("#tweets-container").prepend($tweet);
    });
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  };

  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    let str = $(this).serialize();
    if ($("textarea").val().length > 10) {
      alert("Easy on the words cowboy. To many characters");
    } else if ($("textarea").val() === "" || $("textarea").val() === null) {
      alert(
        "Tweet tweet, try actually tweeting something!  Don't leave this blank!"
      );
    } else {
      $.ajax("/tweets/", { method: "POST", data: str }).then(function(tweet) {
        console.log("Success: ", tweet);
        loadTweets(tweet);
        $("textarea").val("");
      });
    }
  });

  const loadTweets = function() {
    $.ajax("/tweets/", { method: "GET" }).then(function(tweet) {
      renderTweets(tweet);
    });
  };

  loadTweets();
});
