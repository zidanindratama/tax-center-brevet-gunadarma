export type TRole = {
  id: string;
  name: string;
};

export type TProfile = {
  group_id: string;
  nim: string;
  nim_proof: string;
  institution: string;
  origin: string;
  birth_date: string;
  address: string;
  created_at: string;
  updated_at: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  role: TRole;
  profile: TProfile;
};
