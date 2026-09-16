export type StudentStatus = 'active' | 'inactive';

export interface Student {
  id: number;
  name: string;
  email: string;
  status: StudentStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export function formatStudent(student: Student): string {
  return `${student.id} - ${student.name} (${student.status})`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** Narrows unknown external data to a complete Student only after runtime checks. */
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
