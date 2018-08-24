$(function(){
    var socket = io();
    $('#sendUsernameForm').submit(function () {
        socket.emit('username', $('#username').val());
        $('#usernameContainer').hide();
        $('#messagingContainer').show();
        return false;
    });
    $('#sendMessageForm').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
});