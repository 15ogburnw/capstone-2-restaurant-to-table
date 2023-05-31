import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/fontawesome-free";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"



export default function SignupForm() {
	const [isLoading, setIsLoading] = useState(false);
	const supabase = useSupabaseClient();
	const [errorMessage, setErrorMessage] = useState();
	const router = useRouter()

	const inputStyles = {
		valid: 'focus:border-emerald-400',
		invalid: 'border-red-400',
	};

	const signupSchema = yup.object().shape({
		name: yup
			.string()
			.required('Name is required')
			.min(3, 'Name must be at least 3 characters long'),
		email: yup.string().email('Invalid email').required('Email is required'),
		password: yup
			.string()
			.required('Password is required')
			.min(8, 'Password must be at least 8 characters long'),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match')
			.required('You must confirm your password'),
	});


	/* TODO: Add functionality for including basic user metadata along with signup. Do I want to include a name with the supabase object or keep
	it all on the public table?
   */
	const handleSignup = async (values) => {
		const { email, password } = values;
		setIsLoading(true)

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/api/auth/callback`
			}
		});
		if (error) {
			setIsLoading(false)
			setErrorMessage('Something went wrong! Please try again');
			console.error(error);
		} else {
			router.push('/dashboard')
		}
	};

	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				password: '',
				confirmPassword: '',
			}}
			validationSchema={signupSchema}
			onSubmit={handleSignup}
			validateOnMount>
			{({ errors, touched, isValid }) => (
				<Form >
					<p className='mt-3 text-xl text-center text-gray-600'>
						Welcome to Restaurant to Table!
					</p>

					<div className='text-red-500 font-medium text-medium text-center my-2'>
						{errorMessage}
					</div>

					{/* Signup with email horizontal line break */}
					<div className='flex items-center justify-between mt-3'>
						<span className='w-1/4 border border-green-400 lg:w-1/3'></span>

						<span className='text-sm text-center text-green-500 font-semibold'>
							Or sign up with Email
						</span>

						<span className='w-1/4 border border-green-400 lg:w-1/3'></span>
					</div>

					{/* Name input */}
					<div className='mt-4'>

						<label
							className='block mb-2 text-base font-bold text-gray-600 '
							htmlFor='name'>
							Name
						</label>


						<Field
							className={`block w-full px-4 py-2 text-gray-700 bg-white border-2 rounded-lg  focus:ring-opacity-40  focus:outline-none 
            					${errors.name && touched.name
									? inputStyles.invalid
									: inputStyles.valid
								}`}
							name='name'
							type="text"
							placeholder='Please enter your name'
						/>
						<ErrorMessage name="name" className='text-sm text-red-500 mt-1 font-medium' />
					</div>

					{/* Email input */}
					<div className='mt-3'>
						<div className='flex justify-between'>
							<label
								className='block mb-2 text-base font-bold text-gray-600 '
								htmlFor='email'>
								Email
							</label>
						</div>

						<Field
							className={`block w-full px-4 py-2 text-gray-700 bg-white border-2 rounded-lg  focus:ring-opacity-40  focus:outline-none 
            					${errors.email && touched.email
									? inputStyles.invalid
									: inputStyles.valid
								}`}
							name='email'
							placeholder='Please enter your email'
						/>
						<ErrorMessage name="email" className='text-sm text-red-500 mt-1 font-medium' />
					</div>

					{/* Password input */}
					<div className='mt-3'>
						<div className='flex justify-between'>
							<label
								className='block mb-2 text-base font-bold text-gray-600 '
								htmlFor='password'>
								Password
							</label>
						</div>

						<Field
							name='password'
							placeholder='Please enter your password'
							className={`block w-full px-4 py-2 text-gray-700 bg-white border-2 rounded-lg  focus:ring-opacity-40  focus:outline-none
            					${errors.password && touched.password
									? inputStyles.invalid
									: inputStyles.valid
								}`}
							type='password'
						/>
						<ErrorMessage className='text-sm text-red-500 mt-1 font-medium' />
					</div>

					{/* Confirm password input */}
					<div className='mt-3'>
						<div className='flex justify-between'>
							<label
								className='block mb-2 text-base font-bold text-gray-600 '
								htmlFor='confirmPassword'>
								Password
							</label>
						</div>

						<Field
							name='confirmPassword'
							placeholder='Please confirm your password'
							className={`block w-full px-4 py-2 text-gray-700 bg-white border-2 rounded-lg  focus:ring-opacity-40  focus:outline-none
            					${errors.confirmPassword && touched.confirmPassword
									? inputStyles.invalid
									: inputStyles.valid
								}`}
							type='password'
						/>
						<ErrorMessage className='block mb-2 text-base font-bold text-gray-600 ' />
					</div>

					{/* Sign Up Button */}

					<div className='mt-6'>
						<button
							type='submit'
							className='w-full px-6 py-3 tracking-wide text-white text-lg font-bold capitalize transition-colors duration-300 transform bg-emerald-500  rounded-lg disabled:bg-emerald-300 hover:bg-emerald-300 focus:outline-none focus:ring focus:ring-emerald-500 focus:ring-opacity-50 text-center'
							disabled={!isValid || isLoading}>
							{!isLoading ? (
								'Create Your Account'
							) : (
								<>
									<FontAwesomeIcon
										className='inline mr-2'
										icon={faCircleNotch}
										spin
									/>
									<span >Loading</span>
								</>
							)}
						</button>
					</div>
					{/* Login redirect link */}
					<div className='flex items-center justify-center mt-4'>
						<span className='text-sm text-center text-green-500 font-semibold mr-3'>
							Already have an account?
						</span>

						<Link
							href='/auth/login'
							className='text-sm text-green-500 font-semibold hover:underline'>
							Login here
						</Link>
					</div>

				</Form>
			)}
		</Formik>
	)
}
