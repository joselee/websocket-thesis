define(
    [
        "backbone.marionette",
        "views/match/matchLayout",
        "collections/matchCollection"
    ],
    function MatchListCollectionView(Marionette, MatchLayout, matchCollection){

        var MatchListCollectionView = Marionette.CollectionView.extend({
            className: "matchListCollectionView",
            itemView: MatchLayout,
            collection: matchCollection
        });

        return new MatchListCollectionView();
    }
);