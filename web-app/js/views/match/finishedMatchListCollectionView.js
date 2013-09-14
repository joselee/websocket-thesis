define(
    [
        "backbone.marionette",
        "views/match/matchLayout",
        "collections/finishedMatchCollection"
    ],
    function FinishedMatchListCollectionView(Marionette, MatchLayout, finishedMatchListCollection){

        var FinishedMatchListCollectionView = Marionette.CollectionView.extend({
            className: "finishedMatchListCollectionView",
            itemView: MatchLayout,
            collection: finishedMatchListCollection,
            initialize: function(){
                this.collection.bind("all", this.render, this);
            }
        });

        return new FinishedMatchListCollectionView();
    }
);