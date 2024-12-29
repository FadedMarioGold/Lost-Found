import React from 'react'; // Import React library

const Footer = () => {
    return (
        <div style={{ backgroundColor: '#357ABD', padding: '20px', textAlign: 'center',width:'100%'}}>
            {/* Copyright message */}
            <p style={{ color: 'white', margin: '10px 0' }}>
                © 2024 Team MiniProject
            </p>

            {/* Social media links */}
            <div style={{ marginBottom: '10px' }}>
                <a 
                    href="https://www.instagram.com/" 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}
                >
                    Instagram
                </a>
                <a 
                    href="https://www.facebook.com/" 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}
                >
                    Facebook
                </a>
                <a 
                    href="" 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}
                >
                    X
                </a>
            </div>

            {/* GitHub repository link */}
            <a 
                href="" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: 'white', textDecoration: 'none', fontSize: '12px', opacity: '0.8' }}
            >
               Nihal
            </a>
        </div>
    );
};

export default Footer;
