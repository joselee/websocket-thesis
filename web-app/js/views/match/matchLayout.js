define(
    [
        "backbone.marionette",
        "hbs!templates/matchLayoutTemplate",
        "hbs!templates/teamItemViewTemplate"
    ],
    function MatchLayout(Marionette, matchLayoutTemplate, teamItemViewTemplate){
        var MatchLayout = Marionette.Layout.extend({
            tagName: 'div',
            className: 'matchLayout',
            template: matchLayoutTemplate,
            regions: {
                teamsRegion:"#teamsRegion"
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

                this.teamsRegion.show(new TeamCollectionView);
            }
        });

        return MatchLayout;
    }
);