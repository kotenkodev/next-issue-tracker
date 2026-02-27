import z from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(1, 'Description is required').max(65535),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100).optional(),
  description: z.string().min(1, 'Description is required').max(65535).optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
  assignedUserId: z
    .string()
    .min(1, 'Assigned To User ID is required')
    .max(255)
    .optional()
    .nullable(),
});
