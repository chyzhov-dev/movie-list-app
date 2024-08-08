'use client';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type FormValues = {
  email: string;
  password: string;
}

const mockUser = {
  email: 'admin@gmail.com',
  password: 'admin'
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit,watch } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = async ( data: FormValues ) => {
    setError(null);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (mockUser.email !== data.email?.toLowerCase() || mockUser.password !== data.password) {
      setError('Invalid credentials');
      setIsLoading(false);
    } else {
      router.push('/movies');
    }
  };

  useEffect(() => {
    const subscription = watch(()=> {
      setError(null);
    });
    return () => {
      subscription.unsubscribe();
    }
  }, []);

  return (
    <div className="min-h-[75svh] min-w-screen flex justify-center items-center">
      <div className="max-h-fit min-w-80	">
        <h1 className="text-6xl text-center p-4 my-4">Sign in</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={( { field } ) => <Input {...field} placeholder="Email"/>}
          />
          <Controller
            control={control}
            name="password"
            render={( { field } ) => <Input {...field} error={error || ''} placeholder="Password" type="password"/>}
          />
          <div className="flex  justify-center items-center">
            <div className="flex justify-center items-center">
              <input type="checkbox" className="m-2"/>
              <label htmlFor="remember-me">Remember me</label>
            </div>
          </div>
          <Button isLoading={isLoading} variant="primary" type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;