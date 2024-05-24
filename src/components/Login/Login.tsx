import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, message } from 'antd';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Input } from '../Input/Input';
import style from './Login.module.scss'

export function LoginForm(){
  const { handleSubmit, register } = useForm();

    useEffect(()=>{
        if(Cookies.get('admin_access') === 'true'){
            navigate('/admin'); // Перенаправление на страницу админ панели
        }
    },[])
  
  const navigate = useNavigate();
  const onSubmit:SubmitHandler<FieldValues> = data => {
    const { username, password } = data;
    // Получите значения из .env. В реальном проекте, их желательно получать из безопасного источника.
    const admin_username = import.meta.env.VITE_ADMIN_LOGIN;
    const admin_password = import.meta.env.VITE_ADMIN_PASSWORD;
    if (username === admin_username && password === admin_password) {
      // Установка куки при успешном входе
      Cookies.set('admin_access', 'true', { expires: 1 }); // Кука будет действительна 1 день
      message.success('Вы успешно вошли в систему!');
      navigate('/admin'); // Перенаправление на страницу админ панели
    } else {
      message.error('Неверное имя пользователя или пароль');
    }
  };

  return (
    <div className="container">
      <Form onFinish={handleSubmit(onSubmit)} className={style.loginForm}>
        <Form.Item>
            <Input placeholder='Имя пользователя' label='Имя пользователя' register={register} registerValue='username' type='text'/>
        </Form.Item>
        <Form.Item>
            <Input placeholder='Пароль' label='Пароль' register={register} registerValue='password' type='password'/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

