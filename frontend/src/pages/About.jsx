import React from 'react';
import {
    InformationCircleIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    SparklesIcon,
    UserGroupIcon,
    HeartIcon,
    CodeBracketIcon,
    AcademicCapIcon,
    BuildingLibraryIcon,
} from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Footer from '@/components/Structure/Footer';
import { motion } from 'framer-motion';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

const cardHover = {
    scale: 1.03,
    transition: { duration: 0.3 },
};

const About = () => {
    return (
        <div className="flex flex-col min-h-screen ">
            <Body>
                <HeaderWithIcon
                    icon={InformationCircleIcon}
                    title="About Us"
                    iconClassName="text-purple-600"
                />
                <div className="px-4 py-12 max-w-6xl mx-auto">
                    <div className="space-y-16">
                        {/* Project Section */}
                        <motion.div
                            className="space-y-6"
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                        >
                            <h2 className="text-4xl tracking-widest font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-gray-600 bg-clip-text text-transparent text-center">
                                Project MSMS CN WEB
                            </h2>
                            <div className="grid md:grid-cols-1 gap-8">
                                <motion.div
                                    className="relative group"
                                    whileHover={cardHover}
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-gray-300 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                                    <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                                        <div className="flex items-center mb-4">
                                            <SparklesIcon className="h-6 w-6 text-purple-500 mr-2" />
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                Giới thiệu Dự án
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed mb-6">
                                            Chào mừng bạn đến với dự án MSMS CN
                                            WEB! Đây là một dự án của môn học
                                            Công nghệ Web & Kinh doanh điện tử.
                                            Tôi đã phát triển một nền tảng
                                            thương mại điện tử hiện đại với trải
                                            nghiệm người dùng tối ưu. Dự án tập
                                            trung vào việc cung cấp giải pháp
                                            mua sắm di động mượt mà, tích hợp
                                            các công nghệ web tiên tiến và áp
                                            dụng các nguyên tắc kinh doanh điện
                                            tử hiệu quả.
                                        </p>

                                        {/* English version as a secondary card inside */}
                                        <div className="mt-6 border-t pt-6">
                                            <p className="text-gray-600 text-xs leading-relaxed italic">
                                                Welcome to the MSMS CN WEB
                                                project! This is a Web
                                                Technology & E-commerce course
                                                project featuring a modern
                                                e-commerce platform with
                                                optimized UX, mobile shopping
                                                solutions, and advanced web
                                                technologies.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Rest of your existing code remains the same */}
                        {/* Author Section */}
                        <motion.div
                            className="space-y-6"
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-600 to-purple-600 bg-clip-text text-transparent text-center">
                                About The Author
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {/* Education */}
                                <motion.div
                                    className="relative group"
                                    whileHover={cardHover}
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-200 to-purple-300 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                                    <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg h-full">
                                        <div className="flex items-center mb-4">
                                            <AcademicCapIcon className="h-6 w-6 text-blue-600 mr-2" />
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                Education
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 mb-2">
                                            <strong>University:</strong> Ho Chi
                                            Minh City University of Technology
                                        </p>
                                        <p className="text-gray-700 mb-2">
                                            <strong>Major:</strong> Computer
                                            Science
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Year:</strong> Senior
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Skills */}
                                <motion.div
                                    className="relative group"
                                    whileHover={cardHover}
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-200 to-pink-300 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                                    <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg h-full">
                                        <div className="flex items-center mb-4">
                                            <CodeBracketIcon className="h-6 w-6 text-purple-600 mr-2" />
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                Technical Skills
                                            </h3>
                                        </div>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>
                                                • Frontend: React, Next.js,
                                                Tailwind CSS
                                            </li>
                                            <li>• Backend: Node.js, Express</li>
                                            <li>
                                                • Databases: MongoDB, PostgreSQL
                                            </li>
                                            <li>• UI/UX Design Principles</li>
                                            <li>• E-commerce Systems</li>
                                        </ul>
                                    </div>
                                </motion.div>

                                {/* Contact */}
                                <motion.div
                                    className="relative group"
                                    whileHover={cardHover}
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-br from-pink-200 to-blue-300 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                                    <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg h-full">
                                        <div className="flex items-center mb-4">
                                            <UserGroupIcon className="h-6 w-6 text-pink-600 mr-2" />
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                Contact
                                            </h3>
                                        </div>
                                        <div className="space-y-3 text-gray-700">
                                            <div className="flex items-start">
                                                <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                                                <span>
                                                    email@university.edu.vn
                                                </span>
                                            </div>
                                            <div className="flex items-start">
                                                <PhoneIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                                                <span>(+84) 123 456 789</span>
                                            </div>
                                            <div className="flex items-start">
                                                <BuildingLibraryIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                                                <span>
                                                    Ho Chi Minh City, Vietnam
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Project Goals */}
                        <motion.div
                            className="space-y-6"
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
                                Project Goals
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    {
                                        icon: HeartIcon,
                                        title: 'User Experience',
                                        content:
                                            'Deliver an intuitive and enjoyable shopping experience with smooth navigation and responsive design.',
                                        color: 'text-red-500',
                                        gradient: 'from-red-200 to-pink-300',
                                    },
                                    {
                                        icon: SparklesIcon,
                                        title: 'Innovation',
                                        content:
                                            'Implement modern web technologies to create a cutting-edge e-commerce platform.',
                                        color: 'text-yellow-500',
                                        gradient:
                                            'from-yellow-200 to-purple-300',
                                    },
                                    {
                                        icon: UserGroupIcon,
                                        title: 'Accessibility',
                                        content:
                                            'Ensure the platform is accessible to all users regardless of device or ability.',
                                        color: 'text-blue-500',
                                        gradient: 'from-blue-200 to-indigo-300',
                                    },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative group"
                                        whileHover={cardHover}
                                    >
                                        <div
                                            className={`absolute -inset-1 bg-gradient-to-br ${item.gradient} rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300`}
                                        ></div>
                                        <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg h-full flex flex-col">
                                            <div className="flex items-center mb-4">
                                                <item.icon
                                                    className={`h-6 w-6 ${item.color} mr-2`}
                                                />
                                                <h3 className="text-xl font-semibold text-gray-800">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-700 flex-grow">
                                                {item.content}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Body>
            <Footer />
        </div>
    );
};

export default About;
