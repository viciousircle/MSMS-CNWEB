import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Github } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const companyInfo = {
        name: 'Vicious Store',
        description:
            'The best way to buy products you love. Quality and style in every purchase.',
        socialLinks: [
            {
                icon: <Facebook className="size-5" />,
                url: 'https://www.facebook.com/mcc0305',
            },
            {
                icon: <Github className="size-5" />,
                url: 'https://github.com/viciousircle',
            },
            {
                icon: <Mail className="size-5" />,
                url: 'mailto:vuminhquy111@gmail.com',
            },
        ],
    };

    const quickLinks = [
        { name: 'Store', path: '/store' },
        { name: 'About Us', path: '/about' },
    ];

    const contactInfo = [
        { label: 'Email', value: 'vuminhquy111@gmail.com' },
        { label: 'Phone', value: '0327 589 638' },
        { label: 'Address', value: 'Hanoi, Vietnam' },
    ];

    return (
        <footer className="bg-background border-t border-gray-950/5 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">
                            {companyInfo.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            {companyInfo.description}
                        </p>
                        <div className="flex space-x-4">
                            {companyInfo.socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={
                                        link.url.includes('facebook')
                                            ? 'Facebook'
                                            : link.url.includes('github')
                                            ? 'GitHub'
                                            : 'Email'
                                    }
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">
                            Contact
                        </h3>
                        <ul className="space-y-2">
                            {contactInfo.map((info, index) => (
                                <li
                                    key={index}
                                    className="text-muted-foreground text-sm"
                                >
                                    {info.label}: {info.value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-950/5 mt-8 pt-8 text-center">
                    <p className="text-muted-foreground text-sm">
                        © {currentYear} {companyInfo.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
