import { PubSub, Output } from './Pubsub'


const event1 = document.querySelector('#testEvent') as HTMLElement
const event2 = document.querySelector('#testEvent2') as HTMLElement
const event3 = document.querySelector('#testEvent3')

type EventFire = (this: HTMLElement | Document, e: MouseEvent) => void

const eventFire: EventFire = function(evt: MouseEvent) {
    console.log('event fired')
    console.log(evt)
    console.log(this)
    const currentTarget = evt.currentTarget as HTMLElement
    const quantity = this.querySelector('span') as HTMLElement
    const n = parseInt(quantity.textContent || '0')
    quantity.textContent = (n + 1).toString()

    const event = new Event('click')
    event2.dispatchEvent(event)
}


event1.addEventListener('click', eventFire)
event2.addEventListener('click', eventFire)
document.addEventListener('click', eventFire)

/* ==== Pub/Sub Design Pattern */

const pubsub = document.querySelector('#pub-sub') as HTMLElement

PubSub.subscribe('EventTest', function(data) {
    console.log('Teste chamado com sucesso')
    console.log(data)
})

function teste(data?: Output) {
    console.log('Teste função nomeada')
    pubsub.textContent = `data: ${data?.data} - type: ${data?.type}`
}

PubSub.subscribe('EventTest', teste)
PubSub.subscribe('EventTest3', obj => {
    obj?.data
})

PubSub.unsubscribe('EventTest', teste)


PubSub.publish('EventTest', 20)
