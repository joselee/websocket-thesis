package homepage

import grails.converters.*
import groovy.json.JsonSlurper

class ArticleController {

    def grailsApplication

    def index() { }

    def articles = {
        File jsonFile = grailsApplication.parentContext.getResource("feeds/articles2.json").file
        JsonSlurper jsonSlurper = new JsonSlurper()
        def feed = jsonSlurper.parseText(jsonFile.text)
        def articleCollection = []
        feed.each { article ->
            def articleModel = [:]

            articleModel.title = article.title
            articleModel.id = article.id

            int imageId = new Random().nextInt(10) + 1
            articleModel.imageURL = g.resource(dir: "images", file: "${imageId}.gif", absolute: true)

            articleModel.body = []
            article.each{ articleProperty ->
                if (articleProperty.key.contains("paragraph")){
                    articleModel.body.push("${articleProperty.value}")
                }
            }

            articleCollection.push(articleModel)
        }
        render articleCollection as JSON
    }
}
