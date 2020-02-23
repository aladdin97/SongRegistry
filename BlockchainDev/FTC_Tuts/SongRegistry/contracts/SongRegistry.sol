pragma solidity >=0.5.0;

contract SongRegistry{

    struct Song {
       address owner;
       string title;
       string url;
       uint price;
    }

    Song[] public songs;
    mapping(uint => address[]) public buyers;

    function  register(string memory _title, string memory _url,uint _price) public returns(uint) {
        Song memory song = Song(msg.sender, _title, _url, _price);
        songs.push(song);
        buyers[songs.length - 1].push(msg.sender);
        return songs.length - 1;
    }

    function numberOfSongs() public view returns (uint){
       return songs.length;
    }

    function isBuyer(uint songId) public view returns (bool) {
        address[] storage songBuyers = buyers[songId];
        // Currently vectorizes lgoic does not exist so have to loop through code
        bool buyer;
        for (uint i = 0; i < songBuyers.length; i++) {
            if (songBuyers[i] == msg.sender){
                buyer = true;
            } else{
                buyer = false;
            }
        }
        return buyer;
    }

    function buy(uint songId) public payable {
        Song storage song = songs[songId];
        buyers[songId].push(msg.sender);
        require(msg.value == song.price, "Value does not match price. ");
        address(uint160(song.owner)).transfer(msg.value);
    }
}