'use client'

import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from 'react';
import { set } from 'zod';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className='max-w-xl '>
      { error &&
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('Unexpected error occured.');
          }
        })}
      >
        <TextField.Root placeholder='Issue Title' {...register('title')} />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <SimpleMDE id='description' {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage