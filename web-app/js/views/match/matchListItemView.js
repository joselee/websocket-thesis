define(
    [
        "backbone.marionette",
        "hbs!templates/matchListItemViewTemplate"
    ],
    function MatchListItemView(Marionette, matchListItemView){
        var MatchListItemView = Marionette.ItemView.extend({
            tagName: 'div',
            className: 'matchListItemView',
            template: matchListItemView
        });

        return MatchListItemView;
    }
);