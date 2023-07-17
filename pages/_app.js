import '../styles/grid.css';
import '../styles/globals.css';
import '../styles/desktop.css';

import { Armata } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const armata = Armata({ weight: '400',
subsets: ['latin'], })

function MyApp({ Component, pageProps }) {
	
	return (
		<main className={armata.className}>
			<Component {...pageProps} />
			</main>
	);
}

export default MyApp;
