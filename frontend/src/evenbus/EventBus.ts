type EventCallback = (data: any) => void;

class EventBus {
    /**
     * Escuta por um evento.
     * @param {string} eventType - O tipo de evento para escutar.
     * @param {EventCallback} callback - A função de callback para executar quando o evento ocorrer.
     * @returns {() => void} Uma função para remover o ouvinte de eventos.
     */
    on(eventType: string, callback: EventCallback): () => void {
        const listener = (ev: CustomEvent) => callback(ev.detail);
        document.addEventListener(eventType, listener as EventListener);
        return () => document.removeEventListener(eventType, listener as EventListener);
    }

    /**
     * Dispara um evento.
     * @param {string} eventType - O tipo de evento para disparar.
     * @param {any} data - Os dados a serem passados com o evento.
     */
    dispatch(eventType: string, data: any = null): void {
        const event = new CustomEvent(eventType, { detail: data });
        document.dispatchEvent(event);
    }

    /**
     * Remove um ouvinte de eventos.
     * @param {string} eventType - O tipo de evento para parar de escutar.
     * @param {EventCallback} callback - A função de callback a ser removida.
     */
    remove(eventType: string, callback: EventCallback): void {
        document.removeEventListener(eventType, callback as EventListener);
    }
}

export default new EventBus();