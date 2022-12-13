const particleConfig = {
  particles: {
    number: {
      value: 10,
      density: {
        enable: true,
        value_area: 1500,
      },
    },
    color: {
      value: '#000',
    },
    shape: {
      type: 'image',
      image: {
        src: '../static/pokeball.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: false,
      },
    },
    size: {
      value: 70,
      random: true,
      anim: {
        enable: false,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 0.2,
      direction: 'right',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: true,
      attract: {
        enable: false,
        rotateX: 3687.8477399907024,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse',
      },
      onclick: {
        enable: false,
        mode: 'repulse',
      },
      resize: true,
    },
  },
  retina_detect: true,
};

export default particleConfig;
