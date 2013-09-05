define(
    [
        "backbone.marionette",
        "views/article/articlePageItemView",
        "collections/articleCollection",
        "router"
    ],
    function ArticleCarouselView(Marionette, ArticlePageItemView, articleCollection, Router){

        var ArticleCarouselView = Marionette.CollectionView.extend({
            className: "articleCarouselView",
            itemView: ArticlePageItemView,
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

        return ArticleCarouselView;
    }
);