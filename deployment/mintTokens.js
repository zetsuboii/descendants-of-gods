const hardhat = require("hardhat");
const ethers = hardhat.ethers;

async function main() {
    const signer = await ethers.getSigner();

    const SonsFactory = await ethers.getContractFactory("SONS");
    const BiliraFactory = await ethers.getContractFactory("BILIRA");

    const Sons = SonsFactory.attach("0x4F640bd611710003c0f04A05f947Fac11bE9e729");
    const Bilira = BiliraFactory.attach("0x53a697E7A92a95E10be4c9ddA96ed736aC37d752");

    const addr1 = "0x1070cF71bEFe2D83faE5CfD337f5A118F61F227f";
    const addr2 = "0xd0c3386D693A303f66cE76C79CD1549DFB5F1e0D";

    await Sons.connect(signer).mint(addr1, ethers.utils.parseEther("100000"));
    await Sons.connect(signer).mint(addr2, ethers.utils.parseEther("100000"));
    await Bilira.connect(signer).mint(addr1, ethers.utils.parseEther("100000"));
    await Bilira.connect(signer).mint(addr2, ethers.utils.parseEther("100000"));

    console.log("Done");
}

main().then(() => {
    process.exit(0);
}).catch((e) => {
    console.log(e);
    process.exit(-1);
});