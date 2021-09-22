jQuery(document).ready(function () {
    $('#press-selected').change(function () {
        $('.second-part-press').removeClass('hidden');
    });

    $('#top-navbar-1').on('shown.bs.collapse', function () {
        $.backstretch("resize");
    });

    $('#top-navbar-1').on('hidden.bs.collapse', function () {
        $.backstretch("resize");
    });
    $("#interface-form").on('hidden.bs.modal', function () {
        $('body').addClass('modal-open');
    });

    $("#tooling-form").on('hidden.bs.modal', function () {
        $('body').addClass('modal-open');
    });

    $("#canvas-form").on('hidden.bs.modal', function () {
        $('body').addClass('modal-open');
    });

    clearOrderField();
    /*
        Form
    */
    $('.f1 fieldset:first').fadeIn('fast');

    // next step
    $('.f1 .btn-next').on('click', function () {
        nextStep($(this));
    });

    $('#btn-new-defect').click(function () {
        $('#interface-form').modal('show');
        $('#interface-form #cavity-product').val('').selectpicker('refresh');
        $('#interface-form #defect-product').val('').selectpicker('refresh');
        $('#interface-form #area-product').val('');
    });

    $('#btn-new-repair').click(function () {
        $('#tooling-form').modal('show');
        $('#tooling-form #repair-making').val('').selectpicker('refresh');
        $('#tooling-form #quantity-making').val('1');
        $('#tooling-form #note-making').val('');
    });

    $('#btn-delete-defect').click(function () {
        var data = getSelectedCavRow();
        if (data != undefined) {
            cavitiesArray = cavitiesArray.filter(x => x.index !== data.index);
            initCavTables();
            $(this).fadeOut(0);
        }
    });



    $('#btn-delete-repair').click(function () {
        var data = getSelectedRepRow();
        if (data != undefined) {
            repairArray = repairArray.filter(x => x.index !== data.index);
            initRepTables();
            $(this).fadeOut(0);
        }
    });

    $('#fault').change(function () {
        setFaultDefault();
    });

    // previous step
    $('.f1 .btn-previous').on('click', function () {
        $('#department-title').html('ORDEN').removeClass('text-Procesos text-ToolRoom text-Logistica text-Metrologia text-Produccion text-Mantenimiento text-Calidad');
        $('.f1-step-icon').removeClass('bg-Procesos bg-ToolRoom bg-Logistica bg-Metrologia bg-Produccion bg-Mantenimiento bg-Calidad');
        fadeStep($(this), 'left');
    });

    // submit
    $('#btn-create').click(function (e) {
        // fields validation
        if (isNullOrEmpty($("#work-requested").val())) {
            alertify.error("Por favor, especifica el trabajo requerido detalladamente");
            return;
        }
        if ($('#fault').val() == '') {
            alertify.error("Por favor, categoriza la falla de lo que requieres");
            return;
        }

        if ($('#product-order-area').is(':visible') && isNullOrEmpty($('#defect-picture').attr('src'))) {
            alertify.alert("ATENCION!!", 'Al ser una orden que afecta directamente al producto necesitamos que tomes foto del defecto y lo marques, haz click en el boton foto');
            return;
        }

        if ($('#product-order-area').is(':visible') && cavitiesArray.length == 0) {
            alertify.alert("ATENCION!!", 'Al ser una orden que afecta directamente al producto necesitamos que especifiques a los tecnicos cada defecto por cada cavidad para trabajar');
            return;
        }

        if ($('#making-order-area').is(':visible') && repairArray.length == 0) {
            alertify.alert("ATENCION!!", 'Al ser una orden que requiere fabricacion necesitamos que especifiques a los tecnicos lo que necesitas que fabriquen para trabajar');
            return;
        }
        if (!$('#making-order-area').is(':visible')) {
            repairArray = [];
        }
        if (!$('#product-order-area').is(':visible')) {
            cavitiesArray = [];
        }

        var press = $("#press-selected option:selected");
        $('.bgring').show();
        var orders = [];
        orders.push({
            SolicitaId: $('#userID').val(),
            Departamento: department,
            Estatus: 1,
            Imagen: $('#product-order-area').is(':visible') && !isNullOrEmpty($('#defect-picture').attr('src')) ? btoa($('#defect-picture').attr('src')) : null,
            ImagenAdicionalUno: $('#product-order-area').is(':visible') && !isNullOrEmpty($('#defect-picture-1').attr('src')) ? btoa($('#defect-picture-1').attr('src')) : null,
            ImagenAdicionalDos: $('#product-order-area').is(':visible') && !isNullOrEmpty($('#defect-picture-2').attr('src')) ? btoa($('#defect-picture-2').attr('src')) : null,
            TrabajoSolicitado: $('#work-requested').val(),
            FallaId: $('#fault').val(),
            Visibilidad: 1,
            DetalleFabricacion: repairArray,
            DetalleProducto: cavitiesArray
        });
        var ticket = {
            AbrioId: $('#userID').val(),
            Tipo: $('#order-type').val(),
            Ordenes: orders,
            Flujo: press.val() > 0 ? 1 : 2,
            Detalle: {
                ProcesoId: press.attr('data-processId'),
                PrensaId: press.val() > 0 ? press.val() : $('#machine-ordinary').val(),
                MoldeId: press.val() > 0 ? null : $('#mold-ordinary').val(),
                NumeroParteId: press.val() > 0 ? null : $('#pn-ordinary').val(),
            }
        };
        $.ajax({
            type: 'POST',
            url: $("#urlIntec").val() + "/Order/AddTicket",
            data: {
                ticket: ticket,
                stop: $('#stop-or-not').val() == 1 ? true : false
            },
            success: function (data) {
                if (data.success) {
                    if (ticket.Flujo == 2) {
                        url = $("#urlIntec").val() + "/Order/Show?folio=" + data.ticket + "&np=" + 0;
                        SendNotification('Nueva Orden Fuera De Prensa #' + data.ticket, $('#userName').val() + ' solicita una nueva orden para' + data.department + ", solicitando: " + $('#work-requested').val(), url + '&redirect=order|' + data.folio, 'Ordinary', data.folio);
                    } else {
                        url = $("#urlIntec").val() + "/Order/Show?folio=" + data.ticket + "&np=" + press.attr('data-pnId');
                        SendNotification('Nueva Orden en ' + press.attr('data-name'), $('#userName').val() + ' solicita una nueva orden para ' + data.department + " en " + press.nombre + ", solicitando: " + $('#work-requested').val(), url + '&redirect=order|' + data.folio, 'Orders', data.folio);
                    }
                    window.location.href = url;
                } else {
                    var titleD = data.error.includes('ticket') ? 'Ticket Abierto!' : 'Error :(';
                    Swal.fire({
                        position: 'center',
                        type: 'error',
                        title: titleD,
                        text: data.error,
                        showLoaderOnConfirm: true,
                        preConfirm: () => {
                            window.location.href = window.location.href;
                        }
                    });
                }
            },
            error: function (xhr, status) {
                $(".bgring").hide();
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Algo salió mal :(',
                    text: 'Reiniciaremos la página para que lo intentes de nuevo, si el problema persiste por favor comunícalo a soporte',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        window.location.href = window.location.href;
                    }
                });
            }
        });
    });


});
var cavtable = [];
var cavitiesArray = [];
function initCavTables() {
    cavtable = $('#cav-table').dataTable({
        data: cavitiesArray,
        destroy: true,
        "aaSorting": [],
        "pagingType": "full_numbers",
        "lengthMenu": [
            [10, 50, 100, -1],
            [10, 50, 100, "All"]
        ],
        responsive: true,
        select: {
            style: 'single'
        },
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Busqueda...",
        },
        columns: [
            { "data": 'cavity' },
            { "data": 'defect' },
            { "data": 'area' }
        ]
    }).api();
    cavtable.on('select', function (e) {
        $('#btn-delete-defect').fadeIn(200);
    });
    cavtable.on('deselect', function (e) {
        $('#btn-delete-defect').fadeOut(0);
    });
}

