   
/**
* ERC20 abi
*/
export const ERC20Abi = [
    // Some details about the token
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function icon() view returns (string)',

    // Get the account balance
    'function balanceOf(address) view returns (uint)',

    // Send some of your tokens to someone else
    'function transfer(address to, uint amount)',

    // An event triggered whenever anyone transfers to someone else
    'event Transfer(address indexed from, address indexed to, uint amount)',

    // Approval
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function allowance(address owner, address spender) external view returns (uint256)',
  ];

/**
* NFT abi 
*/
export const NFTAbi = ['function mint(uint numberOfTokens) public payable',
    'function mintGAPE(uint256 numberOfTokens) public payable',

    'function balanceOf(address owner) public view virtual override returns (uint256)',
    'function ownerOf(uint256 tokenId) public view virtual override returns (address)',
    'function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual override returns (uint256)',
    'function tokenByIndex(uint256 index) public view virtual override returns (uint256)',
    'function totalSupply() public view virtual override returns (uint256)',
    'function tokenURI(uint256 tokenId) external view returns (string memory)',
]