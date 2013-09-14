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
            collection: matchCollection,
            initialize: function(){
            this.collection.bind("all", this.render, this);
        }
        });

        return new MatchListCollectionView();
    }
);