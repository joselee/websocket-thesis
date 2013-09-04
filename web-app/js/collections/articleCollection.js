define(
    [
        "backbone",
        "models/articleModel"
    ],
    function ArticleCollection(Backbone, ArticleModel){
        var ArticleCollection = Backbone.Collection.extend({
            model: ArticleModel,
            url: "article/articles",

            getArticleIndex: function(articleId){
                var article = this.find(function(model){
                    return model.get("id") === articleId;
                });

                return this.models.indexOf(article);
            }
        });

        var articleCollection = new ArticleCollection();
        articleCollection.fetch();

        return articleCollection;
    }
);