import {observable,computed,action} from 'mobx';
import io from 'socket.io-client';
import {googleapi} from '../service'
export default class SocketManger {
    @observable socket = null;
    @observable settings = {};

    @action methods () {
        this.socket.emit('subscripe',1);
        this.socket.emit('request_driver',{room:1});
        this.socket.on('send_approve_to_client',function() {
            console.log('Approved Sended from client');
        });
    }

    @action unsubscripe(room) {
        this.socket.emit('unsubscripe',{room:room});
    }

    @action subscripe(room) {
        this.socket.emit('subscripe',room);
    }

    @action request_driver (data) {
        this.socket.emit('subscripe',data.room);
        this.socket.emit('request_driver',data);
    }


    @action get_approve_from_client(todo) {
        this.socket.on('send_approve_to_client',function(data) {
            console.log('Approved Sended from client');
            todo(data);
        });
    }

    @action when_start_the_service(todo) {
        this.socket.on('send_start_service_to_client',function() {
            console.log('Approved Sended from client');
            todo();
        });
    }


    @action when_start_the_route(todo) {
        this.socket.on('send_start_route_to_client',function() {
            todo(googleapi);
        });
    }

    @action end_route(todo) {
        this.socket.on('send_end_route_to_client',function() {
            todo();
        });
    }

    @action recive_real_coords(todo) {
        this.socket.on('send_real_time_location_to_client',function(data) {
            todo(data);
        });
    }

    constructor(Settings) {
        this.settings = Settings;
        this.socket = io('http://3.16.160.3:3000/');
        
    }
}