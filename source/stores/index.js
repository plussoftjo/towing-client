import Settings from './Settings';
import Languages from './Languages';
import Auth from './Auth';
import Manger from './Manger';
import Locations from './Locations';
import Processor from './Processor';
import Drivers from './Drivers';
import SocketManger from './SocketManger';
import CarType from './CarType';
import Pricing from './Pricing'
import Cashe from './Cashe'
import Notification from './Notifiaction'
export default {
    settings: new Settings(),
    languages: new Languages(),
    auth: new Auth(new Settings()),
    manger:new Manger(),
    locations:new Locations(),
    processor:new Processor(),
    drivers:new Drivers(new Settings),
    socketmanger:new SocketManger(new Settings),
    cartype:new CarType(new Settings),
    pricing:new Pricing(),
    cache:new Cashe(),
    notification:new Notification(new Settings)
}