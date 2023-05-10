import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { SWRConfig, preload } from 'swr';
import { useUser } from '@supabase/auth-helpers-react';
import Script from 'next/script';
import toast from 'react-toastify';
// prefetch all existing data for the current user, since we know they will be logged in if they made it this far.

export default function Dashboard({ children }) {
	const user = useUser();

	return (
		// TODO: CUSTOMIZE THESE DEFAULTS AS NECESSARY

		<SWRConfig
			value={{
				fetcher: async (args) => {
					const res = await fetch(args);

					if (!res.ok) {
						const error = new Error(
							'An error occurred while fetching the data.'
						);
						// Attach extra info to the error object.
						error.info = await res.json();
						error.status = res.status;
						throw error;
					}
					return await res.json();
				},

				onError: (error, key) => {
					if (error.status !== 403 && error.status !== 404) {
						// TODO:We can send the error to Sentry,
						// Make a toast message that says retrying if we are going to try again, and a final error if we are out of tries
						console.log(error);
						const errorToast = () => {
							toast('Oh no! something went wrong', {
								type: 'error',
							});
						};
					}
				},
				onErrorRetry: (
					error,
					key,
					config,
					revalidate,
					{ retryCount, user }
				) => {
					// Never retry on 404.
					if (error.status === 404) return;

					if (!user) return;

					// Only retry up to 3 times.
					if (retryCount >= 3) return;

					// Retry after 3 seconds.
					setTimeout(() => revalidate({ retryCount }), 3000);
				},
			}}>
			<Navbar />
			<div className='flex flex-row'>
				<Sidebar />
				{children}
			</div>
			<Footer />
			<Script
				src='https://developer.edamam.com/attribution/badge.js'
				strategy='afterInteractive'
			/>
		</SWRConfig>
	);
}
