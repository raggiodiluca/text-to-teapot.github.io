$(document).ready(function () {
  $('.nav-click').on('click', function () {
    // get the month data attribute
    const month = $(this).data('month');
    // check that the clicked month is not the current active
    if (!$(`.month-container[data-month=${month}]`).hasClass('active')) {
      //reset all scrolls
      $(`.month-container[data-month=${month}]`).scrollTop(0);
      // hide all month containers
      $('.month-container').removeClass('active');
      // show the selected month container
      $(`.month-container[data-month=${month}]`).addClass('active');
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
    // find the active month container
    var activeMonth = $('.month-container.active');
    // scroll to the corresponding note title
    activeMonth.animate({
      scrollTop: $('#' + 'note-' + noteNumber).offset().top - activeMonth.offset().top + activeMonth.scrollTop() - 16
    }, 500);
  });




});
