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
                    _.each(this.model.teams, function(team){
                        this.renderTeams(team);
                    }, this);
                    this.bindUpdateButtons();
                    this.bindEndMatchButton();
                    return this.$el;
                },
                renderTeams: function(team){
                    var TeamboxView = Backbone.View.extend({
                        className: "teambox",
                        template: _.template($("#teamboxTemplate").html()),
                        initialize: function(){
                            this.render();
                        },
                        render: function(){
                            this.$el.html(this.template(this.model));
                            return this.$el;
                        }
                    });
                    var teamboxView = new TeamboxView({model:team});
                    $(".teamboxContainer", this.$el).append(teamboxView.el);
                },
                bindUpdateButtons: function(){
                    var self = this;
                    $(".btDecreaseScore", this.$el).click(function(e){
                        var teamId = e.currentTarget.parentElement.id;
                        var team = _.filter(self.model.teams, function(team){
                            return team.teamId == teamId;
                        }, this)[0];

                        team.points--;

                        var data = JSON.stringify({
                            commandType: "updateMatch",
                            teamId: team.teamId,
                            points: team.points
                        });
                        subscription.push(data);
                    });
                    $(".btIncreaseScore", this.$el).click(function(e){
                        var teamId = e.currentTarget.parentElement.id;
                        var team = _.filter(self.model.teams, function(team){
                            return team.teamId == teamId;
                        }, this)[0];

                        team.points++;

                        var data = JSON.stringify({
                            commandType: "updateMatch",
                            teamId: team.teamId,
                            points: team.points
                        });
                        subscription.push(data);
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
            console.info(message);
            var teambox = $("#"+message.teamId);
            $(".points", teambox).html(message.points);
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
            teams: [
                {name: generateName(), points:0},
                {name: generateName(), points:0}
            ]
        });
        subscription.push(data);
    });
});