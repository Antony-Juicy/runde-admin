import liveconfig from './live-config';
import liveDetails from './live-details';
import liveGoods from './live-goods';
import live from './live';
import onlineCourse from './online-course'
import book from './book'
import analog from './analog'

export default {
  ...liveconfig,
  ...liveDetails,
  ...liveGoods,
  ...live,
  ...onlineCourse,
  ...book,
  ...analog
}