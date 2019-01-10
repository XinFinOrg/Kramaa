/**
 * @title ERC-721 Non-Fungible Token Standard, optional metadata extension
 * @dev See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
contract IERC721Metadata is IERC721 {
  function name() external view returns (string memory);
  function symbol() external view returns (string memory);
  function tokenURI(uint256 tokenId) public view returns (string memory);
}

contract ERC721Metadata is ERC165, ERC721, IERC721Metadata {
  // Token name
  string internal _name;

  // Token symbol
  string internal _symbol;

  // Optional mapping for token URIs
  mapping(uint256 => string) private _tokenURIs;

  // Mapping of things to token ID
  mapping(uint256 => string) private _thingURIs;

  bytes4 private constant InterfaceId_ERC721Metadata = 0x5b5e139f;
  /**
   * 0x5b5e139f ===
   *   bytes4(keccak256('name()')) ^
   *   bytes4(keccak256('symbol()')) ^
   *   bytes4(keccak256('tokenURI(uint256)'))
   */

  /**
   * @dev Constructor function
   */
  constructor(string memory name, string memory symbol) public {
    _name = name;
    _symbol = symbol;

    // register the supported interfaces to conform to ERC721 via ERC165
    _registerInterface(InterfaceId_ERC721Metadata);
  }

  /**
   * @dev Gets the token name
   * @return string representing the token name
   */
  function name() external view returns (string memory) {
    return _name;
  }

  /**
   * @dev Gets the token symbol
   * @return string representing the token symbol
   */
  function symbol() external view returns (string memory) {
    return _symbol;
  }

  /**
   * @dev Returns a thing URI for a given token ID
   * Throws if the token ID does not exist. May return an empty string.
   * @param tokenId uint256 ID of the token to query
   */
  function tokenURI(uint256 tokenId) public view returns (string memory) {
    require(_exists(tokenId));
    return _tokenURIs[tokenId];
  }

  /**
   * @dev Returns an URI for a given token ID
   * Throws if the token ID does not exist. May return an empty string.
   * @param tokenId uint256 ID of the token to query
   */
  function thingURI(uint256 tokenId) public view returns (string memory) {
    require(_exists(tokenId));
    return _thingURIs[tokenId];
  }

  /**
   * @dev Internal function to set the token URI for a given token
   * Reverts if the token ID does not exist
   * @param tokenId uint256 ID of the token to set its URI
   * @param uri string URI to assign
   */
  function _setTokenURI(uint256 tokenId, string memory uri) internal {
    require(_exists(tokenId));
    _tokenURIs[tokenId] = uri;
  }

   /**
   * @dev Internal function to set the token URI for a given token
   * Reverts if the token ID does not exist
   * @param tokenId uint256 ID of the token to set its URI
   * @param uri string URI to assign
   */
  function _setThingURI(uint256 tokenId, string memory uri) internal {
    require(_exists(tokenId));
    _thingURIs[tokenId] = uri;
  }

  /**
   * @dev Internal function to burn a specific token
   * Reverts if the token does not exist
   * @param owner owner of the token to burn
   * @param tokenId uint256 ID of the token being burned by the msg.sender
   */
  function _burn(address owner, uint256 tokenId) internal {
    super._burn(owner, tokenId);

    // Clear metadata (if any)
    if (bytes(_tokenURIs[tokenId]).length != 0) {
      delete _tokenURIs[tokenId];
    }

    // Clear thing metadata (if any)
    if (bytes(_thingURIs[tokenId]).length != 0) {
      delete _thingURIs[tokenId];
    }
  }
}
