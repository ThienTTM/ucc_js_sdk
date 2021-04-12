import React, { useEffect, useState, useRef } from 'react';
import { ConfigVideoCall } from './ConfigVideoCall';
import VideoCall from './assets/js/videocall/VideoCall';
import $ from 'jquery';
import * as StompJS from 'stompjs';

var VideoCallSDK = VideoCall();

const App = (props) => {
    const [token, setToken] = useState();
    const [isPaused, setPause] = useState(false);
    const ws = useRef(null);
    const stompClient = useRef(null);
    // let urlVideo = null;
    let uuidAdmin: string = localStorage.getItem('uuidAdmin')
        ? localStorage.getItem('uuidAdmin').replace(/"/g, '')
        : VideoCallSDK.createUUID();
    let uuidUser: string = localStorage.getItem('uuidUser')
        ? localStorage.getItem('uuidUser').replace(/"/g, '')
        : VideoCallSDK.createUUID();
    const [user, setUser] = useState(uuidUser);
    const [urlVideo, setUrlVideo] = useState('');

    useEffect(() => {
        _connect();
    }, []);

    function _connect() {
        let ws = new WebSocket(
            'wss://api.idg.vnpt.vn/router-service/websocket'
        );
        stompClient.current = StompJS.over(ws);
        console.log(VideoCallSDK.getTopicUsing(uuidAdmin, ConfigVideoCall));
        stompClient.current.connect(
            {},
            function (frame) {
                stompClient.current.subscribe(
                    '/topic/' +
                        VideoCallSDK.getTopicUsing(uuidAdmin, ConfigVideoCall),
                    function (sdkEvent) {
                        onMessageReceived(sdkEvent);
                    }
                );
            },
            errorCallBack.bind(this)
        );
    }

    function errorCallBack(error) {
        _connect();
    }

    async function getFile() {
        const res = await VideoCallSDK.getFile(null, ConfigVideoCall);
        if (res.object && res.object.url) {
            // urlVideo = res.object.url;
            setUrlVideo(res.object.url);
        }
        console.log('resssss', res);
    }

    function createUUID() {
        const res = VideoCallSDK.createUUID();
        console.log('uuid', res);
    }

    function setUUID(uuid, type) {
        alert(type);
        if (type === 'admin') {
            localStorage.setItem('uuidAdmin', JSON.stringify(uuid));
        }
        if (type === 'user') {
            localStorage.setItem('uuidUser', JSON.stringify(user));
        }
    }

    async function logout() {
        console.log('logout');
        const res = await VideoCallSDK.removeDevice(uuidAdmin, ConfigVideoCall);
        console.log('remove', res);
    }

    function onMessageReceived(message) {
        console.log('Message Recieved from Server :: ' + message);
        const messBodyRaw = JSON.stringify(message.body);
        const messString = JSON.parse(messBodyRaw);
        VideoCallSDK.handleReceivingMessage(
            uuidAdmin,
            JSON.parse(messString),
            ConfigVideoCall
        );
    }

    function loginAs(role) {
        alert('login as ' + role);
        console.log(VideoCallSDK.getUUID());
        if (role === 'admin') {
            VideoCallSDK.registerDevice(
                uuidAdmin,
                uuidAdmin,
                ConfigVideoCall,
                'admin'
            );
        }
    }

    async function callVideo() {
        const receiverCallers = [user];
        const res = await VideoCallSDK.createCall(
            uuidAdmin,
            'admin',
            receiverCallers,
            ConfigVideoCall
        );
    }

    function disconnect() {
        stompClient.current.disconnect();
    }

    function handleMessage(message) {
        const mess = JSON.parse(message);
        console.log('message', JSON.parse(mess));
        VideoCallSDK.handleReceivingMessage(
            uuidUser,
            JSON.parse(mess),
            ConfigVideoCall
        );
    }

    return (
        <div>
            <div class="toolbar" role="banner">
                <link
                    href="https://fonts.googleapis.com/css?family=Nunito:300,300i,400,400i,600,600i,700,700i&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined"
                    rel="stylesheet"
                />
                <span class="ml-2">Video call sample (version 2.0.7)</span>
                <div class="spacer"></div>
                <button
                    class="btn btn-success d-inline-flex mr-2"
                    id="user"
                    onClick={() => createUUID()}
                >
                    Tạo UUID (nếu lần đầu mở app)
                </button>
                <button
                    class="btn btn-success d-inline-flex mr-2"
                    id="admin"
                    onClick={() => loginAs('admin')}
                >
                    Bước 3: Register device (admin)
                </button>
                <button
                    class="btn btn-warning d-inline-flex mr-2"
                    id="user"
                    onClick={() => logout()}
                >
                    Logout
                </button>
            </div>

            <div class="content" role="main">
                <div class="col-12 container-fluid">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="row mb-2">
                                <div class="col-8">
                                    <input
                                        onChange={(event) => {
                                            uuidAdmin = event.target.value;
                                        }}
                                        type="text"
                                        class="form-control"
                                        id="uuidAdmin"
                                        defaultValue={uuidAdmin}
                                    />
                                </div>
                                <div class="col-4">
                                    <button
                                        type="button"
                                        class="btn btn-success"
                                        onClick={() =>
                                            setUUID(uuidAdmin, 'admin')
                                        }
                                    >
                                        Bước 1: Thiết lập UUID nguồn (có thể có
                                        hoặc không)
                                    </button>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-8">
                                    <input
                                        onChange={(event) => {
                                            setUser(event.target.value);
                                        }}
                                        type="text"
                                        class="form-control"
                                        id="uuidUser"
                                        defaultValue={uuidUser}
                                    />
                                </div>
                                <div class="col-4">
                                    <button
                                        type="button"
                                        class="btn btn-success"
                                        onClick={() =>
                                            setUUID(uuidUser, 'user')
                                        }
                                    >
                                        Bước 2: Thiết lập UUID đích (user)
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-8">
                                    <p class="pt-2">{user}</p>
                                </div>
                                <div class="col-4">
                                    <button
                                        type="button"
                                        class="btn btn-success"
                                        onClick={() => callVideo()}
                                    >
                                        Bước 4: Gọi tới user đích
                                    </button>
                                </div>
                            </div>
                        </li>

                        <button
                            type="button"
                            class="btn btn-success"
                            onClick={() => getFile()}
                        >
                            Get file
                        </button>
                        {urlVideo && (
                            <iframe
                                class="home__hero__video"
                                src={urlVideo}
                                webkitallowfullscreen="true"
                                mozallowfullscreen="true"
                                allowFullScreen={true}
                                height="600"
                            ></iframe>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default App;
