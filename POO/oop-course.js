// Esto es una forma en la que se puede usar la destructuración para para un argumento objeto a la clase

class Device {
    constructor(params = {}) {
        ({
            status: this._status = 'off',
            brand: this._brand = 'ACME',
            firmware: this._firmware = 'unknown'
        } = params);
    }

    //Método
    start() {
        this._status = 'on';
    }

    get status() {
        return this._status;
    }

    get brand() {
        return this._brand;
    }

    get firmware() {
        return this._firmware;
    }
}

class VideoDevice extends Device {
    start(source = '') {
        super.start();

        return 'Rendering source...';
    }
}

class DiskDevice extends Device {
    constructor(params = {}) {
        super({ status: 'on' });
    }

    format(size = 0) {
        return 'Formatting device | Firmware: ' + this._firmware;
    }
}

const parameters = {
    status: "on",
    brand: "TTA",
    firmware: "123fkfd"
}
let d1 = new Device(parameters);

console.log(d1.status); // "off"
console.log(d1.brand); // "off"

let player = new VideoDevice({ brand: 'Videodrome' });
player.brand; // "Videodrome"
player.status; // "off"
player.start(); // "Rendering source..."
player.status; // "on"

let hdd = new DiskDevice;
hdd.status; // "on"
hdd.format(); // "Formatting device | Firmware: unknown"