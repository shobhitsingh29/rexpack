import React from 'react';
const Title=(props)=>{
    return (
        <div>
            <div>
                <h1>{props.children}</h1>
            </div>
        </div>
    );
};

export default Title;
