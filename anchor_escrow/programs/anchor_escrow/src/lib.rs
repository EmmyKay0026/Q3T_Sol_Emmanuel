use anchor_lang::prelude::*;

declare_id!("6yBxQtY36YUjXgQqGr9y21hmNMWi94MJ5Ld9hShHsG2y");

pub mod state;
pub use state::*;

pub mod instructions;
pub use instructions::*;

#[program]
pub mod anchor_escrow {
    use super::*;

    pub fn initialize(ctx: Context<Make>, seed: u64, amount_to_recieve: u64, deposit_amount: u64) -> Result<()> {
        ctx.accounts.init_escrow(seed,amount_to_recieve,&ctx.bumps)?;
        ctx.accounts.deposit(deposit_amount)?;

        Ok(())
    }
    pub fn take_and_close(ctx: Context<Take>) -> Result<()> {
        //TODO Error Handling
        ctx.accounts.deposit_to_maker()?;
        ctx.accounts.take()?;
        //close vault
        ctx.accounts.close_account()?;
    
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
