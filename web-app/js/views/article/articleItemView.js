define(
    [
        "backbone.marionette",
        "hbs!templates/articleItemViewTemplate"
    ],
    function ArticleItemView(Marionette, ArticleItemViewTemplate){
        var ArticleItemView = Marionette.ItemView.extend({
            className: "articleItemView",
            template: ArticleItemViewTemplate
        });

        return ArticleItemView;
    }
);