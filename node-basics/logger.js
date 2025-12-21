import EventEmitter from "events";
import { randomUUID } from "crypto";

class  Logger extends EventEmitter{
    log(msg){
        this.emit('message', { id: randomUUID(), msg });
    }
}

export default Logger;