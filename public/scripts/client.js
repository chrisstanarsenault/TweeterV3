$(document).ready(function() {
  let getDateFormat = function(milliseconds) {
    let datetime = milliseconds;
    let date = new Date(datetime);
    let options = {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    };

    let result = date.toLocaleDateString("en", options);
    return result;
  };

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
            <span class="posted-date">${getDateFormat(
              tweetData.created_at
            )}</span>
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
    $("#tweets-container").empty();
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
      $.ajax("/tweets/", { method: "POST", data: str }).then(function() {
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

  $(window).scroll(function() {
    if (pageYOffset >= 482) {
      $(".title").addClass("scrolled-past-header");
    } else if (pageYOffset < 482) {
      $(".title").removeClass("scrolled-past-header");
    }

    if (pageYOffset >= 820) {
      $(".header-tweet-button").addClass("header-tweet-button-hide");
      $("#scroll-to-top-button").addClass("scroll-to-top-active");
      $(".title").addClass("title-hide");
    } else if (pageYOffset < 820) {
      $(".header-tweet-button").removeClass("header-tweet-button-hide");
      $("#scroll-to-top-button").removeClass("scroll-to-top-active");
      $(".title").removeClass("title-hide");
    }
  });
});
