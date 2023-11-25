import { Disclosure } from '@headlessui/react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomHeader from '../../../components/customHeader/CustomHeader';

const Faq = () => {
    return (
        <div className='mt-20'>
            <CustomHeader name='FAQ' subject='Client Question And Answers.'></CustomHeader>
            <div className="w-full px-4 md:flex gap-5">
                <div className=" md:w-1/2">
                    <div className='my-4'>
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex bg-primary-main w-full justify-between rounded-lg px-4 py-5 text-left text-sm font-semibold text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                        <span className='text-xl text-primary-bg2'>Q: How do I create a survey on Survey Wave?</span>
                                        <KeyboardArrowDownIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-primary-bg2`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 rounded-lg bg-primary-bg2 pb-2 pt-4 text-sm text-gray-500">
                                        A: Creating a survey is easy! Log in, click &#34;Create Survey,&#34; and follow the intuitive steps to design your questions and customize the survey to your liking.
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    <div className='my-4'>
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex bg-primary-main w-full justify-between rounded-lg px-4 py-5 text-left text-sm font-semibold text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                        <span className='text-xl text-primary-bg2'>Q: Can I customize the appearance of my surveys?</span>
                                        <KeyboardArrowDownIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-primary-bg2`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 rounded-lg bg-primary-bg2 pb-2 pt-4 text-sm text-gray-500">
                                        A: Yes, absolutely! Survey Wave offers a range of customization options, allowing you to personalize the look and feel of your surveys to align with your brand or preferences.
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    <div className='my-4'>
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex bg-primary-main w-full justify-between rounded-lg px-4 py-5 text-left text-sm font-semibold text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                        <span className='text-xl text-primary-bg2'>Q: How do I engage with my survey participants?</span>
                                        <KeyboardArrowDownIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-primary-bg2`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 rounded-lg bg-primary-bg2 pb-2 pt-4 text-sm text-gray-500">
                                        A: Foster discussions easily! Share results, encourage comments, and spark conversations within the Survey Wave community to enhance participant engagement.
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </div>
                <div className=" md:w-1/2 bg-white">
                    <div className='my-4'>
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex bg-primary-main w-full justify-between rounded-lg px-4 py-5 text-left text-sm font-semibold text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                        <span className='text-xl text-primary-bg2'>Q: Is my data secure on Survey Wave?</span>
                                        <KeyboardArrowDownIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-primary-bg2`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 rounded-lg bg-primary-bg2 pb-2 pt-4 text-sm text-gray-500">
                                        A: Yes, we take data security seriously. Survey Wave employs encryption and secure protocols to ensure the confidentiality and integrity of your survey data.
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    <div className='my-4'>
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex bg-primary-main w-full justify-between rounded-lg px-4 py-5 text-left text-sm font-semibold text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                        <span className='text-xl text-primary-bg2'>Q: Can I see responses in real-time?</span>
                                        <KeyboardArrowDownIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-primary-bg2`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 rounded-lg bg-primary-bg2 pb-2 pt-4 text-sm text-gray-500">
                                        A: Absolutely! Survey Wave provides real-time analytics, allowing you to monitor and analyze responses as they come in, empowering you with up-to-the-minute insights.
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    <div className='my-4'>
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex bg-primary-main w-full justify-between rounded-lg px-4 py-5 text-left text-sm font-semibold text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                        <span className='text-xl text-primary-bg2'>Q: What support are available for assistance?</span>
                                        <KeyboardArrowDownIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-primary-bg2`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 rounded-lg bg-primary-bg2 pb-2 pt-4 text-sm text-gray-500">
                                        A: We offer 24/7 customer support to assist you with any questions or concerns. Additionally, you can explore our comprehensive help center for guides and resources.
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;