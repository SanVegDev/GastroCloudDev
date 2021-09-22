$(function () {
    $('#notification-bar').on('click', '.isALink', function () {
        var url = $(this).attr('data-url');
        //if ($(this).data('seen') == false) {
        //    checkSeen($(this).data('id'), url);
        //} else {

        window.location.href = url;
        //}
    });
    //GetNotifications();

});

function GetNotifications() {
    $.ajax({
        type: 'POST',
        url: $("#urlIntec").val() + '/Home/GetNotifications',
        success: function (data) {

            data.forEach(function (element) {
                if (element.seen == false) {
                    PushNotificationIndicator();
                }

                PushNotificationBar(element);
            });
        },
        error: function (xhr, status) {
            alertify.alert("Server Error", "Error al intentar conectarnos, por favor comunicalo a soporte de TI");
        }
    });
}

function checkSeen(id, url) {
    $.ajax({
        type: 'POST',
        url: $("#urlIntec").val() + '/Home/SeeNotification',
        data: {
            id: id,
            user: $('#userID').val()
        },

        success: function (data) {
            window.location.href = url;
        },
        error: function (xhr, status) {
            alertify.alert("Server Error", "Error al intentar conectarnos, por favor comunicalo a soporte de TI");
        }
    });
}
var owner = false;

//It sends a notification to the server
function SendNotification(title, body, url, type, publication) {
    var notification = {
        Titulo: title,
        Mensaje: body,
        URL: url,
        CreadorId: parseInt($('#userID').val()),
        Tipo: type,
        PublicacionId: publication
    };
    //console.log('Enviando ' + notification.Mensaje, 10);
    owner = true;
    console.log('Owner from sender '+owner);
    $.ajax({
        url: $("#urlIntec").val() + "/api/Notification/",
        data: JSON.stringify(notification),
        cache: false,
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset=utf-8'
    });
   
}

//// It registers the client browser to the server to be able to detect when some change occurs
//var source = new EventSource($("#urlIntec").val() + '/api/Notification/');
//source.onmessage = function (e) {
//    var data = e.data.split('|');
//    var n = {
//        id: data[6],
//        title: data[0],
//        body: data[1],
//        date: data[2],
//        url: data[3] + '|' + data[4],
//        users: data[5].split(','),
//        seen: false,
//        type: data[7]
//    };
//    var folio = n.url.split('&')[0].split('=')[1];
//    console.log('Owner from receiver ' + owner);
//    if (n.type == 'Orders') {
//        if (n.users.find(x => x == $("#userID").val()) != undefined) {
//            PushNotificationIndicator();
//            PushNotificationBar(n);
//            if (owner == false) {
//                PushNotifications(n);
//            }
//        }
//        if (owner == false) {
//            switch (n.type) {
//                case 'Orders'://Notifications and actions for orders
//                    {
//                        //redirect=comment|0
//                        //redirect=order|0
//                        //it validates if the user has the order opened, this is to be able to update the order at run time.
//                        if (n.url.split('&')[0] == window.location.href.split('&')[0]) {
//                            //var folio = n.url.split('&')[0].split('=')[1];
//                            var redirect = n.url.split('&')[2].split('=')[1].split('|')[0];
//                            var orderId = n.url.split('&')[2].split('=')[1].split('|')[1];
//                            //var orderId = n.title.split('#')[1];
//                            if (redirect == 'allview') {
//                                alert('eeee;aaa');
//                                window.location.href = window.location.href;
//                            } else {
//                                console.log(n);
//                                if (n.url.includes('Setup')) {
//                                    if (redirect.includes('comment')) {
//                                        if ($("#comments-form").is(':visible')) {
//                                            var comment_button = $("#orders-area").find('.btn-comments');
//                                            comment_button.click();
//                                            $("a[data-stage=" + comment_button.data('stage')).click();
//                                        } else {
//                                            $('.nav-pills').find('.active').click();
//                                        }

