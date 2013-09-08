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

    request.onMessage = function(response){
        var message  = $.parseJSON(response.responseBody);

        if(message.commandType === "createMatch"){
            var MatchView = Backbone.View.extend({
                className: "matchItem",
                template: _.template($("#matchViewTemplate").html()),
                initialize: function(){
                    _.bindAll(this);
                    this.render();
                },
                render: function(){
                    this.$el.html(this.template(this.model));
                    this.$el.attr("id", this.model.id);
                    this.bindUpdateButtons();
                    this.bindEndMatchButton();
                    return this.$el;
                },
                bindUpdateButtons: function(){
                    var self = this;
                    $(".btDecreaseScore", this.$el).click(function(e){
                        var foo;
                    });
                    $(".btIncreaseScore", this.$el).click(function(e){
                        var bar;
                    });
                },
                bindEndMatchButton: function(){
                    var self = this;
                    $(".btEndMatch", this.$el).click(function(e){
                        var data = JSON.stringify({
                            commandType: "endMatch",
                            id: self.model.id,
                            startTime: self.model.time,
                            endTime: new Date().getTime()
                        });
                        subscription.push(data);
                    });
                }
            });

            var matchView = new MatchView({model: message});
            matchView.$el.hide().appendTo("#ongoingMatches").slideDown(500);
        }
        else if (message.commandType == "updateMatch"){

        }
        else {
            var parentMatchItem = $("#" + message.id);
            $("button", parentMatchItem).remove();
            $(".endTime", parentMatchItem).html(moment(new Date()).format("D MMM YYYY, HH:mm:ss"));
            parentMatchItem.hide().appendTo("#finishedMatches").slideDown(500);
        }

    };

    var subscription = socket.subscribe(request);

    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    $(".btCreateMatch").click(function(){

        function generateName(){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 7; i++ ){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }

        var data = JSON.stringify({
            commandType: "createMatch",
            startTime: new Date().getTime(),
            team1: {name:generateName(), score:0},
            team2: {name:generateName(), score:0}
        });
        subscription.push(data);
    });
});