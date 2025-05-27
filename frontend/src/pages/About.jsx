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
    transition: { duration: 0.8 },
};

const cardHover = {
    scale: 1.01,
    transition: { duration: 0.5 },
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
                            <h2 className="text-4xl tracking-widest font-bold  bg-gradient-to-r from-purple-800 to-gray-300 bg-clip-text text-transparent text-center ">
                                Project MSMS CN WEB
                            </h2>
                            <div className="grid md:grid-cols-1 gap-8">
                                <motion.div
                                    className="relative group"
                                    whileHover={cardHover}
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-gray-300 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                                    <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg">
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

                        {/* Project Goals */}
                    </div>
                </div>
            </Body>
            <Footer />
        </div>
    );
};

export default About;
