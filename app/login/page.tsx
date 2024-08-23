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

const LoginPage = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);
  const { control, handleSubmit, watch } = useForm<FormValues>();
  const router = useRouter();
  const { t } = useTranslation();

  const onSubmit = async ( data: FormValues ) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await apiClient.post('auth/login', data);
      if ( response.data ) {
        localStorage.setItem('token', response.data.accessToken);
        await setToken(response.data.accessToken);
        router.push('/movies');
      }
    } catch (e) {
      setError('Email or password is incorrect');
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
        <h1 className="text-6xl text-center p-4 my-4">{t('sign_in')}</h1>
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
              />
            }/>
          <div className="flex  justify-center items-center">
            <div className="flex justify-center items-center">
              <input type="checkbox" className="m-2"/>
              <label htmlFor="remember-me">{t('remember_me')}</label>
            </div>
          </div>
          <div className="text-center">
            {t('dont_have_account')} <a href="/register" className="underline">{t('register')}</a>
          </div>
          <Button isLoading={isLoading} variant="primary" type="submit">{t('login')}</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;