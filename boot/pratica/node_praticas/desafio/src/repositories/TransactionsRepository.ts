import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, transaction) => {
      return (total += transaction.type === 'income' ? transaction.value : 0);
    }, 0);

    const outcome = this.transactions.reduce((total, transaction) => {
      return (total += transaction.type === 'outcome' ? transaction.value : 0);
    }, 0);

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transactions = new Transaction({ title, type, value });

    this.transactions.push(transactions);
    this.getBalance();
    return transactions;
  }
}

export default TransactionsRepository;
