import CustomHeader from "../../../components/customHeader/CustomHeader";


const HowItWorks = () => {
    return (
        <section className="body-font">
            <div className="container pt-24 mx-auto">
                <CustomHeader name='How it works' subject='Show The Working Process'>
                </CustomHeader>
                <div className="mb-20">
                    <section className="text-primary-text body-font">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-4 justify-between">
                                <div className="max-md:hidden"></div>
                                <div className="py-2 px-4 col-span-3 max-md:col-span-4">
                                    <div className="max-md:border-x-2 md:border-l-2 bg-primary-bg2 hover:border-primary-text hover:bg-[#c2e2f3] border-primary-main p-6">
                                        <h2 className="text-lg text-primary-text font-bold title-font mb-2">1. Craft Your Survey</h2>
                                        <p className="leading-relaxed text-base">
                                            Effortlessly shape your survey with user-friendly tools, ensuring a seamless design experience that captures the essence of your questions and topics in just a few clicks.
                                        </p>
                                    </div>
                                </div>
                                <div className="py-2 px-4 col-span-3 max-md:col-span-4">
                                    <div className="max-md:border-x-2 md:border-r-2 bg-primary-bg2 hover:border-primary-text hover:bg-[#c2e2f3] border-primary-main p-6">
                                        <h2 className="text-lg text-primary-text font-bold title-font mb-2">2. Connect with Participants:</h2>
                                        <p className="leading-relaxed text-base">
                                            Extend invitations effortlessly via email, social media, or direct links, fostering a strong connection with your audience for maximum survey participation and insightful feedback.
                                        </p>
                                    </div>
                                </div>
                                <div className="max-md:hidden"></div>
                                <div className="max-md:hidden"></div>
                                <div className="py-2 px-4 col-span-3 max-md:col-span-4">
                                    <div className="max-md:border-x-2 md:border-l-2 bg-primary-bg2 hover:border-primary-text hover:bg-[#c2e2f3] border-primary-main p-6">
                                        <h2 className="text-lg text-primary-text font-bold title-font mb-2">3. Real-Time Engagement:</h2>
                                        <p className="leading-relaxed text-base">
                                            Experience the pulse of your survey as participants engage in real-time, providing dynamic insights and fostering an interactive experience that keeps both creators and participants engaged throughout.
                                        </p>
                                    </div>
                                </div>
                                <div className="max-md:hidden"></div>
                                <div className="max-md:hidden"></div>
                                <div className="py-2 px-4 col-span-3 max-md:col-span-4">
                                    <div className="max-md:border-x-2 md:border-r-2 bg-primary-bg2 hover:border-primary-text hover:bg-[#c2e2f3] border-primary-main p-6">
                                        <h2 className="text-lg text-primary-text font-bold title-font mb-2">4.
                                            Instant Analysis:
                                        </h2>
                                        <p className="leading-relaxed text-base">
                                            Dive into immediate data analysis, uncovering trends and patterns as responses pour in. Our real-time analytics provide instant insights, empowering quick and informed decision-making based on current data.
                                        </p>
                                    </div>
                                </div>
                                <div className="max-md:hidden"></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;



