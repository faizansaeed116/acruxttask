function showFieldError(field, type, msg) {
    if (type == "date") {
        field.parent().children('._validation-invalid-label').remove();
        field.closest(".form-group-main").addClass("has-error");
        field.parent().append(`<span class="form-text _validation-invalid-label text-danger">` + msg + `</span>`);
    } else {
        field.parent().children('._validation-invalid-label').remove();
        field.closest(".form-group").addClass("has-error");
        field.parent().append(`<span class="form-text _validation-invalid-label text-danger">` + msg + `</span>`);
    }
}

function removeFieldError(field, type) {
    if (type == "date") {
        field.parent().children('._validation-invalid-label').remove();
        field.closest(".form-group-main").removeClass("has-error");
    } else {
        field.parent().children('._validation-invalid-label').remove();
        field.closest(".form-group").removeClass("has-error");
    }
}

function resetFormFields(form) {
    $(form + ' input, ' + form + ' select, ' + form + ' textarea').each(
        function (index) {
            var input = $(this);
            var tagName = input.prop("tagName");
            var inputName = input.prop("name");
            var inputType = input.prop("type");

            if (tagName == 'INPUT') {
                if (inputType == "checkbox") {
                    $("input[name='" + inputName + "']").bootstrapSwitch('state', true);
                } else {
                    $("input[name='" + inputName + "']").val("");
                }

                $("input[name='" + inputName + "']").parent().children('._validation-invalid-label').remove();
            } else if (tagName == 'SELECT') {
                var SelectInputValue = 0;
                $("select[name='" + inputName + "']").val(SelectInputValue).trigger('change');
                $("select[name='" + inputName + "']").parent().children('._validation-invalid-label').remove();
            } else if (tagName == 'TEXTAREA') {
                $("textarea[name='" + inputName + "']").val("");
                $("textarea[name='" + inputName + "']").parent().children('._validation-invalid-label').remove(); input.closest(".has-error").removeClass(".has-error");
            }

            input.closest(".has-error").removeClass("has-error");
        }
    );
}