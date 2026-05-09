use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod baseline {
    use super::*;

    pub fn log_health_scan(ctx: Context<LogScan>, scan_hash: [u8; 32], timestamp: i64) -> Result<()> {
        let scan_record = &mut ctx.accounts.scan_record;
        scan_record.owner = *ctx.accounts.owner.key;
        scan_record.scan_hash = scan_hash;
        scan_record.timestamp = timestamp;
        Ok(())
    }

    pub fn log_consent(ctx: Context<LogConsent>, consent_hash: [u8; 32]) -> Result<()> {
        let consent_record = &mut ctx.accounts.consent_record;
        consent_record.owner = *ctx.accounts.owner.key;
        consent_record.consent_hash = consent_hash;
        consent_record.timestamp = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct LogScan<'info> {
    #[account(init, payer = owner, space = 8 + 32 + 32 + 8)]
    pub scan_record: Account<'info, ScanRecord>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct LogConsent<'info> {
    #[account(init, payer = owner, space = 8 + 32 + 32 + 8)]
    pub consent_record: Account<'info, ConsentRecord>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct ScanRecord {
    pub owner: Pubkey,
    pub scan_hash: [u8; 32],
    pub timestamp: i64,
}

#[account]
pub struct ConsentRecord {
    pub owner: Pubkey,
    pub consent_hash: [u8; 32],
    pub timestamp: i64,
}
