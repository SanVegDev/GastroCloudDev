$(function () {
    $('.btn-close-page').click(function () {
        window.close();
    });


    if (window.innerWidth < 1025) {
        $('body').addClass('sidebar-mini');
    }
    $('body').on('click', '.load', function () {
        $('.bgring').show();
    });

    $('body').on('change', '.selectpicker', function () {
        if ($(this).val().includes('reset')) {
            $(this).val('').selectpicker('refresh');
        }
    });

    var uri = window.location.toString();
    var clean_uri = "";
    if (uri.indexOf("&redirect") > 0) {
        clean_uri = uri.substring(0, uri.indexOf("&redirect"));
        window.history.replaceState({}, document.title, clean_uri);
    }
    if (uri.indexOf("?fromEsc") > 0) {
        clean_uri = uri.substring(0, uri.indexOf("?fromEsc"));
        window.history.replaceState({}, document.title, clean_uri);
    }

    if (uri.indexOf("?key") > 0) {
        clean_uri = uri.substring(0, uri.indexOf("?key"));
        window.history.replaceState({}, document.title, clean_uri);
    }

    //if (uri.indexOf("&escalationView") > 0) {
    //    clean_uri = uri.substring(0, uri.indexOf("&escalationView"));
    //    window.history.replaceState({}, document.title, clean_uri);
    //}
    $(".bgring").hide();
    $(".update-controls").hide();
});

//It validates if the string is null or empty
function isNullOrEmpty(value) {
    return value === null || String(value).match(/^ *$/) !== null;
}


var start = "";
var end = "";
function initDatePickerRange() {
    start = moment();
    end = moment();
    function cb(start, end) {
        $('#reportrange span').html(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
    }
    $('#reportrange').daterangepicker({
        "locale": {
            "applyLabel": "Listo",
            "cancelLabel": "Cancelar",
            "fromLabel": "Del",
            "toLabel": "Al",
            "customRangeLabel": "Rango"
        },
        startDate: start,
        endDate: end,
        ranges: {
            'Hoy': [moment(), moment()],
            'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Hace 7 días': [moment().subtract(6, 'days'), moment()],
            'Hace 30 días': [moment().subtract(29, 'days'), moment()],
            'Este Mes': [moment().startOf('month'), moment().endOf('month')],
            'El Mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);
    cb(start, end);
}



$(function () {
    //Detecta que un input cambió de valor y evalua si es número o no. Si es número permite el cambió si no lo omite.
    $(".val-num").keypress(function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        } else {
            // If the number field already has . then don't allow to enter . again.
            if (evt.target.value.search(/\./) > -1 && charCode == 46) {
                return false;
            }
            if (evt.target.value === '' && charCode == 46) {
                return false;
            }
            return true;
        }
    });

    $('.cbo-buscar').change(function (e) {
        //llamar el método de bunqueda
        Buscar();
    });

    $(".int-num").keypress(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress

        if ((e.shiftKey || ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 8))) {
            e.preventDefault();
        }
    });
});

