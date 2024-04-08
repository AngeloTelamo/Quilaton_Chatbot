import React from "react";

const rTimestamp = () => {
    const currentTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        <span style={{ fontSize: '10px', color: 'white', textAlign: 'right' }}>{currentTimestamp}</span>
      );
};  

export default rTimestamp;
