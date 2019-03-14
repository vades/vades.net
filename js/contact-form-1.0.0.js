/* Contatct form script version 1.0.0
-------------------------------------------------- */

(function ($) {

  /**
   * this is the id of the form
   */
  $("#contact_form").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');

    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(), // serializes the form's elements.
      // shows the loader element before sending.
      beforeSend: function () {
        $("#imgSpinner1").show();
      },
      // hides the loader after completion of request, whether successfull or failor.             
      complete: function () {
        $("#imgSpinner1").hide();
      },
      success: function (data) {
        $('body').append(setNotification('Submission was successful.', 'is-success'));
        $(form)[0].reset();
        setTimeout(function () {
          $("#notify").hide();
        }, 7000);
        console.log('Submission was successful.');
        console.log(data);
      },
      error: function (data) {
        $('body').append(setNotification('An error occurred.', 'is-danger'));
        console.log('An error occurred.');
        console.log(data);
      },
    });

  });
  /**
   * set notification
   */
  function setNotification(message, type) {
    return '<section id="notify" class="notify inverse ' + type + '">' + message + '</section>';
  }

  /**
   * hide notification
   */
  $(document).on('click', '#notify', function (e) {
    $(this).hide();
    e.preventDefault();
  });

  $(document).on('click', function (e) {
    if ($(e.target).closest("#notify").length === 0) {
      $("#notify").hide();
    }
  });


})(jQuery);