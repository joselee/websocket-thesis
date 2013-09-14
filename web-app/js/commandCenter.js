$(window).load(function(){
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    /* SOCKET SETUP & CONNECTION */
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
        messageHandler(message);
    };
    var subscription = socket.subscribe(request);
    /* SOCKET SETUP & CONNECTION END */



    /* HELPER FUNCTIONS */
    function SendJSONData(data){
        subscription.push(data);
    }
    function GenerateUUID(){
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        var uuid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
        return uuid;
    }
    function generateRandomString(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 7; i++ ){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    /* HELPER FUNCTIONS END */


    /* APPLICATION LOGIC */
    function messageHandler(message){
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
                    this.$el.attr("id", this.model.matchId);
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
                            matchId: self.model.matchId,
                            teamId: team.teamId,
                            points: team.points
                        });
                        SendJSONData(data);
                    });
                    $(".btIncreaseScore", this.$el).click(function(e){
                        var teamId = e.currentTarget.parentElement.id;
                        var team = _.filter(self.model.teams, function(team){
                            return team.teamId == teamId;
                        }, this)[0];

                        team.points++;

                        var data = JSON.stringify({
                            commandType: "updateMatch",
                            matchId: self.model.matchId,
                            teamId: team.teamId,
                            points: team.points
                        });
                        SendJSONData(data);
                    });
                },
                bindEndMatchButton: function(){
                    var self = this;
                    $(".btEndMatch", this.$el).click(function(e){
                        var data = JSON.stringify({
                            commandType: "endMatch",
                            matchId: self.model.matchId,
                            startTime: self.model.time,
                            endTime: new Date().getTime()
                        });
                        SendJSONData(data);
                    });
                }
            });

            var matchView = new MatchView({model: message});
            matchView.$el.hide().appendTo("#ongoingMatches").slideDown(500);
        }
        else if (message.commandType == "updateMatch"){
            var teambox = $("#"+message.teamId);
            $(".points", teambox).html(message.points);
        }
        else {
            var parentMatchItem = $("#" + message.matchId);
            $("button", parentMatchItem).remove();
            $(".endTime", parentMatchItem).html(moment(new Date()).format("D MMM YYYY, HH:mm:ss"));
            parentMatchItem.hide().appendTo("#finishedMatches").slideDown(500);
        }
    }

    $(".btNewMatch").click(function(){
        var NewMatchModal = Backbone.View.extend({
            className: "newMatchModal",
            template: _.template($("#newMatchModalTemplate").html()),
            initialize: function(){
                _.bindAll(this);
                this.render();
            },
            render: function(){
                this.$el.html(this.template());
                for (var i = 0; i < 2; i++){
                    var teamItem = new AdditionalTeam();
                    $(".teamList", this.$el).append(teamItem.el);
                }
                this.buttonBindings();
                return this.$el;
            },
            buttonBindings: function(){
                var self = this;
                $(".btAddMoreTeams", this.$el).click(function(){
                    var additionalTeam = new AdditionalTeam();
                    var teamList = $(".teamList", self.$el);
                    additionalTeam.$el.hide().appendTo(teamList).slideDown(100);
                });
                $(".btCreateMatch", this.$el).click(function(){
                    var matchObject = {};
                    matchObject.commandType = "createMatch";
                    matchObject.matchId = GenerateUUID();
                    matchObject.startTime = new Date().getTime();
                    matchObject.teams = [];

                    var teams = $(".tbTeamName");
                    _.each(teams, function(team){
                        var teamObject = {};
                        teamObject.teamId = GenerateUUID();
                        teamObject.name = team.value;
                        teamObject.points = 0;
                        matchObject.teams.push(teamObject);
                    });

                    var data = JSON.stringify(matchObject);
                    SendJSONData(data);
                    self.close();
                });
                $(".btCancel", this.$el).click(function(){
                    self.close();
                });
                $(".btGenerateRandomNames", this.$el).click(function(){
                    var teams = $(".tbTeamName");
                    _.each(teams, function(team){
                        team.value = generateRandomString();
                    });
                });
            },
            close: function(){
                var self = this;
                this.$el.fadeOut(100, function(){
                    self.remove();
                    self.unbind();
                });
            }
        });

        var newMatchModel = new NewMatchModal();
        newMatchModel.$el.hide().appendTo("body").fadeIn(100);
    });

    var AdditionalTeam = Backbone.View.extend({
        className: "additionalTeamItem",
        template:_.template($("#addTeamTemplate").html()),
        initialize: function(){
            _.bindAll(this);
            this.render();
        },
        render: function(){
            var self = this;
            this.$el.html(this.template());
            $(".icon-trash", this.$el).click(function(){
                self.close();
            });
            return this.$el;
        },
        close: function(){
            var self = this;
            this.$el.slideUp(100, function(){
                self.remove();
                self.unbind();
            });
        }
    });
    /* APPLICATION LOGIC END */
});