define(
    [
		"backbone.marionette",
		"controller"
	],
    function(Marionette, Controller) {
        "use strict";    
        
		var AppRouter = Marionette.AppRouter.extend({
            controller: Controller,
            appRoutes: {
                "": "home",
				"playerList" : "playerList",
				"profile/:personid" : "profile",
                "chat": "chat",
                "articleList": "articleList",
                "article/:articleid": "article"
            },
            start: function() {
                Backbone.history.start();
            }
        });
        return new AppRouter();
    }
);