export type TMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  role_type: string;
  profile: {
    nim?: string;
    nim_proof?: string;
    institution: string;
    origin: string;
    birth_date: string;
    address: string;
  };
};
