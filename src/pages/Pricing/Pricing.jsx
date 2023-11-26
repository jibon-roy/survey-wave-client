

const Pricing = () => {
    return (
        <div>

            <section className="bg-gray-100 py-16">
                <div className="container px-2 mx-auto">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Choose a Plan</h2>
                    <div className="flex flex-col mx-auto max-md:items-center md:flex-row md:justify-center gap-8">
                        {/* Free Plan */}
                        <div className="flex-1 max-w-md align-bottom bg-white p-8 rounded-lg border-2">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Free</h3>
                            <h1 className="text-2xl mb-3 font-bold">$ 0 USD / Month</h1>
                            <p className="text-gray-600 mb-4">Perfect for getting started with basic survey features.</p>
                            <ul className="text-gray-600 list-disc mb-6 ">
                                <li>Unlimited Surveys</li>
                                <li>Basic Analytics</li>
                                <li>Limited Responses</li>
                                <li>Free Account</li>
                            </ul>
                            <button className="bg-primary-main hover:bg-blue-500 text-white w-full rounded-full py-2 px-6 focus:outline-none">
                                Get Started
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div className="flex-1 max-w-md bg-white p-8 rounded-lg border-2 border-primary-main">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Pro</h3>
                            <h1 className="text-2xl mb-3 font-bold">$ 38 USD / Month</h1>
                            <p className="text-gray-600 mb-4">Unlock advanced features for more comprehensive surveys.</p>
                            <ul className="text-gray-600 list-disc mb-6">
                                <li>Unlimited Surveys</li>
                                <li>Advanced Analytics</li>
                                <li>Priority Support</li>
                                <li>Custom Branding</li>
                            </ul>
                            <button className="bg-primary-main hover:bg-blue-500 text-white w-full rounded-full py-2 px-6 focus:outline-none">
                                Upgrade Now
                            </button>
                        </div>

                        {/* Special Plan */}
                        <div className="flex-1 max-w-md bg-white p-8 rounded-lg border-2">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Special</h3>
                            <h1 className="text-2xl mb-3 font-bold">$ 50 USD / Month</h1>
                            <p className="text-gray-600 mb-4">Exclusive every features for power users and enterprises.</p>
                            <ul className="text-gray-600 list-disc mb-6">
                                <li>Unlimited Surveys</li>
                                <li>Advanced Analytics</li>
                                <li>Premium Support</li>
                                <li>Custom Solutions</li>
                            </ul>
                            <button className="bg-primary-main hover:bg-blue-500 text-white w-full rounded-full py-2 px-6 focus:outline-none">
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            );

        </div>
    );
};

export default Pricing;