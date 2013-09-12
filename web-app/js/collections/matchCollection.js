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
                    url: 'http://'+document.location.hostname+':'+document.location.port+'/atmosphere/matchList',
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
                switch(message.commandType){
                    case "createMatch":
                        this.createMatch(message);
                        break;
                    case "updateMatch":
                        this.updateMatch(message);
                        break;
                    case "endMatch":
                        this.endMatch(message);
                        break;
                }
            },
            createMatch: function(message){
                var teamsCollection = new Backbone.Collection(message.teams);
                var matchModel = new MatchModel({
                    matchId: message.matchId,
                    teams: teamsCollection
                });
                this.add(matchModel);
            },
            updateMatch: function(message){
                var matchModel = this.getMatchById(message.matchId);
                var team = matchModel.get("teams").find(function(team){
                    return team.get("teamId")===message.teamId});
                team.set("points", message.points);
                var foo;
            },
            endMatch: function(message){
                var matchModel = this.getMatchById(message.matchId);
                this.remove(matchModel);
            },
            getMatchById: function(matchId){
                return this.find(function(model){
                    return model.get("matchId") === matchId;
                });
            }
        });

        return new MatchCollection();
    }
);