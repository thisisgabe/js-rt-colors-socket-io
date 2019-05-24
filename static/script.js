$(document).ready(function(){
    var socket = io();
    console.log('this loaded correctly');

    socket.on('greeting', function (data) {
        console.log(data.msg); //5
        socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' }); //6
    });

    socket.on('updated_message', function (data) {
        console.log('got something back');
        console.log(data.msg);
        $('.container').append('<p>' + data.msg + '</p>');
    });

    socket.on('new color', function(data){
        console.log('request to change color received: new color is %s', data.msg)
        $(document.body).css({ 'background-color': data.msg});
    })

    $('.color-btn').on('click', function () {
        var $button = $(this);
        console.log('clicked button with value %s', $button.attr('value'));
        socket.emit('change color', { msg: $button.attr('value')});
        console.log('sent message');
    })
})