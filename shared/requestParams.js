var requestParams = {
    host: ``,
    credentials: {
        username: ``,
        password: ``,
        token: ``
    },
    orgId: ``,
    asset: {
        id: ``,
        productVersion: ``,
        assetVersion: ``
    },
    environmentId: ``,
    groupId: ``,
    downloadFolder: ``,
    get ramlDestinationFile() {
        return `.${this.downloadFolder}/${this.asset.id}-${this.asset.assetVersion}-raml.zip`
      } 
}

module.exports = requestParams