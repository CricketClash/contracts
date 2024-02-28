// @ts-ignore
import hre, {ethers} from 'hardhat'
const { getSelectors, FacetCutAction } = require('./libraries/diamond')

const DeploymentConfig = require(`${__dirname}/../deployment_config.js`);
async function deploy() {

  const config = DeploymentConfig[hre.network.name];
  if (!config) {
    throw Error("deployment config undefined");
  }

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  try {
    console.log('Deploying facets')
    const FacetNames = [
      'DiamondCutFacet',
      'DiamondLoupeFacet',
    ]
    
    const facetCuts = []
    for (const FacetName of FacetNames) {
      const Facet = await ethers.getContractFactory(FacetName)
      const facet = await Facet.deploy()
      await facet.deployed()
      console.log(`${FacetName} deployed: ${facet.address}`)
      facetCuts.push({
        facetAddress: facet.address,
        action: FacetCutAction.Add,
        functionSelectors: getSelectors(facet)
      })
      
      console.log("Before Verifing Facet. Waiting for 10 seconds")
      //await wait(10);
      try {
        // await hre.run("verify:verify", {
        //   address: facet.address,
        //   contract: `contracts/facets/${FacetName}.sol:${FacetName}`,
        //   constructorArguments: [],
        // });
        //
        // console.log("Verified Successfully FACET", FacetName);
      } catch (error) {
        console.log("Verification Failed Implementation.: ", error);
      }
    } //  end of loop
    
    // deploy Diamond
    const diamondArgs = {
      contractOwner: deployer.address
    }
    const Diamond = await ethers.getContractFactory('CRCDiamond')
    const diamond = await Diamond.deploy(facetCuts, diamondArgs)
    await diamond.deployed()
    console.log("Deployed Successfully now waiting for 10 seconds so then we should do verification", diamond.address)
    // await wait(10);
    
    try {
      // await hre.run("verify:verify", {
      //   address: diamond.address,
      //   contract: `contracts/CRCDiamond.sol:CRCDiamond`,
      //   constructorArguments: [facetCuts, diamondArgs],
      // });
      //
      // console.log("Verified Successfully CRCDiamond",);
    } catch (error) {
      console.log("Verification Failed CRCDiamond.: ", error);
    }
    console.log('Diamond deployed:', diamond.address)
    
  } catch (error) {
  console.error("error in relayer deploy->", error)
}





}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


async function wait(timeInSeconds: number): Promise<void> {
  await new Promise((r) => setTimeout(r, timeInSeconds * 1000));
}
