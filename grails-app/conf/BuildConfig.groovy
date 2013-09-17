grails.servlet.version = "2.5" // Change depending on target container compliance (2.5 or 3.0)
grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.target.level = 1.6
grails.project.source.level = 1.6
//grails.project.war.file = "target/${appName}-${appVersion}.war"

grails.tomcat.nio=true

grails.project.dependency.resolution = {
    // inherit Grails' default dependencies
    inherits("global") {
        // specify dependency exclusions here; for example, uncomment this to disable ehcache:
        // excludes 'ehcache'
    }
    log "error" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    checksums true // Whether to verify checksums on resolve
    legacyResolve false // whether to do a secondary resolve on plugin installation, not advised and here for backwards compatibility

    repositories {
        inherits true // Whether to inherit repository definitions from plugins
        mavenRepo "http://conmio.artifactoryonline.com/conmio/plugins-releases-local"
        mavenRepo "http://conmio.artifactoryonline.com/conmio/plugins-snapshots-local"
        grailsPlugins()
        grailsHome()
        grailsCentral()
        mavenLocal()
        mavenCentral()
    }

    dependencies {
        compile ("org.atmosphere:atmosphere-runtime:1.1.0.beta3"){
		    excludes 'slf4j-api', 'atmosphere-ping'
	    }
    }

    plugins {
        compile ':cache:1.0.1'
        build ":tomcat:$grailsVersion"
        runtime ":hibernate:$grailsVersion"
        runtime ":jquery:1.8.3"
        runtime ":resources:1.1.6"
        runtime ":database-migration:1.2.1"

        runtime ":dynagate-http:3.1.2"
        runtime ":dynagate-cache:2.7.5"
        runtime ":device-gate:2.9.15"

        runtime (":atmosphere:0.4.2.3"){
		exclude 'atmosphere-runtime'
	}
    }
}
