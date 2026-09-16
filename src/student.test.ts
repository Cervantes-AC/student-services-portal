/**
 * Lightweight automated checks for the student utilities.
 *
 * The lab uses this dependency-free test file to demonstrate that status labels
 * and runtime validation work for valid, invalid, and unexpected input.
 */

import { getStudentStatusLabel, isStudent } from './student.js';

/** Throws a descriptive error when two values expected to be equal differ. */
function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(
      `${message}. Expected ${String(expected)}, received ${String(actual)}.`,
    );
  }
}

assertEqual(getStudentStatusLabel('active'), 'Active Student', 'Active status label');
assertEqual(
  getStudentStatusLabel('inactive'),
  'Inactive Student',
  'Inactive status label',
);
assertEqual(
  getStudentStatusLabel('graduated'),
  'Unknown Student Status',
  'Unexpected status safety',
);
assertEqual(
  isStudent({ id: 7, name: 'Mina Cruz', email: 'mina@example.edu', status: 'active' }),
  true,
  'Valid student validation',
);
assertEqual(
  isStudent({
    id: '7',
    name: 'Mina Cruz',
    email: 'mina@example.edu',
    status: 'active',
  }),
  false,
  'Invalid id validation',
);
assertEqual(
  isStudent({ id: 7, email: 'mina@example.edu', status: 'active' }),
  false,
  'Missing name validation',
);

console.log('All student feature tests passed.');
