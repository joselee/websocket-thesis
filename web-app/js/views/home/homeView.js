define(
    [
        "backbone.marionette",
        "hbs!templates/homeViewTemplate"
    ],
    function HomeView(Marionette, HomeViewTemplate){
        var HomeView = Marionette.ItemView.extend({
            className: "homeView",
            template: HomeViewTemplate
        });

        return HomeView;
    }
);