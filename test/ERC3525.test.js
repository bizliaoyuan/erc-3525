const { shouldBehaveLikeERC721, shouldBehaveLikeERC721Enumerable, shouldBehaveLikeERC721Metadata } = require('./ERC721.behavior');
const { shouldBehaveLikeERC3525, shouldBehaveLikeERC3525Metadata } = require('./ERC3525.behavior');

async function deployContract(name, symbol, decimals) {
  const ERC3525Factory = await ethers.getContractFactory('ERC3525BurnableUpgradeable');
  const erc3525 = await ERC3525Factory.deploy();
  await erc3525.deployed();
  await erc3525.initialize(name, symbol, decimals);
  return erc3525;
}

describe('ERC3525', () => {

  const name = 'Semi Fungible Token';
  const symbol = 'SFT';
  const decimals = 18;

  beforeEach(async function () {
    this.token = await deployContract(name, symbol, decimals);
  })

  describe('should support interfaces', function () {
    shouldBehaveLikeERC721('ERC721');
    shouldBehaveLikeERC721Enumerable('ERC721Enumerable');
    shouldBehaveLikeERC721Metadata('ERC721Metadata', name, symbol);
    // shouldBehaveLikeERC3525();
    // shouldBehaveLikeERC3525Metadata();
  })

})