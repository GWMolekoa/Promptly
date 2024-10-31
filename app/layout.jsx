import '@styles/globals.css'; // This will import css to entire app

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = { 
    title: "Promptly",
    description: "Discover & Share AI Prompts"
}

// Layout will be wrapped around everything
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
                <Nav />
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout