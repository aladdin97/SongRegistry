const SongRegistry = artifacts.require('./SongRegistry.sol')

// Test starts here
contract('SongRegistry', function (accounts) {
    // predefine the contract instance
    let SongRegistryInstance
  
    // before each test, create a new contract instance
    beforeEach(async function () {
      SongRegistryInstance = await SongRegistry.new()

    })

    it('should add a song to the registry', async function(){
        await SongRegistryInstance.register("Cool Song","example.com",1, {'from': accounts[0]}) 
        let song = await SongRegistryInstance.songs(0)
        assert.equal(song.title,"Cool Song","Title has not been set correctly.")
        assert.equal(song.owner,accounts[0],"Owner has not been set correctly.")
        assert.equal(song.url, "example.com", "A url was not made")
        assert.equal(song.price, 1, "The price is not available")
    })

    it('should increase the number of songs with a new registration', async function(){
        await SongRegistryInstance.register("Cool Song","example.com",1, {'from': accounts[0]}) 
        await SongRegistryInstance.register("Cooler Song","exampleagain.com",1, {'from': accounts[0]}) 
        let noSongs = await SongRegistryInstance.numberOfSongs()
        assert.equal(noSongs, 2, "The number of songs did not increase")
    })

    it('should make sure a song can be bought and that the true buyer is indentified', async function(){
        await SongRegistryInstance.register("Cool Song","example.com",1, {'from': accounts[0]}) 
        await SongRegistryInstance.buy(0,{ "from": accounts[1], "value": 1})

        // let buyers_list = SongRegistryInstance.buyers(0)
        // assert.equal(buyers_list.length,2,"There is more than one address in the buyers array.")
        // assert.equal(buyers_list[1],accounts[1],"Buyer's address has been correctly added")

        let isBuyer = await SongRegistryInstance.isBuyer(0, {'from': accounts[1]})
        // check if true
        assert(isBuyer, "A song could not be bought")
    })

})