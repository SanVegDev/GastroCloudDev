$(function () {
    $('.sys-select').click(function () {
        system = $(this).attr('data-sys');
        $('#sys-view').addClass('hidden');
        $('#login-view').removeClass('hidden');
        $('#user').trigger('focus');
    });
    $('#btn-back').click(function () {
        system = '';

        $('#login-view').addClass('hidden');
        $('#sys-view').removeClass('hidden');
    });

   

    $('#btn-login').click(function () {
        login();
    });

    $('.btn-logout').click(function () {
        $('.bgring').show();
        window.location.href = $("#urlGC").val() + '/Login/Index';
    });

    $(".login-key").on('keyup', function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            login();
        }
    });
});

var system = '';
function login() {
    if (isNullOrEmpty(system)) {
        //If system is null return to sys view.
        $('#btn-back').click();
        return;
    }
    if ($('#user').val() == "" || $('#password').val() == "") {
        alertify.error("por favor, ingresa tu usuario y contraseña");
        return;
    }
    $('.bgring').show();
    $.ajax({
        type: 'POST',
        url: $("#urlGC").val() + "/Login/Login",
        data: {
            sys: system,
            user: $('#user').val(),
            password: $('#password').val()
        },
        success: function (data) {
            if (data.success) {
                window.location.href = $("#urlGC").val() + data.path;
            } else {
                $(".bgring").hide();
                alertify.alert("Acceso restringido", data.message);
            }
        },
        error: function (xhr, status) {
            //it has happened an error to connect with the server
            $('.bgring').hide();
            alertify.alert("Server Error", "Error al intentar conectarnos al servidor, si el problema persiste comuníquelo a soporte de TI");
        }
    });
    //Login method and redirection
}
