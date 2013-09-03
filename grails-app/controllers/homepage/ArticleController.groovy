package homepage

import grails.converters.*
import groovy.json.JsonSlurper

class ArticleController {

    def grailsApplication

    def index() { }

    def articles = {
        File jsonFile = grailsApplication.parentContext.getResource("feeds/articles.json").file
        JsonSlurper jsonSlurper = new JsonSlurper()
        def articles = jsonSlurper.parseText(jsonFile.text)
        articles.each {
            int imageId = new Random().nextInt(10) + 1
            String imageURL = g.resource(dir: "images", file: "${imageId}.gif", absolute: true)
            it.imageURL = imageURL
        }
        render articles as JSON
    }
}
