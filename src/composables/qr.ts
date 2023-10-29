import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { useOrganizationsStore } from '@/store/organizations';

export const useQR = () => {
  const organizationStore = useOrganizationsStore();

  const error = ref('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paintBoundingBox = (detectedCodes: any[], ctx: any) => {
    for (const detectedCode of detectedCodes) {
      const {
        boundingBox: { x, y, width, height },
      } = detectedCode;
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#1677ff';
      ctx.strokeRect(x, y, width, height);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (err: any) => {
    switch (err.name) {
      case 'NotAllowedError':
        error.value = 'Вам необходимо предоставить разрешение на доступ к камере!';
        break;

      case 'NotFoundError':
        error.value = 'На этом устройстве нет камеры!';
        break;

      case 'NotSupportedError':
        error.value = 'Требуется безопасный контекст (HTTPS, localhost)!';
        break;

      case 'NotReadableError':
        error.value = 'Камера уже используется?';
        break;

      case 'OverconstrainedError':
        error.value = 'Установленные камеры не подходят!';
        break;

      case 'StreamApiNotSupportedError':
        error.value = 'Stream API не поддерживается в этом браузере!';
        break;

      case 'InsecureContextError':
        error.value =
          'Доступ к камере разрешен только в безопасном контексте. Используйте HTTPS или localhost вместо HTTP.';
        break;

      default:
        error.value = 'Ошибка при взаимодействии с камерой';
        break;
    }

    message.error(error.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDetect = async ([code]: any[]) => {
    await organizationStore.connect(code.rawValue);
  };

  return {
    error,
    paintBoundingBox,
    onError,
    onDetect,
  };
};
