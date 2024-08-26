'use client';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Input } from '@/components/Input';
import { SimpleContainer } from '@/components/SimpleContainer';
import { useAuth } from '@/hooks/useAuth';
import { LoginFormValues } from '@/types/pages';
import { Status } from '@/types/store';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
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
  const router = useRouter();
  const { t } = useTranslation();
  const auth = useAuth();
  const { control, handleSubmit, watch, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    auth
      .login(data)
      .catch(() => {
        toast(t('notification.auth_error'), { type: 'error' });
      })
      .then((value: unknown) => {
        if (!value) {
          return;
        }

        toast(t('notification.auth_success'), { type: 'success' });
        router.push('/movies');
      });
  };

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
              error={formState.errors.password?.message || auth.error || ''}
              placeholder={t('auth.password')}
              type="password"
            />
          )}
        />
        <Checkbox label={t('auth.remember_me')}/>
        <Button
          isLoading={auth.status === Status.pending}
          variant="primary"
          type="submit"
        >
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
