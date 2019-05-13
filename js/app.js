const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;




// エンジン作成
const engine = Engine.create(),
    world = engine.world;

// 描画設定
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,             // ステージの横幅
    height: 600,            // ステージの高さ
    background: '#000000',  // ステージの背景色
    wireframes: false       // ワイヤーフレームモードをオフ
  }
});
Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);


// 丸
const circle = Bodies.circle(375, 100, 46, {
  restitution: 1, // バウンド
  render: {
    sprite: {
      texture: './img/ball.png'
    }
  },
});

// 四角
const box = Bodies.rectangle(450, 50, 80, 80);

// 地面
const ground = Bodies.rectangle(400, 610, 810, 120, { isStatic: true });


// 世界に追加
World.add(world, [
  circle,
  box,
  ground,
  // 壁
  Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
  Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
  Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
]);


// 人間
const ragdoll = makePerson(300, 300, 1.2, {
  density: 0.0005,   // 密度
  frictionAir: 0.06, // 空気抵抗
  restitution: 1,    // 弾力性
  friction: 0.01,    // 本体の摩擦
 }
);
World.add(world, [ragdoll]);


// ブロックの集合
const stack = Composites.stack(100, 100, 11, 5, 0, 0, function(x, y) {
  return Bodies.rectangle(x, y, 40, 40);
});
World.add(world, [stack]);


// マウスドラッグ可能に
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.6,
    length: 0,
    angularStiffness: 0,
    render: {
      visible: false
    }
  }
});
World.add(world, mouseConstraint);
render.mouse = mouse;



