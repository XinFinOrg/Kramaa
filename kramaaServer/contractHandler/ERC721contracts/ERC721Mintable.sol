contract MinterRole {
  using Roles for Roles.Role;

  event MinterAdded(address indexed account);
  event MinterRemoved(address indexed account);

  Roles.Role private minters;

  constructor() public {
    minters.add(msg.sender);
  }

  modifier onlyMinter() {
    require(isMinter(msg.sender));
    _;
  }

  function isMinter(address account) public view returns (bool) {
    return minters.has(account);
  }

  function addMinter(address account) public onlyMinter {
    minters.add(account);
    emit MinterAdded(account);
  }

  function renounceMinter() public {
    minters.remove(msg.sender);
  }

  function _removeMinter(address account) internal {
    minters.remove(account);
    emit MinterRemoved(account);
  }
}

/**
 * @title ERC721Mintable
 * @dev ERC721 minting logic
 */
contract ERC721Mintable is ERC721Full, MinterRole {
  event MintingFinished();

  bool private _mintingFinished = false;

  modifier onlyBeforeMintingFinished() {
    require(!_mintingFinished);
    _;
  }

  /**
   * @return true if the minting is finished.
   */
  function mintingFinished() public view returns(bool) {
    return _mintingFinished;
  }


  /**
   * @dev Function to mint tokens
   * @param to The address that will receive the minted tokens.
   * @param tokenId The token id to mint.
   * @return A boolean that indicates if the operation was successful.
   */
  function mint(
    address to,
    uint256 tokenId,
    bytes32 deviceURN
  )
    public
    onlyMinter
    onlyBeforeMintingFinished
    returns (bool)
  {
    _mint(to, tokenId);
    _urnMapping[deviceURN]=tokenId;
    return true;
  }

  function mintWithTokenURI(
    address to,
    uint256 tokenId,
    string memory tokenURI,
    bytes32 deviceURN
  )
    public
    onlyMinter
    onlyBeforeMintingFinished
    returns (bool)
  {
    mint(to, tokenId, deviceURN);
    _setTokenURI(tokenId, tokenURI);
    return true;
  }
}
