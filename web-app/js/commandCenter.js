$(window).load(function(){
    var socket = $.atmosphere;

    var request = {
        url: 'http://'+document.location.hostname+':'+document.location.port+'/atmosphere/matchList',
        contentType : "application/json",
        logLevel : 'debug',
        transport : 'websocket' ,
        fallbackTransport: 'long-polling'
    };

    request.onOpen = function(response) {
        console.info("Commander in the houuuuse!");
    };

    var subscription = socket.subscribe(request);


    $("#button").click(function(){
        var data = JSON.stringify({ author: "commander", message: "THIS IS MY COMMAND" });
        subscription.push(data);
    });
});