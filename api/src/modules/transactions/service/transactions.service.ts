import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountsOwnerShipService } from '../../bank-accounts/services/validate-bank-accounts-ownreship.service';
import { ValidateCategoryOwnerShipService } from '../../categories/services/validate-category-ownreship.service';
import { ValidateTransactionOwnerShipService } from './validate-transaction-ownreship.service';
import { TransactionType } from '../entities/transaction';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepo: TransactionsRepository,
    private readonly validateBankAccountsOwnerShipService: ValidateBankAccountsOwnerShipService,
    private readonly validateCategoryOwnerShipService: ValidateCategoryOwnerShipService,
    private readonly validateTransactionOwnerShipService: ValidateTransactionOwnerShipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } =
      createTransactionDto;

    await this.validateEntitesOwnreShip({ userId, bankAccountId, categoryId });

    return this.transactionRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccontId?: string;
      type?: TransactionType;
    },
  ) {
    return this.transactionRepo.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccontId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;

    await this.validateEntitesOwnreShip({
      userId,
      transactionId,
      bankAccountId,
      categoryId,
    });

    return this.transactionRepo.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitesOwnreShip({ userId, transactionId });

    await this.transactionRepo.delete({
      where: { id: transactionId },
    });

    return null;
  }

  private async validateEntitesOwnreShip({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnerShipService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validateBankAccountsOwnerShipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validateCategoryOwnerShipService.validate(userId, categoryId),
    ]);
  }
}