function getSelectedCavRow() {
    $tr = $('#cav-table').find('tr.selected');
    var data = cavtable.row($tr).data();
    return data;
}


var reptable = [];
var repairArray = [];
function initRepTables() {
    reptable = $('#rep-table').dataTable({
        data: repairArray,
        destroy: true,
        "aaSorting": [],
        "pagingType": "full_numbers",
        "lengthMenu": [
            [10, 50, 100, -1],
            [10, 50, 100, "All"]
        ],
        responsive: true,
        select: {
            style: 'single'
        },
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Busqueda..."
        },
        columns: [
            { "data": 'repair' },
            { "data": 'quantity' },
            { "data": 'note' }
        ]
    }).api();
    reptable.on('select', function (e) {
        $('#btn-delete-repair').fadeIn(200);
    });
    reptable.on('deselect', function (e) {
        $('#btn-delete-repair').fadeOut(0);
    });
}

function getSelectedRepRow() {
    $tr = $('#rep-table').find('tr.selected');
    var data = reptable.row($tr).data();
    return data;
}




function setFaultDefault() {
    var fault = $("#fault option:selected");
    $('#work-requested').val(fault.html());
    switch (fault.attr('data-ftype')) {
        case 'Product':
            if (department == 21 /*Only Tool Room*/) {
                if (moldId > 0 || $('#press-selected').val() == '') {
                    if (moldId == 0) {
                        Swal.fire({
                            position: 'center',
                            type: 'info',
                            title: 'AFECTA EL PRODUCTO',
                            text: 'Al ser una falla que afecta directamente al producto, necesitamos que especifiques algunos aspectos importantes, primero indicanos el molde que necesita ser atendido',
                            showLoaderOnConfirm: true,
                            onClose: function () {
                                clearAllOrderValues(true);
                            }
                        });
                        return;
                    }
                }
                $('#product-order-area').fadeIn(300);
                $('#making-order-area').fadeOut();
                getCavitiesByMold();
            }
            break;
        case 'Making':

            if (department == 21 /*Only Tool Room*/) {
                if (moldId > 0 || $('#press-selected').val() == '') {
                    if (moldId == 0) {
                        Swal.fire({
                            position: 'center',
                            type: 'info',
                            title: 'SOLICITUD DE FABRICACION',
                            text: 'Al ser una peticion de solicitud de fabricacion es necesario que nos indiques el molde para habilitar las refacciones del mismo y puedas hacer la solicitud completa',
                            showLoaderOnConfirm: true,
                            onClose: function () {
                                clearAllOrderValues(true);
                            }
                        });
                        return;
                    }
                }
                $('#making-order-area').fadeIn(300);
                $('#product-order-area').fadeOut();
                //getRepairByMold();
            }
            break;
        default:
            $('#product-order-area').fadeOut(400);
            $('#making-order-area').fadeOut(400);
            break;
    }
}


