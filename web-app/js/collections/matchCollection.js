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

                this.request.onMessage = function (response) {
                    var message = $.parseJSON(response.responseBody);
                    Vent.trigger("matchSocket:message", message);
                };

                this.subscription = this.socket.subscribe(this.request);
            },
            updateCollection: function(message){
                console.log("now i should update the collection");

                var matchModel = new MatchModel({
                    time: new Date(),
                    title: "new match!"
                });
                this.add(matchModel);

//                this.stream = options.stream;
//                var self = this;
//                this.stream.on("add_point", function(pt) {
//                    self.add( new DataPoint({
//                        lat: pt.lat,
//                        long: pt.long,
//                        amt: pt.amt
//                    }));
//                    console.log('updated collection');
//                    console.log(self.models);
//                });
            }
        });

        var matchCollection= new MatchCollection();
        Vent.bind("matchSocket:message", matchCollection.updateCollection);
        return matchCollection;
    }
);