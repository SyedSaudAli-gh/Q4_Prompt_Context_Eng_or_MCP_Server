'use client';

import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaCheckCircle } from 'react-icons/fa';

const ContactPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      message: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus('success');
        resetForm();
      } else {
        setStatus('error');
      }
      setSubmitting(false);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">Contact Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-black rounded-lg shadow-lg p-8">
          {formik.status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <FaCheckCircle className="text-6xl text-green-500 mb-4" />
              <h2 className="text-2xl font-semibold text-black dark:text-white">Message Sent!</h2>
            </motion.div>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...formik.getFieldProps('name')}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...formik.getFieldProps('message')}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ></textarea>
                {formik.touched.message && formik.errors.message ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
                ) : null}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-400"
                >
                  Send Message
                </button>
              </div>
              {formik.status === 'error' && (
                <p className="text-red-500 text-center mt-4">Failed to send message.</p>
              )}
            </form>
          )}
        </div>
        <div className="bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019590399529!2d-122.4194154846813!3d37.77492957975817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d6b95f3d%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;