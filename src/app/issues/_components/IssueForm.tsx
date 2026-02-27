'use client';
import { issueSchema } from '@/app/validationSchemas';
import { ErrorMessage, Spinner } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Box, Button, Callout, Select, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import z from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: issue?.title || '',
      description: issue?.description || '',
      status: issue?.status || undefined,
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitted(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setIsSubmitted(false);
      setError('Failed to create issue. Please check your input and try again.');
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-3 max-w-xl">
        <Box>
          <Box>
            <TextField.Root placeholder="Title" {...register('title')} />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
          </Box>

          <Box className="my-2">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select.Root value={field.value ?? ''} onValueChange={field.onChange}>
                  <Select.Trigger placeholder="Select status" className="w-full" />
                  <Select.Content>
                    <Select.Item value="OPEN">Open</Select.Item>
                    <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                    <Select.Item value="CLOSED">Closed</Select.Item>
                  </Select.Content>
                </Select.Root>
              )}
            />
            <ErrorMessage>{errors.status?.message}</ErrorMessage>
          </Box>

          <Box>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </Box>
        </Box>

        <Button disabled={isSubmitted}>
          {issue ? 'Update Issue' : 'Create Issue'}
          {isSubmitted && <Spinner />}
        </Button>
      </form>
    </div>
  );
};
export default IssueForm;
