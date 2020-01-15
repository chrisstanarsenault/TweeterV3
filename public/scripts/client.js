/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  };

  function createTweetElement(tweetData) {
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
  }

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
