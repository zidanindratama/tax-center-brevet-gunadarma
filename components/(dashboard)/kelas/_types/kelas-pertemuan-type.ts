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
  assignments: {
    id: string;
    meeting_id: string;
    teacher_id: string;
    title: string;
    description: string;
    type: "file" | string;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
    assignment_files: {
      id: string;
      assignment_id: string;
      file_url: string;
      created_at: string;
      updated_at: string;
    }[];
  }[];
  materials: {
    id: string;
    meeting_id: string;
    title: string;
    description: string;
    url: string;
    created_at: string;
    updated_at: string;
  }[];
  created_at: string;
  updated_at: string;
};
