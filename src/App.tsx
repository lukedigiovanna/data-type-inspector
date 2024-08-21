import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { views, View } from "./views";

const App = () => {
    const location = useLocation();    
    const navigate = useNavigate();

    const goto = (id: string) => { navigate(`#${id}`)};

    const [currentView, setCurrentView] = React.useState<View>(views[0]);

    React.useEffect(() => {
        const id = location.hash;
    
        if (id.length === 0) {
            goto(views[0].id);
        }
        else {
            for (const view of views) {
                if (view.id === id.substring(1)) {
                    setCurrentView(view);
                    return;
                }
            }
            goto(views[0].id);
        }
    }, [location]);

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
                            disabled={view.id === currentView.id}
                            className={`
                                border border-gray-400 bg-gray-100 rounded px-2 py-1 font-bold transition
                                hover:bg-gray-300
                                active:bg-blue-400
                                disabled:border-black disabled:bg-blue-300 disabled:bg-blue-300"}`}
                            key={index}
                            onClick={() => {
                                goto(view.id);
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