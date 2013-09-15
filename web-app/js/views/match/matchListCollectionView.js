define(
    [
        "backbone.marionette",
        "views/match/matchLayout",
        "collections/matchCollection"
    ],
    function MatchListCollectionView(Marionette, MatchLayout, matchCollection){

        matchCollection.bind("all", function(e){console.log(e)});

        var MatchListCollectionView = Marionette.CollectionView.extend({
            className: "matchListCollectionView",
            itemView: MatchLayout,
            collection: matchCollection
        });

        return MatchListCollectionView;
    }
);