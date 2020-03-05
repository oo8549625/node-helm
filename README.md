# node-helm 3

## Get Started

Setup your helm.sh file location - for linux or windows
```
let helmBinary = '/usr/local/bin/helm';

if (process.platform === "win32") {
    helmBinary = 'helm';
}
```

require Helm class
```
const Helm = require("node-helm").Helm;
var helm = Promise.promisifyAll(new Helm({helmCommand: helmBinary}));
```

## API

### List releases
https://docs.helm.sh/helm/#helm-list
```
    let options = {}; //No options available currently
    let releases = await helm.listAsync(options);  
```

### Get a release
https://docs.helm.sh/helm/#helm-get
```
    let options = {
        releaseName = 'service';
        subCommand: 'all';
    }
    let history = await helm.getAsync(options);  
```
```
    Available Commands:
    all         download all information for a named release
    hooks       download all hooks for a named release
   manifest    download the manifest for a named release
   notes       download the notes for a named release
   values      download the values file for a named release 
```

### Install a service
https://docs.helm.sh/helm/#helm-install
```
let options = {
    chartName: "CHARTNAME",
    releaseName: "SERVICENAME",        
    namespace: "dev",        
    //custom values
    values: {
        "key":"value"
    }
};
return installation = await helm.installAsync(options);  
```


### Upgrade a service
https://docs.helm.sh/helm/#helm-upgrade
```
    return await helm.upgradeAsync({
        resetValues : shouldResetValues, //boolean value
        chartName: "./ChartFolder",
        releaseName: SERVICENAME,
        values: {
        "key":"value"
    });  
```

### Delete a service
https://docs.helm.sh/helm/#helm-delete
```
    var options = {
        releaseName: 'service'
    }
    return await helm.deleteAsync(options);
```

### Get release history
https://docs.helm.sh/helm/#helm-history
```    
    let options = {
        releaseName = 'service';
    }
    let history = await helm.historyAsync(options);  
```

### Test a release
https://docs.helm.sh/helm/#helm-test
```    
    let options = {
        releaseName = 'service'
    }
    let test = await helm.testAsync(options);  
```


### Rollback a release to a previous revision
https://docs.helm.sh/helm/#helm-rollback
```    
    let options = {
        releaseName = 'service',
        revision: 0
    };
    let rollback = await helm.rollbackAsync(options);  
```


### Get a release status
https://docs.helm.sh/helm/#helm-status
```    
    let options = {
        releaseName = 'service';
    }
    let status = await helm.statusAsync(options);  
```
