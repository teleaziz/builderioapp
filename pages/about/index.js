import React from 'react';

const index = () =>
{
    return <div className="flex justify-center">
        <p className="hidden sm:block text-red-500 md:text-blue-400">Im for the big screen</p>
        <p className="block sm:hidden">I'm for small screen</p> This is about page v2
    </div>;
};

export default index;
