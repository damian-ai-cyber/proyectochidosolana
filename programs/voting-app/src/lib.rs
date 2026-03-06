// Importamos la librería principal de Anchor
use anchor_lang::prelude::*;

// ID del programa en Solana (identificador único del contrato)
declare_id!("Vote111111111111111111111111111111111111111");

// Definimos el programa principal
#[program]
pub mod voting_app {
    use super::*;

    // Función para crear una nueva encuesta
    pub fn initialize_poll(ctx: Context<InitializePoll>, question: String) -> Result<()> {

        // Accedemos a la cuenta donde se guardará la encuesta
        let poll = &mut ctx.accounts.poll;

        // Guardamos la pregunta de la encuesta
        poll.question = question;

        // Inicializamos los votos en 0
        poll.option_a_votes = 0;
        poll.option_b_votes = 0;

        Ok(())
    }

    // Función para votar por la opción A
    pub fn vote_a(ctx: Context<Vote>) -> Result<()> {

        // Accedemos a la encuesta
        let poll = &mut ctx.accounts.poll;

        // Sumamos 1 voto a la opción A
        poll.option_a_votes += 1;

        Ok(())
    }

    // Función para votar por la opción B
    pub fn vote_b(ctx: Context<Vote>) -> Result<()> {

        // Accedemos a la encuesta
        let poll = &mut ctx.accounts.poll;

        // Sumamos 1 voto a la opción B
        poll.option_b_votes += 1;

        Ok(())
    }
}

//
// DEFINICIÓN DE CUENTAS
//

// Estructura que se usa para crear la encuesta
#[derive(Accounts)]
pub struct InitializePoll<'info> {

    // Creamos una nueva cuenta donde se guardará la encuesta
    // payer = quien paga el costo de crear la cuenta
    // space = espacio reservado para guardar datos
    #[account(init, payer = user, space = 8 + 200)]
    pub poll: Account<'info, Poll>,
    
    // Usuario que firma la transacción
    #[account(mut)]
    pub user: Signer<'info>,

    // Programa del sistema de Solana necesario para crear cuentas
    pub system_program: Program<'info, System>,
}

// Estructura usada cuando alguien vota
#[derive(Accounts)]
pub struct Vote<'info> {

    // Indicamos que la cuenta de la encuesta puede modificarse
    #[account(mut)]
    pub poll: Account<'info, Poll>,
}

//
// ESTRUCTURA DE DATOS
//

// Aquí definimos qué información se guarda en la blockchain
#[account]
pub struct Poll {

    // Pregunta de la encuesta
    pub question: String,

    // Número de votos de la opción A
    pub option_a_votes: u64,

    // Número de votos de la opción B
    pub option_b_votes: u64,
}