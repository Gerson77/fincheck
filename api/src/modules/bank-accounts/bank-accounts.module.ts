import { Module } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { ValidateBankAccountsOwnerShipService } from './services/validate-bank-accounts-ownreship.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBankAccountsOwnerShipService],
  exports: [ValidateBankAccountsOwnerShipService],
})
export class BankAccountsModule {}
