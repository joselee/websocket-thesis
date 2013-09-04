define(
    [
        "backbone.marionette",
        "views/article/articleItemView",
        "collections/articleCollection",
        "router"
    ],
    function ArticleCollectionView(Marionette, ArticleItemView, articleCollection, Router){

        var ArticleCollectionView = Marionette.CollectionView.extend({
            className: "articleCollectionView",
            itemView: ArticleItemView,
            collection: articleCollection,
            initialize: function(){
                this.collection.on("sync", this.enablePagination, this);
            },
            onShow: function(){
                this.enablePagination();
            },
            enablePagination: function(){
                this.$el.page();
                this.pagination = this.$el.data("page");
                this.pagination.onpagechange = this.updateURL;
                this.scrollToArticle(this.options.articleId);
            },
            updateURL: function(){
                var currentModel = articleCollection.at(this.currentPage);
                Router.navigate("#article/" + currentModel.get("id"));
            },
            scrollToArticle: function(articleId){
                var index = articleCollection.getArticleIndex(articleId);
                this.pagination.scrollToPage(index, {instant: true});
            }
        });

        return ArticleCollectionView;
    }
);