import React, { useEffect, useState, useRef } from 'react';
import { ConfigVideoCall } from './ConfigVideoCall';
import VideoCall from './assets/js/videocall/VideoCall';

var VideoCallSDK = VideoCall();
const uuidAdmin = '11fad594-744c-4a4d-abd0-a81e803e926e';

const VideoCallComponent = (props) => {
    useEffect(() => {
        initVideoCall();
    }, []);
    function initVideoCall() {
        let roomInfo;
        try {
            roomInfo = JSON.parse(localStorage.getItem('roomInfo'));
        } catch (error) {
            console.log(error);
        }
        console.log('room info', roomInfo);
        const options = {
            roomName: roomInfo['roomId'] ? roomInfo['roomId'] : '',
            width: '100%',
            height: 590,
            jwt: roomInfo['token'],
            configOverwrite: { subject: ' ' }, // set roomName
            userInfo: {
                displayName: roomInfo['caller'],
                email: VideoCallSDK.getUUID(),
            },
            // parentNode: document.getElementById('#meet'),
        };
        let api = new window.JitsiMeetExternalAPI(
            roomInfo['domain'].replace('https://', ''),
            options
        );
        console.log(options);
        api.addEventListener('readyToClose', async () => {
            try {
                VideoCallSDK.endCall(uuidAdmin, ConfigVideoCall);
                window.open('', '_self').close();
            } catch (error) {}
        });
    }
    return <div id="meet"></div>;
};

export default VideoCallComponent;
