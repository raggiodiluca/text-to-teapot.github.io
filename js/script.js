$(document).ready(function () {
  $('.nav-click, #top-title').on('click', function () {
    // get the text data attribute
    const text = $(this).data('text');
    // check that the clicked text is not the current active
    if (!$(`.text-container[data-text=${text}]`).hasClass('active')) {
      //reset all scrolls
      $(`.text-container[data-text=${text}]`).scrollTop(0);
      // hide all text containers
      $('.text-container').removeClass('active');
      // show the selected text container
      $(`.text-container[data-text=${text}]`).addClass('active');
    }
  });

  $('.nav-click, #top-title').on('click', function () {
    if (!$(this).hasClass('extras')) {
      var $sublinksContainer = $(this).parent().find('.sublinks-container');
      var sublinksContainerHeight = $sublinksContainer[0].scrollHeight;
    }
    if (!$(this).hasClass('active')) {
      // If this nav-click element is not active, close any other active nav-click elements and open this one
      
        $('.nav-click.active').removeClass('active');
        $('.nav-click-wrapper .sublinks-container').css('max-height', 0);
        $sublinksContainer.css('max-height', sublinksContainerHeight + 'px');
      
      $(this).addClass('active');
    }
  });

  $('.sublink').on('click', function () {
    // get the corresponding note number from the sublink's text
    var noteNumber = $(this).text().replace(/\[|\]/g, '');
    // find the active text container
    var activeText = $('.text-container.active');
    // scroll to the corresponding note title
    var rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
var scrollTopOffset = 2 * rem;
activeText.animate({
  scrollTop: activeText.find('[data-note-number="' + noteNumber + '"]').offset().top - activeText.offset().top + activeText.scrollTop() - scrollTopOffset
}, 500);

  });


// Next text container switch

$('.next-link').on('click', function () {
  // get the current active text container
  const currentContainer = $('.text-container.active');
  // get the next text container
  const nextContainer = currentContainer.next('.text-container');
  // if there is a next text container
  if (nextContainer.length) {
    // get the text data attribute of the next text container
    const text = nextContainer.data('text');
    // hide all text containers
    $('.text-container').removeClass('active');
    // show the selected text container
    $(`.text-container[data-text=${text}]`).addClass('active');
    // reset all scrolls
    nextContainer.scrollTop(0);
    // close any previously opened .sublinks-container
    $('.nav-click-wrapper .sublinks-container').css('max-height', 0);
    // open the corresponding month's nav-click-wrapper
    $(`.nav-click[data-text=${text}]`).closest('.nav-click-wrapper').find('.nav-click').click();
  }
});











});

$(document).ready(function () {

  var imageCache = []; // array to store cached images

  $('.text-container a[data-tooltip*="img"]').each(function () {
    var imgUrl = $(this).find('img').attr('src');
    var img = new Image();
    img.src = imgUrl;
    imageCache.push(img);
  });

  $('.text-container a').on('mouseenter', function (e) {
    // create the tooltip box
    var tooltip = $('<div class="tooltip"></div>');
    // check if the link has a tooltip attribute
    if ($(this).data('tooltip')) {
      // add the tooltip text
      var text = $('<span class="text"></span>');
      text.text($(this).data('tooltip'));
      tooltip.append(text);
      // check if the tooltip contains an image
      if ($(this).find('img').length) {
        // add the image to the tooltip
        var imgContainer = $('<span class="tooltip-image"></span>');
        var img = $(this).find('img').clone();
        imgContainer.append(img);
        tooltip.prepend(imgContainer);
      }
      // add the tooltip to the page
      $('body').append(tooltip);
      // position the tooltip above the link

      var linkOffset = $(this).offset();
      var linkWidth = $(this).outerWidth();
      var linkHeight = $(this).outerHeight();
      var tooltipWidth = tooltip.outerWidth();
      var tooltipHeight = tooltip.outerHeight();
      var top = Math.max(e.pageY - tooltipHeight, 0); // make sure top is not less than 0
      var left = e.pageX; // use mouse position for left coordinate
      if (left + tooltipWidth > $(window).width()) {
        left = $(window).width() - tooltipWidth;
      }


      tooltip.css({
        top: top,
        left: left,
        visibility: 'visible',
        opacity: 1
      });
    }
  }).on('mouseleave', function () {
    // remove the tooltip from the page
    $('.tooltip').fadeOut(100, function () {
      $(this).remove();
    });
  });


});


// Audio player

$(document).ready(function () {
  var audio = null; // keep track of the currently playing audio element

  $('.audio').on('click', function () {
    var audioFile = $(this).data('audio-file');
    var newAudio = new Audio(audioFile);

    // stop any previously playing audio
    if (audio !== null) {
      audio.pause();
    }

    // set the new audio as the currently playing audio
    audio = newAudio;

    // play the new audio after a delay of 1 second
    setTimeout(function () {
      newAudio.play();
    }, 1000);
  });

});