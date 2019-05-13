/**
 *
 * 人型を作る
 *
 * @param x
 * @param y
 * @param scale
 * @param options
 * @returns {any | {vertex, id, normalImpulse, tangentImpulse} | {x, y} | Array}
 */
function makePerson(x, y, scale, options) {
  scale = typeof scale === 'undefined' ? 1 : scale;

  var Body = Matter.Body,
      Bodies = Matter.Bodies,
      Constraint = Matter.Constraint,
      Composite = Matter.Composite,
      Common = Matter.Common;

  // 顔オプション
  var headOptions = Common.extend({
    label: 'head',
    collisionFilter: {
      group: Body.nextGroup(true)
    },
    chamfer: {
      radius: [15 * scale, 15 * scale, 15 * scale, 15 * scale]
    },
    render: {
      fillStyle: '#FFBC42',
      sprite: {
        texture: './img/face2.png'
      }

    }
  }, options);

  // 胴体オプション
  var chestOptions = Common.extend({
    label: 'chest',
    collisionFilter: {
      group: Body.nextGroup(true)
    },
    chamfer: {
      radius: [20 * scale, 20 * scale, 26 * scale, 26 * scale]
    },
    render: {
      fillStyle: '#E0A423'
    }
  }, options);

  // 左腕オプション
  var leftArmOptions = Common.extend({
    label: 'left-arm',
    collisionFilter: {
      group: Body.nextGroup(true)
    },
    chamfer: {
      radius: 10 * scale
    },
    render: {
      fillStyle: '#FFBC42'
    }
  }, options);

  var leftLowerArmOptions = Common.extend({}, leftArmOptions, {
    render: {
      fillStyle: '#E59B12'
    }
  });

  // 右腕オプション
  var rightArmOptions = Common.extend({
    label: 'right-arm',
    collisionFilter: {
      group: Body.nextGroup(true)
    },
    chamfer: {
      radius: 10 * scale
    },
    render: {
      fillStyle: '#FFBC42'
    }
  }, options);

  var rightLowerArmOptions = Common.extend({}, rightArmOptions, {
    render: {
      fillStyle: '#E59B12'
    }
  });

  // 左足オプション
  var leftLegOptions = Common.extend({
    label: 'left-leg',
    collisionFilter: {
      group: Body.nextGroup(true)
    },
    chamfer: {
      radius: 10 * scale
    },
    render: {
      fillStyle: '#FFBC42'
    }
  }, options);

  var leftLowerLegOptions = Common.extend({}, leftLegOptions, {
    render: {
      fillStyle: '#E59B12'
    }
  });

  // 右足オプション
  var rightLegOptions = Common.extend({
    label: 'right-leg',
    collisionFilter: {
      group: Body.nextGroup(true)
    },
    chamfer: {
      radius: 10 * scale
    },
    render: {
      fillStyle: '#FFBC42'
    }
  }, options);

  var rightLowerLegOptions = Common.extend({}, rightLegOptions, {
    render: {
      fillStyle: '#E59B12'
    }
  });

  var head = Bodies.rectangle(x, y - 60 * scale, 34 * scale, 40 * scale, headOptions);
  var chest = Bodies.rectangle(x, y, 55 * scale, 80 * scale, chestOptions);
  var rightUpperArm = Bodies.rectangle(x + 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, rightArmOptions);
  var rightLowerArm = Bodies.rectangle(x + 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, rightLowerArmOptions);
  var rightKobushi = Bodies.circle(x + 39 * scale, y + 65 * scale, 15 * scale, rightLowerArmOptions);
  var leftUpperArm = Bodies.rectangle(x - 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, leftArmOptions);
  var leftLowerArm = Bodies.rectangle(x - 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, leftLowerArmOptions);
  var leftKobushi = Bodies.circle(x - 39 * scale, y + 65 * scale, 15 * scale, leftLowerArmOptions);
  var leftUpperLeg = Bodies.rectangle(x - 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, leftLegOptions);
  var leftLowerLeg = Bodies.rectangle(x - 20 * scale, y + 97 * scale, 20 * scale, 60 * scale, leftLowerLegOptions);
  var leftAshi = Bodies.circle(x - 20 * scale, y + 137 * scale, 15 * scale, leftLowerLegOptions);
  var rightUpperLeg = Bodies.rectangle(x + 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, rightLegOptions);
  var rightLowerLeg = Bodies.rectangle(x + 20 * scale, y + 97 * scale, 20 * scale, 60 * scale, rightLowerLegOptions);
  var rightAshi = Bodies.circle(x + 20 * scale, y + 137 * scale, 15 * scale, rightLowerLegOptions);


  // オブジェクト同士をつなぐ設定
  var chestToRightUpperArm = Constraint.create({
    bodyA: chest,
    pointA: {
      x: 24 * scale,
      y: -23 * scale
    },
    pointB: {
      x: 0,
      y: -8 * scale
    },
    bodyB: rightUpperArm,
    stiffness: 0.6,
    render: {
      visible: true
    }
  });

  var chestToLeftUpperArm = Constraint.create({
    bodyA: chest,
    pointA: {
      x: -24 * scale,
      y: -23 * scale
    },
    pointB: {
      x: 0,
      y: -8 * scale
    },
    bodyB: leftUpperArm,
    stiffness: 0.6,
    render: {
      visible: true
    }
  });

  var chestToLeftUpperLeg = Constraint.create({
    bodyA: chest,
    pointA: {
      x: -10 * scale,
      y: 30 * scale
    },
    pointB: {
      x: 0,
      y: -10 * scale
    },
    bodyB: leftUpperLeg,
    stiffness: 0.6,
    render: {
      visible: true
    }
  });

  var chestToRightUpperLeg = Constraint.create({
    bodyA: chest,
    pointA: {
      x: 10 * scale,
      y: 30 * scale
    },
    pointB: {
      x: 0,
      y: -10 * scale
    },
    bodyB: rightUpperLeg,
    stiffness: 0.6,
    render: {
      visible: true
    }
  });

  var upperToLowerRightArm = Constraint.create({
    bodyA: rightUpperArm,
    bodyB: rightLowerArm,
    pointA: {
      x: 0,
      y: 15 * scale
    },
    pointB: {
      x: 0,
      y: -25 * scale
    },
    stiffness: 0.6,
    render: {
      visible: true
    }
  });

  var upperToLowerLeftArm = Constraint.create({
    bodyA: leftUpperArm,
    bodyB: leftLowerArm,
    pointA: {
      x: 0,
      y: 15 * scale
    },
    pointB: {
      x: 0,
      y: -25 * scale
    },
    stiffness: 0.6,
    render: {
      visible: true
    }
  });

  var lowerToRightKobushi = Constraint.create({
    bodyA: rightLowerArm,
    bodyB: rightKobushi,
    pointA: {
      x: 0,
      y: 15 * scale
    },
    pointB: {
      x: 0,
      y: -25 * scale
    },
    stiffness: 0.6,
    render: {
      visible: true
    }
  });

  var lowerToLeftKobushi = Constraint.create({
    bodyA: leftLowerArm,
    bodyB: leftKobushi,
    pointA: {
      x: 0,
      y: 15 * scale
    },
    pointB: {
      x: 0,
      y: -25 * scale
    },
    stiffness: 0.6,
    render: {
      visible: true
    }
  });



  var upperToLowerLeftLeg = Constraint.create({
    bodyA: leftUpperLeg,
    bodyB: leftLowerLeg,
    pointA: {
      x: 0,
      y: 20 * scale
    },
    pointB: {
      x: 0,
      y: -20 * scale
    },
    stiffness: 0.6,
    render: {
      visible: true
    }
  });

  var upperToLowerRightLeg = Constraint.create({
    bodyA: rightUpperLeg,
    bodyB: rightLowerLeg,
    pointA: {
      x: 0,
      y: 20 * scale
    },
    pointB: {
      x: 0,
      y: -20 * scale
    },
    stiffness: 0.6,
    render: {
      visible: true
    }
  });

  var lowerToLeftAshi = Constraint.create({
    bodyA: leftLowerLeg,
    bodyB: leftAshi,
    pointA: {
      x: 0,
      y: 20 * scale
    },
    pointB: {
      x: 0,
      y: -20 * scale
    },
    stiffness: 0.6,
    render: {
      visible: true
    }
  });
  var lowerToRightAshi = Constraint.create({
    bodyA: rightLowerLeg,
    bodyB: rightAshi,
    pointA: {
      x: 0,
      y: 20 * scale
    },
    pointB: {
      x: 0,
      y: -20 * scale
    },
    stiffness: 0.6,
    render: {
      visible: true
    }
  });


  var headContraint = Constraint.create({
    bodyA: head,
    pointA: {
      x: 0,
      y: 25 * scale
    },
    pointB: {
      x: 0,
      y: -35 * scale
    },
    bodyB: chest,
    stiffness: 0.6,
    render: {
      visible: true
    }
  });

  var legToLeg = Constraint.create({
    bodyA: leftLowerLeg,
    bodyB: rightLowerLeg,
    stiffness: 0.01,
    render: {
      visible: true
    }
  });

  var person = Composite.create({
    bodies: [
      chest, head, leftLowerArm, leftUpperArm,
      rightLowerArm, rightUpperArm, leftLowerLeg,
      rightLowerLeg, leftUpperLeg, rightUpperLeg,
      leftKobushi, rightKobushi,
      leftAshi, rightAshi
    ],
    constraints: [
      upperToLowerLeftArm, upperToLowerRightArm, chestToLeftUpperArm,
      chestToRightUpperArm, headContraint, upperToLowerLeftLeg,
      upperToLowerRightLeg, chestToLeftUpperLeg, chestToRightUpperLeg,
      legToLeg,
      lowerToLeftKobushi, lowerToRightKobushi,
      lowerToLeftAshi, lowerToRightAshi
    ]
  });

  return person;
};
