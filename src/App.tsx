import React from "react";

import { views, View } from "./views";

const App = () => {
    const [currentView, setCurrentView] = React.useState<View>(views[0]);

    return (
        <div className="block mx-auto max-w-4xl">
            <div className="p-4 ">
                <h1 className="text-3xl font-bold">
                    Data Type Inspector
                </h1>
            </div>
            <div className="flex flex-row space-x-2 p-3 border-gray-300 border-b border-t">
                {
                    views.map((view: View, index: number) => 
                        <button
                            className={`
                                border border-gray-400 bg-gray-100 rounded px-2 py-1 font-bold transition
                                hover:bg-gray-300
                                active:bg-blue-400
                                ${view === currentView && "border-black bg-blue-300 hover:bg-blue-300"}`}
                            key={index}
                            onClick={() => {
                                setCurrentView(view);
                            }}
                        >
                            { view.title }
                        </button>
                    )
                }
            </div>
            <div>
                {
                    currentView.element
                }
            </div>
        </div>
    );
}

export { App };