import '../styles/globals.css';

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState, useMemo } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	const Layout = Component.layout || (({ children }) => <>{children}</>);

	// TODO: IMPLEMENT TOAST MESSAGES FOR ALL USER FETCHING DATA/ERROR HANDLING

	/* TODO: CREATE CUSTOM ERROR HANDLING HERE FOR THE ERROR BOUNDARY */

	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={pageProps.initialSession}>
			<Layout>
				<Component {...pageProps} />;
				<ToastContainer position='top-center' autoclose={2000} />
			</Layout>
		</SessionContextProvider>
	);
}
