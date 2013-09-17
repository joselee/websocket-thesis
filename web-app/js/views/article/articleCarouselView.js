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
                _.bindAll(this);
            },
            onShow: function(){
                this.scrollToArticle(this.options.articleId);
            },
            appendHtml: function(collectionView, itemView, index){
                if (collectionView.el.pagination === undefined){ // If at least on element and juissi has to be defined
                    collectionView.el.pagination = new juissi.Explore(collectionView.el,{
                        horizontalMode : true,
                        loopHorizontal : true
                    });
                    this.pagination = collectionView.el.pagination;
                    this.pagination.triggers.onPageChange = this.onPageChange;
                }

                if ( !this.pagination.elementExists(index, 0) ){
                    this.pagination.setElement({x: index, y : 0}, itemView.el);

                } else {
                    this.pagination.updateElement({x: index, y : 0}, itemView.el);
                }
                this.pagination.alignElements(); // Align elements after all
            },
            onPageChange: function(){
                var currentModel = articleCollection.at(this.pagination.getCurrentCoords().x);
                Router.navigate("#article/" + currentModel.get("id"));
            },
            scrollToArticle: function(articleId){
                var index = articleCollection.getArticleIndex(articleId);
                this.pagination.scroll(index, 0, {instant: true});
            }
        });

        return ArticleCarouselView;
    }
);