import React from "react";

export default function Error404({children}: {children: React.ReactNode}) {
    return (<>
                <h1> ERREUR 404 </h1>
                <h2 className="error404"> {children} </h2>
            </>
    )
}