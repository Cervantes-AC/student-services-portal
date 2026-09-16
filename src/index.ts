import {
  formatStudent,
  isStudent,
  type ApiResponse,
  type Student,
} from './student.js';

const sampleStudent: Student = {
  id: 101,
  name: 'Avery Santos',
  email: 'avery.santos@example.edu',
  status: 'active',
};

const singleStudentResponse: ApiResponse<Student> = {
  success: true,
  data: sampleStudent,
};

const studentListResponse: ApiResponse<Student[]> = {
  success: true,
  data: [sampleStudent],
};

const validationExamples: unknown[] = [
  sampleStudent,
  { ...sampleStudent, id: '101' },
  { id: 102, email: 'missing.name@example.edu', status: 'inactive' },
];

console.log(formatStudent(sampleStudent));
console.log('Single response is successful:', singleStudentResponse.success);
console.log('Student list count:', studentListResponse.data.length);

for (const example of validationExamples) {
  console.log('Valid Student:', isStudent(example));
}
