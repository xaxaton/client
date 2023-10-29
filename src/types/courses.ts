export interface Course {
  id: number;
  name: string;
}

export interface CreateCourseData {
  name: string;
  organization: { id: number };
  department?: { id: number };
  position?: { id: number };
}