function getCavitiesByMold() {
    $.ajax({
        type: 'POST',
        url: $("#urlIntec").val() + '/FaultCategory/CavityForm',
        data: {
            moldId: moldId
        },
        success: function (response) {
            $('#interface-area').html(response);
            setTimeout(function () {
                $(".selectpicker").selectpicker("refresh");
            }, 200);
        },
        error: function (xhr, status) {
            alertify.alert("Server Error", "Error al obtener los registros, por favor comunicalo a soporte de TI");
        }
    });
}

//function getRepairByMold() {
//    $.ajax({
//        type: 'POST',
//        url: $("#urlIntec").val() + '/FaultCategory/RepairForm',
//        data: {
//            moldId: moldId
//        },
//        success: function (response) {
//            $('#interface-area').html(response);
//            setTimeout(function () {
//                $(".selectpicker").selectpicker("refresh");
//            }, 200);
//        },
//        error: function (xhr, status) {
//            alertify.alert("Server Error", "Error al obtener los registros, por favor comunicalo a soporte de TI");
//        }
//    });
//}

var department = 0;
var moldId = 0;
function scroll_to_class(element_class, removed_height) {
    var scroll_to = $(element_class).offset().top - removed_height;
    if ($(window).scrollTop() != scroll_to) {
        $('html, body').stop().animate({ scrollTop: scroll_to }, 0);
    }
}


function nextStep(button) {
    $('#btn-create').addClass('btn-primary').removeClass('bg-Procesos bg-ToolRoom bg-Logistica bg-Metrologia bg-Produccion bg-Mantenimiento bg-Calidad');
    switch (button.data('step')) {
        case 1:
            if ($('#in-press').is(':visible')) {
                //In press
                if ($("#press-selected").val() == '') {
                    alertify.error('Por favor, selecciona la prensa!');
                    return;
                }
                clearOrderField();
                var press = $("#press-selected option:selected");
                moldId = press.attr('data-moldId');
                $('#press-title').html(press.attr('data-name') + ' | ' + press.attr('data-mold') + ' | ' + press.attr('data-client'));
                $('#pn-title').html(press.attr('data-pn'));
            } else {
                moldId = $('#mold-ordinary').val();
            }
            break;
        case 2:
            if (button.attr('data-ndepartment') !== department) {
                clearOrderField();
            }
            department = button.attr('data-ndepartment');
            setTimeout(function () {
                $('#department-title').html(button.attr('data-department').toUpperCase()).removeClass('text-Procesos text-ToolRoom text-Logistica text-Metrologia text-Produccion text-Mantenimiento text-Calidad').addClass('text-' + button.attr('data-department'));
                $('.f1-step-icon').removeClass('bg-Procesos bg-ToolRoom bg-Logistica bg-Metrologia bg-Produccion bg-Mantenimiento bg-Calidad').addClass('bg-' + button.attr('data-department'));
            }, 105);
            $('#btn-create').removeClass('btn-primary').addClass('bg-' + button.attr('data-department'));
            break;
        default:
            break;
    }
    fadeStep(button, 'right');
}

