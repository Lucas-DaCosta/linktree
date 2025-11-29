import React from "react";

export default function Button({children}: {children: React.ReactNode}) {
    return (
        <button type="button" className="text-white bg-blue-500 hover:bg-blue-600 border border-transparent focus:ring-4 focus:ring-blue-300 shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none">{children}</button>
    )
}