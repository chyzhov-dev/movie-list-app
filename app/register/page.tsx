'use client';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/api';
import { setToken } from '@/app/movies/actions';
import { useTranslation } from 'react-i18next';

type FormValues = {
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);
  const { control, handleSubmit, watch } = useForm<FormValues>();
  const router = useRouter();
  const { t } = useTranslation();

  const onSubmit = async ( data: FormValues ) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await apiClient.post('auth/register', data);
      if ( response.data ) {
        localStorage.setItem('token', response.data.accessToken);
        await setToken(response.data.accessToken);
        router.push('/movies');
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const subscription = watch(() => {
      setError(null);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [ watch ]);

  return (
    <div className="min-h-[75svh] min-w-screen flex justify-center items-center">
      <div className="max-h-fit min-w-80	">
        <h1 className="text-6xl text-center p-4 my-4">{t('register_header')}</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={( { field } ) => <Input {...field} placeholder={t('email')}/>}
          />
          <Controller
            control={control}
            name="password"
            render={( { field } ) =>
              <Input {...field}
                 error={error || ''}
                 placeholder={t('password')}
                 type="password"
              />}
          />
          <Button isLoading={isLoading} variant="primary" type="submit">{t('register')}</Button>
          <div className="text-center">
            {t('already_have_account')} <a href="/login" className="underline">{t('login')}</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;