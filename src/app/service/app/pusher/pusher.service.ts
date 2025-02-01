import Pusher from "pusher-js";
import {Injectable} from "@angular/core";
import {Config} from "../../../config/config";

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private pusher: Pusher;
  public channel: any;

  constructor() {
    this.pusher = new Pusher(Config.pusher.key, {
      cluster: Config.pusher.cluster, // Укажите ваш кластер
      forceTLS: true,
    });

    this.channel = this.pusher.subscribe('users');
  }

  public bindEvent(eventName: string, callback: (data: any) => void) {
    this.channel.bind(eventName, callback);
  }
}
