define(
    [
        "backbone.marionette",
        "hbs!templates/matchLayoutTemplate",
        "hbs!templates/teamItemViewTemplate"
    ],
    function MatchLayout(Marionette, matchLayoutTemplate, teamItemViewTemplate){
        var MatchLayout = Marionette.Layout.extend({
            tagName: 'div',
            className: 'match',
            template: matchLayoutTemplate,
            regions: {
                teamsRegion:"#teamsRegion"
            },
            events: {'click .subscribe': 'subscriptionHandler'},
            templateHelpers: function(){
                var subscription = this.model.get("isSubscribed") ? "Unsubscribe" : "Subscribe to match";
                return {subscription:subscription};
            },
            initialize: function(){
                _.bindAll(this);
            },
            onShow: function(){
                var TeamItemView = Marionette.ItemView.extend({
                    className: "teamItemView",
                    template: teamItemViewTemplate,
                    modelEvents: {'change': 'modelChanged'},
                    modelChanged: function() {
                        this.render();
                    }
                });

                var teamCollection = this.model.get("teams");
                var TeamCollectionView = Marionette.CollectionView.extend({
                    className: "matchListCollectionView",
                    itemView: TeamItemView,
                    collection: teamCollection
                });

                if(this.teamsRegion){
                    this.teamsRegion.show(new TeamCollectionView);
                }
            },
            subscriptionHandler: function(e){
                var subscribed = this.model.get("isSubscribed");

                if(subscribed){
                    this.model.set("isSubscribed", false);
                    $(e.currentTarget).html("Subscribe to match");
                }
                else {
                    this.model.set("isSubscribed", true);
                    $(e.currentTarget).html("Unsubscribe");
                }

            }
        });

        return MatchLayout;
    }
);