$(document).ready(function() {
  const $characterCount = $("#character-count");
  //escape function
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //render tweet data to html template
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };
  //create hmtl template for tweets
  const createTweetElement = function(tweet) {
    let $tweet = $(`
    <article>
        <header>
            <span>
                <img src="${(tweet.user.avatars)}" alt="avatar">
                <p>${(tweet.user.name)}</p>
            </span>
            <p>${(tweet.user.handle)}</p>
        </header>
        <p id="tweet-input">
            ${escape(tweet.content.text)}
        </p>
        <footer>
            <p>${timeago.format(new Date(tweet.created_at))}</p>
            <div>
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
            </div>
        </footer>
   </article>
  `);
    return $tweet;
  };

  //event listener for submit
  $("#tweet-form").on("submit", function(event) {
    //prevent default form submission behaviour
    event.preventDefault();
    //reset character count to 140 on submission
    $characterCount.text('140');

    $(".form-error").slideUp();
    //implement validation logic
    const tweetVal = $("#tweet-text").val();
    console.log(tweetVal);
    //reject empty tweet
    if (!tweetVal) {
      $("#form-empty").slideDown();
      return;
    }
    //reject tweet over 140 characters
    if (tweetVal.length > 140) {
      $("#form-limit").slideDown();
      return;
    }
    //serialize tweet data
    const serializedData = $(this).serialize();
    console.log("serialized tweet data:", serializedData);


    //ajax POST request
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: serializedData,
    })
      .then((response) => {
        $("#tweet-text").val("");
        loadTweets();
        console.log("response:", response);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  });

  //load tweets function
  const loadTweets = function() {
    //ajax GET request
    $.ajax({
      type: "GET",
      url: "/tweets",
    })
      .then(function(tweets) {
        $("#tweets-container").empty();
        renderTweets(tweets);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
  loadTweets();
});
