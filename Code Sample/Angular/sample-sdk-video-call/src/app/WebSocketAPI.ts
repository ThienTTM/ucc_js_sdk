import * as StompJS from 'stompjs';
import * as SockJS from 'sockjs-client';
import { MainComponent } from './main/main.component';
import { ConfigVideoCall } from './ConfigVideoCall';

declare function VideoCall(): any;
const VideoCallSDK = VideoCall();

export class WebSocketAPI {
    webSocketEndPoint: string =
        'wss://api.idg.vnpt.vn/router-service/websocket';
    // webSocketEndPoint: string =
    //     'ws://10.59.90.144:8762/router-service/websocket';
    topic: string;
    stompClient: any;
    mainComponent: MainComponent;

    constructor(mainComponent: MainComponent, uuidCustomer, config) {
        this.mainComponent = mainComponent;
        this.topic = VideoCallSDK.getTopicUsing(uuidCustomer, config);
    }

    _connect() {
        console.log('Initialize WebSocket Connection');
        let ws = new WebSocket(this.webSocketEndPoint);
        this.stompClient = StompJS.over(ws);
        const _this = this;
        _this.stompClient.connect(
            {},
            function (frame) {
                _this.stompClient.subscribe(
                    '/topic/' + _this.topic,
                    function (sdkEvent) {
                        _this.onMessageReceived(sdkEvent);
                    }
                );
            },
            this.errorCallBack.bind(this)
        );
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log('Disconnected');
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        this._connect();
    }

    onMessageReceived(message) {
        const mess = JSON.parse(message.body);
        this.mainComponent.handleMessage(JSON.stringify(message.body));
    }
}
