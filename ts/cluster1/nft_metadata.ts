import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

    const image =
      "https://arweave.net/a2tl-xR5jadsjQud-4StXhoeJ4ojV5DhsSrb0BX2Pxo";
    const metadata = {
      name: "Royal Rug",
      symbol: "RORE",
      description: "The best for Royals",
      image: image,
      attributes: [
        { trait_type: "color", value: "purple" },
        { trait_type: "rarity", value: "legendary" },
        { trait_type: "magic", value: "true" },
      ],
      properties: {
        files: [
          {
            type: "image/png",
            uri: image,
          },
        ],
      },
      creators: [keypair.publicKey],
    };
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
// https://arweave.net/wchCsDG2WQcRkmqU9BfyXodBHSaY0KQkIIQxgtoqt_g
