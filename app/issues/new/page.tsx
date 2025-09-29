'use client'

import { Button, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className='max-w-xl space-y-3'
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
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
  )
}

export default NewIssuePage