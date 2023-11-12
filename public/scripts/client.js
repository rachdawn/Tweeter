/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    //Fake data taken from initial-tweets.json
    // const data = [
    //     {
    //         user: {
    //             name: "Newton",
    //             avatars: "https://i.imgur.com/73hZDYK.png",
    //             handle: "@SirIsaac",
    //         },
    //         content: {
    //             text: "If I have seen further it is by standing on the shoulders of giants",
    //         },
    //         created_at: 1461116232227,
    //     },
    //     {
    //         user: {
    //             name: "Descartes",
    //             avatars: "https://i.imgur.com/nlhLi3I.png",
    //             handle: "@rd",
    //         },
    //         content: {
    //             text: "Je pense , donc je suis",
    //         },
    //         created_at: 1461113959088,
    //     },
    // ];

    const renderTweets = function(tweets) {
        for (const tweet of tweets) {
            const $tweet = createTweetElement(tweet);
            $("#tweets-container").append($tweet);
        };
    };

    const createTweetElement = function(tweet) {
        let $tweet = $(`
    <article>
        <header>
            <span>
                <img src="${tweet.user.avatars}" alt="avatar">
                <p>${tweet.user.name}</p>
            </span>
            <p>${tweet.user.handle}</p>
        </header>
        <p id="tweet-input">
            ${tweet.content.text}
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
        console.log(tweet);
        return $tweet;
    };
    //render tweets in #tweets-container
    //renderTweets(data);

    //event listener for submit
    $("#tweet-form").on("submit", function(event) {
        //prevent default form submission behaviour
        event.preventDefault();
        //implement validation logic
        const tweetVal = $("#tweet-text").val();
        console.log(tweetVal);
        //reject empty tweet
        if (!tweetVal) {
            alert("Error: Can't submit empty Tweet.");
            return;
        }
        //reject tweet over 140 characters
        if (tweetVal.length > 140) {
            alert("Error: Your tweet exceeds the 140 character limit.");
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
            .then(function() {
                loadTweets();
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

// Get the form data
// $.POST('/tweets', $(this).serialize(), function(data) {
//     $('.result').html(data);
// })

// // Make an AJAX request
// $.ajax({
//   type: "POST", // or "GET" depending on your server-side implementation
//   url: 'http://localhost:8080/', // Specify the URL to which you want to send the data
//   data: data,
//   success: function(response) {
//     // Handle the successful response from the server
//     console.log("Form submitted successfully");
//     console.log(response);

//     // You can update the DOM or perform other actions based on the server response
//   },
//   error: function(error) {
//     // Handle errors that occurred during the AJAX request
//     console.error("Error submitting form:", error);
//   },
// });
