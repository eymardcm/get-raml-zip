# get-raml-zip

npm install

node .\app.js --help

Options:

        --help              Show help                                                         [boolean]
        --version           Show version number                                               [boolean]
    -h, --anypoint-host     Anypoint platform hostname                                        [string] [required]
    -o, --orgid             Anypoint Organization Id                                          [string] [required]
    -a, --assetid           Asset Id of the RAML spec you intend to retrieve                  [string] [required]
    -v, --assetProdVer      Asset Product Version of RAML spec you intend to retrieve         [string] [required]                           
    -u, --anypointusername  An Anypoint Platform Username that has access to the RAML spec              [string] [required]
    -p, --anypointpassword  An Anypoint Platform password associated with the username                  [string] [required]
    -d, --downloadfolder    Name of the download folder you want to receive your downloaded RAML spec   [string] [required]
                                         


Examples:

  node app.js -h anypoint.mulesoft.com -o 000a0000-0ab0-1122-1a1b-000000000000 -a my-great-api -v v1 -u myusername -p mypassword -d /downloads