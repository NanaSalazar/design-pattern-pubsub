/*Por ser static, o subscriber não faz parte do objeto criado
com operador new e sim do próprio PubSub

O subscriber irá ler a propriedade eventName. Se existir, será igual
a ela mesma, se não será criado um array vazio.

A propriedade 'eventName' será um array, portanto temos acesso
a métodos de array. Com isso adicionamos as funções passadas
por parãmetro no array dessa propriedade.

*/

type Callback<T = Output> = (data?: T) => void
export type Output = {
    data: any,
    type: string
}

type Subscribers = {
    [P in string]: Callback[]
}

export class PubSub {
     static subscriber: Subscribers = {}

    static subscribe(eventName: string, fn: Callback) {
        PubSub.subscriber[eventName] = PubSub.subscriber[eventName] || []
        PubSub.subscriber[eventName].push(fn)
    }

    static publish(eventName: string, data: any) {
        if(PubSub.subscriber[eventName]) {
            PubSub.subscriber[eventName].forEach( (fn: Callback<Output>) => {
                const output: Output = {data, type: eventName}
                fn(output)
            })
        }
        
    }

    static unsubscribe(eventName: string, fn: Callback) {
        if(PubSub.subscriber[eventName]) {
            const index = PubSub.subscriber[eventName].findIndex((el: Function) => el === fn )
            if(index > -1) {
                PubSub.subscriber[eventName].splice(index, 1)

                if(PubSub.subscriber[eventName].length === 0) {
                    delete PubSub.subscriber[eventName]
                }
            }
        }
    }
}