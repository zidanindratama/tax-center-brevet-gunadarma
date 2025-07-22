export type TCourseBatch = {
  id: string;
  course_id: string;
  slug: string;
  title: string;
  description: string;
  batch_thumbnail: string;
  start_at: string;
  end_at: string;
  room: string;
  quota: number;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  course_type: "online" | "offline";
  days: {
    id: string;
    batch_id: string;
    day: string;
  }[];
};
