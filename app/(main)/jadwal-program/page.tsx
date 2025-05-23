import Footer from "@/components/(main)/footer";
import CourseScheduleTable from "@/components/(main)/jadwal-program/course-schedule-table";
import Navbar from "@/components/(main)/navbar";
import React, { Suspense } from "react";

const ProgramSchedulePage = () => {
  return (
    <div>
      <Navbar />
      <Suspense>
        <CourseScheduleTable />
      </Suspense>
      <Footer />
    </div>
  );
};

export default ProgramSchedulePage;