//Valida si es número
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
// Remove the formatting to get integer data for summation
function intVal(i) {
    return typeof i === 'string' ?
        i.replace(/[\$,]/g, '') * 1 :
        typeof i === 'number' ?
            i : 0;
}
// Set currency formatting to get string 
function currencyVal(i) {
    return '$' + parseFloat(i, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}

// Función para calcular los días transcurridos entre dos fechas
function diferenciaFechas(f1, f2) {
    var aFecha1 = f1.split('/');
    var aFecha2 = f2.split('/');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    //dias++;
    return dias;
}
//Funcion que retorna en texto una fecha
function getDateString(date) {
    var dateString = '';
    var month = '';
    var day = '';
    month = (parseInt(date.getMonth()) + 1) < 10 ? month = '0' + (parseInt(date.getMonth()) + 1) : month = (parseInt(date.getMonth()) + 1);
    day = parseInt(date.getDate()) < 10 ? day = '0' + date.getDate() : day = date.getDate();
    dateString = day + "/" + month + "/" + date.getFullYear();
    return dateString;
}

//#endregion métodos de validacion
function MensajeAlerta(title, text, addclass, type) {
    new PNotify({
        title: title,
        text: text,
        addclass: 'alert ' + addclass + ' alert-styled-left',
        type: type,
        buttons: {
            closer: true,
            sticker: false
        }
    });
}

function getHourByShift(shift) {
    switch (shift) {
        case '1':
            return ' 06:40 AM';
        case '2':
            return ' 02:40 PM';
        case '3':
            return ' 10:20 PM';
        default:
            return ' 06:40 AM';
    }
}

function getDateNow() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

function getTimeNow() {
    var currentdate = new Date();
    var hour = currentdate.getHours();
    var mins = currentdate.getMinutes();
    var secs = currentdate.getSeconds();
    if (intVal(hour) < 10)
        hour = "0" + hour;
    if (intVal(mins) < 10)
        mins = "0" + mins;
    if (intVal(secs) < 10)
        secs = "0" + secs;
    var time = hour + ":"
        + mins + ":"
        + secs;
    return time;
}

function getTimeN() {
    var currentdate = new Date();
    var hour = currentdate.getHours();
    var mins = currentdate.getMinutes();
    var secs = currentdate.getSeconds();
    if (intVal(hour) < 10)
        hour = "0" + hour;
    if (intVal(mins) < 10)
        mins = "0" + mins;
    if (intVal(secs) < 10)
        secs = "0" + secs;
    var time = hour + ":"
        + mins
    return time;
}

function mensajeAlerta(titulo, mensaje, btnColor, tipo) {
    swal({
        title: titulo,
        text: mensaje,
        confirmButtonColor: btnColor,
        type: tipo,
        timer: 2300
    });
}

function mensajeAlertaFijo(titulo, mensaje, btnColor, tipo) {
    swal({
        title: titulo,
        text: mensaje,
        confirmButtonColor: btnColor,
        type: tipo
    });
}

function getDateTimeString(date) {
    var dateString = '';
    var month = '';
    var day = '';
    var hours = '', minutes = '', seconds = '';
    month = (parseInt(date.getMonth()) + 1) < 10 ? month = '0' + (parseInt(date.getMonth()) + 1) : month = (parseInt(date.getMonth()) + 1);
    day = parseInt(date.getDate()) < 10 ? day = '0' + date.getDate() : day = date.getDate();

    hours = parseInt(date.getHours()) < 10 ? '0' + (parseInt(date.getHours())) : parseInt(date.getHours());
    minutes = parseInt(date.getMinutes()) < 10 ? '0' + date.getMinutes() : parseInt(date.getMinutes());
    seconds = parseInt(date.getSeconds()) < 10 ? '0' + date.getSeconds() : parseInt(date.getSeconds());

    dateString = day + "/" + month + "/" + date.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
    return dateString;
}

function getTimeString(date) {
    var timeString = '';
    var hours = '', minutes = '', seconds = '';

    hours = parseInt(date.getHours()) < 10 ? '0' + (parseInt(date.getHours())) : parseInt(date.getHours());
    minutes = parseInt(date.getMinutes()) < 10 ? '0' + date.getMinutes() : parseInt(date.getMinutes());
    seconds = parseInt(date.getSeconds()) < 10 ? '0' + date.getSeconds() : parseInt(date.getSeconds());

    timeString = hours + ":" + minutes + ":" + seconds;
    return timeString;
}

function toStringNumberN(n) {
    var parts = n.toString().split(".");
    var strNum = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    return strNum;
}

function toStringNumber(n) {
    var parts = n.toString().split(".");
    var strNum = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    if (strNum == "0")
        strNum = "<br/>";
    return strNum;
}

function obtenerNombreDia(dateString) {
    var days = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
    var d = new Date(dateString);
    var dayName = days[d.getDay()];
    return dayName;
}