import { Component, OnInit } from '@angular/core';
import { ConfigVideoCall } from '../ConfigVideoCall';

declare var JitsiMeetExternalAPI: any;
declare function VideoCall(): any;
const VideoCallSDK = VideoCall();
const uuidAdmin = '9ec4f876-2fb4-4abc-8e2f-5a14caaa20c6';

@Component({
    selector: 'app-video-call',
    templateUrl: './video-call.component.html',
    styleUrls: ['./video-call.component.css'],
})
export class VideoCallComponent implements OnInit {
    api: any;
    constructor() {}
    ngOnInit(): void {
        this.initVideoCall();
    }
    initVideoCall() {
        let roomInfo;
        try {
            roomInfo = JSON.parse(localStorage.getItem('roomInfo'));
        } catch (error) {
            console.log(error);
        }
        const options = {
            roomName: roomInfo['roomId'] ? roomInfo['roomId'] : 'vnptit3',
            width: '100%',
            height: 590,
            jwt: roomInfo['token'],
            configOverwrite: { subject: ' ' }, // set roomName
            userInfo: {
                displayName: roomInfo['caller'],
                email: VideoCallSDK.getUUID(),
            },
            parentNode: document.querySelector('#meet'),
        };
        this.api = new JitsiMeetExternalAPI(
            roomInfo['domain'].replace('https://', ''),
            options
        );
        console.log(options);
        this.api.addEventListener('readyToClose', async () => {
            try {
                VideoCallSDK.endCall(uuidAdmin, ConfigVideoCall);
                window.open('', '_self').close();
            } catch (error) {}
        });
    }
}
