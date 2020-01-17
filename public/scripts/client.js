$(document).ready(function() {
  const createTweetElement = function(tweetData) {
    function escape(str) {
      let span = document.createElement("div");
      span.appendChild(document.createTextNode(str));
      return span.innerHTML;
    }

    const safeHTML = `<p>${escape(tweetData.content.text)}</p>`;

    let html = $(`<article class="tweet">
          <header>
            <img src="${tweetData.user.avatars}" alt="avatar" />
            <span>${tweetData.user.name}</span>
            <span class="handle">${tweetData.user.handle}</span>
          </header>

          <main>
            ${safeHTML}
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
    if ($("textarea").val().length > 140) {
      $("#tweet-error-container").slideDown("fast");
      $(".error-message").text(
        "Whoaaaaa too many characters!!  Ez there cowboy!"
      );
    } else if ($("textarea").val() === "" || $("textarea").val() === null) {
      $("#tweet-error-container").slideDown("fast");
      $(".error-message").text(
        "Tweet tweet, try actually tweeting something!  Don't leave this blank!"
      );
    } else {
      $.ajax("/tweets/", { method: "POST", data: str }).then(function(tweet) {
        $("#tweet-error-container").slideUp("slow");
        $(".error-message").text("");
        loadTweets();
        $("textarea").val("");
        $(".counter").text(140);
      });
    }
  });

  const loadTweets = function() {
    $.ajax("/tweets/", { method: "GET" }).then(function(tweet) {
      renderTweets(tweet);
    });
  };

  loadTweets();

  $(".header-tweet-button").click(function() {
    $(".new-tweet").slideToggle("slow");
    $("textarea").val("");
    $(".counter").text(140);
    $("#tweet-error-container")
      .slideUp("fast")
      .text("");
  });
});