//                                    } else {
//                                        updateViewForSetup(redirect, orderId);
//                                    }
//                                } else {
//                                    updateViewForFail(folio, redirect, orderId);
//                                }
//                            }
//                        }
//                        break;
//                    }
//                default:
//                    break;
//            }
//        }
//    }

//    if (window.location.href == $('#urlIntec').val() + '/Order/Monitor' /*&& $('body').find('#' + n.id+'-ticket')*/) {
//        if (n.type == 'Orders') {
//            var view = (n.url.includes('Setup') ? 'setup-view' : 'failure-view');
//            updateMonitorItem(folio, view);
//        } else {
//            updateMonitor();
//        }
//    }
//    owner = false;
//};

function updateViewForSetup(stage, orderId) {
    var navitem = null;
    navitem = $("a[data-stage='" + stage + "']");
    if (parseInt(orderId) > 0) {
        navitem.removeClass('disabled');
        navitem.parent().prev().find('p').removeClass('timer');
        navitem.find('p').addClass("timer").attr('data-folio', orderId);
    }
    navitem.click();
}

function updateViewForOrdinary(folio, redirect, orderId) {
    $.ajax({
        type: 'POST',
        url: $("#urlIntec").val() + '/Order/Ordinaries',
        data: {
            folio: folio
        },
        success: function (response) {
            $('#accordion').html(response);
            GetAccess();
            $('#accordion').find('.' + orderId + '-order').removeClass('collapse').addClass('show');
            if (redirect == 'comment') {
                $('.' + orderId + '-order').find(".btn-comments").click();
            }
        },
        error: function (xhr, status) {
            alertify.alert("Server Error", "Error al obtener los registros, por favor comunicalo a soporte de TI");
        }
    });
}

//It updates the fail order view.
function updateViewForFail(folio, redirect, orderId) {
    $.ajax({
        type: 'POST',
        url: $("#urlIntec").val() + '/Order/Orders',
        data: {
            folio: folio
        },
        success: function (data) {
            $('#accordion').html(data);
            GetAccess();
            $('#accordion').find('.' + orderId + '-order').removeClass('collapse').addClass('show');
            if (redirect == 'comment') {
                $('.' + orderId + '-order').find(".btn-comments").click();
            }
        },
        error: function (xhr, status) {
            alertify.alert("Server Error", "Error al obtener los registros, por favor comunicalo a soporte de TI");
        }
    });
}

//Updates the notification bar
function PushNotificationIndicator() {
    var notification = parseInt($('.notification').html());
    $('.notification').html(parseInt(notification + 1));
}

function PushNotificationBar(n) {
    $('#notification-bar').prepend(NotificationBinding(n));
}

//This sends a notification through the broser
function PushNotifications(n) {

    Push.create(n.title, {
        body: n.body,
        icon: '../Content/IMG/Template/logotipo.png',
        timeout: 5000,               // Timeout before notification closes automatically.
        vibrate: [100, 100, 100],    // An array of vibration pulses for mobile devices.
        onClick: function () {
            //Callback for when the notification is clicked.
            Push.clear();
            checkSeen(n.id, n.url);
        }
    });
}

function NotificationBinding(data) {
    if (window.innerWidth < 992) {
        return '<a class="dropdown-item load" href="' + data.url + '"><i class="material-icons">notification_important</i> ' + data.title + '</a>';
    } else {
        return '<div class="isALink load" data-seen="' + data.seen + '" data-id="' + data.id + '" data-url="' + data.url + '">'
            + '<table>'
            + '<tr>'
            + '<td><i class="fa ' + (data.seen ? 'text-gray' : '') + ' fa-bell" aria-hidden="true"></i></td>'
            + '<td>'
            + '<h3 class="' + (data.seen ? 'text-gray' : 'text-accent') + '">' + data.title + '</h3>'
            + '<p class="body">' + data.body + '</p>'
            + '<p class="date"><i class="fa fa-clock-o"></i> ' + data.date + '</p>'
            + '</td>'
            + '</tr>'
            + '</table>'
            + '</div><hr />';
    }
}