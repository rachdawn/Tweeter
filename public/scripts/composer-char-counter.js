$(document).ready(function () {
  // --- our code goes here ---
  const $tweetText = $("#tweet-text");
  const $characterCount = $("#character-count");

  $("#tweet-text").on("input", function () {
    const text = $tweetText.val();
    const count = text.length;
    // update counter
    $characterCount.text(140 - count);
    // change to red if less than 0
    if (count > 140) {
        $characterCount.addClass('character-limit');
    } else {
        $characterCount.removeClass('character-limit');
    }
  });
});

