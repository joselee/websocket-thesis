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
                },
                render: function(){
                    this.$el.html(this.template(this.model));
                    this.$el.attr("id", this.model.id);
                    $(".btEndMatch", this.$el).click(function(e){
                        var parentMatchItem = $(e.currentTarget).parent();
                        $("button", parentMatchItem).remove();
                        parentMatchItem.hide().appendTo("#finishedMatches").fadeIn(300);
                    });
                }
            });

            var matchView = new MatchView({model: message});
            matchView.render();
            matchView.$el.appendTo("#ongoingMatches").hide().fadeIn(300);
        }

    };

    var subscription = socket.subscribe(request);

    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    $(".btCreateMatch").click(function(){
        var data = JSON.stringify({commandType: "createMatch"});
        subscription.push(data);
    });
});