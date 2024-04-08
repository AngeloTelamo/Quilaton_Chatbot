import React from 'react';

function CustomAvatar(){
    return (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '9999',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#007bff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
          }}
        >
          <img
            src={require('../AvatarProfile/Avatar.jpg')}
            alt="Avatar"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
        </div>
      );
    }
export default CustomAvatar;