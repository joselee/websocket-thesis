define(
    [
        "backbone",
        "vent"
    ],
    function MatchCollection(Backbone, Vent){

        var MatchModel = Backbone.Model.extend();

        var MatchCollection = Backbone.Collection.extend({
            model: MatchModel,
            socket: null,
            request: null,
            subscription: null,
            initialize: function(){
                _.bindAll(this);
                this.connect();
            },
            connect: function(){
                var self = this;
                this.socket = $.atmosphere;
                this.request = {
                    url: 'http://'+document.location.hostname+':'+document.location.port+'/atmosphere/chat',
                    contentType : "application/json",
                    logLevel : 'debug',
                    transport : 'websocket' ,
                    fallbackTransport: 'long-polling'
                };

                this.request.onOpen = function(){
                    console.log("Match socket is open.");
                };

                this.request.onMessage = function(response){
                    self.updateCollection(response);
                };

                this.subscription = this.socket.subscribe(this.request);
            },
            updateCollection: function(response){
                var message  = $.parseJSON(response.responseBody);
                var matchModel = new MatchModel({
                    title: message.text
                });
                this.add(matchModel);
            }
        });

        return new MatchCollection();
    }
);