const defaultOptions = {
  isSensor: true,
  label: 'no-label'
};

export const SENSORS_A = [
  {
    x: 0,
    y: -140,
    options: {
      ...defaultOptions,
      label: 'sensor_00',
      _tintFillcolor: 0xffff00,
    }
  },
  {
    x: 0,
    y: -70,
    options: {
      ...defaultOptions,
      label: 'sensor_01',
      _tintFillcolor: 0x00ff00,
    }
  },
  {
    x: 0,
    y: 0,
    options: {
      ...defaultOptions,
      label: 'sensor_02',
      _tintFillcolor: 0xff0000,
    }
  },
  {
    x: 0,
    y: 70,
    options: {
      ...defaultOptions,
      label: 'sensor_03',
      _tintFillcolor: 0x0000ff,
    }
  },
  {
    x: 0,
    y: 140,
    options: {
      ...defaultOptions,
      label: 'sensor_04',
      _tintFillcolor: 0xff00ff,
    }
  },
];

export const SENSORS_B = [
  {
    x: 0,
    y: -70,
    options: {
      ...defaultOptions,
      label: 'sensor_00',
      _tintFillcolor: 0xffff00,
    }
  },
  {
    x: -70,
    y: 0,
    options: {
      ...defaultOptions,
      label: 'sensor_01',
      _tintFillcolor: 0x00ff00,
    }
  },
  {
    x: 0,
    y: 0,
    options: {
      ...defaultOptions,
      label: 'sensor_02',
      _tintFillcolor: 0xff0000,
    }
  },
  {
    x: 70,
    y: 0,
    options: {
      ...defaultOptions,
      label: 'sensor_03',
      _tintFillcolor: 0x0000ff,
    }
  },
  {
    x: 0,
    y: 70,
    options: {
      ...defaultOptions,
      label: 'sensor_04',
      _tintFillcolor: 0xff00ff,
    }
  },
];