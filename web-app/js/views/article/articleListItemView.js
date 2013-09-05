define(
    [
        "backbone.marionette",
        "hbs!templates/articleListItemViewTemplate"
    ],
    function ArticleItemView(Marionette, ArticleListItemViewTemplate){
        var ArticleItemView = Marionette.ItemView.extend({
            tagName: "a",
            className: "articleListItemView",
            template: ArticleListItemViewTemplate,
            initialize: function(){
                this.$el.attr("href", "#article/" + this.model.id);
            }
        });

        return ArticleItemView;
    }
);