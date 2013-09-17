define(
    [
        "backbone.marionette",
        "hbs!templates/homeViewTemplate"
    ],
    function HomeView(Marionette, HomeViewTemplate){
        var HomeView = Marionette.ItemView.extend({
            className: "homeView",
            template: HomeViewTemplate,
            templateHelpers: function(){
                return {
                    deviceModel:   window.ThesisProject.deviceModel,
                    deviceOS:      window.ThesisProject.deviceOS,
                    browserVendor: window.ThesisProject.browserVendor,
                    browser:       window.ThesisProject.browser
                }
            }
        });

        return HomeView;
    }
);