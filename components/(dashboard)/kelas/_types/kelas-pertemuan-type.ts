export type TBatchMeeting = {
  id: string;
  batch_id: string;
  title: string;
  description: string;
  meeting_type: "basic" | "exam";
  teachers: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    created_at: string;
    updated_at: string;
    role_type: "guru" | string;
  }[];
  created_at: string;
  updated_at: string;
};
