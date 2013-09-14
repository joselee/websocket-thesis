define(
    [
        "backbone",
        "pnotify"
    ],
    function MatchCollection(Backbone, pnotify){

        var MatchModel = Backbone.Model.extend({
            defaults: { "isSubscribed":  false }
        });

        var MatchCollection = Backbone.Collection.extend({
            model: MatchModel,
            subscription: null,
            initialize: function(){
                _.bindAll(this);
                this.atmosphereConnect();
            },
            atmosphereConnect: function(){
                var self = this;
                var socket = $.atmosphere;
                var request = {
                    url: 'http://'+document.location.hostname+':'+document.location.port+'/atmosphere/matchList',
                    contentType : "application/json",
                    logLevel : 'debug',
                    transport : 'websocket' ,
                    fallbackTransport: 'long-polling'
                };

                request.onOpen = function(){
                    console.log("Match socket is open.");
                };

                request.onMessage = function(response){
                    var message = $.parseJSON(response.responseBody);
                    self.updateCollection(message);
                };

                this.subscription = socket.subscribe(request);
            },
            updateCollection: function(message){
                switch(message.commandType){
                    case "createMatch":
                        this.createMatch(message);
                        break;
                    case "updateMatch":
                        this.updateMatch(message);
                        this.notificationHandler(message);
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
            },
            notificationHandler: function(message){
                var matchModel = this.getMatchById(message.matchId);
                if(matchModel.get("isSubscribed") && Backbone.history.fragment !== "matchList"){
                    $.pnotify({
                        title: "Oh some update happened..",
                        text: false,
                        history: false,
                        icon: false,
                        closer_hover: false,
                        delay: 3000
                    });
                }
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