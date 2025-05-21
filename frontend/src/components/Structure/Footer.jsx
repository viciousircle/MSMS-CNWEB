import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-background border-t border-gray-950/5 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">
                            Vicious Store
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            The best way to buy products you love. Quality and
                            style in every purchase.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Facebook className="size-5" />
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Instagram className="size-5" />
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Twitter className="size-5" />
                            </a>
                            <a
                                href="mailto:contact@viciousstore.com"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Mail className="size-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/store"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    Store
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cart"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/orders"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/faq"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shipping"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    Shipping
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/returns"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    Returns
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">
                            Contact
                        </h3>
                        <ul className="space-y-2">
                            <li className="text-muted-foreground text-sm">
                                Email: contact@viciousstore.com
                            </li>
                            <li className="text-muted-foreground text-sm">
                                Phone: +1 (555) 123-4567
                            </li>
                            <li className="text-muted-foreground text-sm">
                                Address: 123 Fashion St, Style City
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-950/5 mt-8 pt-8 text-center">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} Vicious Store. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
