/**
 * Application entry point for the Laboratory 1 demonstration.
 *
 * It shows typed student formatting, generic API response usage, safe status
 * display text, and runtime validation of valid and malformed external data.
 */

import {
  formatStudent,
  getStudentStatusLabel,
  isStudent,
  type ApiResponse,
  type Student,
} from './student.js';

/** A valid example used to demonstrate the Student model. */
const sampleStudent: Student = {
  id: 101,
  name: 'Aaron Clyde C. Cervantes',
  email: 'aaron.cervantes@example.edu',
  status: 'active',
};

/** Demonstrates a generic response whose data is exactly one Student. */
const singleStudentResponse: ApiResponse<Student> = {
  success: true,
  data: sampleStudent,
};

/** Demonstrates the same generic response with an array payload. */
const studentListResponse: ApiResponse<Student[]> = {
  success: true,
  data: [sampleStudent],
};

/** Contains one valid value and two malformed values received as unknown data. */
const validationExamples: unknown[] = [
  sampleStudent,
  { ...sampleStudent, id: '101' },
  { id: 102, email: 'missing.name@example.edu', status: 'inactive' },
];

console.log(formatStudent(sampleStudent));
console.log(getStudentStatusLabel(sampleStudent.status));
console.log('Single response is successful:', singleStudentResponse.success);
console.log('Student list count:', studentListResponse.data.length);

for (const example of validationExamples) {
  console.log('Valid Student:', isStudent(example));
}
