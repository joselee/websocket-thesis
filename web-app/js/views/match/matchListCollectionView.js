define(
    [
        "backbone.marionette",
        "views/match/matchListItemView",
        "collections/matchCollection"
    ],
    function MatchListCollectionView(Marionette, MatchListItemView, matchCollection){

        var MatchListCollectionView = Marionette.CollectionView.extend({
            className: "matchListCollectionView",
            itemView: MatchListItemView,
            collection: matchCollection
        });

        return new MatchListCollectionView();
    }
);