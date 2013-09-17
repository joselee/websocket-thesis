global {
    maxConcurrentConnections = 200
    idleConnectionTimeout = 30
    defaultMaxPerRoute = 30
}

hosts {
    // required
    defaults {
        connectionTimeout = 10000
        socketTimeout = 10000
    }
    "search.twitter.com" {
        connectionTimeout = 1000
        socketTimeout = 1000
    }
    "localhost" {
        sendDeviceHeaders = true
    }
}

environments {
    development {
        persistentCache {
            enabled = false
            location = System.getProperty('java.io.tmpdir')
            urlFilter = /.*/
        }
    }
}
