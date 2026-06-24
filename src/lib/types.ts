export type UserRole = "user" | "admin";
export type KycStatus = "not_started" | "pending" | "approved" | "rejected";
export type AccountType = "checking" | "savings" | "loan";
export type AccountStatus = "active" | "frozen" | "closed";
export type TransactionType =
  | "transfer"
  | "deposit"
  | "withdrawal"
  | "interest"
  | "fee";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: UserRole;
  kyc_status: KycStatus;
  created_at: string;
}

export interface Account {
  id: string;
  user_id: string;
  account_number: string;
  type: AccountType;
  balance: number;
  currency: string;
  status: AccountStatus;
  interest_rate: number;
  created_at: string;
}

export interface Transaction {
  id: string;
  from_account_id: string | null;
  to_account_id: string | null;
  amount: number;
  type: TransactionType;
  description: string | null;
  status: string;
  created_at: string;
}

export interface KycSubmission {
  id: string;
  user_id: string;
  date_of_birth: string | null;
  address: string | null;
  id_type: string | null;
  id_number: string | null;
  document_url: string | null;
  status: KycStatus;
  reviewed_by: string | null;
  created_at: string;
}

// Minimal Database typing for the Supabase client generics.
export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      accounts: { Row: Account; Insert: Partial<Account>; Update: Partial<Account> };
      transactions: {
        Row: Transaction;
        Insert: Partial<Transaction>;
        Update: Partial<Transaction>;
      };
      kyc_submissions: {
        Row: KycSubmission;
        Insert: Partial<KycSubmission>;
        Update: Partial<KycSubmission>;
      };
    };
    Functions: {
      transfer_funds: {
        Args: {
          p_from_account: string;
          p_to_account_number: string;
          p_amount: number;
          p_description?: string | null;
        };
        Returns: Transaction;
      };
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
  };
}
