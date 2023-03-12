$(document).ready(function () {
  $('.nav-click').on('click', function () {
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

  $('.nav-click').on('click', function () {
    var $sublinksContainer = $(this).parent().find('.sublinks-container');
    var sublinksContainerHeight = $sublinksContainer[0].scrollHeight;
    if (!$(this).hasClass('active')) {
      // If this nav-click element is not active, close any other active nav-click elements and open this one
      $('.nav-click.active').removeClass('active');
      $('.nav-click-wrapper .sublinks-container').css('max-height', 0);
      $(this).addClass('active');
      $sublinksContainer.css('max-height', sublinksContainerHeight + 'px');
    }
  });

  $('.sublink').on('click', function () {
    // get the corresponding note number from the sublink's text
    var noteNumber = $(this).text().replace(/\[|\]/g, '');
    // find the active text container
    var activeText = $('.text-container.active');
    // scroll to the corresponding note title
    activeText.animate({
      scrollTop: activeText.find('[data-note-number="' + noteNumber + '"]').offset().top - activeText.offset().top + activeText.scrollTop() - 16
    }, 500);
});




});
