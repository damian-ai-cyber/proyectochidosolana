import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { VotingApp } from "../target/types/voting_app";
import type { VotingApp } from "../target/types/voting_app";

describe("voting-app", () => {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.VotingApp as anchor.Program<VotingApp>;
  

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.VotingApp as Program<VotingApp>;

  // Cuenta donde se guardará la encuesta
  const poll = anchor.web3.Keypair.generate();

  it("Inicializa encuesta", async () => {

    await program.methods
      .initializePoll("¿Cuál lenguaje te gusta más?")
      .accounts({
        poll: poll.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([poll])
      .rpc();

    console.log("Encuesta creada");
  });

  it("Votar opción A", async () => {

    await program.methods
      .voteA()
      .accounts({
        poll: poll.publicKey,
      })
      .rpc();

    console.log("Voto A registrado");
  });

});
