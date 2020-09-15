import React from 'react';

const Total = ({ number }) => (
    <div>
        total of {number} exercise{number === 1 ? "" : "s"}
    </div>
);

export default Total