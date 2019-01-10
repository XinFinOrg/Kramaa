pragma solidity ^0.5.2;

contract RegistryContract {

    constructor() public payable {
        owner = msg.sender;
    }

    struct Organization {
        bytes32 name;
        address[] managerAddresses;
        address ownerAddress;

    }

    struct Project {
        address contractAddress;
        bytes32 description;
        bytes32 tokenName;
        bytes32 tokenSymbol;
    }
    mapping (bytes32 => Organization) public organizationRegistries;
    mapping (bytes32 => address[]) public organizationProjectRegistries;
    mapping (bytes32 => Project) public projectRegistries;
    mapping (address => Project) public projectAddressMapping;
    address public owner;

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function addNewProject(address contractAddress, bytes32 name, bytes32 description, bytes32 tokenName, bytes32 tokenSymbol, bytes32 organizationName) public onlyOwner{
        Project memory project;
        project.contractAddress = contractAddress;
        project.description = description;
        project.tokenName = tokenName;
        project.tokenSymbol = tokenSymbol;
        projectRegistries[name] = project;
        projectAddressMapping[contractAddress] = project;
        if(organizationRegistries[organizationName].name == ""){
            organizationRegistries[organizationName].name = organizationName;
        }
        organizationProjectRegistries[organizationName].push(contractAddress);
    }

    function addOrganizationDetails(bytes32 organizationName, address[] memory managerAddresses, address ownerAddress) public onlyOwner {
        if(organizationRegistries[organizationName].name == ""){
            organizationRegistries[organizationName].name = organizationName;
        }
        organizationRegistries[organizationName].managerAddresses = managerAddresses;
        organizationRegistries[organizationName].ownerAddress = ownerAddress;
    }

    function getProjectFromProjectName(bytes32 projectName) public view returns (address, bytes32, bytes32, bytes32) {
        return (projectRegistries[projectName].contractAddress, projectRegistries[projectName].description, projectRegistries[projectName].tokenName, projectRegistries[projectName].tokenSymbol);
    }

    function getProjectAddressesFromOrganizationName(bytes32 organizationName) public view returns (address[] memory) {
        return (organizationProjectRegistries[organizationName]);
    }

}
