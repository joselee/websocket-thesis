define(
    [
        "backbone.marionette",
        "hbs!templates/matchSectionLayoutTemplate",
        "views/match/matchListCollectionView",
        "views/match/finishedMatchListCollectionView"
    ],
    function MatchSectionLayout(Marionette, matchSectionLayoutTemplate, matchListCollectionView, finishedMatchListCollectionView){
        var MatchSectionLayout = Marionette.Layout.extend({
            tagName: 'div',
            className: 'matchSection',
            template: matchSectionLayoutTemplate,
            regions: {
                ongoingRegion:"#ongoingRegion",
                finishedRegion:"#finishedRegion"
            },
            initialize: function(){
                _.bindAll(this);
            },
            onShow: function(){
                this.ongoingRegion.show(matchListCollectionView);
                this.finishedRegion.show(finishedMatchListCollectionView);
            }
        });

        return new MatchSectionLayout();
    }
);