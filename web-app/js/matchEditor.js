$(window).load(function(){
    var socket = $.atmosphere;

    var request = {
        url: 'http://'+document.location.hostname+':'+document.location.port+'/atmosphere/chat',
        contentType : "application/json",
        logLevel : 'debug',
        transport : 'websocket' ,
        fallbackTransport: 'long-polling'
    };

    request.onOpen = function(response) {
        console.info("connection is opened");
        var data = JSON.stringify({ author: "Someone has joined", message: "" });
        subscription.push(data);
    };

    request.onReconnect = function (request, response) {
        console.info("connection reconnected");
    };

    request.onMessage = function (response) {
        var message = $.parseJSON(response.responseBody);
        console.info(message);
    };

    request.onError = function(response) {
        console.info("errored.");
    };

    var subscription = socket.subscribe(request);
});