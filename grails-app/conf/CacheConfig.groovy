cache {
    diskStore.path = "/tmp"

    // Mandatory default configuration
    defaultConfiguration {
        maxElementsInMemory = 3000
        timeToIdleSeconds = 120
    }

    // Basic cache tag configuration
    tagCache {
        maxElementsInMemory = 3000
        timeToLiveSeconds = 120
    }

    // reload expired content asynchronously
	sampleCache {
        maxElementsInMemory = 300
        timeToLiveSeconds = 60
        eternal = true
        reloadAsynchronously = true
		asynchronousThreadLimit = 20
	}

    timeoutCache {
        maxElementsInMemory = 1
        timeToLiveSeconds = 600
        eternal = true
        reloadAsynchronously = true
		asynchronousThreadLimit = 20
        blockingTimeoutMillis = 100
    }

    disabledCache {
        disabled = true
    }


    /*
    * Sample cache named "weather"
    * This cache contains a maximum in memory of 10000 elements, and will expire
    * an element if ot lives for more than 10 minutes.
    * If there are more than 10000 elements it will overflow to the
    * disk cache, which in this configuration will go to wherever java.io.tmp is
    * defined on your system. On a standard Linux system this will be /tmp"
    */
    /*
    weather {
        timeToLiveSeconds = 10*10
        maxElementsInMemory = 10000
        maxElementsOnDisk = 100000
        overflowToDisk = true
        diskPersistent = true
        diskSpoolBufferSizeMB = 30
        diskExpiryThreadIntervalSeconds = 3600
    }*/


    /*
     * Sample cache named "headlines".
     * This cache is configured to use side-chain reloading (i.e. it will reload new entries transparently with one thread, while still serving expired entries to other threads)
     */
     /*
     headlines {
        maxElementsInMemory = 3000
        eternal = true
        timeToIdleSeconds = 300
        timeToLiveSeconds = 300
        overflowToDisk = false
        eternal = true
        sideChainRefreshable = true
        memoryStoreEvictionPolicy = "LRU"
    }*/
     
    
    /*
    * Sample distributed cache named "news".
    * This cache replicates using defaults except that the asynchronous replication
    * interval is set to 200ms.
    */
    /*
    news {
        maxElementsInMemory = 1000
        eternal = false
        timeToIdleSeconds = 300
        timeToLiveSeconds = 600
        overflowToDisk = true
        
        cacheEventListenerFactory {
            factory = net.sf.ehcache.distribution.RMICacheReplicatorFactory
            properties {
                asynchronousReplicationIntervalMillis = 200
            }
        } 
    }*/


    /**
     * Example peer providers and listener configuration
     */

    /*
    cacheManagerPeerProviderFactory {
        factory = net.sf.ehcache.distribution.RMICacheManagerPeerProviderFactory
        properties {
            peerDiscovery = "manual"
            rmiUrls = [
                    "//server1:40000/news",
                    "//server2:40000/news",
                    "//server3:40000/news"
                ]
        }
    }

    cacheManagerPeerListenerFactory {
        factory = net.sf.ehcache.distribution.RMICacheManagerPeerProviderFactory
        properties {
            port = 40001
            socketTimeoutMillis =120000
            remoteObjectPort = 40002
        }
    }*/

}
