/**
 * Defines the Student domain model and its supporting runtime-safe utilities.
 *
 * This module is the single source of truth for student data types, generic API
 * responses, display formatting, status labels, and validation of external data.
 */

/** The two statuses currently supported by the Student Services Portal. */
export type StudentStatus = 'active' | 'inactive';

/** A validated student record used within the application. */
export interface Student {
  id: number;
  name: string;
  email: string;
  status: StudentStatus;
}

/** A reusable, strongly typed wrapper for a successful or unsuccessful API result. */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

/** Returns a concise, human-readable summary of a validated student. */
export function formatStudent(student: Student): string {
  return `${student.id} - ${student.name} (${student.status})`;
}

/**
 * Converts a status into display text and handles untrusted values safely.
 *
 * @param status - A value from an API, form, or another external source.
 * @returns A user-friendly label or a safe unknown-status fallback.
 */
export function getStudentStatusLabel(status: unknown): string {
  switch (status) {
    case 'active':
      return 'Active Student';
    case 'inactive':
      return 'Inactive Student';
    default:
      return 'Unknown Student Status';
  }
}

/** Checks that a value is a non-null object before its properties are read. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Narrows unknown external data to a complete Student after runtime checks.
 *
 * TypeScript interfaces are compile-time only, so API and form values must be
 * inspected at runtime before they can safely be treated as a Student.
 */
export function isStudent(value: unknown): value is Student {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'number' &&
    Number.isFinite(value.id) &&
    typeof value.name === 'string' &&
    value.name.trim().length > 0 &&
    typeof value.email === 'string' &&
    value.email.includes('@') &&
    (value.status === 'active' || value.status === 'inactive')
  );
}
