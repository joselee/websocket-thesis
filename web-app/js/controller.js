define(
    [
        "backbone",
		"vent"
    ],
    function(Backbone, Vent) {
        "use strict";

        var controller =
            _.bindAll({
                home: function() {
                    Vent.trigger("show:home");
                },
                playerList: function(){
                    Vent.trigger("show:playerList");
                },
                profile: function(profileId) {
                    Vent.trigger("show:profile", Number(profileId));
				},
                chat: function(){
                    Vent.trigger("show:chat");
                },
                articleList: function(){
                    Vent.trigger("show:articleList");
                },
                article: function(articleId){
                    Vent.trigger("show:article", articleId);
                },
                matchList: function(){
                    Vent.trigger("show:matchList");
                }
            });
        _.extend(controller, Backbone.Events);

        return controller;
    }
);