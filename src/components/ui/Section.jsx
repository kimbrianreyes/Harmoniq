import React from 'react';

const Section = ({ title, action, children }) => {
    return (
        <section className="mb-8">
            <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
                {action && (
                    <button className="text-sm font-bold text-gray-400 hover:text-white uppercase tracking-wider hover:underline transition-all">
                        {action}
                    </button>
                )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {children}
            </div>
        </section>
    );
};

export default Section;
