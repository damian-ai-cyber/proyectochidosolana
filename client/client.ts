import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { VotingApp } from "../target/types/voting_app";
import type { VotingApp } from "../target/types/voting_app";

// Configure the client to use the local cluster
anchor.setProvider(anchor.AnchorProvider.env());

const program = anchor.workspace.VotingApp as anchor.Program<VotingApp>;


const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.VotingApp as Program<VotingApp>;

async function main() {

  // Generar cuenta para encuesta
  const poll = anchor.web3.Keypair.generate();

  console.log("Creando encuesta...");

  await program.methods
    .initializePoll("¿Rust o JavaScript?")
    .accounts({
      poll: poll.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([poll])
    .rpc();

  console.log("Encuesta creada:", poll.publicKey.toString());

  console.log("Votando opción A...");

  await program.methods
    .voteA()
    .accounts({
      poll: poll.publicKey,
    })
    .rpc();

  console.log("Voto enviado");
}

main();
