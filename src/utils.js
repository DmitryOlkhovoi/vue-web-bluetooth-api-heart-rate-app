/* eslint no-bitwise: ["error", { "allow": ["&"] }] */

export const parseHeartRateValues = (data) => {
  // В Chrome 50+ используется DataView.
  const value = data.buffer ? data : new DataView(data);
  const flags = value.getUint8(0);

  // Определяем формат
  const rate16Bits = flags & 0x1;
  const result = {};
  let index = 1;

  // Читаем в зависимости от типа
  if (rate16Bits) {
    result.heartRate = value.getUint16(index, /* littleEndian= */true);
    index += 2;
  } else {
    result.heartRate = value.getUint8(index);
    index += 1;
  }

  // RR интервалы
  const rrIntervalPresent = flags & 0x10;
  if (rrIntervalPresent) {
    const rrIntervals = [];
    for (; index + 1 < value.byteLength; index += 2) {
      rrIntervals.push(value.getUint16(index, /* littleEndian= */true));
    }
    result.rrIntervals = rrIntervals;
  }

  return result;
};

export default {
  parseHeartRateValues,
};
