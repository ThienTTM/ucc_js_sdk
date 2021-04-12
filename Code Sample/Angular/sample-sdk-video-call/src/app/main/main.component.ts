import { Component, AfterViewInit, OnInit } from '@angular/core';
import { WebSocketAPI } from '../WebSocketAPI';
import { ConfigVideoCall } from '../ConfigVideoCall';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare function VideoCall(): any;
const VideoCallSDK = VideoCall();

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    message;
    webSocketAPI: WebSocketAPI;
    name: string;
    urlVideo: SafeResourceUrl;

    uuidAdmin: string = localStorage.getItem('uuidAdmin')
        ? localStorage.getItem('uuidAdmin').replace(/"/g, '')
        : VideoCallSDK.createUUID();
    uuidUser: string = localStorage.getItem('uuidUser')
        ? localStorage.getItem('uuidUser').replace(/"/g, '')
        : VideoCallSDK.createUUID();

    constructor(public sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.webSocketAPI = new WebSocketAPI(
            new MainComponent(this.sanitizer),
            this.uuidAdmin,
            ConfigVideoCall
        );
        this.connect();
    }

    async loginAs(role) {
        alert('login as ' + role);
        if (role === 'admin') {
            const res = await VideoCallSDK.registerDevice(
                this.uuidAdmin,
                this.uuidAdmin,
                ConfigVideoCall,
                'admin'
            );
            console.log(res);
        }
    }

    async callVideo() {
        const receiverCallers = [this.uuidUser];
        const res = await VideoCallSDK.createCall(
            this.uuidAdmin,
            'admin',
            receiverCallers,
            ConfigVideoCall
        );
        console.log('res from app', res);
    }

    setUUID(uuid, type) {
        if (type === 'admin')
            localStorage.setItem('uuidAdmin', JSON.stringify(uuid));
        else localStorage.setItem('uuidUser', JSON.stringify(uuid));
        alert(uuid);
    }

    async logout() {
        console.log('logout');
        const res = await VideoCallSDK.removeDevice(
            this.uuidAdmin,
            ConfigVideoCall
        );
        console.log('remove', res);
    }

    async getFile() {
        const res = await VideoCallSDK.getFile(null, ConfigVideoCall);
        if (res.object.url) {
            this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
                res.object.url
            );
        }
        console.log('resssss', res);
    }

    createUUID() {
        VideoCallSDK.createUUID();
    }

    getAuthen() {
        VideoCallSDK.getAuthen(ConfigVideoCall);
    }

    connect() {
        this.webSocketAPI._connect();
    }

    disconnect() {
        this.webSocketAPI._disconnect();
    }

    sendMessage() {}

    handleMessage(message) {
        const mess = JSON.parse(message);
        VideoCallSDK.handleReceivingMessage(
            localStorage.getItem('uuidAdmin').replace(/"/g, ''),
            JSON.parse(mess),
            ConfigVideoCall
        );
    }
}
