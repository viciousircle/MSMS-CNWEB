import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Footer from '@/components/Structure/Footer';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <HeaderWithIcon icon={InformationCircleIcon} title="About Us" />
                <div className="px-4 py-8 max-w-4xl mx-auto">
                    <div className="space-y-8">
                        {/* Company Overview */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Our Story
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Welcome to MSMS CN WEB, your premier destination
                                for high-quality products and exceptional
                                shopping experiences. Founded with a vision to
                                revolutionize online retail, we've grown from a
                                small startup to a trusted name in e-commerce.
                            </p>
                        </section>

                        {/* Mission & Vision */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Mission & Vision
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                                        Our Mission
                                    </h3>
                                    <p className="text-gray-600">
                                        To provide customers with an
                                        unparalleled shopping experience through
                                        quality products, competitive prices,
                                        and exceptional service.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                                        Our Vision
                                    </h3>
                                    <p className="text-gray-600">
                                        To become the leading e-commerce
                                        platform, setting new standards in
                                        customer satisfaction and digital retail
                                        innovation.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Values */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Our Values
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                                        Quality
                                    </h3>
                                    <p className="text-gray-600">
                                        We are committed to offering only the
                                        highest quality products to our
                                        customers.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                                        Innovation
                                    </h3>
                                    <p className="text-gray-600">
                                        We continuously strive to improve and
                                        innovate in everything we do.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                                        Customer First
                                    </h3>
                                    <p className="text-gray-600">
                                        Our customers are at the heart of every
                                        decision we make.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Team */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Our Team
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our success is driven by a dedicated team of
                                professionals who are passionate about
                                delivering excellence. From our customer service
                                representatives to our technical experts, every
                                team member plays a crucial role in our journey.
                            </p>
                        </section>

                        {/* Contact */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Get in Touch
                            </h2>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <p className="text-gray-600">
                                    Have questions or feedback? We'd love to
                                    hear from you. Contact us at:
                                </p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-gray-600">
                                        <span className="font-medium">
                                            Email:
                                        </span>{' '}
                                        contact@msmscnweb.com
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">
                                            Phone:
                                        </span>{' '}
                                        +1 (555) 123-4567
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">
                                            Address:
                                        </span>{' '}
                                        123 E-commerce Street, Digital City,
                                        12345
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Body>
            <Footer />
        </div>
    );
};

export default About;
