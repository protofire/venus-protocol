const contractConfigData = require("../../../networks/testnet.json");

(async () => {

  const governorAlphaAddress = contractConfigData.Contracts.GovernorAlpha;

  const governorAlphaContractInstance = await saddle.getContractAt('GovernorAlpha', governorAlphaAddress);

  const lastProposalId = await governorAlphaContractInstance.methods.proposalCount().call();
  const timelockAddress = contractConfigData.Contracts.Timelock;
  const xvsAddress = contractConfigData.Tokens.XVS.address;
  const guardian = contractConfigData.Accounts.Guardian;

  const constructorArgumentArray = [timelockAddress, xvsAddress, guardian, lastProposalId];
  console.log(`Deploying GovernorAlpha2 with timelockAddress, xvsAddress, guardian in constructorArguments: ${constructorArgumentArray}`);
  
  let deployedGovernorAlpha2 = await saddle.deploy('GovernorAlpha2', constructorArgumentArray);
  const constructorData = web3.eth.abi.encodeParameters(['address','address','address', 'uint256'], constructorArgumentArray);
  console.log(`Deployed GovernorAlpha2 to ${deployedGovernorAlpha2._address} with constructorData: ${constructorData}`);
})();
