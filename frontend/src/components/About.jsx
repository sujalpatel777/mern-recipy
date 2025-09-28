import { motion } from 'framer-motion';

const About = () => {
    const skills = [
        "React", "Node.js", "JavaScript", "MongoDB", "Express.js",
        "Tailwind CSS", "Git", "REST APIs", "Web Development"
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6"
        >
            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
                {/* Profile Section */}
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center mb-8"
                >
                    <motion.div
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-400 dark:border-purple-300 mb-4"
                    >
                        <img
                            src="sujal.jpg"
                            alt="Sujal Patel"
                            className="object-cover w-full h-full"
                        />
                    </motion.div>

                    <motion.h2
                        className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1"
                        whileHover={{ scale: 1.02 }}
                    >
                        Sujal Patel
                    </motion.h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-4">Full Stack Developer</p>
                </motion.div>

                {/* Bio Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-gray-600 dark:text-gray-300 text-center mb-8"
                >
                    <p className="mb-4">
                        Passionate full-stack developer with expertise in building modern web applications.
                        Focused on creating efficient, scalable, and user-friendly solutions.
                    </p>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full mb-8"
                >
                    <h3 className="text-lg md:text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4 text-center">
                        Technical Skills
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {skills.map((skill, index) => (
                            <motion.span
                                key={index}
                                whileHover={{ scale: 1.1, backgroundColor: '#9333ea', color: 'white' }}
                                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm md:text-base shadow-sm"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex justify-center space-x-6 mt-6"
                >
                    {[
                        {
                            icon: <GmailIcon />,
                            href: "https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSKhbwbssRNcHxFzmsSndHlPxDSNDMgMfHfSzZdpSDVlMrRDbtCPTBvbLVNNPjjfLgSlgBSJ",
                            color: "hover:text-red-500"
                        },
                        {
                            icon: <LinkedInIcon />,
                            href: "https://www.linkedin.com/in/patel-sujal-094632283/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                            color: "hover:text-blue-500"
                        },
                        {
                            icon: <GitHubIcon />,
                            href: "https://github.com/sujalpatel777",
                            color: "hover:text-gray-700 dark:hover:text-gray-300"
                        }
                    ].map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-gray-600 dark:text-gray-400 text-2xl ${social.color} transition-colors`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

// Icon components
const GmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 10.01V20H4z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
    </svg>
);

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0112 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
);

export default About;
