import { PointerSensor, PointerSensorOptions } from '@dnd-kit/core';

class CardTarefaSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown' as const,
      handler: (
        { nativeEvent: event }: PointerEvent,
        { onActivation }: PointerSensorOptions
      ): boolean => {
        return (
          event.target.closest('button') === null
          && event.target.closest('.menu-editar') === null
        );
      },
    },
  ];
}

export default CardTarefaSensor;
