import store from 'app/store'
import subscriber from 'app/services/subscriber'
import * as view from 'app/view'

store.init()
store.setDefaultData()
subscriber.start()
view.render()
