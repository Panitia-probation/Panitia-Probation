import LayoutInputLabel from '../components/LayoutInputLabel';
import Label from './../components/Label';
import Button from './../components/Button';
import Card from './../components/Card';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Loading from './Loading';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const CardRegister = ({ handleInLoginPage, onStateChange, callbackToast }) => {
    const { register, handleSubmit } = useForm();
    //handle show loading
    const [loadingButton, setLoadingButton] = useState(false);

    //handlestatus and error message popup
    const [statusCode, setStatusCode] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleToastSuccess = () => callbackToast(true);
    const handleInLoginPageController = () => handleInLoginPage(true);
    //handle post with axios
    const onSubmit = (data) => {
        setLoadingButton(true);
        //headers
        const options = {
            url: 'http://localhost:3030/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: data.username,
                email: data.email,
                phone: data.number,
                password: data.password,
                typ: data.role,
                address: data.address
            }
        };
        //submit data
        const submitData = async () => {
            try {
                console.log('test', options.data);
                const response = await axios.post('/api/register', options.data, options).then((resp) => {
                    console.log('resp =', resp.data, resp.status);
                    setInterval(() => {
                        handleToastSuccess();
                    }, 1000);

                    setInterval(() => {
                        setStatusCode(200);
                        setLoadingButton(false);
                        handleInLoginPageController();
                    }, 2000);
                });
            } catch (error) {
                setErrorMessage(error.response.data.message);
                setStatusCode(400);
                setLoadingButton(false);
            }
        };

        submitData();
    };

    const handleChange = () => {
        onStateChange((inLoginPage) => !inLoginPage);
    };

    return (
        <Card className={'flex flex-col gap-8 w-full lg:w-[900px] max-md:relative top-32 max-h-[876px] p-9 sm:p-16 rounded-3xl'}>
            <Card.Title text='Create an Account' />
            <Card.Body>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-12'>
                        <div className='flex flex-col gap-6' id='input-form-style'>
                            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-4'>
                                <LayoutInputLabel>
                                    <Label text={'Email'} />
                                    <input {...register('email')} placeholder={'Enter your email'} required />
                                </LayoutInputLabel>
                                <LayoutInputLabel>
                                    <Label text={'Username'} />
                                    <input {...register('username')} placeholder={'Enter your username'} required />
                                </LayoutInputLabel>
                            </div>
                            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-4'>
                                <LayoutInputLabel>
                                    <Label text={'Password'} />
                                    <input {...register('password')} type='password' placeholder={'Enter your password'} required />
                                </LayoutInputLabel>
                                <LayoutInputLabel>
                                    <Label text={'Phone Number'} />
                                    <input {...register('number')} type='number' placeholder={'Enter your phone number'} required />
                                </LayoutInputLabel>
                            </div>
                            <LayoutInputLabel>
                                <Label text={'Address'} />
                                <input {...register('address')} placeholder={'Enter your address'} required />
                            </LayoutInputLabel>
                            <LayoutInputLabel>
                                <Label text={'Pick Role'} />
                                <select {...register('role')} required>
                                    <option value='U'>UMKM</option>
                                    <option value='I'>Investor</option>
                                    <option value='C'>Consultant</option>
                                </select>
                            </LayoutInputLabel>
                        </div>
                        <div className='flex flex-col  gap-4 ' id='register-bottom'>
                            <div className='flex justify-end'>
                                <p className='text-error capitalize'>{errorMessage}</p>
                            </div>
                            <button type='submit' className={`btn h-full btn-primary  text-white text-base font-medium border-none w-full`}>
                                {!loadingButton ? 'Create account' : <Loading />}
                            </button>

                            <div className='divider text-base font-normal leading-5 text-[#757171]'>Or continue with</div>
                            <div className='flex justify-center'>
                                <p className='text-base text-[#BEBEBF] font-normal leading-[100%]'>
                                    Already Have An Account?{' '}
                                    <span className='text-blue-600' onClick={handleChange}>
                                        Login
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
};
export default CardRegister;
