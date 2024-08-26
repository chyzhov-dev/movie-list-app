'use client';
import { apiClient } from '@/utils/api';
import { RegisterFormValues } from '@/types/pages';
import { setToken } from '@/utils/actions';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { SimpleContainer } from '@/components/SimpleContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const registerSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(3, 'Password is to short'),
});

const RegisterPage = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation();
  const { control, handleSubmit, watch, formState } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await apiClient.post('auth/register', data);

      if (response.data) {
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
  }, [watch]);

  return (
    <SimpleContainer
      title={t('auth.register_header')}
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
        <Button isLoading={isLoading} variant="primary" type="submit">
          {t('auth.register')}
        </Button>
        <div className="text-center">
          {t('auth.already_have_account')} <Link href="/login" className="underline">{t('auth.login')}</Link>
        </div>
      </form>
    </SimpleContainer>
  );
};

export default RegisterPage;
