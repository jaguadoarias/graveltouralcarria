$(function () {
    'use strict';

    var btnSubmit = $('button[type=submit]');

    btnSubmit.click(function (e) {
        var forms = $(this).closest('form.needs-validation');
        forms.on('submit', function onSubmit(event) {
            const form = $(this);
            var actionInput = $(this).find("input[name='action']");

            if (!form[0].checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                forms.find('.submit_form').html('Sending...');
                forms.find('.btn_submit-subscribe').html('Sending...');
                const toast = new bootstrap.Toast($('.success_msg')[0]);
                const errtoast = new bootstrap.Toast($('.error_msg')[0]);
                var formData = forms.serialize();
                $.ajax({
                    type: "POST",
                    url: "php/form_process.php",
                    data: formData,
                    success: function (response) {
                        if (response == 'success') {
                            if (actionInput.length > 0) {
                                forms.find('.btn_submit-subscribe').html('Subscribe');
                                const toast_subscribe = new bootstrap.Toast($('.success_msg_subscribe')[0]);
                                toast_subscribe.show();
                            } else {
                                toast.show()
                                forms.find('.submit_form').html('Send Message');
                            }
                        } else {
                            console.log(response);
                            errtoast.show()
                            forms.find('.submit_form').html('Send Message');
                            forms.find('.btn_submit-subscribe').html('Subscribe');
                        }
                    }
                });
            }

            form.addClass('was-validated');
        });
    });
});