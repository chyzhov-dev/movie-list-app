'use client';
import { apiClient } from '@/utils/api';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Input } from '@/components/Input';
import { SimpleContainer } from '@/components/SimpleContainer';
import { LoginFormValues } from '@/types/pages';
import { setToken } from '@/utils/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

const LoginPage = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation();
  const { control, handleSubmit, watch, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await apiClient.post('auth/login', data);

      if (response.data) {
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
  }, [watch]);

  return (
    <SimpleContainer
      title={t('auth.sign_in')}
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t('auth.email')}
              error={formState.errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              error={formState.errors.password?.message || error || ''}
              placeholder={t('auth.password')}
              type="password"
            />
          )}
        />
        <Checkbox label={t('auth.remember_me')}/>
        <Button isLoading={isLoading} variant="primary" type="submit">
          {t('auth.login')}
        </Button>
        <div className="text-center">
          {t('auth.dont_have_account')} <Link href="/register" className="underline">{t('auth.register')}</Link>
        </div>
      </form>
    </SimpleContainer>
  );
};

export default LoginPage;
