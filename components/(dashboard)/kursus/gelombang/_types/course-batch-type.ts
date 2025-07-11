export type TCourseBatch = {
  id: string;
  course_id: string;
  slug: string;
  title: string;
  description: string;
  batch_thumbnail: string;
  start_at: Date;
  end_at: Date;
  room: string;
  quota: number;
  created_at: string;
  updated_at: string;
  course_type: "online" | "offline";
};
