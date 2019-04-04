/* App scripts version 1.0.0 beta 1
-------------------------------------------------- */

(function ($) {

  /**
   * Show/hide hide an element
   */
  $('.toggle-modal').on('click', function (e) {
    var selector = $(this);
    var target = '#' + selector.attr('aria-controls');
    $('body').toggleClass('modal-open');
    // Set hidden true/false on target
    $(target).attr('hidden', function (_, attr) {
      return !attr
    });
    e.preventDefault();
  });


})(jQuery);