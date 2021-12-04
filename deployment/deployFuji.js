const fs = require("fs");
const hardhat = require("hardhat");
const ethers = hardhat.ethers;

async function main() {
    const signer = await ethers.getSigner();
    const ArenaFactory = await ethers.getContractFactory("ARENA");
    const SonsFactory = await ethers.getContractFactory("SONS");
    const BiliraFactory = await ethers.getContractFactory("BILIRA");
    const GodFactory = await ethers.getContractFactory("GOD");
    const XPFactory = await ethers.getContractFactory("XP");
    const MatchMakerFactory = await ethers.getContractFactory("MatchMaker");
    const MarketplaceFactory = await ethers.getContractFactory("Marketplace");

    const XP = await XPFactory.deploy();
    await XP.deployed();
    console.log("XP deployed");

    const God = await GodFactory.deploy();
    await God.deployed();
    console.log("God deployed");

    const Arena = await ArenaFactory.deploy();
    await Arena.deployed();
    console.log("Arena deployed");

    const Bilira = await BiliraFactory.deploy();
    await Bilira.deployed();
    console.log("Bilira deployed");

    const Sons = await SonsFactory.deploy();
    await Sons.deployed();
    console.log("Sons deployed");

    const Marketplace = await MarketplaceFactory.deploy(
        Arena.address,
        God.address,
        Sons.address,
        Bilira.address
    );
    await Marketplace.deployed();
    console.log("Marketplace deployed");

    const MatchMaker = await MatchMakerFactory.deploy(
        XP.address,
        Arena.address,
        Sons.address,
        Bilira.address,
        God.address
    );
    await MatchMaker.deployed();
    console.log("MatchMaker deployed");

    await God.connect(signer).registerType(1, [true, 0, 1, 1, 1, 4, 2]); // Warrior
    await God.connect(signer).registerType(2, [true, 0, 3, 3, 1, 2, 1]); // Archer
    await God.connect(signer).registerType(3, [true, 0, 2, 2, 2, 2, 3]); // Wizard
    await God.connect(signer).registerType(4, [true, 1, 2, 2, 3, 4, 2]); // Healer
    await God.connect(signer).registerType(5, [true, 0, 1, 1, 4, 5, 3]); // Titan

    await Arena.connect(signer).mint(signer.address, 0, [3, 900, 30, ethers.utils.parseEther("100")]);
    await Arena.connect(signer).mint(signer.address, 1, [3, 900, 30, ethers.utils.parseEther("100")]);
    await Arena.connect(signer).mint(signer.address, 2, [3, 900, 30, ethers.utils.parseEther("100")]);
    await Arena.connect(signer).mint(signer.address, 3, [4, 900, 30, ethers.utils.parseEther("100")]);
    await Arena.connect(signer).mint(signer.address, 4, [5, 900, 30, ethers.utils.parseEther("100")]);

    await Marketplace.connect(signer).listArena(0, 0, ethers.utils.parseEther("500"));
    await Marketplace.connect(signer).listArena(1, 0, ethers.utils.parseEther("500"));
    await Marketplace.connect(signer).listArena(2, 0, ethers.utils.parseEther("500"));

    const addr1 = "0x1070cF71bEFe2D83faE5CfD337f5A118F61F227f";
    const addr2 = "0xd0c3386D693A303f66cE76C79CD1549DFB5F1e0D";

    await God.connect(signer).mintBatch(addr1, [1, 2, 3, 4, 5], [100, 100, 100, 100, 100], 0x0);
    await God.connect(signer).mintBatch(addr2, [1, 2, 3, 4, 5], [100, 100, 100, 100, 100], 0x0);

    await Sons.connect(signer).mint(addr1, ethers.utils.parseEther("100000"));
    await Sons.connect(signer).mint(addr2, ethers.utils.parseEther("100000"));
    await Bilira.connect(signer).mint(addr1, ethers.utils.parseEther("100000"));
    await Bilira.connect(signer).mint(addr2, ethers.utils.parseEther("100000"));


    const addresses = "God: " + God.address + "\n" +
        "Arena: " + Arena.address + "\n" +
        "Sons: " + Sons.address + "\n" +
        "XP: " + XP.address + "\n" +
        "Bilira: " + Bilira.address + "\n" +
        "God: " + God.address + "\n" +
        "MatchMaker: " + MatchMaker.address + "\n" +
        "Marketplace: " + Marketplace.address + "\n";

    console.log(addresses);
    fs.writeFile("./addresses.txt", addresses, () => {
        console.log("Done");
    });
}

main().then(() => {
    process.exit(0);
}).catch((e) => {
    console.log(e);
    process.exit(-1);
});