function AddRepairReq() {
    var reps = $('#tooling-form').find('#repair-making');
    if (reps.val() == '' || reps.val() == undefined) {
        alertify.error('Es necesario que selecciones al menos una refaccion!');
        return;
    }
    var quantity = $('#tooling-form').find('#quantity-making');
    if (quantity.val() <= 0) {
        alertify.error('Por favor, indica un valor valido en la cantidad!');
        return;
    }

    var cont = 0;
    // Obtenemos los atributos que necesitamos
    reps.children(':selected').each((idx, repair) => {
        cont++;
        repairArray.push({
            index: cont,
            RefaccionId: repair.value,
            repair: repair.text,
            quantity: quantity.val(),
            Cantidad: quantity.val(),
            note: $('#tooling-form').find('#note-making').val(),
            Nota: $('#tooling-form').find('#note-making').val()
        });
    });
    initRepTables();
    $('#tooling-form').modal('hide');
}

function AddDefectByCavity() {
    var cavs = $('#interface-area').find('#cavity-product');
    if (cavs.val() == '' || cavs.val() == undefined) {
        alertify.error('Es necesario que selecciones al menos una cavidad');
        return;
    }
    var defects = $('#interface-area').find('#defect-product');
    if (defects.val() == '' || defects.val() == undefined) {
        alertify.error('Es necesario que selecciones al menos un defecto');
        return;
    }
    var area = $('#interface-area').find('#area-product');
    if (isNullOrEmpty(area.val())) {
        alertify.error('Es necesario que indiques el area afectada');
        return;
    }
    var cont = 0;
    cavs.children(':selected').each((idx, cav) => {
        // Obtenemos los atributos que necesitamos
        defects.children(':selected').each((idx, def) => {
            cont++;
            cavitiesArray.push({
                index: cont,
                CavidadId: cav.value,
                DefectoId: def.value,
                cavity: cav.text,
                defect: def.text,
                Area: area.val(),
                area: area.val()
            });
        });
    });
    initCavTables();
    $('#interface-form').modal('hide');
}

function fadeStep(button, direction) {
    var parent_fieldset = button.parents('fieldset');
    var current_active_step = button.parents('.f1').find('.f1-step.active');
    var progress_line = button.parents('.f1').find('.f1-progress-line');
    parent_fieldset.fadeOut(100, function () {
        if (direction === 'right') {
            current_active_step.removeClass('active').addClass('activated').next().addClass('active');
            bar_progress(progress_line, direction);
            $(this).next().fadeIn();

        } else {
            current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
            bar_progress(progress_line, 'left');
            $(this).prev().fadeIn();
        }
        scroll_to_class($('.f1'), 20);
    });
}

function bar_progress(progress_line_object, direction) {
    var number_of_steps = progress_line_object.data('number-of-steps');
    var now_value = progress_line_object.data('now-value');
    var new_value = 0;
    if (direction == 'right') {
        new_value = now_value + (100 / number_of_steps);
    }
    else if (direction == 'left') {
        new_value = now_value - (100 / number_of_steps);
    }
    progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}

function clearAllOrderValues(returned) {
    $('.f1 fieldset:first').fadeIn(0);
    $('.f1-step-icon').removeClass('bg-Procesos bg-ToolRoom bg-Logistica bg-Metrologia bg-Produccion bg-Mantenimiento bg-Calidad');
    $('.f1 .f1-step').removeClass('activated').removeClass('active');
    $('.f1 .f1-step:first').addClass('active').addClass('text-white');
    $('.fieldset-area').fadeOut(0);
    $('#mold-ordinary').val('').selectpicker('refresh');
    $('#pn-ordinary').val('').selectpicker('refresh');
    $('#work-requested').val('');
    $('#press-ordinary').val('').selectpicker('refresh');
    if (!returned) {
        clearOrderField();
    }
    $('.f1-progress-line').attr('style', 'width: ' + 16.66 + '%;').data('now-value', 16.66);
    department = 0;
    moldId = 0;
}

function clearOrderField() {
    initCavTables();
    initRepTables();
    $('#btn-delete-defect').fadeOut(0);
    $('#btn-delete-repair').fadeOut(0);
    $('#product-order-area').fadeOut();
    $('#making-order-area').fadeOut();
    $('#category').val('').selectpicker('refresh');
    $('#fault').val('').selectpicker('refresh');
    $('#work-request').val('');
}

