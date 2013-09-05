define(
    [
        "backbone.marionette",
        "views/article/articleListItemView",
        "collections/articleCollection"
    ],
    function ArticleListCollectionView(Marionette, ArticleListItemView, articleCollection){

        var ArticleListCollectionView = Marionette.CollectionView.extend({
            className: "articleListCollectionView",
            itemView: ArticleListItemView,
            collection: articleCollection
        });

        return ArticleListCollectionView;
    }
);